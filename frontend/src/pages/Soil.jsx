import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Droplet, 
  FlaskConical, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Upload, 
  FileSpreadsheet,
  Info,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import BackButton from '../components/BackButton';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { useCropAnalysis } from '../context/CropAnalysisContext';
import { analyzeSoil } from '../services/api';

export default function Soil() {
  const navigate = useNavigate();
  const { analysisResult } = useCropAnalysis();

  const detectedCrop = analysisResult?.crop || 'Tomato';
  const soilRecommendations = analysisResult?.soil_recommendations || {};

  const [activeMode, setActiveMode] = useState('mode1'); // 'mode1' (Crop-Based) or 'mode2' (User Lab Data)

  // Mode 2 Form state
  const [formData, setFormData] = useState({
    soil_type: 'Loam',
    ph: '',
    moisture: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
  });

  const [soilImage, setSoilImage] = useState(null);
  const [labAnalysisResult, setLabAnalysisResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSoilImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSoilImage(URL.createObjectURL(file));
    }
  };

  const handleRunSoilDiagnostic = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const payload = {
        crop_name: detectedCrop,
        soil_type: formData.soil_type,
        ph: formData.ph ? parseFloat(formData.ph) : null,
        moisture: formData.moisture ? parseFloat(formData.moisture) : null,
        nitrogen: formData.nitrogen ? parseFloat(formData.nitrogen) : null,
        phosphorus: formData.phosphorus ? parseFloat(formData.phosphorus) : null,
        potassium: formData.potassium ? parseFloat(formData.potassium) : null,
      };

      const result = await analyzeSoil(payload);
      setLabAnalysisResult(result);
    } catch (err) {
      setFormError(err.message || 'Failed to analyze soil parameters.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header with Back button pointing to /analysis */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <BackButton defaultTo="/analysis" label="Analysis" />
        <div className="text-right">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">SOIL INFORMATION</h1>
          <p className="text-xs text-slate-400">Edaphic targets, drainage profile & laboratory parameter validation</p>
        </div>
      </div>

      {/* Prominent Scientific Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 text-amber-200/90 text-xs sm:text-sm flex items-start gap-3 mb-6 shadow-md">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-semibold block mb-0.5">Scientific Principle & Limitation Notice:</strong>
          A standard RGB crop leaf or foliage photograph cannot measure soil pH, NPK concentration, or microbiological composition.
          Mode 1 displays agronomically established ideal conditions for <span className="underline font-bold text-white">{detectedCrop}</span>.
          Mode 2 allows you to input verified soil lab testing data for computerized agronomic evaluation.
        </div>
      </div>

      {/* Mode Switcher Buttons */}
      <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 mb-8">
        <button
          onClick={() => setActiveMode('mode1')}
          className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeMode === 'mode1'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          MODE 1: Crop-Based Soil Recommendation
        </button>

        <button
          onClick={() => setActiveMode('mode2')}
          className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeMode === 'mode2'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          MODE 2: Optional Soil Lab Data & Diagnostic
        </button>
      </div>

      {/* --- MODE 1: CROP-BASED SOIL RECOMMENDATIONS --- */}
      {activeMode === 'mode1' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase block mb-1">
                  Targeted Crop
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  {detectedCrop}
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                Recommended soil conditions for this crop
              </span>
            </div>

            {/* Grid of Recommended Soil Attributes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Recommended Soil Type</span>
                <div className="text-sm sm:text-base font-bold text-white mb-2">
                  {soilRecommendations.soil_type || 'Deep, well-draining loamy or sandy loam'}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Provides balanced water retention capacity alongside adequate capillary root aeration.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Soil Texture & Tilth</span>
                <div className="text-sm sm:text-base font-bold text-white mb-2">
                  {soilRecommendations.soil_texture || 'Medium loam with low bulk compaction'}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Allows uninterrupted taproot and lateral fibrous root exploration without crusting.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Drainage Requirement</span>
                <div className="text-sm sm:text-base font-bold text-white mb-2">
                  {soilRecommendations.drainage || 'Well-drained; standing water causes root hypoxia'}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Excess stagnant moisture for over 24 hours induces rapid root rot and promotes Pythium pathogens.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">General pH Suitability</span>
                <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono mb-2">
                  pH {soilRecommendations.ph_range || '6.0 - 6.8'}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Target pH optimizes phosphorus bioavailability and prevents manganese toxicity.
                </p>
              </div>
            </div>

            {/* Organic Matter & Warnings */}
            <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Organic Matter Guidance
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Target 3% - 5% organic matter content. Incorporate well-rotted farmyard manure, vermicompost, or mature green cover crops prior to transplantation.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Edaphic Warning Signs
                </h3>
                <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Soil surface crusting prevents seedling emergence.</li>
                  <li>Persistent puddling indicates hardpan compaction.</li>
                  <li>White salt efflorescence marks irrigation salinity buildup.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODE 2: USER LAB DATA ENTRY --- */}
      {activeMode === 'mode2' && (
        <div className="space-y-8">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              Enter Soil Test Measurements
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Enter your laboratory test values for {detectedCrop} to calculate deficiency risks and soil balancing recommendations.
            </p>

            <form onSubmit={handleRunSoilDiagnostic} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Soil Type</label>
                  <select
                    name="soil_type"
                    value={formData.soil_type}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="Loam">Loam</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Clay">Clay</option>
                    <option value="Clay Loam">Clay Loam</option>
                    <option value="Silt Loam">Silt Loam</option>
                    <option value="Sandy">Sandy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Soil pH (e.g. 6.4)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="3.0"
                    max="11.0"
                    placeholder="e.g. 6.4"
                    name="ph"
                    value={formData.ph}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Soil Moisture (% capacity)</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    placeholder="e.g. 45"
                    name="moisture"
                    value={formData.moisture}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Available Nitrogen (N mg/kg)</label>
                  <input
                    type="number"
                    step="1"
                    placeholder="e.g. 80"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Available Phosphorus (P mg/kg)</label>
                  <input
                    type="number"
                    step="1"
                    placeholder="e.g. 35"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Available Potassium (K mg/kg)</label>
                  <input
                    type="number"
                    step="1"
                    placeholder="e.g. 140"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>

              {/* Optional Soil Image Upload */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  Optional Soil Profile Photo (Visual Reference)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSoilImageChange}
                    className="text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-emerald-400 hover:file:bg-slate-700"
                  />
                  {soilImage && (
                    <img src={soilImage} alt="Soil specimen" className="w-12 h-12 rounded-lg object-cover border border-slate-700" />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Evaluating Parameters...' : 'Run Soil Chemistry Diagnostics'}
              </button>
            </form>
          </div>

          {/* Mode 2 Results */}
          {labAnalysisResult && (
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-base font-bold text-white">Soil Diagnostic Evaluation</h3>
                  <p className="text-xs text-slate-400">Crop: {labAnalysisResult.crop}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                  {labAnalysisResult.overall_condition}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {labAnalysisResult.evaluations.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{item.parameter}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        Measured: {item.measured_value} (Optimal: {item.optimal_target})
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed mb-1">
                      <strong>Status:</strong> <span className="text-teal-400">{item.status}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Buttons to Analysis and Scanner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <BackButton defaultTo="/analysis" label="Back to Analysis" />

        <button
          onClick={() => navigate('/scanner')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all shadow-md active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-emerald-400" />
          <span>Back to Scanner</span>
        </button>
      </div>
    </div>
  );
}
