import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const NewReviewCard = ({title = 'New Review Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>New review creation card</div>
  </div>
);

const meta: Meta<typeof NewReviewCard> = {
  title: 'Cards/NewReviewCard',
  component: NewReviewCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'New review creation card\n\n**Source:** `src/components/Cards/NewReviewCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof NewReviewCard>;

export const Default: Story = {};
