/**
 * API Service for communicating with FastAPI Backend
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export function getFullImageUrl(urlPath) {
  if (!urlPath) return null;
  if (urlPath.startsWith('http://') || urlPath.startsWith('https://') || urlPath.startsWith('blob:') || urlPath.startsWith('data:')) {
    return urlPath;
  }
  return `${API_BASE_URL}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`;
}

export async function predictCrop(imageFileOrBlob) {
  const formData = new FormData();
  formData.append('file', imageFileOrBlob, 'scan.jpg');

  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMsg = `Server error (${response.status})`;
    try {
      const errData = await response.json();
      if (errData.detail) errorMsg = errData.detail;
    } catch (_) {}
    throw new Error(errorMsg);
  }

  return response.json();
}

export async function checkPreprocess(imageFileOrBlob) {
  const formData = new FormData();
  formData.append('file', imageFileOrBlob, 'check.jpg');

  const response = await fetch(`${API_BASE_URL}/api/preprocess`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || 'Preprocessing check failed');
  }

  return response.json();
}

export async function analyzeRemoteSensing(imageFileOrBlob, sourceType = 'drone') {
  const formData = new FormData();
  formData.append('file', imageFileOrBlob, 'remote_sensing.jpg');
  formData.append('source_type', sourceType);

  const response = await fetch(`${API_BASE_URL}/api/remote-sensing`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || 'Remote sensing analysis failed');
  }

  return response.json();
}

export async function getHistory() {
  const response = await fetch(`${API_BASE_URL}/api/history`);
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
}

export async function getHistoryItem(scanId) {
  const response = await fetch(`${API_BASE_URL}/api/history/${scanId}`);
  if (!response.ok) throw new Error('Failed to fetch scan detail');
  return response.json();
}

export async function deleteHistoryItem(scanId) {
  const response = await fetch(`${API_BASE_URL}/api/history/${scanId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete scan');
  return response.json();
}

export async function clearAllHistory() {
  const response = await fetch(`${API_BASE_URL}/api/history`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to clear history');
  return response.json();
}

export async function getSystemHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  if (!response.ok) throw new Error('Backend unavailable');
  return response.json();
}

export async function getModelInfo() {
  const response = await fetch(`${API_BASE_URL}/api/model-info`);
  if (!response.ok) throw new Error('Failed to fetch model info');
  return response.json();
}

export async function analyzeSoil(payload) {
  const response = await fetch(`${API_BASE_URL}/api/soil-analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to analyze soil parameters');
  return response.json();
}

export async function getAllCrops() {
  const response = await fetch(`${API_BASE_URL}/api/crops`);
  if (!response.ok) throw new Error('Failed to fetch crops');
  return response.json();
}

export async function getCropDiseases(cropName) {
  const response = await fetch(`${API_BASE_URL}/api/diseases/${encodeURIComponent(cropName)}`);
  if (!response.ok) throw new Error('Failed to fetch crop diseases');
  return response.json();
}
