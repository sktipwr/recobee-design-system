import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ReviewShareCard = ({title = 'Review Share Card'}: any) => (
  <div style={{ width: 280, backgroundColor: '#121212', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #424242' }}>
    <div style={{ fontSize: 32, marginBottom: 12 }}>📤</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9' }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginTop: 8 }}>Shared via RecoBee</div>
  </div>
);

const meta: Meta<typeof ReviewShareCard> = {
  title: 'Cards/ReviewShareCard',
  component: ReviewShareCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Shareable review card\n\n**Source:** `src/components/Cards/ReviewShareCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ReviewShareCard>;

export const Default: Story = {};
