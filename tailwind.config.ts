import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        text_12: "12px",
        text_13: "13px",
        text_14: "14px",
        text_16: "16px",
        text_18: "18px",
        text_20: "20px",
        text_24: "24px",
        text_25: "25px",
        text_30: "30px",
        text_35: "35px",
        text_40: "40px",
        text_50: "50px",
        text_60: "60px",
      },
      colors: {

        primaryColor: "#4796BD",
        secondaryColor: "#7CB1D0",

        textPrimary: "#4796BD", // for Primary text
        textSecondary: "#7CB1D0", // for secondary text
        textMuted: "#636A80", // for Muted text

        success: "#42943B", // for Success text
        danger: "#EA3325", // for Danger text
        rating: "#F5C242",
      },
    },
  },
  plugins: [],
} satisfies Config;
