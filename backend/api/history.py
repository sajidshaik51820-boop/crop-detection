"""
History API Endpoints
Manages persisted crop scans in SQLite:
- GET /api/history
- GET /api/history/{scan_id}
- DELETE /api/history/{scan_id}
- DELETE /api/history
"""

import json
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from backend.database.database import get_db
from backend.database.models import ScanRecord

router = APIRouter()

def record_to_dict(rec: ScanRecord) -> dict:
    """Converts a ScanRecord ORM instance to a dictionary."""
    return {
        "scan_id": rec.scan_id,
        "created_at": rec.created_at.isoformat() if rec.created_at else None,
        "image_url": f"/uploads/{rec.image_filename}" if rec.image_filename else None,
        "crop": rec.crop,
        "crop_category": rec.crop_category,
        "disease": rec.disease,
        "health_status": rec.health_status,
        "confidence": rec.confidence,
        "severity": rec.severity,
        "symptoms": json.loads(rec.symptoms) if rec.symptoms else [],
        "precautions": json.loads(rec.precautions) if rec.precautions else [],
        "disease_info": json.loads(rec.disease_info) if rec.disease_info else {},
        "growth_recommendations": json.loads(rec.growth_recommendations) if rec.growth_recommendations else {},
        "soil_recommendations": json.loads(rec.soil_recommendations) if rec.soil_recommendations else {},
        "water_guidance": json.loads(rec.water_guidance) if rec.water_guidance else [],
        "nutrient_guidance": json.loads(rec.nutrient_guidance) if rec.nutrient_guidance else []
    }

@router.get("/history")
def get_all_history(db: Session = Depends(get_db)):
    """Returns list of previous scans ordered by newest first."""
    records = db.query(ScanRecord).order_by(ScanRecord.created_at.desc()).all()
    return [record_to_dict(r) for r in records]

@router.get("/history/{scan_id}")
def get_single_scan(scan_id: str, db: Session = Depends(get_db)):
    """Retrieves full detail of a single scan."""
    record = db.query(ScanRecord).filter(ScanRecord.scan_id == scan_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Scan record not found.")
    return record_to_dict(record)

@router.delete("/history/{scan_id}")
def delete_single_scan(scan_id: str, db: Session = Depends(get_db)):
    """Deletes a specific scan record."""
    record = db.query(ScanRecord).filter(ScanRecord.scan_id == scan_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Scan record not found.")
    db.delete(record)
    db.commit()
    return {"status": "deleted", "scan_id": scan_id}

@router.delete("/history")
def clear_all_history(db: Session = Depends(get_db)):
    """Clears all scan history."""
    count = db.query(ScanRecord).delete()
    db.commit()
    return {"status": "cleared", "deleted_count": count}
