// eslint-disable-next-line @typescript-eslint/no-require-imports

module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './common/**/*.{js,jsx,ts,tsx}',
        './feature/**/*.{js,jsx,ts,tsx}',
        './lib/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require('@skillnavi/tailwind-config')],
    darkMode: 'class',
};

/** @type {import('tailwindcss').Config} */
