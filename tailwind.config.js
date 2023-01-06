/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#AD8B73',
      },
      backgroundColor: {
        brand: '#F8EDE3',
        brandBrown: '#AD8B73',
      },
      fontFamily: {
        gangwon: ['GangwonEdu_OTFBoldA', 'sans-serif'],
        pretendard: ['Pretendard-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
