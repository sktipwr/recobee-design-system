import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ListCard = ({title = 'My Top 10 Sci-Fi', movieCount = 10, author = 'ankit'}: any) => (<div style={{ width: 160, backgroundColor: '#1E1E1E', borderRadius: 12, overflow: 'hidden' }}><div style={{ height: 100, backgroundColor: '#333', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>{[1,2,3,4].map(i => (<div key={i} style={{ backgroundColor: '#444' }} />))}</div><div style={{ padding: 10 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: '#F8F8F9', marginBottom: 2 }}>{title}</div><div style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575' }}>{movieCount} movies · @{author}</div></div></div>);

const meta: Meta<typeof ListCard> = {
  title: 'Cards/ListCard',
  component: ListCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'User-created movie list card with cover and movie count\n\n**Source:** `src/components/Cards/ListCard.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, movieCount: { control: 'number' }, author: { control: 'text' } },
  args: { title: 'My Top 10 Sci-Fi', movieCount: 10, author: 'ankit' },
};
export default meta;
type Story = StoryObj<typeof ListCard>;

export const Default: Story = {};
