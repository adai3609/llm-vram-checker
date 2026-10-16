import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0a0f14', soft: '#0d141b' },
        surface: { DEFAULT: '#111a22', raised: '#18242e' },
        line: '#233240',
        neon: { emerald: '#34d399', cyan: '#22d3ee', amber: '#fbbf24' },
        mist: '#8fa3b0',
      },
      boxShadow: {
        'glow-emerald': '0 0 24px rgba(52, 211, 153, 0.18)',
        'glow-cyan': '0 0 24px rgba(34, 211, 238, 0.15)',
      },
      maxWidth: { content: '72rem' },
    },
  },
  plugins: [],
};

export default config;
