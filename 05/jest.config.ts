import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    roots: ['<rootDir>/src'],

    testMatch: ['**/__tests__/**/*.test.ts'],

    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/**/__tests__/**',
        '!src/**/types.ts',
        '!src/**/constants.ts',
        '!src/command/ICommand.ts',
        '!src/command/IUnexecutableCommand.ts',
        '!src/document/IDocument.ts',
        '!src/menu/commands/IMenuCommand.ts',
        '!src/index.ts',
        '!src/application/**',
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