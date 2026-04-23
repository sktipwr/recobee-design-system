import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const OttCircle = ({size = 32}: any) => (<div style={{ width: size, height: size, borderRadius: size/2, backgroundColor: '#E50914', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, fontSize: size*0.4, color: '#FFF' }}>N</div>);

const meta: Meta<typeof OttCircle> = {
  title: 'Components/OttCircle',
  component: OttCircle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Circular OTT platform indicator\n\n**Source:** `src/components/OttCircle.tsx`' } },
  },
  argTypes: { size: { control: { type: 'range', min: 16, max: 48 } } },
  args: { size: 32 },
};
export default meta;
type Story = StoryObj<typeof OttCircle>;

export const Default: Story = {};
