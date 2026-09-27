import React from 'react';
import { 
  HelpCircle, 
  Target, 
  Lightbulb, 
  Layers, 
  Cpu, 
  Database, 
  Rocket, 
  Users,
  CheckCircle2
} from 'lucide-react';
import BackButton from '../components/BackButton';
import DisclaimerBanner from '../components/DisclaimerBanner';

export default function About() {
  const objectives = [
    'Develop an autonomous, real-time crop disease diagnosis pipeline via mobile and browser cameras.',
    'Formulate an Attentive Convolutional Recurrent Neural Network (ACRNN) combining spatial transfer learning with contextual recurrent modeling.',
    'Integrate spatial attention to localize minute necrotic lesions, chlorotic margins, and early blight symptoms.',
    'Bridge leaf-level diagnostics with macro-scale Sentinel-2 and drone UAV vegetation index analytics.',
    'Provide structured agronomic guides encompassing soil requirements, irrigation rules, and expert-reviewed safety precautions.'
  ];

  const techStack = [
    { category: 'Deep Learning & ML', items: 'TensorFlow, Keras 3, MobileNetV2, Spatial Attention Layer, Scikit-learn' },
    { category: 'Computer Vision', items: 'OpenCV (cv2), Laplacian blur variance, HSV mask segmentation' },
    { category: 'Backend Server', items: 'Python 3.12, FastAPI, Uvicorn, SQLAlchemy ORM, SQLite' },
    { category: 'Frontend Architecture', items: 'React 18, React Router 6, Vite, Tailwind CSS, Lucide Icons' },
    { category: 'Remote Sensing', items: 'Copernicus Sentinel-2 MSI, Drone UAV Orthomosaics, VARI & NDVI Spectral Indices' },
  ];

  const teamMembers = [
    { name: 'Agricultural AI Research Lab', role: 'Deep Learning & Model Architecture Design' },
    { name: 'Agronomy Data Systems', role: 'Plant Pathology Taxonomy & Soil Advisory Integration' },
    { name: 'Autonomous Remote Sensing Team', role: 'Sentinel-2 & UAV Spectral Pipeline' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <BackButton defaultTo="/" label="Home" />
        <div className="text-right">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">ABOUT PROJECT</h1>
          <p className="text-xs text-slate-400">Research scope, objectives, system architecture & team</p>
        </div>
      </div>

      <DisclaimerBanner />

      {/* Hero Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 mb-8 shadow-xl">
        <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase block mb-2">
          ACADEMIC & PRODUCTION SYSTEM SPECIFICATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          Smart Crop Health & Disease Detection System
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          An advanced computational agro-intelligence ecosystem designed to assist farmers, agricultural extension workers, 
          and researchers in early pathogen identification, localized vegetation index mapping, and sustainable field management.
        </p>
      </div>

      {/* Problem Statement & Proposed Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Problem Statement</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Foliar crop diseases account for over 20-40% of global agricultural yield loss annually. 
            Traditional manual scouting by agronomists is labor-intensive, geographically constrained, and often delayed until visual symptoms reach irreversible necrotic phases.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Furthermore, conventional RGB image classifiers struggle to capture fine-grained lesion boundaries and temporal spatial dependencies across varied field illumination.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Proposed Solution</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            We introduce an Attentive Convolutional Recurrent Neural Network (ACRNN) framework that integrates Transfer Learning 
            (MobileNetV2) for deep feature extraction, spatial attention gating to isolate necrotic lesions, and Bidirectional GRUs to capture contextual spatial transitions.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Coupled with OpenCV blur/dark filtering, dual-mode soil intelligence, and Sentinel-2 / Drone UAV remote sensing, this delivers an end-to-end agronomic diagnostic platform.
          </p>
        </div>
      </div>

      {/* Objectives */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-teal-400" />
          Key Research Objectives
        </h3>

        <div className="space-y-3">
          {objectives.map((obj, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          Technology Stack
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStack.map((tech, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                {tech.category}
              </span>
              <span className="text-xs sm:text-sm text-slate-200 font-medium">{tech.items}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Future Scope & Roadmap */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 mb-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-cyan-400" />
          Future Scope & Technical Roadmap
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-1">Edge Device Quantization</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Convert ACRNN to TensorFlow Lite (TFLite INT8) for zero-latency offline inference directly on handheld farm sensors.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-1">IoT Soil Probe Ingestion</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              MQTT / LoRaWAN telemetric data streaming from physical capacitive soil probes directly into the Mode 2 diagnostic engine.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-1">Automated Drone Waypoints</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate GPS flight mission plans automatically targeting areas identified as chlorotic or water-stressed in Sentinel-2 passes.
            </p>
          </div>
        </div>
      </div>

      {/* Project Team Information */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          Project Team & Academic Credits
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{member.name}</h4>
              <p className="text-xs text-slate-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
