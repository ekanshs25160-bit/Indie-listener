/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useRef } from "react";

export const AudioContext = createContext({
  currentTrack: null,
  isPlaying: false,
  queue: [],
  playTrack: () => {},
  togglePlay: () => {},
  skipNext: () => {},
  skipPrevious: () => {},
  volume: 0.5,
  setVolume: () => {},
  progress: 0,
  duration: 0,
  seekAudio: () => {},
  isRepeat: false,
  isShuffle: false,
  toggleRepeat: () => {},
  toggleShuffle: () => {},
});

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0); 
  const [duration, setDuration] = useState(0); 
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  // Create the audio player just once
  const audioRef = useRef(null);
  // eslint-disable-next-line react-hooks/refs
  if (typeof window !== "undefined" && audioRef.current == null) {
    audioRef.current = new Audio();
  }

  // --- Helper Functions ---

  const playTrack = (track, newQueue = []) => {
    if (newQueue.length > 0) {
      setQueue(newQueue);
      setCurrentTrackIndex(newQueue.findIndex((t) => t.id === track.id));
    }
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying((prev) => !prev);
  };

  const toggleShuffle = ()=>setIsShuffle((prev)=>!prev)
  const toggleRepeat = ()=>setIsRepeat((prev)=>!prev)

  const skipNext = () => {
    if (queue.length === 0 || currentTrackIndex === -1) return;
    let nextIndex 
    if(isShuffle && queue.length > 1){
      do{
        nextIndex = Math.floor(Math.random()*queue.length)
      }while(nextIndex === currentTrackIndex)
    }
    else{
      nextIndex = (currentTrackIndex+1)%queue.length
    }
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(queue[nextIndex]);
    setIsPlaying(true);
  };

  const skipPrevious = () => {
    if (queue.length === 0 || currentTrackIndex === -1) return;
    const prevIndex =
      currentTrackIndex === 0 ? queue.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(queue[prevIndex]);
    setIsPlaying(true);
  };

  // Allows dragging the progress bar to skip to a specific time
  const seekAudio = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  };

  // 1. Update the player's volume when the volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 2. Listen to the audio player to update the progress bar and play the next song automatically
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleAudioEnded = () => {
      if(isRepeat){
        audio.currentTime = 0
        audio.play().catch((err)=>console.log(err))
      }
      else{
        skipNext()
      }
    }

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleAudioEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex, queue, isRepeat, isShuffle]); // Update listeners if the song queue changes

  // 3. Change the song in the player when a new track is selected
  useEffect(() => {
    if (!audioRef.current) return;

    const trackSrc = currentTrack?.stream_url || currentTrack?.src;
    if (trackSrc) {
      audioRef.current.pause();
      audioRef.current.src = trackSrc;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.log(`Audio play error: ${err}`));
      }
    } else {
      audioRef.current.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack]);

  // 4. Play or pause the audio when the play button is clicked
  useEffect(() => {
    if (!audioRef.current || !audioRef.current.src) return;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.log(`Audio play error: ${err}`));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

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
        progress,
        duration,
        seekAudio,
        isRepeat,
        isShuffle,
        toggleRepeat,
        toggleShuffle,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
