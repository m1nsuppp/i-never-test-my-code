import { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '@/app/_components/navigation';

const meta: Meta<typeof Navigation> = {
  component: Navigation,
};

export default meta;

type Story = StoryObj<typeof Navigation>;

export const Home: Story = {
  render: () => {
    return <Navigation />;
  },
};

export const About: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/about', // https://storybook.js.org/docs/get-started/frameworks/nextjs#overriding-defaults-1
      },
    },
  },
};

export const Contact: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/contact', // https://storybook.js.org/docs/get-started/frameworks/nextjs#overriding-defaults-1
      },
    },
  },
};
