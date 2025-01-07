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
        metallic: {
          50: "#f7f7f7",
          100: "#f0f0f0",
          200: "#e4e4e4",
          300: "#d1d1d1",
          400: "#c0c0c0", // Base silver
          500: "#a9a9a9", // Sophisticated gray
          600: "#808080",
          700: "#666666",
          800: "#333333", // Deep charcoal
          900: "#1a1a1a",
        },
        gold: {
          50: "#fff9e6",
          100: "#ffedb3",
          200: "#ffe180",
          300: "#ffd54d",
          400: "#ffc91a",
          500: "#e6b800", // Base gold
          600: "#b38600",
          700: "#805c00",
          800: "#4d3300",
          900: "#1a0f00",
        },
      },
      backgroundImage: {
        "gradient-metallic":
          "linear-gradient(135deg, var(--tw-gradient-stops))",
        "gradient-shine":
          "linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
      },
      animation: {
        shine: "shine 1.5s ease-in-out infinite",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      boxShadow: {
        metallic: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 2px 0 rgba(255, 255, 255, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
