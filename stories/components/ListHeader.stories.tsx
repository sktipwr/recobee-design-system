import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface ListHeaderProps { filters: string; activeFilter: string; }

const ListHeader = ({filters, activeFilter}: any) => {
    const items = filters.split(',');
    return (
      <div style={{ display: 'flex', gap: 8, padding: '16px 16px', overflow: 'auto', width: 375, backgroundColor: '#121212' }}>
        {items.map((f: string) => (
          <button key={f} style={{ padding: '4px 16px', borderRadius: 8, border: 'none', backgroundColor: f.trim() === activeFilter ? 'rgba(245,211,28,0.15)' : '#424242', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 14, color: f.trim() === activeFilter ? '#E9C638' : '#FFFFFF', whiteSpace: 'nowrap', flexShrink: 0 }}>{f.trim()}</button>
        ))}
      </div>
    );
  };

const meta: Meta<typeof ListHeader> = {
  title: 'Components/ListHeader',
  component: ListHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Horizontal scrolling filter chip bar for list sections\n\n**Source:** `src/components/Common/ListHeader.tsx`' } },
  },
  argTypes: { filters: { control: 'text', description: 'Comma-separated filter names' }, activeFilter: { control: 'text' } },
  args: { filters: 'All,Action,Comedy,Drama,Horror,Sci-Fi', activeFilter: 'All' },
};
export default meta;
type Story = StoryObj<typeof ListHeader>;

export const Default: Story = { args: { filters: 'All,Action,Comedy,Drama,Horror,Sci-Fi', activeFilter: 'All' } };
