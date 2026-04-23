import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const PrefCard = ({label = 'Action', selected = false}: any) => (<div style={{ width: 100, height: 100, borderRadius: 12, backgroundColor: selected ? '#353014' : '#1E1E1E', border: selected ? '1px solid #E9C638' : '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}><div style={{ fontSize: 28 }}>🎬</div><span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: selected ? '#E9C638' : '#F8F8F9' }}>{label}</span></div>);

const meta: Meta<typeof PrefCard> = {
  title: 'Cards/PrefCard',
  component: PrefCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Preference selection card with icon and label\n\n**Source:** `src/components/Cards/PrefCard.tsx`' } },
  },
  argTypes: { label: { control: 'text' }, selected: { control: 'boolean' } },
  args: { label: 'Action', selected: false },
};
export default meta;
type Story = StoryObj<typeof PrefCard>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
