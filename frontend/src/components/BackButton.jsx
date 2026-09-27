import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ defaultTo = '/', label = 'Back', className = '' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there is actual history to go back to within the SPA session
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(defaultTo);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium 
        text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 
        border border-slate-700 transition-all duration-200 shadow-sm active:scale-95 ${className}`}
      title={`Back to ${label}`}
    >
      <ArrowLeft className="w-4 h-4 text-emerald-400" />
      <span>{label}</span>
    </button>
  );
}
