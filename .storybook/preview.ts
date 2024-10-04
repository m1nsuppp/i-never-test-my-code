import type { Preview } from '@storybook/react';
import '../app/globals.css'; // https://storybook.js.org/recipes/tailwindcss#2-provide-tailwind-to-stories

const preview: Preview = {
  parameters: {
    /** @see https://storybook.js.org/docs/get-started/frameworks/nextjs#set-nextjsappdirectory-to-true */
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
