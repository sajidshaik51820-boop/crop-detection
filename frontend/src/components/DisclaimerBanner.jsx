import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export default function DisclaimerBanner({ isDemoMode = false, isLowConfidence = false, warningMessage = null }) {
  return (
    <div className="space-y-2 mb-6">
      {isDemoMode && (
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/30 text-amber-200 text-xs sm:text-sm">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">Demo AI Model Notice:</span> Results are for system demonstration and are not a validated agricultural diagnosis. Place custom weights at <code className="bg-amber-900/60 px-1 py-0.5 rounded text-amber-100 font-mono">models/acrnn_weights.h5</code> for production weights.
          </div>
        </div>
      )}

      {isLowConfidence && (
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-950/40 border border-rose-600/30 text-rose-200 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-rose-300">Low Confidence Warning:</span> {warningMessage || "AI confidence is below 60%. Please capture a clearer image with good lighting and ensure the affected plant part is visible."}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/50 text-slate-400 text-xs">
        <Info className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>For chemical treatment decisions, always consult a certified local agricultural extension officer or agronomist.</span>
      </div>
    </div>
  );
}
