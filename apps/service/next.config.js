/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path');
const createNextIntlPlugin = require('next-intl/plugin');
const { nanoid } = require('nanoid');
const { GetParametersCommand, SSMClient } = require('@aws-sdk/client-ssm');
const withNextIntl = createNextIntlPlugin();

const googleParameters = [
    { name: '/skillnavi/google_client_id', envName: 'GOOGLE_CLIENT_ID' },
    { name: '/skillnavi/google_secret', envName: 'GOOGLE_SECRET' },
];

async function loadGoogleParameters() {
    const client = new SSMClient({});

    try {
        const { Parameters = [] } = await client.send(
            new GetParametersCommand({
                Names: googleParameters.map(({ name }) => name),
                WithDecryption: true,
            }),
        );
        const values = new Map(Parameters.map(({ Name, Value }) => [Name, Value]));
        const missing = googleParameters.filter(({ name }) => !values.get(name));

        if (missing.length > 0) {
            throw new Error(
                `[parameter-store] Missing required parameters: ${missing.map(({ name }) => name).join(', ')}`,
            );
        }

        for (const { name, envName } of googleParameters) {
            process.env[envName] = values.get(name);
        }
    } catch (error) {
        if (error instanceof Error && error.message.startsWith('[parameter-store]')) {
            throw error;
        }

        const errorName = error instanceof Error ? error.name : 'UnknownError';
        throw new Error(
            `[parameter-store] Failed to load Google OAuth parameters (${errorName}). Check AWS region, credentials, and SSM access.`,
        );
    } finally {
        client.destroy();
    }
}

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
                source: '/(.*?)',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    {
                        key: 'Access-Control-Allow-Origin',
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

module.exports = async () => {
    await loadGoogleParameters();
    return withNextIntl(nextConfig);
};
