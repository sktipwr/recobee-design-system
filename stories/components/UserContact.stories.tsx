import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const UserContact = ({name = 'Rahul Verma', username = '@rahul', isFollowing = false}: any) => (<div style={{ width: 343, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px' }}><div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#E9C638', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#121212', flexShrink: 0 }}>{name[0]}</div><div style={{ flex: 1 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9' }}>{name}</div><div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#757575' }}>{username}</div></div><button style={{ height: 28, paddingLeft: 16, paddingRight: 16, borderRadius: 14, backgroundColor: isFollowing ? '#353014' : '#424242', border: isFollowing ? '1px solid #E9C638' : '1px solid #757575', fontFamily: 'DM Sans', fontSize: 11, fontWeight: 700, color: isFollowing ? '#E9C638' : '#F8F8F9', cursor: 'pointer' }}>{isFollowing ? 'Following' : 'Follow'}</button></div>);

const meta: Meta<typeof UserContact> = {
  title: 'Cards/UserContact',
  component: UserContact,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Contact card with avatar, name, and action button\n\n**Source:** `src/components/Cards/UserContact.tsx`' } },
  },
  argTypes: { name: { control: 'text' }, username: { control: 'text' }, isFollowing: { control: 'boolean' } },
  args: { name: 'Rahul Verma', username: '@rahul', isFollowing: false },
};
export default meta;
type Story = StoryObj<typeof UserContact>;

export const Default: Story = {};
export const Following: Story = { args: { isFollowing: true } };
