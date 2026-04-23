import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const CastMeterCard = ({title = 'Cast Meter Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Cast popularity meter visualization</div>
  </div>
);

const meta: Meta<typeof CastMeterCard> = {
  title: 'Cards/CastMeterCard',
  component: CastMeterCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Cast popularity meter visualization\n\n**Source:** `src/components/Cards/CastMeterCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CastMeterCard>;

export const Default: Story = {};
