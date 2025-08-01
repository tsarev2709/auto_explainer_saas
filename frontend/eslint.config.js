import patch from '@rushstack/eslint-patch/modern-module-resolution.js';
import next from 'eslint-config-next';

patch();

export default [
  {
    ignores: ['node_modules/**'],
  },
  next,
];
