import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, Text, Integer
from backend.database.database import Base

class ScanRecord(Base):
    __tablename__ = "scans"

    scan_id = Column(String(64), primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow)
    image_path = Column(String(512), nullable=True)
    image_filename = Column(String(256), nullable=True)
    crop = Column(String(128), nullable=True)
    crop_category = Column(String(128), nullable=True, default="Vegetable")
    disease = Column(String(256), nullable=True)
    health_status = Column(String(64), nullable=True)  # Healthy, Disease Detected, Stress Detected, Indeterminate
    confidence = Column(Float, nullable=True)
    severity = Column(String(64), nullable=True, default="Low")  # Low, Moderate, Severe, None
    symptoms = Column(Text, nullable=True)  # JSON formatted
    precautions = Column(Text, nullable=True)  # JSON formatted
    disease_info = Column(Text, nullable=True)  # JSON formatted
    growth_recommendations = Column(Text, nullable=True)  # JSON formatted
    soil_recommendations = Column(Text, nullable=True)  # JSON formatted
    water_guidance = Column(Text, nullable=True)  # JSON formatted
    nutrient_guidance = Column(Text, nullable=True)  # JSON formatted

class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), unique=True, nullable=False)
    category = Column(String(128), nullable=False)
    optimal_temp = Column(String(64), nullable=True)
    optimal_humidity = Column(String(64), nullable=True)
    water_needs = Column(String(256), nullable=True)
    sunlight = Column(String(256), nullable=True)
    soil_type = Column(String(256), nullable=True)
    soil_texture = Column(String(256), nullable=True)
    drainage = Column(String(256), nullable=True)
    ph_range = Column(String(64), nullable=True)
    organic_matter = Column(String(256), nullable=True)
    growth_stages = Column(Text, nullable=True)
    harvest_info = Column(Text, nullable=True)

class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, autoincrement=True)
    crop_name = Column(String(128), nullable=False)
    disease_name = Column(String(256), nullable=False)
    explanation = Column(Text, nullable=True)
    common_causes = Column(Text, nullable=True)
    conditions = Column(Text, nullable=True)
    spread_info = Column(Text, nullable=True)
    effect_on_crop = Column(Text, nullable=True)
    symptoms = Column(Text, nullable=True)
    precautions = Column(Text, nullable=True)

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    crop_name = Column(String(128), nullable=False)
    nutrient_management = Column(Text, nullable=True)
    weed_management = Column(Text, nullable=True)
    pest_monitoring = Column(Text, nullable=True)
    irrigation_guidance = Column(Text, nullable=True)
