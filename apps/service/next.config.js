/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path');
const createNextIntlPlugin = require('next-intl/plugin');
const { nanoid } = require('nanoid');
const withNextIntl = createNextIntlPlugin();

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
                ],
            },
        ];
    },
};

module.exports = withNextIntl(nextConfig);
