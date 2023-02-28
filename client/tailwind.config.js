/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                bai: ['bai-jamjuree', 'sans-serif'],
            },
            screens: {
                xsm: '510px',
                smd: '700px',
                '2xsm': '300px',
            },
            colors: {
                secondary: '#54428E',
                primary: '#000000',
                neutral: '#FDFFFC',
            },
        },
    },
    plugins: [],
};
