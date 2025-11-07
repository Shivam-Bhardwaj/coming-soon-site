const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
  },
  testMatch: ['**/tests/**/*.test.(ts|tsx)'],
}

module.exports = createJestConfig(customJestConfig)

