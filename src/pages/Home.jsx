import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import { useAudio } from '../hooks/useAudio';
import { mockTracks } from '../data/mockTracks';
import { Search, Bell, Settings, Maximize2, Check, Shuffle, Play, MoreHorizontal, Plus, Heart } from 'lucide-react';

export default function Home() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden px-6 pt-4">
      {/* Fixed Top Header */}
      <div className="flex items-center justify-between w-full pb-4 shrink-0 z-20 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg overflow-hidden">
            {/* Spotify logo placeholder */}
            <img src="src/assets/GAY-logo.png" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="bg-black/5 backdrop-blur-md px-4 py-2.5 rounded-full w-96 flex items-center gap-3 border border-black/10 shadow-sm">
            <Search size={18} className="text-neutral-500" />
            <input 
              type="text" 
              placeholder="What do you want to play?" 
              className="bg-transparent border-none outline-none text-black w-full text-sm placeholder:text-neutral-500 font-medium" 
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-black/5 backdrop-blur-md rounded-full p-1 border border-black/10 shadow-sm">
            <button className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm">
              <span className="text-lg leading-none">🎵</span> Public
            </button>
            <button className="text-neutral-600 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-black/5 transition-colors">
              <span className="text-lg leading-none">🥽</span> Private
            </button>
          </div>
          
          <div className="flex items-center gap-2 bg-black/5 backdrop-blur-md rounded-full p-1.5 px-3 border border-black/10 shadow-sm text-neutral-600">
            <button className="w-8 h-8 flex items-center justify-center hover:text-black transition-colors"><Bell size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center hover:text-black transition-colors"><Settings size={18} /></button>
            <button className="w-8 h-8 rounded-full overflow-hidden border border-black/20 hover:border-black transition-colors">
              <img src="https://i.pravatar.cc/100?img=12" alt="Profile" className="w-full h-full object-cover" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center hover:text-black transition-colors ml-1"><Maximize2 size={16} /></button>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex gap-6 flex-1 min-h-0 overflow-hidden pb-4 mt-2">
        {/* Sidebar - fixed on the left */}
        <div className='ml-2'>
          <Sidebar />
        </div>

        {/* Main Right Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          {/* Scrolling Center & Right Area */}
          <div className="flex gap-6 flex-1 min-h-0">
          
          {/* Scrollable Center Content */}
          <div className="flex-1 overflow-y-auto hidden-scrollbar pb-8 pr-2">
            
            {/* Top section: Artist Card & Badge */}
            <div className="flex gap-6 relative z-10">
              {/* White Artist Card */}
              
              <div className="bg-white rounded-[2rem] p-6 w-[340px] text-black shadow-2xl flex flex-col relative shrink-0">
                <div className="flex justify-between items-start mb-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/Travis_Scott_-_Openair_Frauenfeld_2019_08_%28cropped%29.jpg" alt="Travis Scott" className="w-20 h-20 rounded-full shadow-md object-cover" />
                  <button className="text-neutral-400 hover:text-black transition-colors"><MoreHorizontal size={24} /></button>
                </div>
                
                <div className="flex items-center gap-1.5 text-blue-500 mb-1">
                  <Check size={16} strokeWidth={3} className="bg-blue-500 text-white rounded-full p-0.5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Verified artist</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight mb-2">Travis Scott</h2>
                <p className="text-neutral-500 font-medium text-sm mb-6">
                  <span className="text-black font-bold">67,430,530</span> monthly listeners
                </p>

                <div className="flex items-center justify-between">
                  <button className="border border-neutral-300 rounded-full px-5 py-2 font-semibold flex items-center gap-2 hover:border-black transition-colors">
                    <Check size={18} /> Following
                  </button>
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 border border-neutral-300 rounded-full flex items-center justify-center text-neutral-500 hover:text-black hover:border-black transition-colors">
                      <Shuffle size={18} />
                    </button>
                    <button className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/30">
                      <Play size={20} fill="currentColor" className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Cards Row */}
            <div className="grid grid-cols-12 gap-5 mt-10">
              
              {/* Queue */}
              <div className="col-span-12 xl:col-span-7 bg-[#a97557]/60 backdrop-blur-2xl rounded-[2rem] p-5 shadow-xl border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Coming Up Next</h3>
                  <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <Maximize2 size={14} />
                  </button>
                </div>
                <div className="space-y-3">
                  {mockTracks.slice(0, 4).map((track, i) => (
                    <div key={track.id} onClick={()=>playTrack(track, mockTracks)} className="flex items-center gap-4 group cursor-pointer hover:bg-white/10 p-2 rounded-xl transition-colors">
                      <span className="text-neutral-300 font-medium w-4 text-center flex-shrink-0">{i + 1}</span>
                      <img src={track.albumArt} alt="" className="w-10 h-10 rounded-md shadow-sm flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{track.title}</p>
                        <p className="text-xs text-neutral-400 truncate mt-0.5">{track.artist}</p>
                      </div>
                      
                      <span className="text-xs text-neutral-300 font-mono w-12 text-right flex-shrink-0">{formatTime(track.duration)}</span>
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-neutral-300 hover:text-white"><Plus size={18} /></button>
                        <button className="text-emerald-400 hover:text-emerald-300"><Heart size={18} fill="currentColor" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>
          </div>

          {/* Right Sidebar: Friend Activity - Independent Scroll */}
          <div className="w-[300px] mr-2 shrink-0 bg-[#1a1a1a]/80 backdrop-blur-2xl rounded-[2rem] p-5 shadow-2xl border border-white/5 flex flex-col h-full overflow-y-auto hidden-scrollbar relative z-10">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className="font-bold text-sm text-neutral-200">Friend Activity</h3>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-neutral-300">
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Friend 1 */}
              <div className="bg-[#2a2a2a] p-3 rounded-2xl flex gap-3 cursor-pointer hover:bg-[#333] transition-colors shadow-lg">
                <img src="https://i.pravatar.cc/100?img=1" alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-xs font-semibold text-white truncate flex items-center gap-1">
                    <span className="w-3 h-3 bg-neutral-600 text-[8px] flex items-center justify-center rounded-sm">E</span>
                    Wicked Games
                  </p>
                  <p className="text-[10px] text-neutral-400 truncate mt-0.5">The Weeknd</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <img src="https://i.pravatar.cc/100?img=5" alt="" className="w-4 h-4 rounded-full" />
                    <span className="text-[10px] text-neutral-300">Emily Chang</span>
                    <div className="ml-auto flex gap-0.5 items-end h-3">
                      <div className="w-0.5 bg-emerald-500 h-full animate-pulse"></div>
                      <div className="w-0.5 bg-emerald-500 h-2/3 animate-pulse delay-75"></div>
                      <div className="w-0.5 bg-emerald-500 h-4/5 animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Friend 2 */}
              <div className="p-2 flex gap-3 cursor-pointer hover:bg-white/5 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-black font-bold shadow-md">
                  {/* Rammstein placeholder */}
                  R
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-xs font-semibold text-white truncate">Deutschland</p>
                  <p className="text-[10px] text-neutral-400 truncate mt-0.5">Rammstein</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <img src="https://i.pravatar.cc/100?img=8" alt="" className="w-4 h-4 rounded-full" />
                    <span className="text-[10px] text-neutral-300">Ryan Williams</span>
                    <span className="text-[9px] text-neutral-500 ml-auto bg-white/10 px-1.5 py-0.5 rounded-full">44 min</span>
                  </div>
                </div>
              </div>

              {/* Friend 3 */}
              <div className="p-2 flex gap-3 cursor-pointer hover:bg-white/5 rounded-xl transition-colors">
                <img src={mockTracks[2].albumArt} alt="" className="w-10 h-10 rounded-xl object-cover shadow-md" />
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-xs font-semibold text-white truncate">Glimpse of Us</p>
                  <p className="text-[10px] text-neutral-400 truncate mt-0.5">Joji</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <img src="https://i.pravatar.cc/100?img=9" alt="" className="w-4 h-4 rounded-full" />
                    <span className="text-[10px] text-neutral-300">Elizabeth Clark</span>
                    <span className="text-[9px] text-neutral-500 ml-auto bg-white/10 px-1.5 py-0.5 rounded-full">3 hr</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 py-2.5 rounded-xl bg-white/5 text-xs font-semibold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 shrink-0">
              See others activity <Maximize2 size={12} />
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
  );
}