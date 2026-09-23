/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#f7f5ff', 100: '#efeaff', 500: '#7c3aed', 600: '#6d28d9', 700: '#5b21b6', 900: '#2e1065' }
      },
      boxShadow: { phone: '0 30px 80px rgba(44, 22, 82, .24)' }
    }
  },
  plugins: []
}
