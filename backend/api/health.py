"""
Health, Agronomy, and Model Information Endpoints
Handles system health, crop catalogs, soil analysis, and AI model metadata.
"""

from typing import Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException

from backend.ml.model import get_model_summary_dict
from backend.ml.inference import ai_engine
from backend.services.crop_service import list_all_crops, get_crop_by_name
from backend.services.disease_service import get_diseases_for_crop
from backend.services.soil_service import (
    get_crop_soil_recommendations,
    analyze_soil_measurements
)

router = APIRouter()

class SoilAnalysisRequest(BaseModel):
    crop_name: str = Field(..., example="Tomato")
    soil_type: Optional[str] = Field(None, example="Sandy Loam")
    ph: Optional[float] = Field(None, example=6.4, ge=3.0, le=11.0)
    moisture: Optional[float] = Field(None, example=45.0, ge=0.0, le=100.0)
    nitrogen: Optional[float] = Field(None, example=85.0, ge=0.0)
    phosphorus: Optional[float] = Field(None, example=40.0, ge=0.0)
    potassium: Optional[float] = Field(None, example=150.0, ge=0.0)

@router.get("/health")
def health_check():
    """System health check endpoint."""
    return {
        "status": "healthy",
        "service": "Smart Crop Health & Disease Detection Backend",
        "version": "1.0.0",
        "ai_engine": {
            "is_real_weights_loaded": ai_engine.is_real_model_loaded,
            "mode": "Production" if ai_engine.is_real_model_loaded else "MODEL_NOT_AVAILABLE",
            "supported_classes": ai_engine.get_supported_classes()
        }
    }

@router.get("/model-info")
def get_model_architecture():
    """Returns AI architecture details, layers, datasets, and pipeline flow."""
    summary = get_model_summary_dict()
    summary["is_real_model_loaded"] = ai_engine.is_real_model_loaded
    summary["mode_label"] = "Production ACRNN" if ai_engine.is_real_model_loaded else "Model Not Available"
    summary["supported_crops_count"] = len(ai_engine.get_supported_classes())
    return summary

@router.post("/soil-analysis")
def evaluate_soil(payload: SoilAnalysisRequest):
    """
    Evaluates soil parameters (Mode 2) or provides crop-based soil guidance (Mode 1).
    """
    # If no parameters provided, return Mode 1 recommendations
    if payload.ph is None and payload.moisture is None and payload.nitrogen is None and payload.phosphorus is None and payload.potassium is None:
        return get_crop_soil_recommendations(payload.crop_name)
    
    # Otherwise run Mode 2 parameter diagnostic
    return analyze_soil_measurements(
        crop_name=payload.crop_name,
        soil_type=payload.soil_type,
        ph=payload.ph,
        moisture=payload.moisture,
        nitrogen=payload.nitrogen,
        phosphorus=payload.phosphorus,
        potassium=payload.potassium
    )

@router.get("/crops")
def get_all_crops():
    """Lists all crops supported by the agronomic database."""
    return list_all_crops()

@router.get("/crops/{crop_name}")
def get_single_crop(crop_name: str):
    """Retrieves agronomic details for a specific crop."""
    crop = get_crop_by_name(crop_name)
    if not crop:
        raise HTTPException(status_code=404, detail=f"Crop '{crop_name}' not found.")
    return crop

@router.get("/diseases/{crop_name}")
def get_crop_diseases(crop_name: str):
    """Returns all disease profiles associated with a crop."""
    diseases = get_diseases_for_crop(crop_name)
    return {"crop": crop_name, "count": len(diseases), "diseases": diseases}
