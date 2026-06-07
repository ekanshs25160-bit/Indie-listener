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
  } = useAudio();

  const [isShuffle, setIsShuffle] = useState(false); {/*does nothing */}
  const [isRepeat, setIsRepeat] = useState(false); {/*does nothing */}

 
  const volumePercentage = Math.round(volume * 100);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setVolume(volume > 0 ? 0 : 0.3);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-neutral-950/80 backdrop-blur-md border-t border-neutral-800/40 z-50 px-6 grid grid-cols-3 items-center">
      <div className="flex items-center gap-3 min-w-0">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.albumArt}
              alt=""
              className="w-12 h-12 rounded object-cover border border-neutral-800 flex-shrink-0"
            />
            <div className="truncate">
              <h4 className="text-sm font-medium text-neutral-200 truncate">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-emerald-400 font-mono mt-0.5 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </>
        ) : (
          <div className="text-xs font-mono text-neutral-600">Play music</div>
        )}
      </div>

      <div className="flex flex-col items-center gap-1.5 justify-center">
        <div className="flex items-center gap-6 justify-center text-neutral-400">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition-colors w-10 h-10 flex items-center justify-center ${
              isShuffle ? "text-emerald-400 hover:text-emerald-300" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Shuffle size={20} />
          </button>

          <button
            onClick={skipPrevious}
            className="hover:text-neutral-200 transition-colors w-10 h-10 flex items-center justify-center"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-lg bg-emerald-500 text-neutral-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>

          <button
            onClick={skipNext}
            className="hover:text-neutral-200 transition-colors w-10 h-10 flex items-center justify-center"
          >
            <SkipForward size={20} />
          </button>

          <button
            onClick={() => setIsRepeat(!isRepeat)}
            className={`transition-colors w-10 h-10 flex items-center justify-center ${
              isRepeat ? "text-emerald-400 hover:text-emerald-300" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Repeat size={20} />
          </button>
        </div>
{/* hardcoded progress bar*/}
        <div className="w-full flex items-center gap-3 font-mono text-[11px] text-neutral-500 select-none">
          <span>0:00</span>
          <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden relative group cursor-pointer">
            <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-emerald-500 rounded-full group-hover:bg-emerald-400 transition-colors"></div>
          </div>
          <span>{currentTrack ? "3:45" : "0:00"}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={toggleMute}
          className="text-neutral-400 hover:text-neutral-50 transition-colors"
        >
          {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none transition-all"
          style={{
            background: `linear-gradient(to right, #10b981 0%, #10b981 ${volumePercentage}%, #262626 ${volumePercentage}%, #262626 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default PlayerBar;
