/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
  ],
  rules: {
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/multi-word-component-names': 'off',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
};
