"""
Image Validation and Preprocessing Pipeline
Utilizes OpenCV to validate image integrity, detect blur and extreme lighting,
and prepare normalized arrays for AI inference.
"""

import cv2
import numpy as np
from typing import Tuple, Dict, Any

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}
MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024  # 15 MB
TARGET_IMAGE_SIZE = (224, 224)

class ImageQualityException(Exception):
    """Exception raised when an uploaded image fails quality checks."""
    pass

def validate_image_file(filename: str, file_size: int):
    """Validates file extension and size."""
    if not filename:
        raise ImageQualityException("No file provided.")
    
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        raise ImageQualityException(
            f"Unsupported file format '.{ext}'. Supported formats: {', '.join(sorted(ALLOWED_EXTENSIONS))}."
        )
    
    if file_size > MAX_FILE_SIZE_BYTES:
        max_mb = MAX_FILE_SIZE_BYTES // (1024 * 1024)
        raise ImageQualityException(f"File size exceeds maximum allowable limit of {max_mb}MB.")
    
    if file_size < 100:
        raise ImageQualityException("File is empty or corrupted.")

def assess_image_quality(img_bgr: np.ndarray) -> Dict[str, Any]:
    """
    Performs OpenCV checks for blurriness, darkness, and overexposure.
    """
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    
    # 1. Laplacian variance for blur detection
    laplacian_var = float(cv2.Laplacian(gray, cv2.CV_64F).var())
    is_blurry = laplacian_var < 35.0  # Threshold for severe blur
    
    # 2. Mean brightness calculation
    mean_brightness = float(np.mean(gray))
    is_too_dark = mean_brightness < 25.0
    is_overexposed = mean_brightness > 240.0
    
    warnings = []
    if is_blurry:
        warnings.append("Image appears blurry or out of focus. For highest diagnostic accuracy, ensure leaves are sharp.")
    if is_too_dark:
        warnings.append("Image is very dark. Please capture under sufficient natural or ambient lighting.")
    if is_overexposed:
        warnings.append("Image is overexposed or contains heavy glare.")
        
    return {
        "blur_score": round(laplacian_var, 2),
        "is_blurry": is_blurry,
        "mean_brightness": round(mean_brightness, 2),
        "is_too_dark": is_too_dark,
        "is_overexposed": is_overexposed,
        "warnings": warnings
    }

def preprocess_image_bytes(image_bytes: bytes) -> Tuple[np.ndarray, np.ndarray, Dict[str, Any]]:
    """
    Decodes image bytes, assesses quality, and returns:
    1. BGR image (original dimensions)
    2. Normalized RGB image tensor (1, 224, 224, 3) ready for deep learning inference
    3. Quality metadata dictionary
    """
    np_arr = np.frombuffer(image_bytes, np.uint8)
    img_bgr = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    
    if img_bgr is None or img_bgr.size == 0:
        raise ImageQualityException("Failed to decode image. The file may be corrupt or not a valid image format.")
    
    h, w, c = img_bgr.shape
    if h < 32 or w < 32:
        raise ImageQualityException(f"Image resolution ({w}x{h}) is too low for neural network feature analysis.")
    
    quality_meta = assess_image_quality(img_bgr)
    quality_meta["original_width"] = w
    quality_meta["original_height"] = h
    
    # Resize to standard model dimensions (224x224) using bilinear interpolation
    img_resized = cv2.resize(img_bgr, TARGET_IMAGE_SIZE, interpolation=cv2.INTER_AREA)
    
    # Convert BGR (OpenCV default) to RGB
    img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
    
    # Normalize pixel intensities to [0, 1] range float32
    img_normalized = img_rgb.astype(np.float32) / 255.0
    
    # Add batch dimension: (1, 224, 224, 3)
    tensor = np.expand_dims(img_normalized, axis=0)
    
    return img_bgr, tensor, quality_meta

def estimate_severity_from_image(img_bgr: np.ndarray, is_healthy: bool) -> Tuple[str, float]:
    """
    Estimates disease severity (Low, Moderate, Severe) by analyzing HSV color mask
    of discolored necrotic/chlorotic leaf area compared to total green leaf canopy.
    """
    if is_healthy:
        return "None", 0.0
    
    try:
        hsv = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV)
        
        # Green mask for healthy leaf tissue
        lower_green = np.array([25, 40, 40])
        upper_green = np.array([85, 255, 255])
        green_mask = cv2.inRange(hsv, lower_green, upper_green)
        
        # Brown / yellow / dark lesion mask
        lower_brown = np.array([8, 50, 20])
        upper_brown = np.array([24, 255, 200])
        brown_mask = cv2.inRange(hsv, lower_brown, upper_brown)
        
        total_leaf_pixels = np.count_nonzero(green_mask) + np.count_nonzero(brown_mask)
        if total_leaf_pixels < 500:
            return "Moderate", 35.0  # Heuristic fallback
            
        lesion_pixels = np.count_nonzero(brown_mask)
        affected_ratio = (lesion_pixels / total_leaf_pixels) * 100.0
        
        if affected_ratio < 15.0:
            severity = "Low"
        elif affected_ratio < 40.0:
            severity = "Moderate"
        else:
            severity = "Severe"
            
        return severity, round(affected_ratio, 1)
    except Exception:
        return "Moderate", 30.0
