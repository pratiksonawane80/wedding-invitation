import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FFF9E6",
          100: "#FFF0B3",
          200: "#FFE680",
          300: "#FFD94D",
          400: "#FFCC1A",
          500: "#D4A017",
          600: "#B8860B",
          700: "#8B6914",
          800: "#5E4A1D",
          900: "#3D2E0A",
        },
        blush: {
          50: "#FFF5F5",
          100: "#FFE8E8",
          200: "#FECDD3",
          300: "#FCA5B0",
          400: "#F87189",
          500: "#E11D48",
        },
        sage: {
          50: "#F0F4F0",
          100: "#D4E0D4",
          200: "#A8C5A8",
          300: "#7DAA7D",
          400: "#5A8F5A",
          500: "#3E6B3E",
        },
        cream: {
          50: "#FFFDF7",
          100: "#FFF9E8",
          200: "#FFF3D1",
          300: "#FFEDBA",
        },
      },
      fontFamily: {
        display: ["'Great Vibes'", "cursive"],
        heading: ["'Playfair Display'", "serif"],
        body: ["'Cormorant Garamond'", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "petal-fall": "petalFall 10s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 160, 23, 0.4)" },
          "50%": { boxShadow: "0 0 0 20px rgba(212, 160, 23, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        petalFall: {
          "0%": { transform: "translateY(-10%) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(100vh) rotate(720deg)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
