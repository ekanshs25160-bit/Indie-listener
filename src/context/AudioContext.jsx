import { createContext, useEffect, useState, useRef } from "react";

export const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // for the current track and for setting up the order of the songs that should play next
  const playTrack = (track, newQueue = []) => {
    if (newQueue.length > 0) {
      setQueue(newQueue);
      const index = newQueue.findIndex((t) => t.id === track.id);
      setCurrentTrackIndex(index);
    }
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying((prev) => !prev);
  };

  const skipNext = () => {
    if (queue.length === 0 || currentTrackIndex === -1) return;
    const nextIndex = (currentTrackIndex + 1) % queue.length;
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

  //for scrubbing thr progress bar
  const seekAudio = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  };

  // runs whenever the volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // runs whenever the currentTrack changes
  useEffect(() => {
    if (!audioRef.current) return;

    const trackSrc = currentTrack?.src || currentTrack?.stream_url;
    if (trackSrc) {
      audioRef.current.src = trackSrc;
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

  // handle native audio events for time progress tracking
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleAudioEnded = () => {
      skipNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleAudioEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleAudioEnded);
    };
  }, [currentTrackIndex, queue]); //recalibrate listeners when queue sequence changes


  // play and pause
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
        duration,
        seekAudio,
        progress,
      }}
    >
      <audio ref={audioRef} />
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
