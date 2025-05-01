// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedDefaultConfig: true
});

module.exports = [
  // Подключаем рекомендуемые конфиги плагинов
  ...compat.extends(
    'plugin:@angular-eslint/recommended',
    'plugin:@angular-eslint/template/process-inline-templates',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),

  // Настройки для .ts-файлов
  {
    files: ['**/*.ts'],
    languageOptions: {
      // Передаём сам модуль парсера, а не путь к нему
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: ['./tsconfig.json'],
        createDefaultProgram: true
      }
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' }
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' }
      ]
    }
  },

  // Настройки для шаблонов .html
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template')
    },
    rules: {}
  },

  // Игнорируем служебные и билдовые папки
  {
    ignores: ['db.json', 'dist/**', 'node_modules/**', 'projects/**']
  }
];
