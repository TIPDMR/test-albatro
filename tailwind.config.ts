import type { Config } from 'tailwindcss';

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000',
  white: '#fff',
  sky: {
    DEFAULT: '#0299c8',
    dark: '#53bad9',
    light: '#45b3d6',
    lighter: '#1ca7d0',

    custom: '#59c2e0',
  },
  gray: {
    DEFAULT: '#9d9d9d',
    lighter: '#e5e5e5',
    darker: '#b2b2b2',
  },
};

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'tall': { 'raw': '(max-height: 500px)' },
        // => @media (min-height: 800px) { ... }
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
export default config;
