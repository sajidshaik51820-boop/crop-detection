import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  Compass, 
  ArrowRight,
  Sprout,
  Layers,
  Thermometer,
  Wind
} from 'lucide-react';
import BackButton from '../components/BackButton';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { useCropAnalysis } from '../context/CropAnalysisContext';

export default function Health() {
  const navigate = useNavigate();
  const { analysisResult } = useCropAnalysis();

  if (!analysisResult) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <BackButton defaultTo="/scanner" label="Scanner" className="mb-6" />
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">No Active Report</h2>
          <p className="text-xs text-slate-400 mb-6">
            Please analyze a crop image first before viewing the detailed health diagnosis.
          </p>
          <button
            onClick={() => navigate('/scanner')}
            className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            Go to Crop Scanner
          </button>
        </div>
      </div>
    );
  }

  const isHealthy = analysisResult.health_status === 'Healthy';
  const diseaseInfo = analysisResult.disease_info || {};
  const symptoms = analysisResult.symptoms || [];
  const precautions = analysisResult.precautions || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header with Back button pointing to /analysis */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <BackButton defaultTo="/analysis" label="Analysis" />
        <div className="text-right">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">CROP HEALTH REPORT</h1>
          <p className="text-xs text-slate-400">Pathology breakdown, etiologies & agronomic precautions</p>
        </div>
      </div>

      <DisclaimerBanner 
        isDemoMode={analysisResult.is_demo_mode} 
        isLowConfidence={analysisResult.is_low_confidence}
        warningMessage={analysisResult.confidence_warning}
      />

      {/* Top Banner Overview */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase block mb-1">
              Specimen Profile
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {analysisResult.crop} <span className="text-base font-normal text-slate-400 font-mono">({analysisResult.crop_category})</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Health Condition</span>
              <span className={`text-base font-bold ${isHealthy ? 'text-emerald-400' : 'text-rose-400'}`}>
                {analysisResult.health_status}
              </span>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isHealthy ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400' : 'bg-rose-950/80 border border-rose-500/40 text-rose-400'
            }`}>
              {isHealthy ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
            </div>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Diagnosis</span>
            <span className="text-sm font-bold text-white block truncate">{analysisResult.disease}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Confidence Score</span>
            <span className="text-sm font-mono font-bold text-emerald-400">{analysisResult.confidence}%</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Severity Category</span>
            <span className="text-sm font-bold text-amber-300">{analysisResult.severity || 'N/A'}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 block mb-1">Lesion Area Ratio</span>
            <span className="text-sm font-mono text-slate-200">
              {analysisResult.lesion_coverage_percent ? `${analysisResult.lesion_coverage_percent}%` : 'Minimal / 0%'}
            </span>
          </div>
        </div>
      </div>

      {/* Symptoms Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          Detected Symptoms & Visual Observations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {symptoms.map((symptom, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{symptom}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disease Etiology and Spread Information */}
      <div className="mb-8 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-teal-400" />
          Pathology & Disease Dynamics
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Pathogen / Etiological Agent</h3>
            <p className="text-sm text-white font-mono bg-slate-950/80 px-3 py-2 rounded-lg border border-slate-800 inline-block">
              {diseaseInfo.pathogen || 'N/A'}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Disease Explanation</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {diseaseInfo.explanation || 'No extended pathology narrative available.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Common Causes & Inoculum
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {diseaseInfo.common_causes || 'Survival on crop residue, windborne spores, or infected nursery stock.'}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                Favorable Environmental Triggers
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {diseaseInfo.conditions || 'Prolonged leaf wetness, warm or humid micro-climates, and poor canopy airflow.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-cyan-400" />
                Dispersal & Spread Mechanism
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {diseaseInfo.spread_info || 'Airborne sporangia, splashing rainfall droplets, or contaminated pruning implements.'}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Foliar & Yield Impact
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {diseaseInfo.effect_on_crop || 'Chlorotic reduction, impaired carbon assimilation, and risk of fruit infection.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Precautions and Field Management Checklist */}
      <div className="mb-8 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Field Management, Hygiene & Precautions
        </h2>

        <div className="space-y-3 mb-6">
          {precautions.map((precaution, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{precaution}</span>
            </div>
          ))}
        </div>

        {/* Safety Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300">Agricultural Safety Directive:</strong> Do not apply unverified chemical fungicides or high-potency pesticides without consulting a certified agricultural extension officer or licensed crop agronomist. Always observe localized pesticide regulations and pre-harvest intervals.
          </p>
        </div>
      </div>

      {/* Navigation Buttons to Growth, Soil and Back to Analysis */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <BackButton defaultTo="/analysis" label="Back to Analysis" />

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/growth')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-md active:scale-95"
          >
            <Sprout className="w-4 h-4" />
            <span>Growth Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => navigate('/soil')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-all shadow-md active:scale-95"
          >
            <Layers className="w-4 h-4" />
            <span>Soil Information</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
