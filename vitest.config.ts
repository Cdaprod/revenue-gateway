/**
 * Vitest configuration for the monorepo.
 *
 * Usage:
 *   npm test
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['packages/**/src/**/*.test.ts', 'apps/**/lib/**/*.test.ts'],
  },
});
