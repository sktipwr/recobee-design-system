import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface BadgeProps {
  count: number;
  name: string;
  textColor: string;
}

const Badge = ({ count, name, textColor = '#FFFFFF' }: BadgeProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 96, color: textColor }}>
    <div style={{ fontSize: 24, fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>
      {String(count).padStart(2, '0')}
    </div>
    <div style={{ fontSize: 12, fontFamily: 'DM Sans, sans-serif', fontWeight: 400, textAlign: 'center', width: 72 }}>
      {name}
    </div>
  </div>
);

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Stat counter badge showing a zero-padded count and label. Used on profile screens for Watched, Reviews, Watchlist, Lists counts.\n\n**Source:** `src/components/Cards/Badge.tsx`',
      },
    },
  },
  argTypes: {
    count: { control: { type: 'number', min: 0, max: 999 } },
    name: { control: 'text' },
    textColor: { control: 'color' },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Badge count={12} name="Watched" textColor="#FFFFFF" />
      <Badge count={3} name="Reviews" textColor="#FFFFFF" />
      <Badge count={47} name="Watchlist" textColor="#FFFFFF" />
      <Badge count={8} name="Lists" textColor="#FFFFFF" />
    </div>
  ),
};

export const Default: Story = {
  args: { count: 12, name: 'Watched' },
};

export const LowCount: Story = {
  args: { count: 3, name: 'Reviews' },
};

export const HighCount: Story = {
  args: { count: 247, name: 'Watchlist' },
};
