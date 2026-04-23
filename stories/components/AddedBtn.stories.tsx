import React from 'react';
import { TickIcon as TickIconSVG } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const AddedBtn = ({added = true}: any) => (<button style={{ height: 28, paddingLeft: 12, paddingRight: 12, borderRadius: 14, backgroundColor: added ? '#353014' : '#424242', border: added ? '1px solid #E9C638' : '1px solid #757575', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 11, fontWeight: 700, color: added ? '#E9C638' : '#F8F8F9', display: 'flex', alignItems: 'center', gap: 4 }}>{added ? 'Added' : '+ Add'}</button>);

const meta: Meta<typeof AddedBtn> = {
  title: 'Components/AddedBtn',
  component: AddedBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Toggle button showing Added/Add state with checkmark\n\n**Source:** `src/components/AddedBtn.tsx`' } },
  },
  argTypes: { added: { control: 'boolean' } },
  args: { added: true },
};
export default meta;
type Story = StoryObj<typeof AddedBtn>;

export const Added: Story = { args: { added: true } };
export const NotAdded: Story = { args: { added: false } };
