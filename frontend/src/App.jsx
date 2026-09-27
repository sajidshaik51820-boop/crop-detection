import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CropAnalysisProvider } from './context/CropAnalysisContext';

// Pages
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Analysis from './pages/Analysis';
import Health from './pages/Health';
import Growth from './pages/Growth';
import Soil from './pages/Soil';
import RemoteSensing from './pages/RemoteSensing';
import History from './pages/History';
import Model from './pages/Model';
import About from './pages/About';

// Scroll to top component on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <CropAnalysisProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scanner" element={<Scanner />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/health" element={<Health />} />
              <Route path="/growth" element={<Growth />} />
              <Route path="/soil" element={<Soil />} />
              <Route path="/remote-sensing" element={<RemoteSensing />} />
              <Route path="/history" element={<History />} />
              <Route path="/model" element={<Model />} />
              <Route path="/about" element={<About />} />
              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CropAnalysisProvider>
  );
}
