module.exports = {
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  plugins: ['prettier', 'node'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ],
    'no-console': 0
  }
}
