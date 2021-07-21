module.exports = {
  "roots": [
    "<rootDir>"
  ],
  "testMatch": [
    "<rootDir>/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testEnvironment": "node",
  collectCoverage: true,
  coveragePathIgnorePatterns: ['src/utils.ts', 'src/grids'],
  coverageReporters: ['lcov', 'html', 'text'],
}
