import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Satellite, 
  Plane, 
  UploadCloud, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Info, 
  ArrowRight,
  Loader2,
  Layers
} from 'lucide-react';
import BackButton from '../components/BackButton';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { analyzeRemoteSensing, getFullImageUrl } from '../services/api';

export default function RemoteSensing() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [sourceType, setSourceType] = useState('drone'); // 'drone' or 'satellite'
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [remoteResult, setRemoteResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setRemoteResult(null);
      setErrorMessage(null);
    }
  };

  const handleRunAnalysis = async () => {
    if (!selectedFile) {
      setErrorMessage('Please upload a satellite or drone image first.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const result = await analyzeRemoteSensing(selectedFile, sourceType);
      setRemoteResult(result);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to process remote sensing imagery.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <BackButton defaultTo="/" label="Home" />
        <div className="text-right">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">REMOTE SENSING ANALYSIS</h1>
          <p className="text-xs text-slate-400">Sentinel-2 MSI & Drone UAV Vegetation Index Mapping</p>
        </div>
      </div>

      {/* Prominent Scientific Notice */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/30 text-teal-200/90 text-xs sm:text-sm flex items-start gap-3 mb-8 shadow-md">
        <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-teal-300 font-semibold block mb-0.5">Multispectral vs. RGB Vegetation Analysis:</strong>
          True satellite NDVI requires Sentinel-2 Level-2A surface reflectance with Band 4 (Red, 665nm) and Band 8 (Near-Infrared, 842nm).
          When analyzing standard RGB images, the engine computes the calibrated <strong>Visible Atmospherically Resistant Index (VARI)</strong>:
          <span className="font-mono bg-slate-950 px-2 py-0.5 rounded text-white ml-1">VARI = (G - R) / (G + R - B)</span>.
        </div>
      </div>

      {/* Sensor Selection Tabs */}
      <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 mb-8">
        <button
          onClick={() => {
            setSourceType('satellite');
            setRemoteResult(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            sourceType === 'satellite'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Satellite className="w-4 h-4" />
          <span>Sentinel-2 Satellite Image</span>
        </button>

        <button
          onClick={() => {
            setSourceType('drone');
            setRemoteResult(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            sourceType === 'drone'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Plane className="w-4 h-4" />
          <span>Drone / UAV Canopy Image</span>
        </button>
      </div>

      {/* Upload Dropzone and Actions */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl mb-8">
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-600/40 text-rose-200 text-xs sm:text-sm mb-6 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Dropzone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="md:col-span-7 border-2 border-dashed border-slate-700 hover:border-teal-400 rounded-2xl p-8 bg-slate-950/40 hover:bg-slate-950/60 cursor-pointer transition-all flex flex-col items-center justify-center text-center group"
          >
            {imagePreview ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700">
                <img src={imagePreview} alt="Remote Sensing Input" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-slate-900/80 text-[10px] font-mono text-emerald-400">
                  {sourceType.toUpperCase()} Imagery
                </div>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  Upload {sourceType === 'satellite' ? 'Sentinel-2 Tile' : 'Drone UAV Orthomosaic'}
                </h3>
                <p className="text-xs text-slate-400 mb-3">JPG, PNG, WEBP (Max 15MB)</p>
                <span className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold group-hover:bg-slate-700">
                  Choose File
                </span>
              </>
            )}
          </div>

          {/* Action Trigger */}
          <div className="md:col-span-5 flex flex-col justify-between h-full space-y-4">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider block mb-1">
                Sensor Configuration
              </span>
              <h4 className="text-base font-bold text-white mb-2">
                {sourceType === 'satellite' ? 'Copernicus Sentinel-2' : 'Aerial UAV Orthomosaic'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Executes spatial spectral band variance, separates vegetative canopy from bare soil, and maps localized chlorosis or water stress.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleRunAnalysis}
                disabled={isProcessing || !selectedFile}
                className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Processing Spectral Indices...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Analyze Remote Image</span>
                  </>
                )}
              </button>

              {imagePreview && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  Choose Different Image
                </button>
              )}
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* --- ANALYSIS RESULTS DISPLAY --- */}
      {remoteResult && (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary Metric Header */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-mono text-teal-400 tracking-wider uppercase block mb-1">
                  Vegetation Health Assessment
                </span>
                <div className="text-xl sm:text-2xl font-bold text-white">
                  {remoteResult.field_health_summary}
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                {remoteResult.source_type} Platform
              </span>
            </div>

            {/* Indices Triplets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Mean VARI Score</span>
                <span className="text-xl font-mono font-bold text-teal-400">
                  {remoteResult.vegetation_indices.vari_score}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">[-1.0 to +1.0 scale]</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Estimated NDVI Equivalent</span>
                <span className="text-xl font-mono font-bold text-emerald-400">
                  {remoteResult.vegetation_indices.simulated_ndvi_equivalent}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">[Simulated Biomass Index]</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Estimated Canopy Cover</span>
                <span className="text-xl font-mono font-bold text-cyan-400">
                  {remoteResult.vegetation_indices.canopy_coverage_percent}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">[Photosynthetic Fraction]</span>
              </div>
            </div>

            {/* Zonal Breakdown Bars */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Canopy Zonal Vigor Breakdown
              </h4>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>High Vigor Canopy (Healthy Chlorophyll)</span>
                  <span className="font-mono text-emerald-400">{remoteResult.zonal_breakdown.high_vigor_canopy_percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${remoteResult.zonal_breakdown.high_vigor_canopy_percent}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Moderate Canopy (Normal Growth)</span>
                  <span className="font-mono text-teal-400">{remoteResult.zonal_breakdown.moderate_canopy_percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${remoteResult.zonal_breakdown.moderate_canopy_percent}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Potential Stressed or Bare Soil Zones</span>
                  <span className="font-mono text-rose-400">{remoteResult.zonal_breakdown.stressed_or_bare_soil_percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${remoteResult.zonal_breakdown.stressed_or_bare_soil_percent}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Observations & Scientific Guidance */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Agronomic Action Recommendations
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 mb-6">
              {remoteResult.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-400 text-xs leading-relaxed">
              <strong>Sensor Distinction Note:</strong> {remoteResult.scientific_distinction}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
