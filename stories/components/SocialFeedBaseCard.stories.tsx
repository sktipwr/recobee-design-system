import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const SocialFeedBaseCard = ({title = 'Social Feed Base Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Base card for social feed items</div>
  </div>
);

const meta: Meta<typeof SocialFeedBaseCard> = {
  title: 'Cards/SocialFeedBaseCard',
  component: SocialFeedBaseCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Base card for social feed items\n\n**Source:** `src/components/Cards/SocialFeedBaseCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SocialFeedBaseCard>;

export const Default: Story = {};
