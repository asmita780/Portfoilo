import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { PortfolioData } from './types';

function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const res = await fetch('/api/portfolio', { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Portfolio load error:', err);
        // Fallback to static data if absolute failure
        if (!data) {
           console.log("Using internal fallback due to connection error");
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-brand-teal border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-brand-teal font-medium animate-pulse">Connecting to server...</p>
        <p className="text-gray-400 text-xs mt-2">Fetching portfolio content</p>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-6 text-center">
      <div>
        <h1 className="text-2xl font-bold text-brand-teal mb-2">Initialization Required</h1>
        <p className="text-gray-500 mb-6">The portfolio data could not be loaded. Please check the server logs.</p>
        <button onClick={() => window.location.reload()} className="bg-brand-teal text-white px-6 py-2 rounded-lg">Retry</button>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-brand-bg selection:bg-brand-teal selection:text-white">
        <Navbar />
        <main className="max-w-[1920px] mx-auto p-[70px]">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin data={data} onUpdate={setData} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer socials={data.socials} />
      </div>
    </Router>
  );
}

export default App;
