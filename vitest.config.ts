import { defineConfig, mergeConfig } from 'vitest/config';
import { uiConfig } from './vitest.ui.config';
import reactPlugin from '@vitejs/plugin-react';

export default mergeConfig(
  uiConfig,
  defineConfig({
    plugins: [reactPlugin()],
    test: {
      setupFiles: ['vitest.setup.ts'],
    },
  }),
);
