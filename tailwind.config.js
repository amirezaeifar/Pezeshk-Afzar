/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: { extend: {} },
  plugins: [require('daisyui')],
  daisyui: {
    // Single custom theme derived from the three brand colors —
    // keeps DaisyUI's built-in blue palettes (corporate/cupcake) out of the CSS.
    themes: [
      {
        pezeshkafzar: {
          primary: '#FF925C',
          'primary-content': '#002900',
          secondary: '#2E5B2E',
          'secondary-content': '#F5F5E5',
          accent: '#FF925C',
          'accent-content': '#002900',
          neutral: '#002900',
          'neutral-content': '#F5F5E5',
          'base-100': '#F5F5E5',
          'base-200': '#ECECD3',
          'base-300': '#E0E0C4',
          'base-content': '#002900',
          info: '#2E5B2E',
          success: '#2E5B2E',
          warning: '#FF925C',
          error: '#B25324',
        },
      },
    ],
  },
}
