/** @type {import('tailwindcss').Config} */

const colors = {
  brand: {
    50: '#f9f5ed',
    100: '#f1e6d0',
    200: '#e4cda4',
    300: '#d4ad70',
    400: '#c69048', // dataxquad color
    500: '#b77d3b',
    600: '#9d6131',
    700: '#7e492a',
    800: '#6a3c29',
    900: '#5c3427',
    950: '#341b14',
  },
  grey: {
    50: '#f7f7f7',
    100: '#f3f3f3',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#cbcbcb',
    500: '#b4b4b4',
    600: '#9ca3af',
    700: '#838383',
    800: '#6d6d6d',
    900: '#5e5e5e',
    950: '#363636',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#431407',
  },
  yellow: {
    500: '#eab308',
  },
  green: {
    500: '#22c55e',
  },
  brandBlue: {
    50: '#5580A0',
    100: '#32435F',
  },
};

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1920px',
    },
    colors,
  },
  plugins: [],
  safelist: [
    // 'bg-brand-400',
    // 'text-brand-400',
    {
      pattern:
        /(bg|text|border)-(brand|grey)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
};

export { colors };
