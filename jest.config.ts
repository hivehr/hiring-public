import { InitialOptionsTsJest } from "ts-jest/dist/types";
import baseConfig from "./jest.config.base";

const settings: InitialOptionsTsJest = {
    ...baseConfig,
    roots: ["<rootDir>"],
    modulePaths: ["<rootDir>"],
    projects: ["packages/*"],
    globals: {
        "ts-jest": {
            tsconfig: "./tsconfig.test.json"
        }
    }
};

export default settings;
