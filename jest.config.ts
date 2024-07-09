import type {Config} from "jest";


const config: Config = {
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest"
  }
};

export default config;
