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
        primary: "#104050",         
        secondary: "#205668",       
        accent: "#E16652",         
        surface: "#ffffff",      
        border: "#8E8E8E",       
        muted: "#CBCBCB",          
        lightGray: "#D9D9D9",
        midGray: "#999999",
        darkGray: "#616161",
        darkestGray: "#242424",
        textPrimary: "#ffffff",    
        textSecondary: "#105050",   
      },
    },
  },
  plugins: [],
} satisfies Config;
