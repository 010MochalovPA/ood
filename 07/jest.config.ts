import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    roots: ['<rootDir>/src'],

    testMatch: ['**/__tests__/*.test.ts'],

    collectCoverageFrom: [
        '!src/**/*.d.ts',
        '!src/**/__tests__/**',
    ],

    coverageDirectory: 'coverage',

    coverageReporters: ['text', 'html', 'lcov'],

    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
};

export default config;