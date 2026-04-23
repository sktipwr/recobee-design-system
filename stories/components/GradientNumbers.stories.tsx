import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const GradientNumbers = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Gradient Numbers</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>GradientNumbers component from the RecoBee mobile app</div>
  </div>
);

const meta: Meta<typeof GradientNumbers> = {
  title: 'Components/GradientNumbers',
  component: GradientNumbers,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'GradientNumbers component from the RecoBee mobile app\n\n**Source:** `src/components/Common/GradientNumbers.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof GradientNumbers>;

export const Default: Story = {};
