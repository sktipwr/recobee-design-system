import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const OTTIcon = ({platform = 'Netflix', size = 24}: any) => (<div style={{ width: size, height: size, borderRadius: size/2, backgroundColor: platform === 'Netflix' ? '#E50914' : platform === 'Prime' ? '#00A8E1' : platform === 'Hotstar' ? '#0C2A5A' : '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontSize: size*0.4, fontWeight: 700, color: '#FFF' }}>{platform[0]}</div>);

const meta: Meta<typeof OTTIcon> = {
  title: 'Atoms/OTTIcon',
  component: OTTIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'OTT platform logo icon (Netflix, Prime, etc.)\n\n**Source:** `src/components/Atoms/OTTIcon.tsx`' } },
  },
  argTypes: { platform: { control: 'select', options: ['Netflix', 'Prime', 'Hotstar', 'JioCinema'] }, size: { control: { type: 'range', min: 16, max: 48 } } },
  args: { platform: 'Netflix', size: 24 },
};
export default meta;
type Story = StoryObj<typeof OTTIcon>;

export const Netflix: Story = {};
export const Prime: Story = { args: { platform: 'Prime' } };
