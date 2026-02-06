module.exports = {
  'src/**/*.{js,jsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  'src/**/*.{css,json}': [
    'prettier --write'
  ]
};