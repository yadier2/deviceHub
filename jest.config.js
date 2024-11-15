module.exports = {
    preset: 'ts-jest', 
    testEnvironment: 'node',  
    testMatch: ['**/tests/**/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  };