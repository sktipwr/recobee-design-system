import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ImageList = () => (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, width: 343 }}>{[1,2,3,4,5,6].map(i => (<div key={i} style={{ height: 110, backgroundColor: '#333', borderRadius: 4 }} />))}</div>);

const meta: Meta<typeof ImageList> = {
  title: 'Lists/ImageList',
  component: ImageList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Grid of selectable image thumbnails\n\n**Source:** `src/components/List/ImageList.tsx`' } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof ImageList>;

export const Default: Story = {};
