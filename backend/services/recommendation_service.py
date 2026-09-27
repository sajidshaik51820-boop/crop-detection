"""
Recommendation Service
Assembles unified agronomic recommendations for crop health, growth guide, and sustainable management.
"""

from typing import Dict, Any
from backend.ml.class_metadata import get_crop_profile

def build_growth_recommendations(crop_name: str) -> Dict[str, Any]:
    """Generates the full agronomic growth guide for a crop."""
    profile = get_crop_profile(crop_name)
    return {
        "crop": profile.get("crop", crop_name),
        "category": profile.get("category", "Agricultural Crop"),
        "growing_conditions": {
            "sunlight": profile.get("sunlight", "Full sunlight"),
            "temperature": profile.get("optimal_temp", "20°C - 30°C"),
            "humidity": profile.get("optimal_humidity", "60% - 80%")
        },
        "water_requirements": {
            "regime": profile.get("water_needs", "Regular irrigation"),
            "irrigation_guidance": "Implement drip or micro-sprinkler systems to keep foliage dry and minimize spore dissemination."
        },
        "nutrient_requirements": {
            "general_management": profile.get("nutrient_management", "Balanced macro and micronutrients based on soil testing."),
            "guidelines": [
                "Apply split nitrogen doses to avoid leaching and vegetative overgrowth.",
                "Ensure adequate calcium and potassium for sturdy cell wall resistance against pathogens."
            ]
        },
        "weed_management": {
            "strategy": profile.get("weed_management", "Integrated weed management including mulch and cultivation."),
            "recommendation": "Maintain weed-free zone around plant bases during initial 30-40 days of vegetative growth."
        },
        "pest_monitoring": {
            "inspection": profile.get("pest_monitoring", "Weekly field scouting of lower leaf surfaces."),
            "advice": "Use yellow sticky traps and pheromone traps to identify vector presence before pest populations surge."
        },
        "growth_stages": profile.get("growth_stages", ["Seedling", "Vegetative", "Flowering", "Maturity"]),
        "harvest_considerations": profile.get("harvest_info", "Harvest during dry morning hours at optimum physiological maturity.")
    }
