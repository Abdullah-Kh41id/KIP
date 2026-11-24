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
        background: "var(--background)",
        foreground: "var(--foreground)",
        kip: {
          void: "var(--kip-void)",
          surface: "var(--kip-surface)",
          elevated: "var(--kip-elevated)",
          border: "var(--kip-border)",
          cream: "var(--kip-cream)",
          muted: "var(--kip-muted)",
          gold: "var(--kip-gold)",
          amber: "var(--kip-amber)",
          ink: "var(--kip-ink)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
