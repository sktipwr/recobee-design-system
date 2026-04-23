import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const PointsRewardsEntryCard = ({title = 'Points Rewards Entry Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Points/rewards entry card</div>
  </div>
);

const meta: Meta<typeof PointsRewardsEntryCard> = {
  title: 'Cards/PointsRewardsEntryCard',
  component: PointsRewardsEntryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Points/rewards entry card\n\n**Source:** `src/components/Cards/PointsRewardsEntryCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PointsRewardsEntryCard>;

export const Default: Story = {};
