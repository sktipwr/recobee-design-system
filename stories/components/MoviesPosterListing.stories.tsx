import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const MoviesPosterListing = (props: any) => (
  <div style={{ width: 343 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9', marginBottom: 12 }}>Movies Poster Listing</div>
    {[1,2,3].map((i: number) => (
      <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #424242' }}>
        <div style={{ width: 50, height: 72, borderRadius: 6, backgroundColor: '#424242', flexShrink: 0 }} />
        <div>
          <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9' }}>Item {i}</div>
          <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginTop: 4 }}>Subtitle text</div>
        </div>
      </div>
    ))}
  </div>
);

const meta: Meta<typeof MoviesPosterListing> = {
  title: 'Lists/MoviesPosterListing',
  component: MoviesPosterListing,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Grid/list of movie poster thumbnails\n\n**Source:** `src/components/List/MoviesPosterListing.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MoviesPosterListing>;

export const Default: Story = {};
