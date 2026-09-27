import React, { createContext, useContext, useState, useEffect } from 'react';

const CropAnalysisContext = createContext(null);

export function CropAnalysisProvider({ children }) {
  const [currentImage, setCurrentImage] = useState(() => {
    return sessionStorage.getItem('agy_crop_image') || null;
  });
  
  const [currentImageBlob, setCurrentImageBlob] = useState(null);

  const [analysisResult, setAnalysisResult] = useState(() => {
    try {
      const saved = sessionStorage.getItem('agy_crop_analysis');
      return saved ? JSON.parse(saved) : null;
    } catch (_) {
      return null;
    }
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  // Sync with session storage so back/forward and reloads persist within the session
  useEffect(() => {
    if (analysisResult) {
      try {
        sessionStorage.setItem('agy_crop_analysis', JSON.stringify(analysisResult));
      } catch (_) {}
    } else {
      sessionStorage.removeItem('agy_crop_analysis');
    }
  }, [analysisResult]);

  useEffect(() => {
    if (currentImage && typeof currentImage === 'string' && !currentImage.startsWith('blob:')) {
      try {
        sessionStorage.setItem('agy_crop_image', currentImage);
      } catch (_) {}
    }
  }, [currentImage]);

  const updateScan = (imagePreviewUrl, imageBlob, result) => {
    setCurrentImage(imagePreviewUrl);
    setCurrentImageBlob(imageBlob);
    setAnalysisResult(result);
    setAnalysisError(null);
  };

  const loadScanRecord = (record) => {
    setCurrentImage(record.image_url);
    setAnalysisResult(record);
    setAnalysisError(null);
  };

  const clearScan = () => {
    setCurrentImage(null);
    setCurrentImageBlob(null);
    setAnalysisResult(null);
    setAnalysisError(null);
    sessionStorage.removeItem('agy_crop_image');
    sessionStorage.removeItem('agy_crop_analysis');
  };

  return (
    <CropAnalysisContext.Provider
      value={{
        currentImage,
        currentImageBlob,
        analysisResult,
        isAnalyzing,
        analysisError,
        setCurrentImage,
        setCurrentImageBlob,
        setAnalysisResult,
        setIsAnalyzing,
        setAnalysisError,
        updateScan,
        loadScanRecord,
        clearScan
      }}
    >
      {children}
    </CropAnalysisContext.Provider>
  );
}

export function useCropAnalysis() {
  const context = useContext(CropAnalysisContext);
  if (!context) {
    throw new Error('useCropAnalysis must be used within a CropAnalysisProvider');
  }
  return context;
}
