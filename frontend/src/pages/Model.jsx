import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Layers, 
  Eye, 
  Repeat, 
  Workflow, 
  CheckCircle2, 
  Database, 
  FileCode, 
  Sparkles,
  ArrowDown
} from 'lucide-react';
import BackButton from '../components/BackButton';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { getModelInfo } from '../services/api';

export default function Model() {
  const [modelData, setModelData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getModelInfo()
      .then((data) => setModelData(data))
      .catch((err) => console.warn('Could not fetch model info:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const architectureStages = [
    {
      step: '01',
      title: 'INPUT IMAGE',
      subtitle: 'RGB Leaf Specimen (224 x 224 x 3)',
      icon: Eye,
      description: 'Acquired via device WebRTC camera preview or direct file upload.',
      color: 'emerald'
    },
    {
      step: '02',
      title: 'IMAGE PREPROCESSING',
      subtitle: 'OpenCV Bilinear Resize & Quality Assessment',
      icon: Layers,
      description: 'Detects blur (Laplacian variance > 35) and darkness; normalizes pixels to [0, 1].',
      color: 'teal'
    },
    {
      step: '03',
      title: 'TRANSFER LEARNING BACKBONE',
      subtitle: 'MobileNetV2 Feature Extractor (ImageNet)',
      icon: Cpu,
      description: 'Leverages inverted residual bottlenecks to extract rich low and mid-level foliar patterns.',
      color: 'cyan'
    },
    {
      step: '04',
      title: 'CNN FEATURE EXTRACTION',
      subtitle: 'Conv2D (256 filters, 3x3) + Batch Normalization',
      icon: Workflow,
      description: 'Refines high-dimensional spatial feature representations into 256 activation channels.',
      color: 'blue'
    },
    {
      step: '05',
      title: 'SPATIAL ATTENTION MECHANISM',
      subtitle: 'Lesion Saliency & Chlorosis Focusing Layer',
      icon: Sparkles,
      description: 'Computes spatial attention weights via average/max pooling and sigmoid gating.',
      color: 'amber'
    },
    {
      step: '06',
      title: 'RECURRENT / CONTEXTUAL PROCESSING',
      subtitle: 'Bidirectional GRU (128 units, 49 steps)',
      icon: Repeat,
      description: 'Processes spatial-sequence tokens bidirectionally to capture long-range contextual relationships.',
      color: 'indigo'
    },
    {
      step: '07',
      title: 'CLASSIFICATION HEAD',
      subtitle: 'Dense Projection (256 units) + Softmax (41 classes)',
      icon: Layers,
      description: 'Applies 40% dropout regularization and projects features into normalized class probabilities.',
      color: 'violet'
    },
    {
      step: '08',
      title: 'CROP HEALTH RESULT',
      subtitle: 'Crop Identification, Disease, Confidence & Severity',
      icon: CheckCircle2,
      description: 'Generates structured JSON with agronomic precautions and growth guidelines.',
      color: 'emerald'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <BackButton defaultTo="/" label="Home" />
        <div className="text-right">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">AI MODEL ARCHITECTURE</h1>
          <p className="text-xs text-slate-400">Attentive Convolutional Recurrent Neural Network (ACRNN)</p>
        </div>
      </div>

      <DisclaimerBanner isDemoMode={!modelData?.is_real_model_loaded} />

      {/* Model Overview Banner */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
          <div>
            <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase block mb-1">
              Neural Network Topology
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              ACRNN: Transfer Learning + Attention + Bi-GRU
            </h2>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold">
            {modelData?.mode_label || 'ACRNN (Demo Mode)'}
          </div>
        </div>

        {/* Specs Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Input Resolution</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-white">224 x 224 x 3</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Backbone CNN</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-teal-400">MobileNetV2</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Sequence Engine</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-indigo-400">Bidirectional GRU</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Attention Type</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-amber-400">Spatial Attention (7x7)</span>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Flowchart */}
      <div className="mb-12">
        <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Workflow className="w-5 h-5 text-emerald-400" />
          End-to-End AI Inference Pipeline
        </h3>

        <div className="relative space-y-4">
          {architectureStages.map((stage, idx) => {
            const Icon = stage.icon;
            const isLast = idx === architectureStages.length - 1;

            return (
              <div key={idx} className="relative">
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-lg hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 font-mono text-xs font-bold text-emerald-400 flex items-center justify-center shrink-0">
                      {stage.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">{stage.title}</h4>
                      <p className="text-xs text-emerald-400 font-mono">{stage.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 sm:max-w-md sm:text-right leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {!isLast && (
                  <div className="flex justify-center my-1.5">
                    <ArrowDown className="w-4 h-4 text-slate-600 animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Datasets Section */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-teal-400" />
          Core Agricultural Datasets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs font-mono text-emerald-400 block mb-1">01 • Leaf Pathology</span>
            <h4 className="text-sm font-bold text-white mb-2">PlantVillage Dataset</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              54,303 curated leaf images spanning 14 crops across 38 healthy and diseased categories.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs font-mono text-cyan-400 block mb-1">02 • Macro Satellite</span>
            <h4 className="text-sm font-bold text-white mb-2">Copernicus Sentinel-2</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multispectral imagery providing Red (B4) and NIR (B8) bands at 10m spatial resolution.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs font-mono text-indigo-400 block mb-1">03 • Micro Aerial</span>
            <h4 className="text-sm font-bold text-white mb-2">Drone / UAV Imagery</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ultra-high resolution aerial RGB & orthomosaic tiles for localized canopy stress mapping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
