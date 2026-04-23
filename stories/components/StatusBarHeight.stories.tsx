import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const StatusBarHeight = () => (<div style={{ width: 375, height: 44, backgroundColor: '#121212', borderBottom: '1px dashed #333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#555' }}>Status Bar (44px)</span></div>);

const meta: Meta<typeof StatusBarHeight> = {
  title: 'Components/StatusBarHeight',
  component: StatusBarHeight,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Status bar spacing (44px iOS, dynamic Android)\n\n**Source:** `src/components/Common/StatusBarHeight.tsx`' } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof StatusBarHeight>;

export const Default: Story = {};
