import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ActivityMovieCard = ({title = 'Dune: Part Two', year = '2024', activityType = 'Reviewed', userName = 'Ankit', time = '2h ago'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 8, padding: 12 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
      <span style={{ fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700, color: '#E9C638' }}>{activityType}</span>
      <span style={{ fontSize: 4, color: '#757575' }}>●</span>
      <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575' }}>{time}</span>
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ width: 51, height: 32, borderRadius: 3, backgroundColor: '#424242' }} />
      <div>
        <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9' }}>{title}</div>
        <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#9E9E9E' }}>{year}</span>
      </div>
    </div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#BDBDBD', marginTop: 8 }}>{userName} reviewed this movie</div>
  </div>
);

const meta: Meta<typeof ActivityMovieCard> = {
  title: 'Cards/ActivityMovieCard',
  component: ActivityMovieCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Movie card shown in social activity feed\n\n**Source:** `src/components/Cards/ActivityMovieCard.tsx`',
      },
    },
  },
  argTypes: { title: { control: 'text' }, year: { control: 'text' }, activityType: { control: 'text' }, userName: { control: 'text' }, time: { control: 'text' } },
};
export default meta;
type Story = StoryObj<typeof ActivityMovieCard>;

export const Default: Story = {};
