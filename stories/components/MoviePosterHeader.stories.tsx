import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const MoviePosterHeader = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Movie Poster Header</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Large movie poster header</div>
  </div>
);

const meta: Meta<typeof MoviePosterHeader> = {
  title: 'Components/MoviePosterHeader',
  component: MoviePosterHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Large movie poster header\n\n**Source:** `src/components/Common/MoviePosterHeader.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MoviePosterHeader>;

export const Default: Story = {};
