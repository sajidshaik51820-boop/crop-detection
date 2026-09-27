import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Camera, 
  UploadCloud, 
  RotateCcw, 
  FlipHorizontal, 
  Sparkles, 
  AlertCircle, 
  Check, 
  Loader2,
  Image as ImageIcon
} from 'lucide-react';
import BackButton from '../components/BackButton';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { useCropAnalysis } from '../context/CropAnalysisContext';
import { predictCrop } from '../services/api';

export default function Scanner() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'upload' ? 'upload' : 'camera';

  const [activeTab, setActiveTab] = useState(initialMode); // 'camera' or 'upload'
  const [cameraStream, setCameraStream] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' (rear) or 'user' (front)
  const [cameraError, setCameraError] = useState(null);
  const [isCameraLoading, setIsCameraLoading] = useState(false);

  // Captured / Selected image state
  const [capturedImage, setCapturedImage] = useState(null); // dataUrl / blob url
  const [imageFileBlob, setImageFileBlob] = useState(null); // File or Blob for FormData
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiError, setApiError] = useState(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const { updateScan } = useCropAnalysis();

  // Initialize camera when in camera tab and not already showing a captured preview
  useEffect(() => {
    if (activeTab === 'camera' && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [activeTab, facingMode, capturedImage]);

  const startCamera = async () => {
    setIsCameraLoading(true);
    setCameraError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access API is not supported in this browser. Please use the Upload Image tab.');
      }

      const constraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.warn('Camera error:', err);
      let msg = 'Could not access device camera.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Camera permission was denied. Please enable camera access in your browser settings or use the Upload Image tab.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = 'No camera device found on this system. Please switch to the Upload tab.';
      } else if (err.name === 'NotReadableError') {
        msg = 'Camera is currently in use by another application.';
      }
      setCameraError(msg);
    } finally {
      setIsCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    
    // Create an offscreen canvas
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setCapturedImage(url);
        setImageFileBlob(blob);
        stopCamera();
      }
    }, 'image/jpeg', 0.92);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setImageFileBlob(null);
    setApiError(null);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setApiError('File is too large (> 15MB). Please choose an image under 15MB.');
      return;
    }

    const url = URL.createObjectURL(file);
    setCapturedImage(url);
    setImageFileBlob(file);
    setApiError(null);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  const handleAnalyze = async () => {
    if (!imageFileBlob) {
      setApiError('Please capture or select an image before analyzing.');
      return;
    }

    setIsAnalyzing(true);
    setApiError(null);

    try {
      const result = await predictCrop(imageFileBlob);
      // Update global context with preview URL and result
      updateScan(capturedImage, imageFileBlob, result);
      // Navigate to /analysis automatically
      navigate('/analysis');
    } catch (err) {
      setApiError(err.message || 'Failed to analyze crop image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <BackButton defaultTo="/" label="Home" />
        <div className="text-right">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Crop Scanner</h1>
          <p className="text-xs text-slate-400">Position affected leaf within targeting viewfinder</p>
        </div>
      </div>

      <DisclaimerBanner />

      {/* Mode Switcher Tabs */}
      <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 mb-6">
        <button
          onClick={() => {
            setActiveTab('camera');
            setCapturedImage(null);
            setImageFileBlob(null);
            setApiError(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'camera'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Live Camera Preview</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('upload');
            setCapturedImage(null);
            setImageFileBlob(null);
            setApiError(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'upload'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Scanner Viewport Container */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl min-h-[380px] sm:min-h-[460px] flex flex-col justify-center items-center">
        
        {/* Error Notification */}
        {apiError && (
          <div className="absolute top-4 left-4 right-4 z-20 flex items-start gap-2 p-3.5 rounded-xl bg-rose-950/90 border border-rose-600/50 text-rose-200 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">{apiError}</div>
          </div>
        )}

        {/* --- 1. CAPTURED / SELECTED IMAGE PREVIEW --- */}
        {capturedImage ? (
          <div className="w-full flex flex-col items-center p-4 sm:p-6">
            <div className="relative max-w-md w-full rounded-xl overflow-hidden border-2 border-emerald-500/40 shadow-xl bg-slate-950">
              <img
                src={capturedImage}
                alt="Captured Crop"
                className="w-full h-72 sm:h-96 object-contain bg-slate-950"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-emerald-400 text-xs font-mono border border-slate-700">
                Ready for Analysis
              </div>
            </div>

            {/* Action Buttons for Preview */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 w-full max-w-md">
              <button
                onClick={handleRetake}
                disabled={isAnalyzing}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all active:scale-95 disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{activeTab === 'camera' ? 'Retake Photo' : 'Choose Another'}</span>
              </button>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Analyzing Crop...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Analyze Crop</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : activeTab === 'camera' ? (
          /* --- 2. LIVE CAMERA VIEWPORT --- */
          <div className="relative w-full h-[400px] sm:h-[480px] bg-black flex items-center justify-center overflow-hidden">
            {cameraError ? (
              <div className="p-6 text-center max-w-md">
                <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-2">Camera Unavailable</h3>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">{cameraError}</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white"
                  >
                    Retry Camera
                  </button>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    Switch to Upload
                  </button>
                </div>
              </div>
            ) : isCameraLoading ? (
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                <span className="text-xs">Initializing camera feed...</span>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Viewfinder Target Overlays */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 border-2 border-emerald-400/40 rounded-3xl animate-pulse-glow">
                    {/* Corner Reticles */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl -mt-1 -ml-1" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl -mt-1 -mr-1" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl -mb-1 -ml-1" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-xl -mb-1 -mr-1" />
                    
                    <div className="absolute inset-x-0 bottom-3 text-center">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-medium text-emerald-300 border border-emerald-500/30">
                        Center Affected Leaf Area
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Camera Controls */}
                <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-6 px-4">
                  <button
                    onClick={toggleFacingMode}
                    className="p-3.5 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 hover:text-white border border-slate-700/80 hover:bg-slate-800 transition-all active:scale-95"
                    title="Switch Camera (Front/Rear)"
                  >
                    <FlipHorizontal className="w-5 h-5 text-emerald-400" />
                  </button>

                  <button
                    onClick={handleCapturePhoto}
                    className="p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/40 transform active:scale-90 transition-all"
                    title="Capture Crop Photo"
                  >
                    <Camera className="w-7 h-7 font-bold" />
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3.5 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 hover:text-white border border-slate-700/80 hover:bg-slate-800 transition-all active:scale-95"
                    title="Upload File Instead"
                  >
                    <UploadCloud className="w-5 h-5 text-teal-400" />
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          /* --- 3. UPLOAD FILE DROPZONE --- */
          <div className="w-full p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-lg p-10 border-2 border-dashed border-slate-700 hover:border-teal-400/80 rounded-2xl bg-slate-950/40 hover:bg-slate-800/40 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Click to select a crop photo</h3>
              <p className="text-xs text-slate-400 mb-4">Supports JPEG, JPG, PNG, WEBP (Max 15MB)</p>
              <span className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors">
                Browse Files
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
