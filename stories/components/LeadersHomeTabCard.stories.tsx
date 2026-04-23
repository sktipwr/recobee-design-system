import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const LeadersHomeTabCard = ({title = 'Leaders Home Tab Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Leaderboard entry card on home</div>
  </div>
);

const meta: Meta<typeof LeadersHomeTabCard> = {
  title: 'Cards/LeadersHomeTabCard',
  component: LeadersHomeTabCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Leaderboard entry card on home\n\n**Source:** `src/components/Cards/LeadersHomeTabCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof LeadersHomeTabCard>;

export const Default: Story = {};
