module.exports = {
  root: true,
  ignorePatterns: ['node_modules/'],
  env: {
    jest: true
  },
  extends: 'semistandard',
  rules: {
    "comma-dangle": 'off',
    quotes: 'off',
    "space-before-function-paren": 'off',
    yoda: 'off'
  }
};
