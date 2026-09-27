import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Database, 
  Trash2, 
  FileText, 
  ShieldAlert, 
  ShieldCheck, 
  Calendar, 
  Activity, 
  AlertCircle,
  Loader2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import BackButton from '../components/BackButton';
import DisclaimerBanner from '../components/DisclaimerBanner';
import { useCropAnalysis } from '../context/CropAnalysisContext';
import { getHistory, deleteHistoryItem, clearAllHistory, getFullImageUrl } from '../services/api';

export default function History() {
  const navigate = useNavigate();
  const { loadScanRecord } = useCropAnalysis();

  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await getHistory();
      setHistoryList(data);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to retrieve scan history.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleViewReport = (scan) => {
    loadScanRecord(scan);
    navigate('/analysis');
  };

  const handleDeleteItem = async (scanId) => {
    if (!window.confirm('Are you sure you want to delete this scan record?')) return;
    setActionInProgress(true);
    try {
      await deleteHistoryItem(scanId);
      setHistoryList((prev) => prev.filter((item) => item.scan_id !== scanId));
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setActionInProgress(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear ALL scan history? This action cannot be undone.')) return;
    setActionInProgress(true);
    try {
      await clearAllHistory();
      setHistoryList([]);
    } catch (err) {
      alert(`Clear history failed: ${err.message}`);
    } finally {
      setActionInProgress(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <BackButton defaultTo="/" label="Home" />
        <div className="text-right">
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">SCAN HISTORY</h1>
          <p className="text-xs text-slate-400">Stored diagnostic records from the backend database</p>
        </div>
      </div>

      <DisclaimerBanner />

      {/* Action Row */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">
            Total Scans Logged: <span className="font-mono text-emerald-400">{historyList.length}</span>
          </span>
          <button
            onClick={fetchHistory}
            disabled={isLoading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Refresh History"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={handleClearAll}
            disabled={actionInProgress}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-950/80 border border-rose-600/40 transition-all active:scale-95 disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Loading or Error State */}
      {isLoading ? (
        <div className="p-16 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mx-auto mb-3" />
          <p className="text-xs">Loading scan history from database...</p>
        </div>
      ) : errorMessage ? (
        <div className="p-6 rounded-2xl bg-rose-950/60 border border-rose-600/40 text-rose-200 text-xs text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-400" />
          <p>{errorMessage}</p>
        </div>
      ) : historyList.length === 0 ? (
        <div className="p-16 rounded-3xl bg-slate-900 border border-slate-800 text-center">
          <Database className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Scans Recorded Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
            Scans performed via the Crop Scanner will automatically be archived in SQLite and appear here.
          </p>
          <button
            onClick={() => navigate('/scanner')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            Scan a Crop Now
          </button>
        </div>
      ) : (
        /* History Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {historyList.map((scan) => {
            const isHealthy = scan.health_status === 'Healthy';
            const dateStr = scan.created_at
              ? new Date(scan.created_at).toLocaleString()
              : 'Recent Scan';
            const imgUrl = getFullImageUrl(scan.image_url);

            return (
              <div
                key={scan.scan_id}
                className="rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-xl hover:border-emerald-500/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0">
                      {imgUrl ? (
                        <img src={imgUrl} alt={scan.crop} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                          No Pic
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                          {scan.crop}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{dateStr}</span>
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-white truncate mb-1">
                        {scan.disease}
                      </h4>

                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            isHealthy
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {isHealthy ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                          <span>{scan.health_status}</span>
                        </span>

                        <span className="text-[11px] font-mono text-slate-400">
                          {scan.confidence}% Conf.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 mb-4 flex items-center justify-between pt-2 border-t border-slate-800">
                    <span>Severity: <strong className="text-slate-300">{scan.severity || 'N/A'}</strong></span>
                    <span className="text-[10px] font-mono text-slate-400">ID: {scan.scan_id.slice(0, 8)}...</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => handleViewReport(scan)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Report</span>
                  </button>

                  <button
                    onClick={() => handleDeleteItem(scan.scan_id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-400 border border-slate-700 text-slate-400 transition-all"
                    title="Delete Scan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
