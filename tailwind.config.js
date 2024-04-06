/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-main': 'linear-gradient(123deg, #670240 10.79%, #780446 32.82%, #710345 42.55%, #370738 75.63%, #190932 96.4%)',
        'gradient-button': 'linear-gradient(115deg, rgba(244, 0, 116, 0.70) 33.92%, rgba(37, 19, 81, 0.70) 99.86%)',
        'gradient-white': 'linear-gradient(rgba(255, 255, 255, 255) , rgba(255, 255, 255,255))',
        'gradient-purple': 'linear-gradient(115deg, rgba(80, 45, 159, 0.40) 33.92%, rgba(244, 0, 116, 0.17) 99.86%)',
        'gradient-banner-green': 'linear-gradient(180deg, #E3F1D3 0%, #CAE4F5 100%)',
        'gradient-hotitem': 'linear-gradient(90deg, #FFEBBF 0%, #FDB4E7 100%)',
        'gradient-button-purple': 'linear-gradient(90deg, #B900BB 4.81%, #921CF5 93.37%)',
        qyellow: 'linear-gradient(90deg, #B900BB 4.81%, #921CF5 93.37%)'
      },
      colors: {
        primarygray: '#f8f8f8',
        qblack: '#222222',
        qyellow: '#B901BB',
        qyellowlow: '#F9F3E7',
        qred: '#D32F2F',
        qgray: '#797979',
        qblacktext: '#1D1D1D',
        qgraytwo: '#8E8E8E',
        'qgray-border': '#EFEFEF',
        'qblue-white': '#CBECFF',
        'qh2-green': '#2D6F6D',
        'primary-3': '#68727D',
        'primary-4': '#B901BB',
        'primary-5': '#FF415533',
        'primary-6': '#E4C1FE',
        'primary-7': '#F80492',
        'primary-8': '#921CF5',
        black: '#011032',
        'black-2': '#02001D',
        green: '#43E353',
        yellow: '#B901BB',
        white: '#FFFFFF',
        error: '#D32F2F',
        icon: '#D1D0D0',
        line: '#ECEBEB',
        'text-900': '#333A42',
        'text-700': '#757575',
        'text-500': '#C4C4C4',
        'text-400': '#68727D',
        main: '#F1F3F8',
        grayMobile: '#C8CBD7'
      }
    }
  },
  plugins: []
};
