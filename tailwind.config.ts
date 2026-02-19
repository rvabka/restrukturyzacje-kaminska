import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f5f5f5',
        dark: '#262a35',
        brighterDark: '#424547',
        gold: '#fcb900'
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif']
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms'
      }
    }
  },
  plugins: [typography],
  future: {
    hoverOnlyWhenSupported: true
  }
};

export default config;
