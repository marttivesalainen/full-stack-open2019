module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: 'react-app',
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    eqeqeq: true
  }
};
