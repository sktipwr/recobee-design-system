import React from 'react';
import { InboxIcon as InboxIconSVG } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const InboxItem = ({icon = '🎬', title = 'New Recommendation', desc = 'Rahul recommended Dune: Part Two', time = '3h'}: any) => (<div style={{ width: 343, display: 'flex', gap: 12, padding: '10px 16px', borderBottom: '1px solid #272727', alignItems: 'center' }}><div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#272727', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div><div style={{ flex: 1 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 13, color: '#F8F8F9' }}>{title}</div><div style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#757575' }}>{desc}</div></div><span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#555' }}>{time}</span></div>);

const meta: Meta<typeof InboxItem> = {
  title: 'Cards/InboxItem',
  component: InboxItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Single inbox list item with icon and description\n\n**Source:** `src/components/Cards/InboxItem.tsx`' } },
  },
  argTypes: { icon: { control: 'text' }, title: { control: 'text' }, desc: { control: 'text' }, time: { control: 'text' } },
  args: { icon: '🎬', title: 'New Recommendation', desc: 'Rahul recommended Dune', time: '3h' },
};
export default meta;
type Story = StoryObj<typeof InboxItem>;

export const Default: Story = {};
