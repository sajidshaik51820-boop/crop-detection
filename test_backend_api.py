"""
Comprehensive Backend API Automated Test Suite
Verifies all 12+ API endpoints, image processing, inference, and database persistence.
"""

import sys
import os
import cv2
import numpy as np
from fastapi.testclient import TestClient

# Ensure backend can be imported
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.main import app
from backend.database.database import init_db

init_db()
client = TestClient(app)

def create_synthetic_leaf_image(width=300, height=300, color=(34, 139, 34)):
    """Creates a synthetic RGB leaf-like image with texture and some discoloration."""
    img = np.zeros((height, width, 3), dtype=np.uint8)
    # Background
    img[:] = (20, 20, 20)
    # Leaf shape (ellipse)
    cv2.ellipse(img, (width//2, height//2), (width//3, height//2 - 20), 30, 0, 360, color, -1)
    # Add subtle veins
    cv2.line(img, (width//2 - 40, height//2 + 80), (width//2 + 40, height//2 - 80), (20, 100, 20), 2)
    # Add some brown lesion spots to test severity detection
    cv2.circle(img, (width//2 - 15, height//2 - 10), 12, (19, 69, 139), -1)
    cv2.circle(img, (width//2 + 20, height//2 + 25), 16, (15, 60, 120), -1)
    
    _, buffer = cv2.imencode('.jpg', img)
    return buffer.tobytes()

def create_blurry_image(width=200, height=200):
    """Creates an extremely blurry/uniform image."""
    img = np.full((height, width, 3), 128, dtype=np.uint8)
    _, buffer = cv2.imencode('.jpg', img)
    return buffer.tobytes()

def run_all_tests():
    print("========================================")
    print("RUNNING SMART CROP AI AUTOMATED TEST SUITE")
    print("========================================")
    passed = 0
    total = 0

    def assert_test(name, condition, extra=""):
        nonlocal passed, total
        total += 1
        if condition:
            passed += 1
            print(f" [PASS] {name}")
        else:
            print(f" [FAIL] {name} - {extra}")

    # 1. Health check
    res = client.get("/api/health")
    assert_test("GET /api/health", res.status_code == 200 and res.json()["status"] == "healthy")

    # 2. Model Info
    res = client.get("/api/model-info")
    data = res.json()
    assert_test("GET /api/model-info", res.status_code == 200 and "ACRNN" in data["model_name"])

    # 3. Crops Catalog
    res = client.get("/api/crops")
    crops = res.json()
    assert_test("GET /api/crops", res.status_code == 200 and len(crops) >= 5)

    # 4. Single Crop Detail
    res = client.get("/api/crops/Tomato")
    assert_test("GET /api/crops/Tomato", res.status_code == 200 and res.json()["name"] == "Tomato")

    # 5. Crop Diseases
    res = client.get("/api/diseases/Tomato")
    assert_test("GET /api/diseases/Tomato", res.status_code == 200 and res.json()["count"] > 0)

    # 6. Soil Analysis - Mode 1 (Crop targets)
    res = client.post("/api/soil-analysis", json={"crop_name": "Tomato"})
    assert_test("POST /api/soil-analysis (Mode 1)", res.status_code == 200 and "pH" in str(res.json()))

    # 7. Soil Analysis - Mode 2 (Lab test diagnostics)
    res = client.post("/api/soil-analysis", json={
        "crop_name": "Tomato",
        "soil_type": "Sandy Loam",
        "ph": 5.2,
        "moisture": 18.0,
        "nitrogen": 30.0,
        "phosphorus": 20.0,
        "potassium": 80.0
    })
    sdata = res.json()
    assert_test("POST /api/soil-analysis (Mode 2)", res.status_code == 200 and len(sdata["evaluations"]) >= 4)

    # 8. Preprocess Check
    leaf_bytes = create_synthetic_leaf_image()
    res = client.post("/api/preprocess", files={"file": ("leaf.jpg", leaf_bytes, "image/jpeg")})
    assert_test("POST /api/preprocess (Valid leaf)", res.status_code == 200 and "blur_score" in res.json()["quality"])

    # 9. Main AI Prediction
    res = client.post("/api/predict", files={"file": ("leaf.jpg", leaf_bytes, "image/jpeg")})
    pred = res.json()
    assert_test(
        "POST /api/predict (Crop leaf)", 
        res.status_code == 200 and "crop" in pred and "confidence" in pred and "scan_id" in pred
    )
    scan_id = pred.get("scan_id")

    # 10. Remote Sensing (Drone UAV)
    res = client.post(
        "/api/remote-sensing", 
        data={"source_type": "drone"},
        files={"file": ("field_uav.jpg", leaf_bytes, "image/jpeg")}
    )
    rs_data = res.json()
    assert_test(
        "POST /api/remote-sensing (Drone UAV)",
        res.status_code == 200 and "vegetation_indices" in rs_data and "vari_score" in rs_data["vegetation_indices"]
    )

    # 11. History List
    res = client.get("/api/history")
    history_records = res.json()
    assert_test("GET /api/history", res.status_code == 200 and len(history_records) >= 1)

    # 12. Single Scan History Detail
    if scan_id:
        res = client.get(f"/api/history/{scan_id}")
        assert_test(f"GET /api/history/{scan_id}", res.status_code == 200 and res.json()["scan_id"] == scan_id)

        # 13. Delete Single Scan
        res = client.delete(f"/api/history/{scan_id}")
        assert_test(f"DELETE /api/history/{scan_id}", res.status_code == 200)

    # 14. Quality / Error handling check on Blurry Image
    blurry_bytes = create_blurry_image()
    res = client.post("/api/predict", files={"file": ("blurry.jpg", blurry_bytes, "image/jpeg")})
    assert_test(
        "Low Confidence / Blurry Image Handling", 
        res.status_code == 200 and res.json().get("is_low_confidence") is True
    )

    # 15. Invalid file type rejection
    res = client.post("/api/predict", files={"file": ("bad_file.txt", b"not an image", "text/plain")})
    assert_test("Error Handling: Non-image rejection", res.status_code == 400)

    print("========================================")
    print(f"RESULTS: {passed}/{total} tests passed.")
    print("========================================")
    if passed == total:
        print("ALL TESTS PASSED SUCCESSFULLY!")
        return 0
    else:
        print("SOME TESTS FAILED.")
        return 1

if __name__ == "__main__":
    sys.exit(run_all_tests())
