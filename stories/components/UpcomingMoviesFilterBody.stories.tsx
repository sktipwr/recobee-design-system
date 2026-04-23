import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const UpcomingMoviesFilterBody = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Upcoming Movies Filter Body</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>UpcomingMoviesFilterBody component from the RecoBee mobile app</div>
  </div>
);

const meta: Meta<typeof UpcomingMoviesFilterBody> = {
  title: 'Components/UpcomingMoviesFilterBody',
  component: UpcomingMoviesFilterBody,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'UpcomingMoviesFilterBody component from the RecoBee mobile app\n\n**Source:** `src/components/Common/UpcomingMoviesFilterBody.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof UpcomingMoviesFilterBody>;

export const Default: Story = {};
