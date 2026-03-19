"use client";
import { useState, useRef, useCallback, useEffect } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio("/until-song.mp3");
      audio.loop = true;
      audio.crossOrigin = "anonymous";
      
      // Standard volume (Works on Windows/Android/Mac Desktop, ignored on iOS)
      audio.volume = 0.1;
      audioRef.current = audio;

      try {
        // Enforce volume on ALL devices (including iOS) using Web Audio API
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const audioCtx = new AudioContext();
          const source = audioCtx.createMediaElementSource(audio);
          const gainNode = audioCtx.createGain();
          gainNode.gain.value = 0.1; // 10% volume
          
          source.connect(gainNode);
          gainNode.connect(audioCtx.destination);
        }
      } catch (e) {
        console.log("Web Audio API not supported or failed:", e);
      }

      // Attempt to play immediately upon mounting (since they clicked the envelope button already)
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }

    return () => {
      // Don't necessarily stop it on unmount because the player might persist
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => { });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <button
      onClick={toggleMusic}
      className="music-btn"
      aria-label={isPlaying ? "Pause music" : "Play music"}
      id="music-toggle"
    >
      {isPlaying ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
