"""
API Master Router
Combines prediction, history, and health routers.
"""

from fastapi import APIRouter
from backend.api.prediction import router as prediction_router
from backend.api.history import router as history_router
from backend.api.health import router as health_router

api_router = APIRouter(prefix="/api")

api_router.include_router(health_router, tags=["Health & Info"])
api_router.include_router(prediction_router, tags=["Prediction & Remote Sensing"])
api_router.include_router(history_router, tags=["Scan History"])
