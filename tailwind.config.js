/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './component/**/*.{js,jsx,ts,tsx}',
        './module/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            boxShadow: {
                toggle: '0 3px 1px 0 rgba(0, 0, 0, 0,15)',
            },
            keyframes: {
                toggleOn: {
                    from: { transform: 'translate(0%, -50%)' },
                    to: { transform: 'translate(100%, -50%)' },
                },
                toggleOff: {
                    from: { transform: 'translate(100%, -50%)' },
                    to: { transform: 'translate(0%, -50%)' },
                },
            },
            animation: {
                toggleOn: 'toggleOn 0.5s forwards',
                toggleOff: 'toggleOff 0.5s forwards',
            },
        },
    },
    plugins: [],
};
