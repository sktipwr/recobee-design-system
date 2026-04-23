import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const DraftCard = ({title = 'Dune: Part Two', draftText = 'Amazing visuals and world-building...'}: any) => (<div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 12, border: '1px solid #333' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9' }}>{title}</div><span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575' }}>Draft</span></div><div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginBottom: 12 }}>{draftText}</div><div style={{ display: 'flex', gap: 8 }}><button style={{ padding: '4px 16px', borderRadius: 6, backgroundColor: '#424242', border: 'none', fontFamily: 'DM Sans', fontSize: 12, color: '#E9C638', cursor: 'pointer' }}>Edit</button><button style={{ padding: '4px 16px', borderRadius: 6, backgroundColor: '#424242', border: 'none', fontFamily: 'DM Sans', fontSize: 12, color: '#E53935', cursor: 'pointer' }}>Delete</button></div></div>);

const meta: Meta<typeof DraftCard> = {
  title: 'Cards/DraftCard',
  component: DraftCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Draft review/post card with edit and delete actions\n\n**Source:** `src/components/Cards/DraftCard.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, draftText: { control: 'text' } },
  args: { title: 'Dune: Part Two', draftText: 'Amazing visuals...' },
};
export default meta;
type Story = StoryObj<typeof DraftCard>;

export const Default: Story = {};
