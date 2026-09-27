import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  UploadCloud, 
  Satellite, 
  History, 
  Cpu, 
  HelpCircle, 
  CheckCircle2, 
  Leaf, 
  Sparkles, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const navCards = [
    {
      title: 'Scan Crop Leaf',
      desc: 'Activate live camera to detect foliar diseases and receive instant AI diagnosis.',
      icon: Camera,
      action: () => navigate('/scanner'),
      buttonText: 'Scan Crop',
      color: 'emerald',
      gradient: 'from-emerald-500/20 to-teal-500/10',
      badge: 'Live Camera'
    },
    {
      title: 'Upload Crop Image',
      desc: 'Upload an existing high-resolution leaf or canopy photograph from your device.',
      icon: UploadCloud,
      action: () => navigate('/scanner?mode=upload'),
      buttonText: 'Upload Image',
      color: 'teal',
      gradient: 'from-teal-500/20 to-cyan-500/10',
      badge: 'Photo File'
    },
    {
      title: 'Remote Sensing',
      desc: 'Analyze Sentinel-2 multispectral and Drone UAV aerial survey data with VARI vegetation indices.',
      icon: Satellite,
      action: () => navigate('/remote-sensing'),
      buttonText: 'Remote Sensing',
      color: 'cyan',
      gradient: 'from-cyan-500/20 to-blue-500/10',
      badge: 'Satellite & UAV'
    },
    {
      title: 'Scan History',
      desc: 'Browse, review previous crop diagnoses, inspection dates, and delete stored records.',
      icon: History,
      action: () => navigate('/history'),
      buttonText: 'Scan History',
      color: 'slate',
      gradient: 'from-slate-700/30 to-slate-800/30',
      badge: 'Database'
    },
    {
      title: 'ACRNN AI Model',
      desc: 'Inspect deep learning pipeline: MobileNetV2 Transfer Learning, Bi-GRU, and Spatial Attention.',
      icon: Cpu,
      action: () => navigate('/model'),
      buttonText: 'AI Model',
      color: 'violet',
      gradient: 'from-violet-500/20 to-purple-500/10',
      badge: 'Architecture'
    },
    {
      title: 'About Project',
      desc: 'Review project objectives, research methodologies, problem scope, and academic details.',
      icon: HelpCircle,
      action: () => navigate('/about'),
      buttonText: 'About Project',
      color: 'blue',
      gradient: 'from-blue-500/20 to-indigo-500/10',
      badge: 'Research'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/20 p-8 sm:p-14 mb-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Deep Learning • Transfer Learning • Attention Mechanism</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight mb-4">
            SMART CROP HEALTH <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              & DISEASE DETECTION
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            An autonomous agricultural AI platform leveraging an Attentive Convolutional Recurrent Neural Network (ACRNN) 
            trained across 38 PlantVillage foliar classes, complemented with Sentinel-2 multispectral and Drone UAV remote sensing analytics.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/scanner')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95"
            >
              <Camera className="w-5 h-5" />
              <span>Scan Crop Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => navigate('/scanner?mode=upload')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all transform active:scale-95"
            >
              <UploadCloud className="w-5 h-5 text-teal-400" />
              <span>Upload Crop Image</span>
            </button>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>OpenCV Preprocessing</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>38 PlantVillage Classes</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Dual-Mode Soil Advisor</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>VARI Remote Sensing</span>
          </div>
        </div>
      </div>

      {/* Main Feature Cards Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-400" />
              Application Navigation Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">Select any dedicated capability below to begin.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 p-6 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-950/60 group-hover:border-emerald-500/40 transition-all duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <button
                  onClick={card.action}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-emerald-600 hover:text-white border border-slate-700 hover:border-emerald-500 transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
