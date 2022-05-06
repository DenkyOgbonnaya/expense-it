module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    '@react-native-community/eslint-config',
    'standard-with-typescript',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    'react-native/react-native': true,
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'warn',
        'react-native/no-unused-styles': 'warn',
        'react-native/no-inline-styles': 'error',
        'react-native/no-raw-text': [
          'warn',
          {
            skip: ['CustomText'],
          },
        ],
        'react-native/no-single-element-style-arrays': 'warn',
        'object-curly-spacing': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/require-array-sort-compare': [
          'error',
          {
            ignoreStringArrays: true,
          },
        ],
        'react/jsx-curly-spacing': [
          'error',
          {
            when: 'always',
            allowMultiline: true,
            children: true,
          },
        ],
        'eol-last': ['error', 'always'],
        'no-multiple-empty-lines': 'error',
        semi: ['error', 'never'],
        // Indent with 2 spaces
        indent: ['error', 2],
        // Indent JSX with 2 spaces
        'react/jsx-indent': ['error', 2],
        // Indent props with 2 spaces
        'react/jsx-indent-props': ['error', 2],
      },
    },
  ],
};
