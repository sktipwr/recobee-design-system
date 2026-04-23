import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const Circle = ({size = 24, color = '#E9C638'}: any) => (<div style={{ width: size, height: size, borderRadius: size/2, backgroundColor: color }} />);

const meta: Meta<typeof Circle> = {
  title: 'Components/Circle',
  component: Circle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Simple circular colored indicator\n\n**Source:** `src/components/Common/Circle.tsx`' } },
  },
  argTypes: { size: { control: { type: 'range', min: 8, max: 64 } }, color: { control: 'color' } },
  args: { size: 24, color: '#E9C638' },
};
export default meta;
type Story = StoryObj<typeof Circle>;

export const Default: Story = {};
export const Small: Story = { args: { size: 12, color: '#388E3C' } };
