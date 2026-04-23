import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const PredictionMeterCard = ({title = 'Prediction Meter Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Box office prediction meter</div>
  </div>
);

const meta: Meta<typeof PredictionMeterCard> = {
  title: 'Cards/PredictionMeterCard',
  component: PredictionMeterCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Box office prediction meter\n\n**Source:** `src/components/Cards/PredictionMeterCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PredictionMeterCard>;

export const Default: Story = {};
