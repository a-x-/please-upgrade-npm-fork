module.exports = {
  extends: ['plugin:node/recommended'],
  plugins: ['prettier', 'node'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ]
  }
}
