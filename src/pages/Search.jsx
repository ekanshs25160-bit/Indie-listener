import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Loader2, Play, Pause, Bell, Settings, Maximize2 } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { searchTracks } from '../api/jamendoClient';
import Sidebar from '../components/layout/Sidebar';

export default function Search() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounce the search so it doesn't spam the API on every single keystroke
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 2) {
        setIsSearching(true);
        setHasSearched(true);
        const data = await searchTracks(query);
        setResults(data);
        setIsSearching(false);
      } else if (query.trim().length === 0) {
        setResults([]);
        setHasSearched(false);
      }
    }, 800); // Waits 800ms after the user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="flex flex-col backdrop-blur-md shadow-sm h-full w-full overflow-hidden px-6 pt-4">
      {/* Fixed Top Header */}
      <div className="flex items-center justify-between w-full pb-4 shrink-0 z-20 px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-lg overflow-hidden">
            {/* Gay Listens logo placeholder */}
            <img
              src="src/assets/GAY-logo.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-black/5 backdrop-blur-md px-4 py-2.5 rounded-full w-96 focus-within:w-[32rem] transition-all duration-300 flex items-center gap-3 border border-black/10 shadow-sm">
            <SearchIcon size={18} className="text-neutral-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for tracks, artists, or vibes..."
              className="bg-transparent border-none outline-none text-black w-full text-sm placeholder:text-neutral-500 font-medium"
              autoFocus
            />
            {isSearching && <Loader2 size={16} className="text-emerald-400 animate-spin" />}
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
            <button className="w-8 h-8 flex items-center justify-center hover:text-black transition-colors">
              <Bell size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center hover:text-black transition-colors">
              <Settings size={18} />
            </button>
            <button className="w-8 h-8 rounded-full overflow-hidden border border-black/20 hover:border-black transition-colors">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center hover:text-black transition-colors ml-1">
              <Maximize2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex gap-6 flex-1 min-h-0 overflow-hidden pb-4 mt-2">
        <div className="ml-2">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-y-auto hidden-scrollbar pb-24 pr-2">
          {!hasSearched ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 mt-20">
              <SearchIcon size={64} className="mb-6 opacity-20" />
              <h2 className="text-2xl font-bold text-white mb-2">Listen to your flow.</h2>
              <p>Type at least 3 characters to start searching the network.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.length > 0 ? (
                results.map((track) => {
                  const isCurrent = currentTrack?.id === track.id;
                  
                  return (
                    <div
                      key={track.id}
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-4 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 cursor-pointer shadow-xl"
                      onClick={() => isCurrent ? togglePlay() : playTrack(track, results)}
                    >
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg mb-4">
                        <img
                          src={track.albumArt}
                          alt={track.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                          <div className="w-14 h-14 rounded-full bg-emerald-500 text-black flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform shadow-xl shadow-emerald-500/20">
                            {isCurrent && isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className={`text-base font-bold truncate transition-colors ${isCurrent ? "text-emerald-400" : "text-white"}`}>
                          {track.title}
                        </h4>
                        <p className="text-sm text-neutral-400 truncate font-medium">
                          {track.artist}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                !isSearching && (
                  <div className="col-span-full text-center text-neutral-400 mt-20">
                    <p className="text-xl font-medium">No signals found for "{query}"</p>
                    <p className="text-sm mt-2">Try searching for a different frequency.</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}