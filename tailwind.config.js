module.exports = {
  purge: [],
  darkMode: 'media', // or 'media' or 'class' or false
  theme: {
    extend: {
      transform: ['hover']
    },
  },
  content: [
    "./src/**/*.{html, ts}",
  ],
  variants: {
    extend: {},
  },
  plugins: [],
}
