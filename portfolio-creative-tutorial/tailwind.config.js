// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ["var(--font-urbanist)", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(210, 20%, 85%)",
            "--tw-prose-headings": "hsl(210, 25%, 95%)",
            "--tw-prose-links": "hsl(45, 100%, 60%)",
            "--tw-prose-bold": "hsl(210, 25%, 95%)",
            "--tw-prose-counters": "hsl(45, 100%, 60%)",
            "--tw-prose-bullets": "hsl(45, 100%, 60%)",
          },
        },
      },
    },
  },
};
