import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const Chip = ({ label, selected = false, onClick }: ChipProps) => (
  <button onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '4px 16px', borderRadius: selected ? 8 : 7, border: 'none',
    backgroundColor: selected ? 'rgba(245,211,28,0.15)' : '#424242',
    cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: 14, lineHeight: '20px',
    color: selected ? '#E9C638' : '#FFFFFF',
    transition: 'all 0.2s',
  }}>{label}</button>
);

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Filter/tag chip with selected/unselected states. Gold highlight when active. Used for genre filters, category selection, preferences.\n\n**Source:** `src/components/Common/Chip.tsx`',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Chip label text' },
    selected: { control: 'boolean', description: 'Whether chip is selected' },
    onClick: { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const All: Story = {
  render: () => {
    const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller'];
    const [active, setActive] = useState('All');
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {genres.map(g => (
          <Chip key={g} label={g} selected={active === g} onClick={() => setActive(g)} />
        ))}
      </div>
    );
  },
};

export const Selected: Story = {
  args: { label: 'Action', selected: true },
};

export const Unselected: Story = {
  args: { label: 'Comedy', selected: false },
};
