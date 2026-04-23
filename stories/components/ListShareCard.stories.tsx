import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ListShareCard = ({title = 'Must Watch Thriller Movies', count = 15}: any) => (<div style={{ width: 280, backgroundColor: '#1E1E1E', borderRadius: 16, padding: 20, border: '1px solid #333' }}><div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>{[1,2,3].map(i => (<div key={i} style={{ width: 50, height: 70, borderRadius: 6, backgroundColor: '#444' }} />))}</div><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9', marginBottom: 4 }}>{title}</div><div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#757575' }}>{count} movies · RecoBee</div></div>);

const meta: Meta<typeof ListShareCard> = {
  title: 'Cards/ListShareCard',
  component: ListShareCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Shareable list card for social sharing\n\n**Source:** `src/components/Cards/ListShareCard.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, count: { control: 'number' } },
  args: { title: 'Must Watch Thriller Movies', count: 15 },
};
export default meta;
type Story = StoryObj<typeof ListShareCard>;

export const Default: Story = {};
