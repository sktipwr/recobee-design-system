import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const RenderBadgeImage = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Render Badge Image</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Renders badge image with proper sizing</div>
  </div>
);

const meta: Meta<typeof RenderBadgeImage> = {
  title: 'Components/RenderBadgeImage',
  component: RenderBadgeImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Renders badge image with proper sizing\n\n**Source:** `src/components/Common/RenderBadgeImage.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof RenderBadgeImage>;

export const Default: Story = {};
