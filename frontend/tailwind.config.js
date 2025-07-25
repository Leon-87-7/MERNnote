import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.{js,jsx,ts,tsx}', // Nested folders
    './pages/**/*.{js,jsx,ts,tsx}', // If you have a pages folder
  ],
  // safelist: [
  //   'grid',
  //   'grid-cols-1',
  //   'grid-cols-2',
  //   'grid-cols-3',
  //   'md:grid-cols-2',
  //   'lg:grid-cols-3',
  //   'gap-6',
  // ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['forest', 'sunset'],
  },
};
