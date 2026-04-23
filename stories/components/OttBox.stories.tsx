import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const OttBox = ({name = 'Netflix', selected = false}: any) => (<div style={{ width: 100, height: 100, borderRadius: 12, backgroundColor: '#1E1E1E', border: selected ? '1px solid #E9C638' : '1px solid transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer' }}><div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: name === 'Netflix' ? '#E50914' : '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#FFF' }}>{name[0]}</div><span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E' }}>{name}</span></div>);

const meta: Meta<typeof OttBox> = {
  title: 'Cards/OttBox',
  component: OttBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'OTT platform selection tile with logo and name\n\n**Source:** `src/components/Cards/OttBox.tsx`' } },
  },
  argTypes: { name: { control: 'text' }, selected: { control: 'boolean' } },
  args: { name: 'Netflix', selected: false },
};
export default meta;
type Story = StoryObj<typeof OttBox>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
