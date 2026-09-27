"""
API Prediction Endpoints
Handles /api/predict, /api/preprocess, and /api/remote-sensing
"""

import os
import uuid
import json
import cv2
import numpy as np
from datetime import datetime
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.database.models import ScanRecord
from backend.ml.preprocessing import (
    preprocess_image_bytes,
    validate_image_file,
    ImageQualityException
)
from backend.ml.inference import ai_engine

router = APIRouter()

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/predict")
async def predict_crop(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Main AI prediction endpoint:
    1. Validates and preprocesses image with OpenCV.
    2. Runs ACRNN inference (or designated Demo Mode).
    3. Persists scan record in SQLite.
    4. Returns complete crop health report JSON.
    """
    try:
        content = await file.read()
        validate_image_file(file.filename, len(content))
        
        img_bgr, tensor, quality_meta = preprocess_image_bytes(content)
        
        # Save image to upload folder for persistent viewing
        ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else "jpg"
        scan_id = str(uuid.uuid4())
        filename = f"{scan_id}.{ext}"
        saved_path = os.path.join(UPLOAD_DIR, filename)
        
        with open(saved_path, "wb") as f:
            f.write(content)
            
        # Run inference
        result = ai_engine.predict(img_bgr, tensor, quality_meta)
        result["scan_id"] = scan_id
        result["image_url"] = f"/uploads/{filename}"
        result["timestamp"] = datetime.utcnow().isoformat()
        
        # Save to database
        db_record = ScanRecord(
            scan_id=scan_id,
            image_path=saved_path,
            image_filename=filename,
            crop=result.get("crop"),
            crop_category=result.get("crop_category", "Unspecified"),
            disease=result.get("disease"),
            health_status=result.get("health_status", "Indeterminate"),
            confidence=result.get("confidence"),
            severity=result.get("severity", "Unknown"),
            symptoms=json.dumps(result.get("symptoms", [])),
            precautions=json.dumps(result.get("precautions", [])),
            disease_info=json.dumps(result.get("disease_info", {})),
            growth_recommendations=json.dumps(result.get("growth_recommendations", {})),
            soil_recommendations=json.dumps(result.get("soil_recommendations", {})),
            water_guidance=json.dumps(result.get("water_guidance", [])),
            nutrient_guidance=json.dumps(result.get("nutrient_guidance", []))
        )
        db.add(db_record)
        db.commit()
        
        return result

    except ImageQualityException as eq:
        raise HTTPException(status_code=400, detail=str(eq))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

@router.post("/preprocess")
async def preprocess_image_check(file: UploadFile = File(...)):
    """
    Performs image quality check without running full prediction.
    Useful for instant camera preview verification.
    """
    try:
        content = await file.read()
        validate_image_file(file.filename, len(content))
        _, _, quality_meta = preprocess_image_bytes(content)
        return {
            "status": "success",
            "quality": quality_meta
        }
    except ImageQualityException as eq:
        raise HTTPException(status_code=400, detail=str(eq))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/remote-sensing")
async def analyze_remote_sensing(
    file: UploadFile = File(...),
    source_type: str = Form("drone")  # "drone" or "satellite"
):
    """
    Remote Sensing Imagery Analysis (Sentinel-2 / Drone UAV):
    Computes VARI (Visible Atmospherically Resistant Index) and simulates
    canopy stress zones with clear scientific distinction from multispectral NIR NDVI.
    """
    try:
        content = await file.read()
        validate_image_file(file.filename, len(content))
        
        np_arr = np.frombuffer(content, np.uint8)
        img_bgr = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if img_bgr is None:
            raise HTTPException(status_code=400, detail="Invalid remote sensing image file.")
            
        h, w, _ = img_bgr.shape
        
        # Save image
        scan_id = str(uuid.uuid4())
        ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else "jpg"
        filename = f"remote_{scan_id}.{ext}"
        saved_path = os.path.join(UPLOAD_DIR, filename)
        with open(saved_path, "wb") as f:
            f.write(content)

        # Convert to float for spectral index computation
        img_float = img_bgr.astype(np.float32)
        b, g, r = img_float[:, :, 0], img_float[:, :, 1], img_float[:, :, 2]
        
        # Compute VARI = (Green - Red) / (Green + Red - Blue + epsilon)
        denom = (g + r - b)
        denom[denom == 0] = 1e-5
        vari = (g - r) / denom
        vari = np.clip(vari, -1.0, 1.0)
        
        mean_vari = float(np.mean(vari))
        
        # Classify canopy health zones
        high_vigor_mask = vari > 0.25
        moderate_mask = (vari >= 0.05) & (vari <= 0.25)
        stress_mask = vari < 0.05
        
        total_px = h * w
        high_vigor_pct = round((np.count_nonzero(high_vigor_mask) / total_px) * 100.0, 1)
        moderate_pct = round((np.count_nonzero(moderate_mask) / total_px) * 100.0, 1)
        stress_pct = round((np.count_nonzero(stress_mask) / total_px) * 100.0, 1)
        
        # Determine overall field condition
        if stress_pct > 35.0:
            field_status = "Substantial Crop Stress Detected"
            status_color = "red"
        elif stress_pct > 15.0:
            field_status = "Localized Foliar Stress / Moderate Vigor"
            status_color = "amber"
        else:
            field_status = "High Canopy Vigor & Homogeneous Growth"
            status_color = "emerald"

        # Scientific explanation
        if source_type.lower() == "satellite":
            sensor_note = (
                "Sentinel-2 MSI Analysis: For true multispectral NDVI, Sentinel-2 utilizes Band 4 (Red, 665nm) "
                "and Band 8 (NIR, 842nm). Since uploaded imagery is standard 3-channel RGB, "
                "the system calculates the calibrated Visible Atmospherically Resistant Index (VARI), "
                "which strongly correlates with chlorophyll abundance and vegetative fraction."
            )
            simulated_ndvi = round(min(0.85, max(0.12, (mean_vari + 1.0) * 0.42)), 2)
        else:
            sensor_note = (
                "Drone / UAV High-Resolution RGB Survey: High spatial resolution drone imagery allows "
                "canopy structural inspection and patch-level stress detection using visible-band vegetation indices."
            )
            simulated_ndvi = round(min(0.88, max(0.15, (mean_vari + 1.0) * 0.44)), 2)

        return {
            "source_type": source_type.capitalize(),
            "image_url": f"/uploads/{filename}",
            "resolution": f"{w} x {h} px",
            "field_health_summary": field_status,
            "status_color": status_color,
            "vegetation_indices": {
                "vari_score": round(mean_vari, 3),
                "simulated_ndvi_equivalent": simulated_ndvi,
                "canopy_coverage_percent": round(high_vigor_pct + moderate_pct, 1)
            },
            "zonal_breakdown": {
                "high_vigor_canopy_percent": high_vigor_pct,
                "moderate_canopy_percent": moderate_pct,
                "stressed_or_bare_soil_percent": stress_pct
            },
            "potential_unhealthy_regions": (
                f"Identified {stress_pct}% of surveyed area exhibiting chlorosis, thinning canopy, or water deficit."
                if stress_pct > 10 else "No significant anomalous stress clusters identified in canopy coverage."
            ),
            "recommendations": [
                "Inspect high-stress GPS coordinates for irrigation valve failure or soil compaction.",
                "Verify ground-truth soil moisture in areas showing <0.05 vegetation index.",
                "Cross-reference drone flyovers with Sentinel-2 5-day revisit cycles for temporal trend validation."
            ],
            "scientific_distinction": sensor_note
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Remote sensing error: {str(e)}")
