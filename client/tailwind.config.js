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
            backgroundSize: {
                // auto: 'auto',
                // cover: 'cover',
                // contain: 'contain',
                // '50%': '50%',
                big: '30rem',
                xl: '40rem',
                small: '20rem',
            },
            fontFamily: {
                bai: ['bai-jamjuree', 'sans-serif'],
            },
            screens: {
                xsm: '510px',
                smd: '700px',
                '2xsm': '365px',
            },
            colors: {
                secondary: '#54428E',
                primary: '#000000',
                neutral: '#FDFFFC',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'scale(100%)' },
                    '50%': { transform: 'scale(0%)' },
                },
            },
            animation: {
                wiggle: 'wiggle 2s ease-in-out infinite',
            },
            backgroundImage: {
                'vector-pattern': "url('../public/vector-shape-1.svg')",
                'no-transaction': "url('../public/noTransaction.svg')",
            },
        },
    },
    plugins: [
        require("prettier-plugin-tailwindcss"),
    ],
};
