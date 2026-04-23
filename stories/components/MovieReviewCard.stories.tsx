import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const MovieReviewCard = ({title = 'Movie Review Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Full movie review card with rating and text</div>
  </div>
);

const meta: Meta<typeof MovieReviewCard> = {
  title: 'Cards/MovieReviewCard',
  component: MovieReviewCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Full movie review card with rating and text\n\n**Source:** `src/components/Cards/MovieReviewCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MovieReviewCard>;

export const Default: Story = {};
