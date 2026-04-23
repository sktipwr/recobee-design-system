import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const VideoReviewCard = ({title = 'Video Review Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Video review card</div>
  </div>
);

const meta: Meta<typeof VideoReviewCard> = {
  title: 'Cards/VideoReviewCard',
  component: VideoReviewCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Video review card\n\n**Source:** `src/components/Cards/VideoReviewCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof VideoReviewCard>;

export const Default: Story = {};
