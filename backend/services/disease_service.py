"""
Disease Service
Handles disease details, pathogen descriptions, spread factors, and advisory notices.
"""

from typing import List, Dict, Any
from backend.ml.class_metadata import DISEASE_METADATA, PLANT_VILLAGE_CLASSES

def get_diseases_for_crop(crop_name: str) -> List[Dict[str, Any]]:
    """Returns all disease profiles associated with a crop."""
    matched = []
    for class_id, info in DISEASE_METADATA.items():
        if crop_name.lower() in class_id.lower():
            matched.append({"class_id": class_id, **info})
    return matched

def get_disease_by_class(class_id: str) -> Dict[str, Any]:
    """Returns disease details for a specific class ID."""
    if class_id in DISEASE_METADATA:
        return DISEASE_METADATA[class_id]
    return {
        "disease_name": class_id.split("___")[-1].replace("_", " "),
        "explanation": "No extended metadata available for this classification index.",
        "precautions": ["Consult a local agricultural extension specialist."]
    }
