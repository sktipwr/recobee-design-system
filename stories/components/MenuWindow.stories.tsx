import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const MenuWindow = ({items = ['Edit', 'Share', 'Delete'], selected = ''}: any) => (<div style={{ backgroundColor: '#272727', borderRadius: 10, border: '1px solid #BDBDBD', padding: '12px 16px', minWidth: 140 }}>{items.map((item: string, i: number) => (<div key={i} style={{ padding: '8px 0', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: item === selected ? '#E9C638' : '#BDBDBD', cursor: 'pointer', marginBottom: i < items.length - 1 ? 8 : 0 }}>{item}</div>))}</div>);

const meta: Meta<typeof MenuWindow> = {
  title: 'Components/MenuWindow',
  component: MenuWindow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Context menu popup with selectable items\n\n**Source:** `src/components/Common/MenuWindow.tsx`' } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof MenuWindow>;

export const Default: Story = {};
