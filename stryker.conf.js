/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  mutate: ["src/**/*.ts?(x)", "!src/**/*@(.test|.spec|Spec).ts?(x)"],
  mutator: "typescript",
  tsconfigFile: "tsconfig.json",
  testRunner: "jest",
  reporters: ["progress", "clear-text", "html"],
  coverageAnalysis: "off",
  packageManager: "npm",
};
