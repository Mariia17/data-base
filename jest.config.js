export default {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageReporters: ["lcov"],
  roots: ["<rootDir>/src/"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/node_modules/"
  ],
  testMatch: [
    "<rootDir>/src/**/*.test.ts"
  ],
  collectCoverage: true
};
