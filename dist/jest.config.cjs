/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(t|j)sx?$': 'esbuild-jest'
    },
    testEnvironment: 'jsdom',
};
export {};
