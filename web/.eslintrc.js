require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    es2020: true
  },
  ignorePatterns: [
    'node_modules/',
    '.eslintrc.js'
  ],
  extends: [
    //'@common', // There's a plugin conflict with 'import'
    'react-app',
    'react-app/jest',
  ],
  rules: {
    "semi": 'off',
    "indent": 'off',
    "import/no-duplicates": 'off'
  }
};
