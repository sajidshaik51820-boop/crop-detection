import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Activity, Database, Satellite, Cpu, HelpCircle, Menu, X } from 'lucide-react';
import { getSystemHealth } from '../services/api';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState({ online: false, demo: true });

  useEffect(() => {
    let isMounted = true;
    getSystemHealth()
      .then((res) => {
        if (isMounted) {
          setServerStatus({
            online: true,
            demo: !res.ai_engine?.is_real_weights_loaded
          });
        }
      })
      .catch(() => {
        if (isMounted) setServerStatus({ online: false, demo: true });
      });

    return () => { isMounted = false; };
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home', icon: Sprout },
    { to: '/scanner', label: 'Scanner', icon: Activity },
    { to: '/remote-sensing', label: 'Remote Sensing', icon: Satellite },
    { to: '/history', label: 'Scan History', icon: Database },
    { to: '/model', label: 'AI Model', icon: Cpu },
    { to: '/about', label: 'About', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              SMART CROP <span className="text-emerald-400 font-mono text-xs px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider font-medium uppercase">Health & Disease Detection</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status Indicators */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px]">
            <span
              className={`w-2 h-2 rounded-full ${
                serverStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`}
            />
            <span className="text-slate-300 font-mono">
              {serverStatus.online ? 'API Online' : 'API Offline'}
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-700/40 text-[11px] font-mono text-emerald-300">
            {serverStatus.demo ? 'ACRNN (Demo)' : 'ACRNN (Prod)'}
          </div>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/95 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Server: {serverStatus.online ? 'Connected' : 'Disconnected'}</span>
            <span className="font-mono text-emerald-400">{serverStatus.demo ? 'Demo Weights' : 'Production Weights'}</span>
          </div>
        </div>
      )}
    </header>
  );
}
