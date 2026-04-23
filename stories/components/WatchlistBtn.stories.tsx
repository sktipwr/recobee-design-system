import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const WatchlistBtn = ({label = 'Watchlist'}: any) => (
  <button style={{ padding: '8px 20px', borderRadius: 8, backgroundColor: '#E9C638', border: 'none', fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#121212', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
    {label}
  </button>
);

const meta: Meta<typeof WatchlistBtn> = {
  title: 'Components/WatchlistBtn',
  component: WatchlistBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'WatchlistBtn component from the RecoBee mobile app\n\n**Source:** `src/components/Common/WatchlistBtn.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof WatchlistBtn>;

export const Default: Story = {};
