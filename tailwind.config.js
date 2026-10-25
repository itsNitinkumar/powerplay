/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        airbnb: ['Airbnb Cereal', 'Circular', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'airbnb-red': '#FF385C',
        'airbnb-rausch': '#FF385C',
        'airbnb-babu': '#00A699',
        'airbnb-arches': '#FC642D',
        'airbnb-hof': '#484848',
        'airbnb-foggy': '#767676',
        'airbnb-border': '#DDDDDD',
        'airbnb-background': '#F7F7F7',
      },
      borderRadius: {
        'airbnb': '12px',
        'pill': '50px',
      },
      boxShadow: {
        'airbnb': '0 6px 20px rgba(0,0,0,0.10)',
        'airbnb-hover': '0 6px 20px rgba(0,0,0,0.20)',
        'card': '0 2px 16px rgba(0,0,0,0.12)',
        'header': '0 1px 0 rgba(0,0,0,0.08)',
      },
      maxWidth: {
        'content': '1120px',
        'wide': '1280px',
      },
    },
  },
  plugins: [],
}
