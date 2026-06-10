import React, { useState } from "react";
import {
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Heart,
  PlusCircle,
  GripHorizontal,
  MonitorCheck,
  Video,
  Mic,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useAudio } from "../../hooks/useAudio.js";

// Utility function for time formatting
const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Custom SVG for the Right Panel Menu Icon
const RightPanelMenuIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="22" height="2" rx="1" fill="white" />
    <rect y="6" width="22" height="2" rx="1" fill="white" />
    <circle cx="11" cy="14" r="1" fill="white" />
  </svg>
);

const PlayerBar = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    skipNext,
    skipPrevious,
    volume,
    setVolume,
    progress,
    duration,
    seekAudio,
  } = useAudio();

  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true); // Example initial state from image

  // Progress percentage for linear gradient styling
  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;
  
  // Volume bar percentage
  const volumePercentage = Math.round(volume * 100);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : 0.5);
  };

  return (
    <div className="w-full h-[110px] bg-[#1a1a1d] z-50 px-8 flex items-center justify-between rounded-[2rem] border border-[#303035] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Left Block: Artwork, Text, Likes */}
      <div className="flex items-center gap-6 w-80">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.albumArt}
              alt={`${currentTrack.title} by ${currentTrack.artist}`}
              className="w-16 h-16 rounded-xl object-cover shadow-md flex-shrink-0"
            />
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="truncate">
                <h4 className="text-xl font-extrabold text-neutral-100 truncate uppercase leading-none">
                  {currentTrack.title}
                </h4>
                <p className="text-sm text-neutral-300 mt-1.5 truncate">
                  {currentTrack.artist}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                  <Heart size={18} className="fill-emerald-400" />
                </button>
                <button className="text-neutral-400 hover:text-neutral-200 transition-colors">
                  <PlusCircle size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-xl bg-neutral-800 shadow-md flex-shrink-0"></div>
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="truncate">
                <h4 className="text-xl font-extrabold text-neutral-500 truncate uppercase leading-none">
                  No Track
                </h4>
                <p className="text-sm text-neutral-600 mt-1.5 truncate">
                  Select a track
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Center Block: Controls & Progress */}
      <div className="flex flex-col items-center gap-2 justify-center w-full max-w-lg mx-auto">
        {/* Playback Controls */}
        <div className="flex items-center gap-5 justify-center text-neutral-400">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition-colors w-9 h-9 flex items-center justify-center ${
              isShuffle
                ? "text-emerald-400 hover:text-emerald-300"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Shuffle size={18} />
          </button>

          <button
            onClick={skipPrevious}
            className="hover:text-white transition-colors w-9 h-9 flex items-center justify-center"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          {/* Squared Pause/Play button */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3H8V15H6V3ZM10 3H12V15H10V3Z" fill="black"/>
              </svg>
            ) : (
              <Play size={18} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button
            onClick={skipNext}
            className="hover:text-white transition-colors w-9 h-9 flex items-center justify-center"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          <button
            onClick={() => setIsRepeat(!isRepeat)}
            className={`transition-colors w-9 h-9 flex items-center justify-center ${
              isRepeat
                ? "text-emerald-400 hover:text-emerald-300"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Repeat size={18} />
          </button>
        </div>
        
        {/* Progress Bar & Time */}
        <div className="w-full flex items-center gap-3 text-xs font-semibold text-neutral-300 select-none">
          <span className="w-9 text-right">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) => seekAudio(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-neutral-700 rounded-full appearance-none cursor-pointer focus:outline-none overflow-hidden"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${progressPercentage}%, rgba(255,255,255,0.1) ${progressPercentage}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          <span className="w-9">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Block: Panel with mini info & volume */}
      <div className="flex items-center gap-3 pr-2 h-full py-2">
        <div className="flex flex-col gap-2.5 h-full py-1 bg-[#242429] p-3 px-4 rounded-[1.5rem] border border-[#303035] justify-between">
            {/* Top Row: Mini Track Info & Menu */}
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Playing Next</span>
              <button className="text-neutral-400 hover:text-white transition-colors">
                <RightPanelMenuIcon />
              </button>
            </div>
            
            {/* Bottom Row: Icons & Volume Bar */}
            <div className="flex items-center gap-3.5 justify-between w-full">
                
                <div className="flex items-center gap-2 w-1/2 justify-end">
                    <button onClick={toggleMute} className="hover:text-white transition-colors text-white">
                        {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} fill="white"/>}
                    </button>
                    {/* Styling this like a flat bar, not a range input thumb */}
                    <div className="w-24 h-1 bg-neutral-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full" style={{ width: `${volumePercentage}%`}}></div>
                    </div>
                    {/* Actual input for interaction, hidden */}
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="absolute opacity-0 w-24 h-1 cursor-pointer"
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;