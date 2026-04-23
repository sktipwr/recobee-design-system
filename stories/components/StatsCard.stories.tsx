import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const StatsCard = ({count = '127', label = 'Movies Watched', icon = '🎬'}: any) => (<div style={{ width: 160, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, textAlign: 'center' }}><div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 24, color: '#F8F8F9', marginBottom: 4 }}>{count}</div><div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#757575' }}>{label}</div></div>);

const meta: Meta<typeof StatsCard> = {
  title: 'Cards/StatsCard',
  component: StatsCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Statistics display card with count and label\n\n**Source:** `src/components/Cards/StatsCard.tsx`' } },
  },
  argTypes: { count: { control: 'text' }, label: { control: 'text' }, icon: { control: 'text' } },
  args: { count: '127', label: 'Movies Watched', icon: '🎬' },
};
export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Default: Story = {};
export const Reviews: Story = { args: { count: '45', label: 'Reviews Written', icon: '✍️' } };
