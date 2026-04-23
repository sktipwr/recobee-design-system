import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const FastImageComponent = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Fast Image Component</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Optimized image loader wrapper</div>
  </div>
);

const meta: Meta<typeof FastImageComponent> = {
  title: 'Components/FastImageComponent',
  component: FastImageComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Optimized image loader wrapper\n\n**Source:** `src/components/Common/FastImageComponent.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FastImageComponent>;

export const Default: Story = {};
