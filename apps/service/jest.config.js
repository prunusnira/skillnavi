import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
};

async function hackJestConfig() {
    // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
    const nextJestConfig = await createJestConfig(customJestConfig)();
    // /node_modules/ is the first pattern, so overwrite it with the correct version
    nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!next-intl)/';
    return nextJestConfig;
}

export default hackJestConfig;
