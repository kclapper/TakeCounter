require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true
  },
  ignorePatterns: [
    'node_modules/',
    'dist/**/',
    '*.yml'
  ],
  extends: '@common'
};
