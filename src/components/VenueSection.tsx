"use client";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

export default function VenueSection() {
  return (
    <section className="section-container min-h-screen py-20 bg-cream-50" id="venue">
      <motion.div
        className="max-w-2xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-5xl sm:text-6xl text-gold-700 mb-4">
          The Venue
        </h2>
        <div className="gold-divider" />
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="glass-card overflow-hidden">
          {/* Map */}
          <div className="w-full h-64 sm:h-80 bg-sage-100 relative">
            <iframe
              src={weddingData.venue.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Map"
            />
          </div>

          {/* Details */}
          <div className="p-8 text-center">
            <h3 className="font-heading text-3xl font-semibold text-gold-800 mb-2">
              {weddingData.venue.name}
            </h3>
            <p className="font-body text-lg text-gold-600/70 mb-6">
              {weddingData.venue.address}
            </p>

            <a
              href={weddingData.venue.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-heading text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #d4a017, #8B6914)",
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Open in Maps
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
