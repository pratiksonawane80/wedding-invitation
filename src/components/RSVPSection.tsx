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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call — replace with your backend/Google Sheets endpoint
    await new Promise((r) => setTimeout(r, 1500));
    console.log("RSVP Data:", formData);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section
      className="section-container min-h-screen py-20"
      id="rsvp"
      style={{
        background:
          "linear-gradient(180deg, #FFFDF7 0%, #FFF5F5 50%, #FFFDF7 100%)",
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
          RSVP
        </h2>
        <div className="gold-divider" />
        <p className="font-body text-lg text-gold-600/70 mt-4">
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
            <h3 className="font-heading text-2xl text-gold-700 mb-2">
              Thank You!
            </h3>
            <p className="font-body text-gold-600/70">
              We&apos;ve received your response. We can&apos;t wait to celebrate
              with you!
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
            <div>
              <label className="font-heading text-sm text-gold-700 mb-1 block">
                Your Name *
              </label>
              <input
                type="text"
                required
                className="rsvp-input"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
                id="rsvp-name"
              />
            </div>

            <div>
              <label className="font-heading text-sm text-gold-700 mb-1 block">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                className="rsvp-input"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+91 98765 43210"
                id="rsvp-phone"
              />
            </div>

            <div>
              <label className="font-heading text-sm text-gold-700 mb-1 block">
                Number of Guests
              </label>
              <select
                className="rsvp-input"
                value={formData.guests}
                onChange={(e) =>
                  setFormData({ ...formData, guests: e.target.value })
                }
                id="rsvp-guests"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-heading text-sm text-gold-700 mb-2 block">
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
                    className={`flex-1 py-3 rounded-xl font-heading text-sm transition-all duration-300 ${
                      formData.attending === val
                        ? "bg-gold-500 text-white shadow-md"
                        : "bg-gold-50 text-gold-600 hover:bg-gold-100"
                    }`}
                  >
                    {val === "yes" ? "🎉 Joyfully Accept" : "😢 Regretfully Decline"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-heading text-sm text-gold-700 mb-1 block">
                Message for the Couple
              </label>
              <textarea
                className="rsvp-input min-h-[100px] resize-none"
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
