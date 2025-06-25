module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'DM Sans', 'sans-serif']
    },
    extend: {
      colors: {
        text: '#1a1a1a',
        accent: '#2d9cdb',
        background: '#ffffff',
        muted: '#f9f9f9',
        darkgray: '#2d2d2d'
      },
      fontSize: {
        heading: ['32px', '40px'],
        body: ['18px', '28px']
      },
      spacing: {
        section: '80px'
      },
      borderRadius: {
        DEFAULT: '6px'
      },
      boxShadow: {
        card: '0 2px 10px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  plugins: []
}
