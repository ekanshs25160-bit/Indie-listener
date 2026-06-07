import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import PlayerBar from './components/layout/PlayerBar'
import Home from './pages/Home'
import Search from './pages/Search'
import { AudioProvider } from './context/AudioContext'

const App = () => {
  return (
    <AudioProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-neutral-900 text-white">
          <Sidebar />
          <div className="flex-1 flex flex-col mb-24">
            <main className="flex-1 p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </main>
          </div>
          <PlayerBar />
        </div>
      </BrowserRouter>
    </AudioProvider>
  )
}

export default App