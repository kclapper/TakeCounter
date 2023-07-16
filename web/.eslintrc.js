module.exports = {
  ignorePatterns: [
    'node_modules/',
    '.eslintrc.js'
  ],
  extends: [
    'semistandard',
    '../common.eslintrc.js',
    'react-app',
    'react-app/jest'
  ],
  rules: {
    "semi": 'off',
    "indent": 'off',
    "import/no-duplicates": 'off'
  }
}
