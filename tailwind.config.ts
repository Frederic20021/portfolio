import type { Config } from "tailwindcss";
import Typograph from "@tailwindcss/typography";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx, mdx}",
    "./app/**/*.{js,ts,jsx,tsx, mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'inherit', // Ensure text inherits the color
            h1: {
              color: 'inherit',
            },
            a: {
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'inherit',
              },
            },
          },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    }
  },
  plugins: [
    Typograph
  ],
} satisfies Config;
