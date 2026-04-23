import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const BlogPosts = ({title = 'Top 10 Must-Watch Movies of 2026', excerpt = 'Our curated list of the best films releasing this year...'}: any) => (<div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, overflow: 'hidden' }}><div style={{ height: 160, backgroundColor: '#333' }} /><div style={{ padding: 12 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9', marginBottom: 4 }}>{title}</div><div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E' }}>{excerpt}</div></div></div>);

const meta: Meta<typeof BlogPosts> = {
  title: 'Components/BlogPosts',
  component: BlogPosts,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Blog post card with thumbnail, title, and excerpt\n\n**Source:** `src/components/BlogPosts.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, excerpt: { control: 'text' } },
  args: { title: 'Top 10 Must-Watch Movies of 2026', excerpt: 'Our curated list of the best films...' },
};
export default meta;
type Story = StoryObj<typeof BlogPosts>;

export const Default: Story = {};
