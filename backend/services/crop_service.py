"""
Crop Service
Provides structured catalog of agricultural crops, agronomic attributes, and growth profiles.
"""

from typing import List, Dict, Any, Optional
from backend.ml.class_metadata import CROP_DATA

def list_all_crops() -> List[Dict[str, Any]]:
    """Returns all available crop profiles."""
    results = []
    for name, data in CROP_DATA.items():
        if name != "Default":
            results.append({"name": name, **data})
    return results

def get_crop_by_name(crop_name: str) -> Optional[Dict[str, Any]]:
    """Finds a crop profile by name (case-insensitive substring)."""
    for name, data in CROP_DATA.items():
        if name.lower() in crop_name.lower() or crop_name.lower() in name.lower():
            return {"name": name, **data}
    return None
