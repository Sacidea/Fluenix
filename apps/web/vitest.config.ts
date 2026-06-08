import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node', // Change to jsdom or happy-dom if UI components are tested
    globals: true,
  },
});
