import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#c9a84c',
        purple: '#6b3fa0',
        jetblack: '#1a1a1a',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      backgroundImage: {
        'gold-purple-gradient': 'linear-gradient(135deg, #c9a84c 0%, #6b3fa0 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
