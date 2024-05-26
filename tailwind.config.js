/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'felt': "url('/felt.jpg')",
      }),
      animation: {
        slideIn: 'slideIn .2s ease-in-out forwards',
        slideOut: 'slideOut .2s ease-in-out forwards'
      },
      keyframes: {
               slideIn: {
                 '0%': { transform: 'translateX(-100%)', opacity: '0' },
                 '100%': { transform: 'translateX(0)', opacity: '1' }
               },
               slideOut: {
                 '0%': { transform: 'translateX(0)', opacity: '1' },
                 '100%': { transform: 'translateX(100%)', opacity: '0' }
               }
      }
    }
  },
  variants: {
    extend: {
      animation: ['responsive', 'motion-safe', 'motion-reduce']
    }
  },
  plugins: [],
}