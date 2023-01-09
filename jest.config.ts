import { pathsToModuleNameMapper } from 'ts-jest';

import type { Config } from '@jest/types';

import { compilerOptions } from './tsconfig.json';

export default {
    bail: true,
    clearMocks: true,
    collectCoverageFrom: [
        '<rootDir>/src/modules/**/*.ts',
        '!<rootDir>/src/modules/**/dtos/*.ts',
        '!<rootDir>/src/modules/**/repositories/*.ts',
        '!<rootDir>/src/modules/**/repositories/*.ts',
        '!<rootDir>/src/modules/tickets/utils/*.ts',
        '!<rootDir>/src/modules/users/mapper/*.ts',
        '!<rootDir>/src/modules/users/utils/*.ts',
        '<rootDir>/src/shared/providers/httpClient/implementations/*.ts',
        '<rootDir>/src/shared/providers/logger/implementations/*.ts',
        '<rootDir>/src/shared/services/**/implementations/*.ts',
    ],

    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['text-summary', 'lcov'],
    coverageThreshold: {
        global: {
            statements: 50,
            branches: 50,
            functions: 33,
            lines: 19,
        },
    },
    transform: {
        '^.+\\.(t|j)s$': [
            '@swc/jest',
            {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: false,
                        decorators: true,
                    },
                    target: 'es2017',
                    keepClassNames: true,
                    transform: {
                        legacyDecorator: true,
                        decoratorMetadata: true,
                    },
                },
                module: {
                    type: 'es6',
                    noInterop: false,
                },
            },
        ],
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src',
    }),
    preset: 'ts-jest',
    setupFiles: ['dotenv/config', 'reflect-metadata'],
    testRegex: '.*\\.spec\\.ts$',
    testPathIgnorePatterns: ['/node_modules/'],
} as Config.InitialOptions;
