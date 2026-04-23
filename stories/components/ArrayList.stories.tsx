import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ArrayList = ({items = ['Item 1','Item 2','Item 3']}: any) => (<div style={{ width: 343, backgroundColor: '#121212', borderRadius: 12 }}>{items.map((item: string, i: number) => (<div key={i} style={{ padding: '12px 16px', borderBottom: i < items.length - 1 ? '1px solid #272727' : 'none', fontFamily: 'DM Sans', fontSize: 14, color: '#F8F8F9' }}>{item}</div>))}</div>);

const meta: Meta<typeof ArrayList> = {
  title: 'Lists/ArrayList',
  component: ArrayList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Generic vertical array list renderer\n\n**Source:** `src/components/List/ArrayList.tsx`' } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof ArrayList>;

export const Default: Story = {};
