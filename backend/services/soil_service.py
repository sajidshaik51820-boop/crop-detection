"""
Soil Service
Provides Dual-Mode Soil Evaluation:
Mode 1: Crop-Based Ideal Soil Recommendations
Mode 2: Soil Parameter Diagnostics (pH, Moisture %, N, P, K) with scientific disclaimer.
"""

from typing import Dict, Any, Optional
from backend.ml.class_metadata import get_crop_profile

SCIENTIFIC_DISCLAIMER = (
    "Scientific Notice: Standard RGB foliage photography cannot measure soil pH, NPK, "
    "or chemical composition. Mode 1 offers agronomically established requirements for the "
    "crop species. Mode 2 analyzes user-provided soil lab testing measurements."
)

def get_crop_soil_recommendations(crop_name: str) -> Dict[str, Any]:
    """Mode 1: Returns ideal soil conditions for a specified crop."""
    profile = get_crop_profile(crop_name)
    return {
        "mode": "Crop-Based Recommendation",
        "crop": profile.get("crop", crop_name),
        "recommended_soil_type": profile.get("soil_type", "Loamy soil rich in organic matter"),
        "soil_texture": profile.get("soil_texture", "Medium loam with good tilth"),
        "drainage_requirement": profile.get("drainage", "Well-drained with adequate subsoil porosity"),
        "general_ph_suitability": profile.get("ph_range", "6.0 - 7.0"),
        "organic_matter_guidance": profile.get("organic_matter", "3% - 5% decomposed compost or humus"),
        "warning_signs": [
            "Stagnant water ponding leads to root rot within 24-48 hours.",
            "Soil compaction restricts root expansion and reduces nutrient assimilation.",
            "Salinity crusting indicates poor drainage and excessive fertilizer salts."
        ],
        "disclaimer": SCIENTIFIC_DISCLAIMER
    }

def analyze_soil_measurements(
    crop_name: str,
    soil_type: Optional[str] = None,
    ph: Optional[float] = None,
    moisture: Optional[float] = None,
    nitrogen: Optional[float] = None,
    phosphorus: Optional[float] = None,
    potassium: Optional[float] = None
) -> Dict[str, Any]:
    """Mode 2: Analyzes actual user-entered soil lab metrics against crop targets."""
    crop_profile = get_crop_profile(crop_name)
    evaluations = []
    status_flags = []
    
    # 1. pH Assessment
    if ph is not None:
        ph_status = "Optimal"
        ph_advice = "Soil pH is within healthy agronomic parameters."
        if ph < 5.5:
            ph_status = "Strongly Acidic"
            ph_advice = "Risk of aluminum/manganese toxicity and phosphorus fixation. Consider agricultural lime (calcium carbonate) or dolomite application."
            status_flags.append("Acidic Soil")
        elif ph < 6.0:
            ph_status = "Moderately Acidic"
            ph_advice = "Slightly below optimal for most vegetables; maintain organic compost additions."
        elif ph > 7.8:
            ph_status = "Alkaline / Calcareous"
            ph_advice = "Risk of micronutrient deficiencies (iron, manganese, zinc). Consider elemental sulfur or acidifying organic matter."
            status_flags.append("Alkaline Soil")
        evaluations.append({
            "parameter": "Soil pH",
            "measured_value": ph,
            "optimal_target": crop_profile.get("ph_range", "6.0 - 7.0"),
            "status": ph_status,
            "recommendation": ph_advice
        })
        
    # 2. Moisture Assessment (%)
    if moisture is not None:
        moisture_status = "Adequate"
        moisture_advice = "Soil moisture level is optimal for root water potential."
        if moisture < 20.0:
            moisture_status = "Deficit / Drought Stress"
            moisture_advice = "Immediate irrigation required. Consider drip irrigation and organic mulching to reduce evaporative loss."
            status_flags.append("Drought Stress")
        elif moisture > 75.0:
            moisture_status = "Excess / Saturated"
            moisture_advice = "Excess water reduces oxygen in root zone. Check tile drainage and avoid irrigation until soil drains."
            status_flags.append("Waterlogged")
        evaluations.append({
            "parameter": "Soil Moisture (%)",
            "measured_value": f"{moisture}%",
            "optimal_target": "40% - 60% Field Capacity",
            "status": moisture_status,
            "recommendation": moisture_advice
        })

    # 3. Nitrogen (mg/kg or ppm)
    if nitrogen is not None:
        n_status = "Balanced"
        n_advice = "Nitrogen level supports standard vegetative growth."
        if nitrogen < 40.0:
            n_status = "Low / Deficient"
            n_advice = "Foliar chlorosis and stunted growth risk. Apply composted manure, blood meal, or split-application urea."
            status_flags.append("Nitrogen Deficient")
        elif nitrogen > 150.0:
            n_status = "Excessive"
            n_advice = "Excessive vegetative canopy at the expense of fruit set. High risk of aphids and fungal blight."
            status_flags.append("Excess Nitrogen")
        evaluations.append({
            "parameter": "Available Nitrogen (N)",
            "measured_value": f"{nitrogen} mg/kg",
            "optimal_target": "50 - 120 mg/kg",
            "status": n_status,
            "recommendation": n_advice
        })

    # 4. Phosphorus (mg/kg or ppm)
    if phosphorus is not None:
        p_status = "Adequate"
        p_advice = "Phosphorus supply is adequate for root and flower development."
        if phosphorus < 25.0:
            p_status = "Deficient"
            p_advice = "May cause purpling of lower leaf stems and retarded root elongation. Apply rock phosphate or bone meal."
            status_flags.append("Phosphorus Deficient")
        evaluations.append({
            "parameter": "Available Phosphorus (P)",
            "measured_value": f"{phosphorus} mg/kg",
            "optimal_target": "30 - 60 mg/kg",
            "status": p_status,
            "recommendation": p_advice
        })

    # 5. Potassium (mg/kg or ppm)
    if potassium is not None:
        k_status = "Adequate"
        k_advice = "Potassium is optimal for stomatal regulation and fruit quality."
        if potassium < 100.0:
            k_status = "Deficient"
            k_advice = "Causes marginal leaf chlorosis and weakened stems. Apply sulfate of potash or wood ash."
            status_flags.append("Potassium Deficient")
        evaluations.append({
            "parameter": "Available Potassium (K)",
            "measured_value": f"{potassium} mg/kg",
            "optimal_target": "120 - 220 mg/kg",
            "status": k_status,
            "recommendation": k_advice
        })

    overall_condition = "Balanced Soil" if len(status_flags) == 0 else f"Attention Needed: {', '.join(status_flags)}"

    return {
        "mode": "User Soil Measurement Analysis",
        "crop": crop_name,
        "soil_type_entered": soil_type or "Unspecified",
        "overall_condition": overall_condition,
        "evaluations": evaluations,
        "crop_target_soil": crop_profile.get("soil_type", "Loam"),
        "disclaimer": SCIENTIFIC_DISCLAIMER
    }
