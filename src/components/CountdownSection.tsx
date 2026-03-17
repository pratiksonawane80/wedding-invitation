"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculate = () => {
      const target = new Date(weddingData.weddingDate).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      className="section-container py-16 sm:py-20 px-4 transition-colors duration-500 bg-cream-50 dark:bg-neutral-950"
      id="countdown"
      style={{
        background: "var(--countdown-bg, linear-gradient(180deg, #FFFDF7 0%, #FFF9E6 50%, #FFFDF7 100%))",
      }}
    >
      <style jsx>{`
        section {
          --countdown-bg: linear-gradient(180deg, #FFFDF7 0%, #FFF9E6 50%, #FFFDF7 100%);
        }
        :global(.dark) section {
          --countdown-bg: linear-gradient(180deg, #0a0a0a 0%, #1a1a0a 50%, #0a0a0a 100%);
        }
      `}</style>
      <motion.div
        className="max-w-2xl mx-auto text-center w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-4xl sm:text-6xl text-gold-700 dark:text-gold-200 mb-4">
          Counting Down
        </h2>
        <div className="gold-divider" />
        <p className="font-body text-base sm:text-lg text-gold-600/70 dark:text-gold-200/70 mt-4 mb-8 sm:mb-12">
          Until we say &ldquo;I Do&rdquo;
        </p>

        <div className="flex items-center justify-center gap-2 sm:gap-6 w-full max-w-md mx-auto">
          {units.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="countdown-box"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <span className="font-heading text-2xl sm:text-5xl font-bold text-gold-700 dark:text-gold-300">
                {mounted
                  ? String(unit.value).padStart(2, "0")
                  : "--"}
              </span>
              <span className="font-body text-[10px] sm:text-sm text-gold-500 dark:text-gold-400 mt-1 uppercase tracking-wider">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="font-heading text-base sm:text-xl text-gold-600 dark:text-gold-300 mt-8 sm:mt-10 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          May 1, 2026 • Hyatt Place
        </motion.p>
      </motion.div>
    </section>
  );
}
