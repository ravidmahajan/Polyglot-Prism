import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LanguagePage from './components/LanguagePage';
import Footer from './components/Footer';
import { preloadVoices } from './utils/speech';

export default function App() {
  useEffect(() => {
    preloadVoices();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative">
        <ThreeBackground />
        <Navbar />

        <main className="flex-1 pb-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn/:slug" element={<LanguagePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
