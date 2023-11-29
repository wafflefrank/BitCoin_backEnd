module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'vue/multi-word-component-names': 'off', // 取消元件字數限制設定
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/no-unused-vars': 'error',
    'max-len': ['error', { code: 300 }],
    'linebreak-style': ['error', 'windows'],
  },
};
