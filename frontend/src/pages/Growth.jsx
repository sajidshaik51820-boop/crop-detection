import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  Sun, 
  Thermometer, 
  Droplets, 
  Layers, 
  Scissors, 
  Bug, 
  Calendar, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import BackButton from '../components/BackButton';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { useCropAnalysis } from '../context/CropAnalysisContext';
import { getAllCrops } from '../services/api';

export default function Growth() {
  const navigate = useNavigate();
  const { analysisResult } = useCropAnalysis();

  const [cropsList, setCropsList] = useState([]);
  const [selectedCropName, setSelectedCropName] = useState(
    analysisResult?.crop || 'Tomato'
  );

  useEffect(() => {
    getAllCrops()
      .then((data) => setCropsList(data))
      .catch((err) => console.warn('Could not load crops list:', err));
  }, []);

  // Use either active scan's growth recommendations or fallback to active crop selection
  const growthData = analysisResult?.growth_recommendations || {};
  const cropCategory = analysisResult?.crop_category || 'Vegetable Solanaceae';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header with Back button pointing to /analysis */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <BackButton defaultTo="/analysis" label="Analysis" />
        <div className="text-right">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">CROP GROWTH GUIDE</h1>
          <p className="text-xs text-slate-400">Agronomic parameters, irrigation, and physiological cycles</p>
        </div>
      </div>

      <DisclaimerBanner />

      {/* Crop Selector & Overview Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-teal-400 tracking-wider uppercase block mb-1">
              Cultivated Crop Target
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <span>{analysisResult?.crop || selectedCropName}</span>
              <span className="text-xs font-normal text-slate-400 font-mono">({cropCategory})</span>
            </div>
          </div>

          {/* Quick Crop Switcher */}
          {cropsList.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Browse other crops:</span>
              <select
                value={selectedCropName}
                onChange={(e) => setSelectedCropName(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-medium focus:ring-1 focus:ring-teal-400 focus:outline-none"
              >
                {cropsList.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Environmental Requirements Triplets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Sunlight Exposure</span>
              <span className="text-xs sm:text-sm font-semibold text-white leading-snug">
                {growthData.sunlight || 'Full direct sunlight (6-8 hours daily)'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0">
              <Thermometer className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Optimal Temperature</span>
              <span className="text-xs sm:text-sm font-semibold text-white leading-snug">
                {growthData.optimal_temp || '20°C - 28°C'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Optimal Humidity</span>
              <span className="text-xs sm:text-sm font-semibold text-white leading-snug">
                {growthData.optimal_humidity || '60% - 75%'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Water & Irrigation Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Droplets className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Water Requirements & Irrigation</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {growthData.water_needs || 'Moderate and consistent irrigation avoiding leaf canopy wetting.'}
          </p>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-cyan-300/90 leading-relaxed">
            <strong>Agronomic Best Practice:</strong> Utilize sub-canopy drip lines to maintain uniform root-zone moisture while preserving dry foliage, suppressing spore germination.
          </div>
        </div>

        {/* Nutrient Management */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Nutrient & Fertilizer Management</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            {growthData.nutrient_management || 'Balanced NPK ratio with micronutrient replenishment based on localized soil test results.'}
          </p>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-emerald-300/90 leading-relaxed">
            <strong>Balanced Feeding:</strong> Refrain from over-applying nitrogen past the vegetative threshold; excessive leaf succulence exacerbates foliar blights.
          </div>
        </div>
      </div>

      {/* Weed & Pest Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Scissors className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Weed Management</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {growthData.weed_management || 'Integrated weed management combining organic mulching and early mechanical cultivation.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Bug className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white">Pest Monitoring</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {growthData.pest_monitoring || 'Conduct routine bi-weekly leaf underside scouting for vector insects (aphids, mites, whiteflies).'}
          </p>
        </div>
      </div>

      {/* Growth Stages & Harvesting */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Calendar className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white">Physiological Growth Stages</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {(growthData.growth_stages || ['Germination', 'Vegetative', 'Flowering', 'Maturity']).map((stage, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-mono text-teal-400 block mb-1">Stage 0{idx + 1}</span>
              <span className="text-xs sm:text-sm font-semibold text-white">{stage}</span>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-800 flex items-start gap-3">
          <ShoppingBag className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
              Harvest Considerations
            </span>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {growthData.harvest_info || 'Harvest during morning hours at optimum physiological maturity index for maximum storage stability.'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <BackButton defaultTo="/analysis" label="Back to Analysis" />

        <button
          onClick={() => navigate('/soil')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md active:scale-95"
        >
          <Layers className="w-4 h-4" />
          <span>Proceed to Soil Information</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
