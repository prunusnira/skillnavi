/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path');
const createNextIntlPlugin = require('next-intl/plugin');
const { nanoid } = require('nanoid');
const withNextIntl = createNextIntlPlugin();

const cspHeader = `
        default-src 'self' 'https://accounts.google.com/gsi/';
        connect-src 'self' 'https://accounts.google.com/gsi/';
        script-src 'self' 'strict-dynamic' 'https://accounts.google.com/gsi/client';
        style-src 'self' 'https://accounts.google.com/gsi/style';
        frame-src 'self' 'https://accounts.google.com/gsi/';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'self' 'https://nira.one' 'https://sin.nira.one';
        upgrade-insecure-requests;
    `;

// Replace newline characters and spaces
const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
    generateBuildId: async () => {
        return nanoid();
    },
    outputFileTracingRoot: path.join(__dirname, '../../'),
    transpilePackages: ['@skillnavi/ui'],
    images: {
        domains: [
            'img.nira.one',
        ],
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    {
                        key: 'Access-Control-Allow-Origin',
                        // value: 'https://p.eagate.573.jp',
                        value: '*',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,DELETE,PATCH,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: contentSecurityPolicyHeaderValue,
                    },
                ],
            },
        ];
    },
};

module.exports = withNextIntl(nextConfig);
