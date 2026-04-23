import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const EditCoverPicBtn = () => (<div style={{ position: 'relative', width: 343, height: 120, backgroundColor: '#333', borderRadius: 12 }}><button style={{ position: 'absolute', right: 21, bottom: 6, width: 100, height: 28, borderRadius: 14, backgroundColor: '#424242', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 10, color: '#BDBDBD' }}>EDIT COVER</button></div>);

const meta: Meta<typeof EditCoverPicBtn> = {
  title: 'Components/EditCoverPicBtn',
  component: EditCoverPicBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Small button for editing cover picture\n\n**Source:** `src/components/Common/EditCoverPicBtn.tsx`' } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof EditCoverPicBtn>;

export const Default: Story = {};
