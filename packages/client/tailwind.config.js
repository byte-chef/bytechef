/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      serif: ['Merriweather', 'serif'],
      mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco'],
    },
    // screens: {
    //   phone: '400px',
    //   tablet: '640px',
    //   laptop: '1024px',
    // },
    extend: {
      colors: {
        light: '#f1dabf',
        custom_white: 'fffbff',
        custom_red: '#8D4147',
        custom_beige: '#92817a',
        custom_gray: '#88929E',
        custom_dark: '#04030f',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
