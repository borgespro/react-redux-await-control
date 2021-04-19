module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: { jsx: true, tsx: true },
  },
  plugins: ['@typescript-eslint', 'jest', 'react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, minProperties: 3 },
        ObjectPattern: { multiline: true },
        ImportDeclaration: { multiline: true, minProperties: 3 },
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'no-empty-function': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
  },
  settings: { 'import/resolver': { node: { extensions: ['.js', '.ts', '.jsx', '.tsx'] } } },
};
