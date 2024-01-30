// module.exports = {
//     type 
//     collectCoverage: true,
//     collectCoverageFrom: [
//       "src/**/*.js", // Adjust based on your project structure
//     ],
//     coverageReporters: ["lcov", "text-summary"],
//   };
  module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.js", // Adjust based on your project structure
    ],
    coverageReporters: ["lcov", "text-summary"],
  };
  
  // jest.config.js
// jest.config.js
// module.exports = {
//     // ... other Jest configurations ...
//     transform: {},
//     extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
//     testEnvironment: 'node',
//     setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
//     transformIgnorePatterns: ['<rootDir>/node_modules/(?!esm)'],
//   };
  