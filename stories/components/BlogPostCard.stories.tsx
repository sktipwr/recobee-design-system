import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const BlogPostCard = ({title = 'Blog Post Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>BlogPostCard component from the RecoBee mobile app</div>
  </div>
);

const meta: Meta<typeof BlogPostCard> = {
  title: 'Cards/BlogPostCard',
  component: BlogPostCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'BlogPostCard component from the RecoBee mobile app\n\n**Source:** `src/components/Cards/BlogPostCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BlogPostCard>;

export const Default: Story = {};
