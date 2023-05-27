/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco'],
    },
    screens: {
      phone: '400px',
      tablet: '640px',
      laptop: '1024px',
    },
    extend: {
      colors: {
        light: '#F2EEE5',
        custom_red: '#8D4147',
        custom_beige: '#F2DBB3',
        custom_gray: '#88929E',
        custom_dark: '#222021',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
