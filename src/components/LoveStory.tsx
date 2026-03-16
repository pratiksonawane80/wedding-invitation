"use client";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

export default function LoveStory() {
  return (
    <section
      className="section-container min-h-screen py-20"
      id="love-story"
      style={{
        background:
          "linear-gradient(180deg, #FFFDF7 0%, #FFF5F5 50%, #FFFDF7 100%)",
      }}
    >
      <motion.div
        className="max-w-2xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-5xl sm:text-6xl text-gold-700 mb-4">
          Our Love Story
        </h2>
        <div className="gold-divider" />
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-lg mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-300 to-transparent sm:transform sm:-translate-x-px" />

        {weddingData.story.map((item, index) => (
          <motion.div
            key={index}
            className={`relative flex items-start mb-12 ${
              index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-6 sm:left-1/2 w-3 h-3 rounded-full bg-gold-500 border-4 border-cream-50 transform -translate-x-1.5 sm:-translate-x-1.5 mt-6 z-10 shadow-md" />

            {/* Card */}
            <div
              className={`ml-14 sm:ml-0 sm:w-[calc(50%-30px)] ${
                index % 2 === 0 ? "sm:pr-8" : "sm:pl-8"
              }`}
            >
              <div className="glass-card p-6 hover:shadow-lg transition-shadow duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-100 text-gold-700 font-heading text-sm font-semibold mb-3">
                  {item.year}
                </span>
                <h3 className="font-heading text-xl font-semibold text-gold-800 mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-gold-700/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
