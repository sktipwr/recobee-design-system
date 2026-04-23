import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const SelectableImage = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Selectable Image</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Image with selection overlay</div>
  </div>
);

const meta: Meta<typeof SelectableImage> = {
  title: 'Components/SelectableImage',
  component: SelectableImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Image with selection overlay\n\n**Source:** `src/components/Common/SelectableImage.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SelectableImage>;

export const Default: Story = {};
