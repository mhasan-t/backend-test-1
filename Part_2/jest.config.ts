/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/*.test.ts"],
	verbose: true,
	forceExit: true,
	modulePaths: ["<rootDir>"],
};
