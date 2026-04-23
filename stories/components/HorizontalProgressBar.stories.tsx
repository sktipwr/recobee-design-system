import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const HorizontalProgressBar = ({progress = 0.6}: any) => (<div style={{ width: 60, height: 3, backgroundColor: '#121212', overflow: 'hidden' }}><div style={{ width: (progress*100)+'%', height: '100%', backgroundColor: '#E9C638' }} /></div>);

const meta: Meta<typeof HorizontalProgressBar> = {
  title: 'Components/HorizontalProgressBar',
  component: HorizontalProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Simple horizontal progress bar\n\n**Source:** `src/components/Common/HorizontalProgressBar.tsx`' } },
  },
  argTypes: { progress: { control: { type: 'range', min: 0, max: 1, step: 0.1 } } },
  args: { progress: 0.6 },
};
export default meta;
type Story = StoryObj<typeof HorizontalProgressBar>;

export const Default: Story = {};
export const Full: Story = { args: { progress: 1 } };
