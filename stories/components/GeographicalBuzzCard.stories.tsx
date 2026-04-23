import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const GeographicalBuzzCard = ({title = 'Geographical Buzz Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Geographic buzz/trending map card</div>
  </div>
);

const meta: Meta<typeof GeographicalBuzzCard> = {
  title: 'Cards/GeographicalBuzzCard',
  component: GeographicalBuzzCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Geographic buzz/trending map card\n\n**Source:** `src/components/Cards/GeographicalBuzzCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof GeographicalBuzzCard>;

export const Default: Story = {};
