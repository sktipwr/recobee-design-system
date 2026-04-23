import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const UserRow = ({name = 'Priya Singh', isFollowing = false}: any) => (<div style={{ width: 343, display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px' }}><div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#8C66AC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#FFF', flexShrink: 0 }}>{name[0]}</div><div style={{ flex: 1 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 13, color: '#F8F8F9' }}>{name}</div></div><button style={{ height: 28, paddingLeft: 12, paddingRight: 12, borderRadius: 14, backgroundColor: isFollowing ? '#353014' : 'transparent', border: isFollowing ? '1px solid #E9C638' : '1px solid #757575', fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700, color: isFollowing ? '#E9C638' : '#F8F8F9', cursor: 'pointer' }}>{isFollowing ? 'Following' : 'Follow'}</button></div>);

const meta: Meta<typeof UserRow> = {
  title: 'Cards/UserRow',
  component: UserRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'User list row with avatar, name, and follow button\n\n**Source:** `src/components/Cards/UserRow.tsx`' } },
  },
  argTypes: { name: { control: 'text' }, isFollowing: { control: 'boolean' } },
  args: { name: 'Priya Singh', isFollowing: false },
};
export default meta;
type Story = StoryObj<typeof UserRow>;

export const Default: Story = {};
export const Following: Story = { args: { isFollowing: true } };
