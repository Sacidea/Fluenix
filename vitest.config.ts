import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/**', '**/*.spec.ts', '**/*.e2e.ts', '.idea', '.git', '.cache'],
  },
});
