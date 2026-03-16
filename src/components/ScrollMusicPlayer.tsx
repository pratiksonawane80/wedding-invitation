"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Section-to-track mapping
// Place your MP3 files in /public/music/
const SECTION_TRACKS: Record<string, { src: string; label: string }> = {
  welcome: { src: "/music/instrumental.mp3", label: "✨ Instrumental" },
  countdown: { src: "/music/instrumental.mp3", label: "✨ Instrumental" },
  "love-story": {
    src: "/music/raataan-lambiyan.mp3",
    label: "🎵 Raataan Lambiyan",
  },
  events: {
    src: "/music/events-instrumental.mp3",
    label: "🎶 Light Instrumental",
  },
  venue: { src: "/music/kesariya.mp3", label: "💛 Kesariya" },
  gallery: { src: "/music/kesariya.mp3", label: "💛 Kesariya" },
  rsvp: { src: "/music/din-shagna-da.mp3", label: "💍 Din Shagna Da" },
  share: { src: "/music/din-shagna-da.mp3", label: "💍 Din Shagna Da" },
  footer: { src: "/music/din-shagna-da.mp3", label: "💍 Din Shagna Da" },
};

const FADE_DURATION = 1500; // ms
const FADE_STEPS = 30;

export default function ScrollMusicPlayer() {
  const audioPoolRef = useRef<Record<string, HTMLAudioElement>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string>("");
  const [toastLabel, setToastLabel] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const isPlayingRef = useRef(false);
  const currentTrackRef = useRef("");
  const fadingRef = useRef(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep refs in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  // Get or create an audio element for a given src
  const getAudio = useCallback((src: string): HTMLAudioElement => {
    if (!audioPoolRef.current[src]) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0;
      audio.preload = "auto";
      audioPoolRef.current[src] = audio;
    }
    return audioPoolRef.current[src];
  }, []);

  // Fade an audio element's volume from current to target
  const fadeVolume = useCallback(
    (audio: HTMLAudioElement, from: number, to: number): Promise<void> => {
      return new Promise((resolve) => {
        const stepTime = FADE_DURATION / FADE_STEPS;
        const stepSize = (to - from) / FADE_STEPS;
        let step = 0;

        const interval = setInterval(() => {
          step++;
          const newVol = Math.max(0, Math.min(1, from + stepSize * step));
          audio.volume = newVol;

          if (step >= FADE_STEPS) {
            clearInterval(interval);
            audio.volume = Math.max(0, Math.min(1, to));
            resolve();
          }
        }, stepTime);
      });
    },
    []
  );

  // Crossfade from old track to new track
  const crossfade = useCallback(
    async (newSrc: string, label: string) => {
      if (fadingRef.current) return;
      if (newSrc === currentTrackRef.current) return;

      fadingRef.current = true;
      const oldSrc = currentTrackRef.current;

      // Update state
      setCurrentTrack(newSrc);

      // Show toast
      setToastLabel(label);
      setShowToast(true);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = setTimeout(() => setShowToast(false), 2500);

      if (!isPlayingRef.current) {
        fadingRef.current = false;
        return;
      }

      const newAudio = getAudio(newSrc);

      // Fade out old
      if (oldSrc && audioPoolRef.current[oldSrc]) {
        const oldAudio = audioPoolRef.current[oldSrc];
        fadeVolume(oldAudio, oldAudio.volume, 0).then(() => {
          oldAudio.pause();
        });
      }

      // Fade in new
      newAudio.volume = 0;
      try {
        await newAudio.play();
      } catch {
        // Autoplay blocked — user will need to tap play
      }
      await fadeVolume(newAudio, 0, 0.3);

      fadingRef.current = false;
    },
    [getAudio, fadeVolume]
  );

  // Intersection Observer for sections
  useEffect(() => {
    const sectionIds = Object.keys(SECTION_TRACKS);
    const observers: IntersectionObserver[] = [];

    // Small delay to ensure DOM sections exist
    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                const track = SECTION_TRACKS[id];
                if (track) {
                  crossfade(track.src, track.label);
                }
              }
            });
          },
          { threshold: [0.4] }
        );

        observer.observe(el);
        observers.push(observer);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
    };
  }, [crossfade]);

  // Toggle play/pause
  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      // Pause all audio
      Object.values(audioPoolRef.current).forEach((a) => {
        a.pause();
      });
      setIsPlaying(false);
    } else {
      // Resume current track
      setIsPlaying(true);
      const src = currentTrackRef.current;
      if (src) {
        const audio = getAudio(src);
        audio.volume = 0.3;
        audio.play().catch(() => {});
      } else {
        // Default: start with first track
        const first = SECTION_TRACKS["welcome"];
        if (first) {
          setCurrentTrack(first.src);
          const audio = getAudio(first.src);
          audio.volume = 0.3;
          audio.play().catch(() => {});
        }
      }
    }
  }, [isPlaying, getAudio]);

  return (
    <>
      {/* Song name toast */}
      <AnimatePresence>
        {showToast && isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-20 right-4 z-50 px-4 py-2 rounded-full text-sm font-heading text-gold-800 shadow-lg"
            style={{
              background: "rgba(255, 253, 247, 0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(212, 160, 23, 0.3)",
            }}
          >
            {toastLabel}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play/Pause button */}
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
    </>
  );
}
