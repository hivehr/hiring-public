import { InitialOptionsTsJest } from "ts-jest/dist/types";

const settings: InitialOptionsTsJest = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src"],
    modulePaths: ["<rootDir>/src"],
    modulePathIgnorePatterns: ["__fixtures__", "__tests__/test-data"],
    collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx"],
    maxWorkers: "50%"
};

export default settings;
