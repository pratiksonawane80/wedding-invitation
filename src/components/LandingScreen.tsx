"use client";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";
import MandalaDecoration from "./MandalaDecoration";

interface LandingScreenProps {
  onOpen: () => void;
}

export default function LandingScreen({ onOpen }: LandingScreenProps) {
  return (
    <motion.section
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #FFF9E6 0%, #FFF5F5 30%, #FFFDF7 60%, #F0F4F0 100%)",
      }}
    >
      {/* Mandala decorations */}
      <div className="absolute top-[-80px] left-[-80px]">
        <MandalaDecoration size={350} />
      </div>
      <div className="absolute bottom-[-80px] right-[-80px]">
        <MandalaDecoration size={350} />
      </div>

      {/* Floral corner decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M0,0 Q100,20 80,100 Q60,50 0,80 Z"
            fill="#a8c5a8"
          />
          <circle cx="30" cy="30" r="15" fill="#f9a8c9" opacity="0.5" />
          <circle cx="60" cy="50" r="10" fill="#fde68a" opacity="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M0,0 Q100,20 80,100 Q60,50 0,80 Z"
            fill="#a8c5a8"
          />
          <circle cx="30" cy="30" r="15" fill="#f9a8c9" opacity="0.5" />
          <circle cx="60" cy="50" r="10" fill="#fde68a" opacity="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="text-center z-10 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="font-body text-gold-600 text-lg tracking-[0.3em] uppercase mb-4">
            You are cordially invited
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="font-display text-6xl sm:text-8xl text-gold-700 mb-2">
            {weddingData.couple.man}
          </h1>
          <div className="flex items-center justify-center gap-4 my-3">
            <div className="gold-divider flex-1 max-w-[60px]" />
            <span className="font-display text-3xl text-gold-500">&</span>
            <div className="gold-divider flex-1 max-w-[60px]" />
          </div>
          <h1 className="font-display text-6xl sm:text-8xl text-gold-700 mb-6">
            {weddingData.couple.woman}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="font-heading text-xl text-gold-800/70 italic mb-2">
            {weddingData.couple.tagline}
          </p>
          <p className="font-body text-gold-600 text-lg tracking-wider mb-10">
            May 1, 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button
            onClick={onOpen}
            id="open-invitation-btn"
            className="relative px-10 py-4 rounded-full font-heading text-lg tracking-wider text-white overflow-hidden group transition-all duration-500"
            style={{
              background: "linear-gradient(135deg, #d4a017, #8B6914)",
            }}
          >
            <span className="relative z-10">Open Invitation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 animate-pulse-gold rounded-full" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
