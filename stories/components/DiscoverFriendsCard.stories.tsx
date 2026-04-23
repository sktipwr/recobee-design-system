import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const DiscoverFriendsCard = ({title = 'Discover Friends Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Friend suggestion/discovery card</div>
  </div>
);

const meta: Meta<typeof DiscoverFriendsCard> = {
  title: 'Cards/DiscoverFriendsCard',
  component: DiscoverFriendsCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Friend suggestion/discovery card\n\n**Source:** `src/components/Cards/DiscoverFriendsCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DiscoverFriendsCard>;

export const Default: Story = {};
