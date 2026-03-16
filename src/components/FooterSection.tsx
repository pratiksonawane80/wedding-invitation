"use client";
import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

export default function FooterSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    alpha: number;
    decay: number;
    gravity: number;
  }

  const particlesRef = useRef<Particle[]>([]);

  const colors = [
    "#FFD700",
    "#FF6B6B",
    "#FF69B4",
    "#FFA500",
    "#87CEEB",
    "#98FB98",
  ];

  const createFirework = useCallback(
    (x: number, y: number) => {
      const count = 30;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 3;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 2,
          alpha: 1,
          decay: 0.015 + Math.random() * 0.01,
          gravity: 0.05,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0.01);

    particlesRef.current.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Start animation
    animate();

    // Auto fireworks
    const interval = setInterval(() => {
      if (!canvas) return;
      const x = Math.random() * canvas.width;
      const y = 50 + Math.random() * (canvas.height * 0.4);
      createFirework(x, y);
    }, 2000);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
      clearInterval(interval);
    };
  }, [animate, createFirework]);

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden" id="footer">
      {/* Fireworks canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="font-display text-5xl sm:text-7xl text-gold-300 mb-4">
          {weddingData.couple.man} & {weddingData.couple.woman}
        </h2>
        <p className="font-heading text-xl text-gold-200/70 italic mb-2">
          {weddingData.couple.tagline}
        </p>
        <p className="font-body text-gold-300/50 tracking-widest uppercase text-sm">
          May 1, 2026
        </p>

        <div className="mt-8 w-40 h-px mx-auto bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

        <p className="font-body text-gold-400/40 text-sm mt-6">
          Made with 💛 for our special day
        </p>
      </motion.div>
    </section>
  );
}
