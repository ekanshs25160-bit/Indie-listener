import React, { createContext, useEffect, useState, useRef } from "react";

export const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(null);
  // runs whenever the volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  // runs whenever the currentTrack changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (currentTrack && currentTrack.src) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.log(`Audio play error: ${err}`));
      }
    } else {
      audioRef.current.pause();
    }
  }, [currentTrack]);
  // runs whenever the isPlaying boolean state changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.log(`Audio play error: ${err}`));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const skipNext = () => {
    console.log("Skip Next"); //does nothing
  };

  const skipPrevious = () => {
    console.log("Skip Previous"); //does nothing
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        queue,
        playTrack,
        togglePlay,
        skipNext,
        skipPrevious,
        volume,
        setVolume,
      }}
      >
      <audio ref={audioRef}/>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
