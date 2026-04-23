import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const TrailerReactionCard = ({title = 'Trailer Reaction Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Trailer reaction/review card</div>
  </div>
);

const meta: Meta<typeof TrailerReactionCard> = {
  title: 'Cards/TrailerReactionCard',
  component: TrailerReactionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Trailer reaction/review card\n\n**Source:** `src/components/Cards/TrailerReactionCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof TrailerReactionCard>;

export const Default: Story = {};
