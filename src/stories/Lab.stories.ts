import type { Meta, StoryObj } from '@storybook/react';
import Lab from '@src/components/Lab/Lab';

const meta = {
  title: 'Example/Lab',
  component: Lab,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Lab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
