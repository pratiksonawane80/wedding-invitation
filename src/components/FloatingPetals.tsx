"use client";
import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const colors = [
      "radial-gradient(ellipse, #f9a8c9 0%, #f472b6 60%, transparent 70%)",
      "radial-gradient(ellipse, #fecdd3 0%, #fda4af 60%, transparent 70%)",
      "radial-gradient(ellipse, #fde68a 0%, #fbbf24 60%, transparent 70%)",
      "radial-gradient(ellipse, #fca5b0 0%, #fb7185 60%, transparent 70%)",
    ];
    const generated: Petal[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 8,
      size: 8 + Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setPetals(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: "50% 0 50% 0",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}
