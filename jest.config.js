module.exports = {
    transform: {
      "^.+\\.(tsx?|js)$": "ts-jest",
    },
    // testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.{js,ts}"
    ],
    moduleFileExtensions: [
      "ts",
      "js",
      "json",
    ]
  };
  