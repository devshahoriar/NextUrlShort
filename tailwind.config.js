/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1240px',
      },
    },
    colors: {
      primary: '#57CA42',
      secondry: '#6F83FF',
      third: '#466075',
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
    },
  },
  plugins: [],
}
