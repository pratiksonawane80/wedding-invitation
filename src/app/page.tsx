"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingScreen from "@/components/LandingScreen";
import FloatingPetals from "@/components/FloatingPetals";
// import ScrollMusicPlayer from "@/components/ScrollMusicPlayer";
import WelcomeSection from "@/components/WelcomeSection";
// import LoveStory from "@/components/LoveStory";
import EventsSection from "@/components/EventsSection";
import VenueSection from "@/components/VenueSection";
// import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import CountdownSection from "@/components/CountdownSection";
// import ShareSection from "@/components/ShareSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <main className="relative">
      {/* Landing Screen Overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <LandingScreen onOpen={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Invitation Content */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <FloatingPetals />
          {/* <ScrollMusicPlayer /> */}

          {/* Navigation dots */}
          <nav className="fixed right-3 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3">
            {[
              { id: "welcome", label: "Welcome" },
              // { id: "love-story", label: "Our Story" },
              { id: "events", label: "Events" },
              { id: "venue", label: "Venue" },
              // { id: "gallery", label: "Gallery" },
              { id: "countdown", label: "Countdown" },
              { id: "rsvp", label: "RSVP" },
              // { id: "share", label: "Share" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-center gap-2"
                title={item.label}
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-heading text-gold-600 dark:text-gold-300 bg-white/80 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                  {item.label}
                </span>
                <span className="block w-2.5 h-2.5 rounded-full bg-gold-300/50 dark:bg-gold-500/30 group-hover:bg-gold-500 dark:group-hover:bg-gold-400 group-hover:scale-150 transition-all duration-300 border border-gold-400/30" />
              </a>
            ))}
          </nav>

          <WelcomeSection />
          {/* <LoveStory /> */}
          <CountdownSection />
          <EventsSection />
          <VenueSection />
          {/* <GallerySection /> */}
          <RSVPSection />
          {/* <ShareSection /> */}
          <FooterSection />
        </motion.div>
      )}
    </main>
  );
}
