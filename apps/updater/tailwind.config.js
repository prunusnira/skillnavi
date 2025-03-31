const commonConfig = require('@skillnavi/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    presets: [commonConfig],
};
