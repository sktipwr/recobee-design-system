import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const PreferredOTTsCard = ({title = 'Preferred O T Ts Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Preferred OTT platforms display</div>
  </div>
);

const meta: Meta<typeof PreferredOTTsCard> = {
  title: 'Cards/PreferredOTTsCard',
  component: PreferredOTTsCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Preferred OTT platforms display\n\n**Source:** `src/components/Cards/PreferredOTTsCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof PreferredOTTsCard>;

export const Default: Story = {};
