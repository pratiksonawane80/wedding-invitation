"use client";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

export default function WelcomeSection() {
  return (
    <section className="section-container bg-cream-50" id="welcome">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-5xl mb-6"
        >
          🙏
        </motion.div>

        <h2 className="font-display text-5xl sm:text-6xl text-gold-700 mb-4">
          Welcome
        </h2>
        <div className="gold-divider" />

        <p className="font-body text-xl sm:text-2xl text-gold-800/80 leading-relaxed mt-8 px-4">
          {weddingData.welcomeMessage}
        </p>

        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="text-center">
            <p className="font-display text-3xl text-gold-600">
              {weddingData.couple.man}
            </p>
            <p className="font-body text-sm text-gold-500/70 mt-1">
              {weddingData.couple.manParents}
            </p>
          </div>
          <div className="font-display text-4xl text-gold-400">&</div>
          <div className="text-center">
            <p className="font-display text-3xl text-gold-600">
              {weddingData.couple.woman}
            </p>
            <p className="font-body text-sm text-gold-500/70 mt-1">
              {weddingData.couple.womanParents}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
