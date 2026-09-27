# 🌱 Smart Crop Health & Disease Detection System

An autonomous, production-grade full-stack AI agronomic intelligence platform powered by an **Attentive Convolutional Recurrent Neural Network (ACRNN)** with **Transfer Learning**, **OpenCV foliar validation**, **dual-mode soil diagnostics**, and **Sentinel-2 & Drone UAV remote sensing analytics**.

---

## 📌 1. Project Overview

The **Smart Crop Health & Disease Detection System** provides farmers, agricultural extension workers, and crop consultants with an intelligent diagnostic assistant. Users can leverage their device's live browser camera or upload high-resolution leaf and canopy imagery to receive instant crop identification, disease classification, severity grading, pathology breakdowns, and expert-reviewed field precautions.

The platform is built as a **multi-page application** ensuring seamless navigation between dedicated operational views with persistent state.

---

## 🚨 2. Problem Statement

Foliar crop diseases and pest infestations account for 20% to 40% of global agricultural yield losses annually. Traditional disease identification relies on manual visual scouting, which is:
- **Labor-intensive & slow**: By the time visual symptoms are noticed by eye across vast acreage, pathogens often reach irreversible necrotic stages.
- **Geographically constrained**: Certified agronomists and plant pathologists are scarce in rural farming communities.
- **Prone to misdiagnosis**: Many fungal, bacterial, and nutritional stress symptoms present identical early-stage foliar chlorosis.
- **Lacking contextual awareness**: Standard CNN classifiers treat image pixels in isolation without modeling spatial context or attention to minute lesion boundaries.

---

## 💡 3. Proposed Solution

This system introduces a multi-tiered agronomic diagnostic architecture:
1. **Live Camera & Upload Scanner**: Real-time camera viewfinder leveraging WebRTC (`navigator.mediaDevices.getUserMedia()`) with targeting reticles, front/rear camera flipping, and OpenCV image quality assessment (detecting blur and extreme lighting before processing).
2. **Transfer Learning + ACRNN**: Combining an ImageNet-pretrained **MobileNetV2** backbone with **Spatial Attention** (isolating necrotic lesion boundaries) and **Bidirectional GRUs** (modeling spatial context transitions).
3. **Dedicated Multi-Page Hierarchy**: Decoupled routes for Scanner, Analysis Summary, Comprehensive Health Report, Crop Growth Guides, and Soil Diagnostics.
4. **Dual-Mode Soil Diagnostics**:
   - *Mode 1*: Agronomically established ideal soil texture, drainage, and pH targets for the identified crop.
   - *Mode 2*: Interactive chemical parameter diagnostic evaluating user soil lab measurements (pH, moisture, N, P, K) with clear scientific separation from RGB leaf photos.
5. **Remote Sensing & Vegetation Indices**: Satellite (Sentinel-2) and Drone UAV spectral processing computing the **Visible Atmospherically Resistant Index (VARI)** and simulated canopy vigor maps.
6. **Persistent Scan History**: Local SQLite database logging scans with one-click full report restoration.

---

## 🎯 4. Project Objectives

- Provide instantaneous foliar disease diagnosis with confidence metrics and severity estimates.
- Support 38 distinct plant-disease combinations across 14 major agricultural crops based on the PlantVillage taxonomy.
- Prevent unverified chemical overuse by providing sustainable field hygiene protocols and prominent reminders to consult certified agricultural professionals.
- Bridge micro-level leaf pathology with macro-level drone and satellite canopy monitoring.
- Deliver an intuitive, mobile-optimized interface with contextual Back navigation.

---

## ⚡ 5. Key Features

- **Live Device Camera**: Real WebRTC video stream, snapshot capture, retake, and camera toggling.
- **OpenCV Quality Pipeline**: Automatic rejection of corrupted files, detection of motion blur via Laplacian variance ($Var < 35$), and brightness thresholding.
- **ACRNN Deep Learning Model**: MobileNetV2 + Spatial Attention + Bi-GRU + Softmax classification.
- **Dual-Mode Soil Advisor**: Crop-based soil profiles + user soil test analysis (pH, moisture, N, P, K).
- **Remote Sensing Suite**: VARI computation ($VARI = \frac{G - R}{G + R - B}$), high/moderate/stressed canopy zonal breakdown, and Sentinel-2 sensor distinction.
- **SQLite History Vault**: Persistent historical archive with image thumbnails, deletion, and full report restoration.
- **Designated Demo Mode**: Clear transparency indicating when demo weights or production weights are active.

---

## 🏗️ 6. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React + Vite)                         │
│  Multi-page Architecture with React Router & CropAnalysisContext       │
│  Pages:                                                                │
│  /               Home (Modern Agricultural AI Landing)                │
│  /scanner        Live Camera (WebRTC getUserMedia) & File Upload      │
│  /analysis       AI Analysis Summary & Health Status                   │
│  /health         Full Crop Health, Symptoms & Precautions Report       │
│  /growth         Crop Growth Guide & Agronomic Recommendations         │
│  /soil           Mode 1: Crop-based / Mode 2: Soil Parameter Analysis │
│  /remote-sensing Satellite & Drone Vegetation Stress & VARI/NDVI Index │
│  /history        Scan History (SQLite-backed, View, Delete, Clear)     │
│  /model          ACRNN Architecture Visualization & Dataset Specs      │
│  /about          Project Overview, Team, Objectives & Tech Stack       │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ HTTP / REST API (Port 8000)
┌──────────────────────────────────▼─────────────────────────────────────┐
│                       BACKEND (FastAPI + Python)                       │
│  api/             routes.py, prediction.py, history.py, health.py      │
│  ml/              preprocessing.py (OpenCV blur/dark/resizing)         │
│                   model.py (ACRNN: MobileNetV2 + BiLSTM/GRU + Attn)    │
│                   inference.py (Demo & Weight-loaded inference)        │
│                   class_metadata.py (PlantVillage classes & agronomy)  │
│  services/        crop_service, disease_service, soil_service          │
│  database/        SQLite + SQLAlchemy (Scans, Crops, Diseases)         │
│  uploads/         Static asset storage for scan & remote sensing imgs  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧠 7. AI Model Architecture (ACRNN)

The **Attentive Convolutional Recurrent Neural Network (ACRNN)** pipeline operates through the following stages:

```
INPUT IMAGE (224x224x3)
      │
      ▼
IMAGE PREPROCESSING (OpenCV blur/dark validation, bilinear resize, [0, 1] normalization)
      │
      ▼
TRANSFER LEARNING BACKBONE (MobileNetV2 frozen feature extractor)
      │
      ▼
CONVOLUTIONAL REFINEMENT (Conv2D 256 filters, 3x3, ReLU + BatchNorm)
      │
      ▼
SPATIAL ATTENTION MECHANISM (Channel pooling + 7x7 Sigmoid spatial weight mask)
      │
      ▼
RECURRENT / CONTEXTUAL PROCESSING (Reshape to 49 spatial steps + Bidirectional GRU 128 units)
      │
      ▼
DENSE PROJECTION & DROPOUT (256 units, 40% Dropout, BatchNorm)
      │
      ▼
SOFTMAX CLASSIFICATION (41 output nodes: 38 PlantVillage + extensions)
      │
      ▼
CROP HEALTH RESULT (Crop, Disease, Confidence %, Severity, Recommendations)
```

### Saliency via Spatial Attention
The attention mechanism applies spatial pooling across the feature tensor:
$$\mathbf{M}_s(\mathbf{F}) = \sigma\left(f^{7\times 7}\left(\left[\text{AvgPool}(\mathbf{F}); \text{MaxPool}(\mathbf{F})\right]\right)\right)$$
This forces the model to weigh necrotic spots and lesion borders far higher than background leaf tissue or camera artifacts.

---

## 📊 8. Dataset Information

1. **PlantVillage Dataset**:
   - 54,303 curated leaf images across 14 crop species (Tomato, Potato, Corn, Rice, Bell Pepper, Apple, Grape, Peach, Strawberry, Cherry, Blueberry, Raspberry, Soybean, Squash) and 38 classes.
2. **Copernicus Sentinel-2 MSI Imagery**:
   - 10m spatial resolution imagery utilizing Band 4 (Red, 665nm) and Band 8 (NIR, 842nm) for macro vegetation coverage monitoring.
3. **Drone / UAV Aerial Orthomosaics**:
   - Millimeter-to-centimeter resolution aerial surveys for micro-plot canopy stress mapping.

---

## 💻 9. Technology Stack

- **Backend**: Python 3.12, FastAPI, Uvicorn, SQLAlchemy ORM, SQLite, OpenCV (`opencv-python-headless`), TensorFlow 2.16+, Scikit-learn, NumPy.
- **Frontend**: React 18, React Router 6, Vite, Tailwind CSS, Lucide React icons.
- **Protocols & Formats**: RESTful JSON API, WebRTC `getUserMedia`, multipart/form-data.

---

## 🛠️ 10. Installation & Setup

### Prerequisites
- Python 3.10+ (Python 3.12 verified)
- Node.js 18+ (Node 24 verified) and npm

### Backend Setup
1. Open a terminal in the project root:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   # Windows PowerShell:
   .\venv\Scripts\Activate.ps1
   # Linux / macOS:
   source venv/bin/activate
   ```
3. Install backend requirements:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *The backend will be running at `http://127.0.0.1:8000` with interactive Swagger docs at `http://127.0.0.1:8000/docs`.*

### Frontend Setup
1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will launch at `http://127.0.0.1:5173`.*

---

## 📷 11. Camera Permissions & Mobile Optimization

- **HTTPS / Localhost Requirement**: Modern browsers restrict camera access (`navigator.mediaDevices.getUserMedia()`) to secure contexts (`https://` or `http://localhost` / `http://127.0.0.1`).
- **Camera Access Dialog**: When navigating to `/scanner`, your browser will prompt for camera access. Click **Allow**.
- **Camera Flipping**: Use the camera toggle button to cycle between front (selfie) and rear (environment) cameras on mobile devices.
- **Graceful Fallback**: If no camera is detected or permission is denied, the scanner displays an informative banner and allows 1-click switching to the **Upload Image** tab.

---

## 🤖 12. Model Setup & Demo Mode

- **Out-of-the-Box Demo Mode**: If no pre-trained weights file is supplied, the system operates in **Demo / Development Mode**. It employs an intelligent OpenCV color and lesion feature classifier across 38 PlantVillage classes, accompanied by a clear disclosure banner.
- **Loading Production Weights**:
  1. Train or download your ACRNN model weights.
  2. Save the weights file to: `backend/models/acrnn_weights.h5`.
  3. Restart the backend server. The system will detect the weights file and switch to **Production ACRNN Mode**.

---

## 📡 13. API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and active AI model mode |
| `POST` | `/api/predict` | Uploads leaf image, runs ACRNN inference, saves scan |
| `POST` | `/api/preprocess` | OpenCV validation and blur/dark check |
| `POST` | `/api/remote-sensing` | Sentinel-2 / Drone UAV VARI spectral analysis |
| `GET` | `/api/history` | Retrieves stored scans ordered by newest first |
| `GET` | `/api/history/{id}` | Retrieves full record and recommendations of a scan |
| `DELETE`| `/api/history/{id}` | Deletes a specific scan record |
| `DELETE`| `/api/history` | Clears all history from SQLite |
| `GET` | `/api/model-info` | Returns ACRNN architecture specs and pipeline stages |
| `POST` | `/api/soil-analysis` | Mode 1 (crop targets) or Mode 2 (lab parameters) |
| `GET` | `/api/crops` | Catalog of all agronomic crop profiles |
| `GET` | `/api/crops/{name}` | Profile and growing parameters for a crop |
| `GET` | `/api/diseases/{name}` | Disease profiles and pathogens for a crop |

---

## 🧪 14. Automated Verification

To run the automated API verification test suite:
```bash
python test_backend_api.py
```
This runs 15 automated test assertions covering endpoints, OpenCV preprocessing, prediction heuristics, remote sensing, database storage, low-confidence blur handling, and invalid file rejection.

To verify frontend compilation:
```bash
cd frontend
npm run build
```

---

## 🚀 15. Future Scope

- **Edge Deployment**: Quantization to TensorFlow Lite (TFLite INT8) for offline mobile field scanning without cellular connectivity.
- **IoT Telemetry**: Direct streaming integration with wireless soil moisture and NPK probes.
- **Multispectral GeoTIFF Support**: Ingestion of raw 16-bit GeoTIFF imagery from Sentinel-2 Hub and DJI Terra UAV cameras.
- **Autonomous Drone Missions**: Generating KML/Waypoints for UAV flight missions based on satellite vegetation stress alerts.

---

## 📄 License
Academic & Educational Production System — Smart Crop Health & Disease Detection System.
