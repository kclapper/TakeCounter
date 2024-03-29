require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  ignorePatterns: [
    'node_modules/',
  ],
  extends: '@common'
};
