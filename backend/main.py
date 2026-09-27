"""
Smart Crop Health & Disease Detection System - Backend Server
FastAPI Entry Point
"""

import os
import sys
from contextlib import asynccontextmanager

# Add parent directory to sys.path so 'backend' package resolves cleanly
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.database.database import init_db
from backend.api.routes import api_router

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database tables
    print("[Server] Initializing database tables...")
    init_db()
    print("[Server] Database initialized successfully.")
    yield
    # Shutdown
    print("[Server] Shutting down.")

app = FastAPI(
    title="Smart Crop Health & Disease Detection System",
    description="Production-grade AI Agronomy Platform powered by Transfer Learning and ACRNN Architecture.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory for static image access
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Mount API Master Router
app.include_router(api_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to Smart Crop Health & Disease Detection API",
        "docs_url": "/docs",
        "health_check": "/api/health",
        "system_status": "operational"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
