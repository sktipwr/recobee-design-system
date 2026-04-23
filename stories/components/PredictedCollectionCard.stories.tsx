import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const PredictedCollectionCard = ({title = 'Predicted Collection Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Predicted box office collection card</div>
  </div>
);

const meta: Meta<typeof PredictedCollectionCard> = {
  title: 'Cards/PredictedCollectionCard',
  component: PredictedCollectionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Predicted box office collection card\n\n**Source:** `src/components/Cards/PredictedCollectionCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PredictedCollectionCard>;

export const Default: Story = {};
