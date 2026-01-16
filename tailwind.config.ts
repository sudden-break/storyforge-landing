import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ig: {
          orange: '#F58529',
          pink: '#DD2A7B',
          purple: '#8134AF',
          blue: '#515BD4',
        },
        bg: {
          primary: '#0D0D0D',
          secondary: '#1A1A1A',
          card: '#222222',
          hover: '#2A2A2A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
          muted: '#6B6B6B',
        },
        electric: {
          blue: '#00D4FF',
        },
        success: {
          green: '#00D26A',
        },
        error: {
          red: '#FF4757',
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 20% 50%, rgba(245, 133, 41, 0.15), transparent 50%), radial-gradient(circle at 80% 50%, rgba(221, 42, 123, 0.15), transparent 50%), radial-gradient(circle at 50% 100%, rgba(129, 52, 175, 0.1), transparent 50%)',
      },
    },
  },
  plugins: [],
};

export default config;
