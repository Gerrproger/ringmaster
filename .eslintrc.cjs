module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: ['@babel/plugin-syntax-import-assertions'],
    },
  },
  extends: ['eslint:recommended'],
  rules: {
    'template-curly-spacing': 'off',
    'indent': 'off',
    'semi': ['error', 'always', { omitLastInOneLineBlock: true }],
    'quotes': ['warn', 'single'],
    'quote-props': ['warn', 'consistent-as-needed'],
    'object-shorthand': ['warn', 'properties'],
  },
};
