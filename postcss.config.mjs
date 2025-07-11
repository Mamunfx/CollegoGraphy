/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      extend:{
        fontfamily:{
          'amatic_SC' : ['var(--font-amatic']
        }
      }
    },
  },
};
export default config;