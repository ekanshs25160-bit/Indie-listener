import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import PlayerBar from './components/layout/PlayerBar'
import Home from './pages/Home'
import Search from './pages/Search'
import { AudioProvider } from './context/AudioContext'
import { useAudio } from './hooks/useAudio'
import defaultHero from './assets/Screenshot 2026-06-10 at 3.20.57 PM.png' // Fallback when no music is playing

// 1. Create a dedicated AppLayout component that can freely consume useAudio()
const AppLayout = () => {
  const { currentTrack } = useAudio();

  // Dynamically switch background source: use album art if playing, otherwise fall back to your hero graphic
  const currentBg = currentTrack?.albumArt ? currentTrack.albumArt : defaultHero;
  return (
    <div className="flex h-screen w-full bg-[#f5f5f5] text-black overflow-hidden font-sans relative">
      {/* Dynamic Background Image with ambient animation/transition */}
      {currentBg && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url("${currentBg}")`,
            opacity: 0.99
          }}
        />
      )}

      <div className="flex-1 relative overflow-hidden flex flex-col z-10">
        {/* Main Content Area */}
        <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
          
          <div className="z-50 w-full px-8 pb-6 pt-2 shrink-0">
            <PlayerBar />
          </div>
        </main>
      </div>
    </div>
  );
}

// 2. Keep the root App component strictly wrapping everything in the Provider
const App = () => {
  return (
    <AudioProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AudioProvider>
  )
}

export default App