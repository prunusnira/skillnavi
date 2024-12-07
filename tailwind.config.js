/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './component/**/*.{js,jsx,ts,tsx}',
        './module/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                xs: '480px',
            },
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
                posX: {
                    from: {
                        'background-position-x': '0',
                    },
                    to: {
                        'background-position-x': '100%',
                    },
                },
            },
            animation: {
                toggleOn: 'toggleOn 0.5s forwards',
                toggleOff: 'toggleOff 0.5s forwards',
                posX: 'posX 5s forwards linear infinite alternate',
            },
            transitionProperty: {
                left: 'left',
                right: 'right',
            },
            backgroundImage: {
                skill8500: `linear-gradient(
                                to right,
                                #ff5a5a,
                                #ff8a5a,
                                #ffff00,
                                #00ff00,
                                #5acbff,
                                #a500ff,
                                #ff5a5a,
                                #ff8a5a,
                                #ffff00,
                                #00ff00,
                                #5acbff
                            )`,
            },
        },
    },
    plugins: [],
};
