import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "bgRed":  "#9A031E",
        "bgGray": "#F2F4F8",
        "textGray": "#909394",
        "textGreen": "#3E5D3E",
        "textRed": "#9A031E",
        "buttonGreen": "#D4DBD4",
        "buttonRed": "#EBCDD2",
        "primary": "#F57E20",
        "secondary": "#F3DCCD"
      },
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      },
    },
  },
  plugins: [],
};
export default config;
