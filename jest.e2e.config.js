module.exports = {
	preset: "jest-puppeteer",
	clearMocks: true,
	globalSetup: "jest-environment-puppeteer/setup",
	globalTeardown: "jest-environment-puppeteer/teardown",
	testEnvironment: "jest-environment-puppeteer",
	transform: {
	  "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
	},
	moduleDirectories: ["node_modules", "src"],
	setupFilesAfterEnv: ["<rootDir>/jest/jestE2E.js"],
	
  };