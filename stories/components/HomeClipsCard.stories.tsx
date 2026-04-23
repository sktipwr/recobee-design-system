import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const HomeClipsCard = ({title = 'Home Clips Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Short video clips card on home</div>
  </div>
);

const meta: Meta<typeof HomeClipsCard> = {
  title: 'Cards/HomeClipsCard',
  component: HomeClipsCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Short video clips card on home\n\n**Source:** `src/components/Cards/HomeClipsCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof HomeClipsCard>;

export const Default: Story = {};
