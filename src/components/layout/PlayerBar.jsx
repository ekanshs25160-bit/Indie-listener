import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useAudio } from "../../hooks/useAudio.js";

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
  {
    /*does nothing */
  }
  const [isRepeat, setIsRepeat] = useState(false);
  {
    /*does nothing */
  }

  const volumePercentage = Math.round(volume * 100);

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : 0.3);
  };

  return (
    <div className="w-full h-[88px] bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 z-50 px-6 grid grid-cols-3 items-center rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-4 min-w-0">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.albumArt}
              alt=""
              className="w-14 h-14 rounded-xl object-cover shadow-md flex-shrink-0"
            />
            <div className="truncate">
              <h4 className="text-base font-semibold text-neutral-100 truncate">
                {currentTrack.title}
              </h4>
              <p className="text-sm text-neutral-400 mt-0.5 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </>
        ) : (
          <div className="text-sm text-neutral-500">Play music</div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 justify-center w-full max-w-md mx-auto">
        <div className="flex items-center gap-6 justify-center text-neutral-400">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition-colors w-8 h-8 flex items-center justify-center ${
              isShuffle
                ? "text-emerald-400 hover:text-emerald-300"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Shuffle size={18} />
          </button>

          <button
            onClick={skipPrevious}
            className="hover:text-white transition-colors w-8 h-8 flex items-center justify-center"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-1" />
            )}
          </button>

          <button
            onClick={skipNext}
            className="hover:text-white transition-colors w-8 h-8 flex items-center justify-center"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          <button
            onClick={() => setIsRepeat(!isRepeat)}
            className={`transition-colors w-8 h-8 flex items-center justify-center ${
              isRepeat
                ? "text-emerald-400 hover:text-emerald-300"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Repeat size={18} />
          </button>
        </div>
        
        <div className="w-full flex items-center gap-3 text-[11px] font-medium text-neutral-400 select-none">
          <span className="w-8 text-right">{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={(e) => seekAudio(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-neutral-700/50 rounded-full appearance-none cursor-pointer focus:outline-none overflow-hidden"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${progressPercentage}%, rgba(255,255,255,0.1) ${progressPercentage}%, rgba(255,255,255,0.1) 100%)`,
            }}
          />
          <span className="w-8">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 text-neutral-400 pr-2">
        <button
          onClick={toggleMute}
          className="hover:text-white transition-colors"
        >
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1.5 bg-neutral-700/50 rounded-full appearance-none cursor-pointer focus:outline-none"
          style={{
            background: `linear-gradient(to right, #ffffff 0%, #ffffff ${volumePercentage}%, rgba(255,255,255,0.1) ${volumePercentage}%, rgba(255,255,255,0.1) 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default PlayerBar;
