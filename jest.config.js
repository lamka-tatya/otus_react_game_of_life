module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/jest/localstorage.js"],
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'],
  transform: {
	"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
	"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js"
  },
  moduleNameMapper: {
	"\\.(css|less)$": "<rootDir>/jest/styleMock.js",
	"^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["e2e"],
};
