import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const AIReviewCard = ({rating = 8.2, movieTitle = 'Inception', review = 'A mind-bending masterpiece that challenges reality...'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, border: '1px solid #424242' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <div style={{ width: 28, height: 28, borderRadius: 14, background: 'linear-gradient(135deg, #F9FE11, #FF9A3D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'DM Sans' }}>AI</div>
      <span style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9' }}>AI Review</span>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ color: '#E9C638', fontSize: 14 }}>★</span>
        <span style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9' }}>{rating}</span>
      </div>
    </div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', marginBottom: 8 }}>{movieTitle}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#9E9E9E', lineHeight: '20px' }}>{review}</div>
  </div>
);

const meta: Meta<typeof AIReviewCard> = {
  title: 'Cards/AIReviewCard',
  component: AIReviewCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'AI-generated movie review summary card\n\n**Source:** `src/components/Cards/AIReviewCard.tsx`',
      },
    },
  },
  argTypes: { rating: { control: 'number' }, movieTitle: { control: 'text' }, review: { control: 'text' } },
};
export default meta;
type Story = StoryObj<typeof AIReviewCard>;

export const Default: Story = {};
