import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul', // Use istanbul instead of v8
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.spec.ts',
        '**/*.module.ts',
        '**/*.dto.ts',
        '**/*.entity.ts',
        '**/*.enum.ts',
      ],
      // Istanbul-specific options
      all: true,
    },
  },
});
