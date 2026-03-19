"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "1",
    attending: "yes",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="section-container min-h-screen py-20 transition-colors duration-500 bg-cream-50 dark:bg-neutral-950"
      id="rsvp"
      style={{
        background: "var(--rsvp-bg, linear-gradient(180deg, #FFFDF7 0%, #FFF5F5 50%, #FFFDF7 100%))",
      }}
    >
      <style jsx>{`
        section {
          --rsvp-bg: linear-gradient(180deg, #FFFDF7 0%, #FFF5F5 50%, #FFFDF7 100%);
        }
        :global(.dark) section {
          --rsvp-bg: linear-gradient(180deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%);
        }
      `}</style>
      <motion.div
        className="max-w-2xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-5xl sm:text-6xl text-gold-700 dark:text-gold-200 mb-4">
          RSVP
        </h2>
        <div className="gold-divider" />
        <p className="font-body text-lg text-gold-600/70 dark:text-gold-200/70 mt-4">
          Kindly let us know if you can make it
        </p>
      </motion.div>

      <motion.div
        className="max-w-md mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {submitted ? (
          <motion.div
            className="glass-card p-10 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="text-6xl mb-4">💝</div>
            <h3 className="font-heading text-2xl text-gold-700 dark:text-gold-200 mb-2">
              Thank You!
            </h3>
            <p className="font-body text-gold-600/70 dark:text-gold-200/70">
              We&apos;ve received your response. We can&apos;t wait to celebrate
              with you!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm font-body">
                {error}
              </div>
            )}

            <div>
              <label className="font-heading text-sm text-gold-700 dark:text-gold-300 mb-1 block font-medium">
                Your Name *
              </label>
              <input
                type="text"
                required
                className="rsvp-input"
                style={{ colorScheme: "dark" }}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
                id="rsvp-name"
              />
            </div>

            <div>
              <label className="font-heading text-sm text-gold-700 dark:text-gold-300 mb-1 block font-medium">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                maxLength={10}
                pattern="[0-9]{10}"
                className="rsvp-input"
                style={{ colorScheme: "dark" }}
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;

                  // Allow only digits and max 10 length
                  if (/^\d{0,10}$/.test(value)) {
                    setFormData({ ...formData, phone: value });
                  }
                }}
                placeholder="9876543210"
                id="rsvp-phone"
              />
            </div>

            <div>
              <label className="font-heading text-sm text-gold-700 dark:text-gold-300 mb-1 block font-medium">
                Number of Guests
              </label>
              <select
                className="rsvp-input appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em]"
                style={{
                  colorScheme: "dark",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4a017' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`
                }}
                value={formData.guests}
                onChange={(e) =>
                  setFormData({ ...formData, guests: e.target.value })
                }
                id="rsvp-guests"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n} className="dark:bg-neutral-900">
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-heading text-sm text-gold-700 dark:text-gold-300 mb-2 block font-medium">
                Will you attend?
              </label>
              <div className="flex gap-4">
                {["yes", "no"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, attending: val })
                    }
                    className={`flex-1 py-3 rounded-xl font-heading text-sm transition-all duration-300 ${formData.attending === val
                        ? "bg-gold-500 text-white shadow-md"
                        : "bg-gold-50 dark:bg-gold-900/20 text-gold-600 dark:text-gold-300 hover:bg-gold-100 dark:hover:bg-gold-900/30"
                      }`}
                  >
                    {val === "yes"
                      ? "🎉 Joyfully Accept"
                      : "😢 Regretfully Decline"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-heading text-sm text-gold-700 dark:text-gold-300 mb-1 block font-medium">
                Message for the Couple
              </label>
              <textarea
                className="rsvp-input min-h-[100px] resize-none"
                style={{ colorScheme: "dark" }}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Your blessings and wishes..."
                id="rsvp-message"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full font-heading text-lg text-white transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
              style={{
                background: "linear-gradient(135deg, #d4a017, #8B6914)",
              }}
              id="rsvp-submit"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="3"
                      strokeDasharray="31.4 31.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send RSVP"
              )}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
