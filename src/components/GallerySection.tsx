"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
  {
    id: 1,
    gradient: "linear-gradient(135deg, #fecdd3 0%, #f9a8c9 100%)",
    label: "Engagement Ceremony",
    icon: "💍",
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)",
    label: "Pre-wedding Shoot",
    icon: "📸",
  },
  {
    id: 3,
    gradient: "linear-gradient(135deg, #a8c5a8 0%, #7DAA7D 100%)",
    label: "Fun Moments",
    icon: "🎉",
  },
  {
    id: 4,
    gradient: "linear-gradient(135deg, #FFE8E8 0%, #FECDD3 100%)",
    label: "Together Forever",
    icon: "❤️",
  },
  {
    id: 5,
    gradient: "linear-gradient(135deg, #FFF0B3 0%, #FFD94D 100%)",
    label: "Ring Ceremony",
    icon: "💫",
  },
  {
    id: 6,
    gradient: "linear-gradient(135deg, #D4E0D4 0%, #A8C5A8 100%)",
    label: "Family Blessings",
    icon: "🙏",
  },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section
      className="section-container min-h-screen py-20"
      id="gallery"
      style={{
        background:
          "linear-gradient(180deg, #FFFDF7 0%, #FFF9E6 50%, #FFFDF7 100%)",
      }}
    >
      <motion.div
        className="max-w-2xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-5xl sm:text-6xl text-gold-700 mb-4">
          Our Gallery
        </h2>
        <div className="gold-divider" />
        <p className="font-body text-lg text-gold-600/70 mt-4">
          Moments we treasure
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
        {galleryImages.map((img, index) => (
          <motion.div
            key={img.id}
            className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-square"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedImage(img.id)}
          >
            <div
              className="w-full h-full flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-110"
              style={{ background: img.gradient }}
            >
              <span className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {img.icon}
              </span>
              <p className="font-heading text-sm text-white/90 font-medium px-2 text-center drop-shadow-md">
                {img.label}
              </p>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-lg w-[90%] aspect-square rounded-3xl overflow-hidden"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const img = galleryImages.find((i) => i.id === selectedImage);
                return img ? (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center"
                    style={{ background: img.gradient }}
                  >
                    <span className="text-8xl mb-4">{img.icon}</span>
                    <p className="font-heading text-2xl text-white/90 font-medium drop-shadow-lg">
                      {img.label}
                    </p>
                  </div>
                ) : null;
              })()}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
