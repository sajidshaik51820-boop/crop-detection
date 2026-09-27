# Datasets Documentation

The Smart Crop Health & Disease Detection System is designed around three primary agricultural datasets:

## 1. PlantVillage Dataset
- **Domain**: High-resolution leaf-level crop disease pathology.
- **Scale**: ~54,303 RGB photographs spanning 14 agricultural crop species and 38 distinct disease/healthy classifications.
- **Key Crops**: Tomato, Potato, Corn (Maize), Rice, Bell Pepper, Apple, Grape, Peach, Strawberry, Cherry, Blueberry, Raspberry, Soybean, Squash.
- **Usage**: Used to train the Attentive Convolutional Recurrent Neural Network (ACRNN) for focal lesion identification, chlorosis detection, and disease classification.
- **Link/Source**: [PlantVillage on Papers With Code / Kaggle](https://www.kaggle.com/datasets/emmarex/plantdisease)

## 2. Sentinel-2 Satellite Imagery (Copernicus)
- **Domain**: Regional and macro-field multispectral vegetation monitoring.
- **Spectral Bands**:
  - Band 4: Red (665 nm) — Chlorophyll absorption
  - Band 8: Near-Infrared / NIR (842 nm) — Mesophyll cell reflectance
  - Band 8A: Narrow NIR (865 nm)
- **Vegetation Indices**:
  - Normalized Difference Vegetation Index: `NDVI = (NIR - Red) / (NIR + Red)`
  - Visible Atmospherically Resistant Index: `VARI = (Green - Red) / (Green + Red - Blue)` (used when analyzing visible-spectrum RGB imagery)
- **Spatial Resolution**: 10m to 20m ground sampling distance, 5-day global revisit rate.

## 3. Drone / UAV High-Resolution Imagery
- **Domain**: Micro-plot and individual plant canopy stress mapping.
- **Sensors**: Multispectral (Red, Green, Blue, RedEdge, NIR) and Ultra-HD RGB camera payloads.
- **Usage**: Early stress zone detection, localized irrigation failure diagnostics, weed canopy mapping, and high-precision spatial heatmaps.

---
### Setup & Custom Weights
To integrate custom trained model weights:
1. Place your trained Keras HDF5 weights file at `backend/models/acrnn_weights.h5`.
2. The backend will automatically detect the file at startup and switch from `Demo / Development Mode` to `Production ACRNN Mode`.
