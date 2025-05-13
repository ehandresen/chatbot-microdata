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
        lightBlueAccent: "#80ced8",
        lightDarkBlueAccent: "#4eafc3",
        secondary: "#215768",
        primary: "#104050",
        textSecondary: "#104050",
        darkestGray: "#242424",
        darkGray: "#616161",
        border: "#8E8E8E",
        midGray: "#999999",
        muted: "#CBCBCB",
        lightGray: "#D9D9D9",
        surface: "#ffffff",
        textPrimary: "#ffffff",
        accent: "#e94f35",
        darkAccent: "#bf3522",  
      },
    },
  },
  plugins: [],
} satisfies Config;
