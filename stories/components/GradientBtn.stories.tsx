import React from 'react';
import { StarFilledIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface GradientBtnProps {
  text: string;
  width: number;
  height: number;
  radius: number;
  onPress: () => void;
}

const GradientBtn = ({ text, width = 200, height = 48, radius = 20, onPress }: GradientBtnProps) => (
  <button
    onClick={onPress}
    style={{
      width, height, borderRadius: radius,
      background: 'linear-gradient(90deg, #F9FE11, #FACC15, #FF9A3D)',
      border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 16,
      color: '#424242', transition: 'opacity 0.2s',
    }}
  >
    {text} <StarFilledIcon color='#424242' width={14} height={14} />
  </button>
);

const meta: Meta<typeof GradientBtn> = {
  title: 'Components/GradientBtn',
  component: GradientBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Primary call-to-action button with a yellow-to-orange gradient background. Used for main actions like "Get Started", "Upgrade to Premium", etc.\n\n**Source:** `src/components/Common/GradientBtn.tsx`',
      },
    },
  },
  argTypes: {
    text: { control: 'text', description: 'Button label text' },
    width: { control: { type: 'range', min: 100, max: 400, step: 10 }, description: 'Button width in pixels' },
    height: { control: { type: 'range', min: 32, max: 80, step: 4 }, description: 'Button height in pixels' },
    radius: { control: { type: 'range', min: 0, max: 40, step: 2 }, description: 'Border radius in pixels' },
    onPress: { action: 'pressed', description: 'Callback on press' },
  },
};
export default meta;
type Story = StoryObj<typeof GradientBtn>;

export const All: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <GradientBtn {...args} text="Get Started" width={200} height={48} />
      <GradientBtn {...args} text="Explore Now" width={300} height={52} radius={26} />
      <GradientBtn {...args} text="Upgrade to Premium" width={340} height={48} />
    </div>
  ),
  args: { text: 'Get Started', width: 200, height: 48, radius: 20 },
};

export const Default: Story = {
  args: { text: 'Get Started', width: 200, height: 48, radius: 20 },
};

export const Wide: Story = {
  args: { text: 'Explore Now', width: 300, height: 52, radius: 26 },
};

export const FullWidth: Story = {
  args: { text: 'Upgrade to Premium', width: 360, height: 48, radius: 20 },
};

export const Small: Story = {
  args: { text: 'Try', width: 100, height: 36, radius: 18 },
};
