import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const CustomProgressBar = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Custom Progress Bar</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Horizontal custom progress bar</div>
  </div>
);

const meta: Meta<typeof CustomProgressBar> = {
  title: 'Components/CustomProgressBar',
  component: CustomProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Horizontal custom progress bar\n\n**Source:** `src/components/Common/CustomProgressBar.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CustomProgressBar>;

export const Default: Story = {};
