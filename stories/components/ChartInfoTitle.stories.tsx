import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ChartInfoTitle = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Chart Info Title</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Title header for chart sections</div>
  </div>
);

const meta: Meta<typeof ChartInfoTitle> = {
  title: 'Components/ChartInfoTitle',
  component: ChartInfoTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Title header for chart sections\n\n**Source:** `src/components/Common/ChartInfoTitle.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ChartInfoTitle>;

export const Default: Story = {};
