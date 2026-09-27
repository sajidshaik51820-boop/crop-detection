import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Cpu, Satellite } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-600/30 flex items-center justify-center">
            <Sprout className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-semibold text-slate-200">Smart Crop Health & Disease Detection System</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <Cpu className="w-3.5 h-3.5 text-emerald-500" /> ACRNN + Transfer Learning
          </span>
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <Satellite className="w-3.5 h-3.5 text-teal-400" /> Sentinel-2 & Drone UAV
          </span>
          <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> PlantVillage Dataset
          </span>
        </div>

        <div className="text-slate-400 text-center md:text-right">
          © {new Date().getFullYear()} Autonomous Agricultural Intelligence
        </div>
      </div>
    </footer>
  );
}
