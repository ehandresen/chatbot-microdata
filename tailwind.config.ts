import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#104050",         // Dark Blue (headers, buttons)
        secondary: "#205668",       // Lighter Blue
        accent: "#E16652",          // Salmon (calls to action)
        surface: "#ffffff",         // White background
        border: "#8E8E8E",          // Border lines
        muted: "#CBCBCB",           // Light gray (e.g., dots)
        lightGray: "#D9D9D9",
        midGray: "#999999",
        darkGray: "#616161",
        darkestGray: "#242424",
        textPrimary: "#ffffff",     // White text
        textSecondary: "#105050",   // Dark blue text
      },
    },
  },
  plugins: [],
} satisfies Config;
