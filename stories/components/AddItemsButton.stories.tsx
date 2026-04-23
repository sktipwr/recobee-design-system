import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface AddItemsButtonProps { title: string; addItems: () => void; }

const AddItemsButton = ({title, addItems}: any) => (
    <button onClick={addItems} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '7px 8px', borderRadius: 8, backgroundColor: '#1E1E1E', border: '1px solid #424242', cursor: 'pointer', width: 343 }}>
      <div style={{ width: 42, height: 42, borderRadius: 42, backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#BDBDBD' }}>+</div>
      <span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}>{title}</span>
    </button>
  );

const meta: Meta<typeof AddItemsButton> = {
  title: 'Components/AddItemsButton',
  component: AddItemsButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Button to add movies or shows to a list with circular add icon\n\n**Source:** `src/components/Common/AddItemsButton.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, addItems: { action: 'addItems' } },
  args: { title: 'Add Movies or Shows' },
};
export default meta;
type Story = StoryObj<typeof AddItemsButton>;

export const Default: Story = { args: { title: 'Add Movies or Shows' } };

export const Custom: Story = { args: { title: 'Add to Watchlist' } };
