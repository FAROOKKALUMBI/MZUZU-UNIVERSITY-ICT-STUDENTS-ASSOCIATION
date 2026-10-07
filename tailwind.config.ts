import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        muisa: {
          green: {
            DEFAULT: "#0B6B35",
            dark: "#07552A",
            light: "#128243",
            tint: "#0b6b35e6",
            overlay: "#0e6b36cc",
          },
          yellow: {
            DEFAULT: "#F6D365",
            gold: "#F8C84A",
            hover: "#eab308",
          },
          blue: {
            DEFAULT: "#1684C7",
            line: "#1982c4",
          },
          dark: "#172033",
          light: "#F7F8F6",
          navHover: "#eef5f0",
          navActive: "#f0f5f2",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
