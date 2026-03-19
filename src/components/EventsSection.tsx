"use client";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

export default function EventsSection() {
  return (
    <section
      className="section-container min-h-screen py-20 transition-colors duration-500 bg-cream-50 dark:bg-neutral-950"
      id="events"
      style={{
        background: "var(--events-bg, linear-gradient(180deg, #FFFDF7 0%, #F0F4F0 50%, #FFFDF7 100%))",
      }}
    >
      <style jsx>{`
        section {
          --events-bg: linear-gradient(180deg, #FFFDF7 0%, #F0F4F0 50%, #FFFDF7 100%);
        }
        :global(.dark) section {
          --events-bg: linear-gradient(180deg, #0a0a0a 0%, #111811 50%, #0a0a0a 100%);
        }
      `}</style>
      <motion.div
        className="max-w-2xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-5xl sm:text-6xl text-gold-700 dark:text-gold-200 mb-4">
          Wedding Events
        </h2>
        <div className="gold-divider" />
        <p className="font-body text-lg text-gold-600/70 dark:text-gold-200/70 mt-4">
          Join us across these special celebrations
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {weddingData.events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="glass-card p-6 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group h-full">
              {/* Emoji */}
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {event.emoji}
              </div>

              {/* Event Name */}
              <h3 className="font-heading text-2xl font-semibold text-gold-800 dark:text-gold-100 mb-3">
                {event.name}
              </h3>

              {/* Gold line */}
              <div className="gold-divider mb-4" />

              {/* Details */}
              <div className="space-y-2 font-body text-gold-900/90 dark:text-gold-100/90 font-medium">
              <p className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 text-gold-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {event.date}
              </p>
              <p className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4 text-gold-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {event.time}
              </p>
              <p className="flex items-center justify-center gap-2 text-sm">
                <svg
                  className="w-4 h-4 text-gold-600 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {event.venue}
              </p>
            </div>

            <p className="font-body text-base text-gold-800/90 dark:text-gold-200/90 mt-4 italic font-medium">
              {event.description}
            </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
