import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const HomeMovieCard = ({title = 'Home Movie Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Main movie card on home screen with poster, rating, actions</div>
  </div>
);

const meta: Meta<typeof HomeMovieCard> = {
  title: 'Cards/HomeMovieCard',
  component: HomeMovieCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Main movie card on home screen with poster, rating, actions\n\n**Source:** `src/components/Cards/HomeMovieCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof HomeMovieCard>;

export const Default: Story = {};
