import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const SocialFeedCard = ({title = 'Social Feed Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Full social feed post card</div>
  </div>
);

const meta: Meta<typeof SocialFeedCard> = {
  title: 'Cards/SocialFeedCard',
  component: SocialFeedCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Full social feed post card\n\n**Source:** `src/components/Cards/SocialFeedCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SocialFeedCard>;

export const Default: Story = {};
