import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const GradientText = ({text = 'Premium Feature'}: any) => (<span style={{ background: 'linear-gradient(90deg, #F9FE11, #FACC15, #FF9A3D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16 }}>{text}</span>);

const meta: Meta<typeof GradientText> = {
  title: 'Components/GradientText',
  component: GradientText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Text with gradient color effect\n\n**Source:** `src/components/Common/GradientText.tsx`' } },
  },
  argTypes: { text: { control: 'text' } },
  args: { text: 'Premium Feature' },
};
export default meta;
type Story = StoryObj<typeof GradientText>;

export const Default: Story = {};
