import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const GroupCard = ({name = 'Horror Enthusiasts', members = 234, isJoined = false}: any) => (<div style={{ width: 160, backgroundColor: '#1E1E1E', borderRadius: 12, overflow: 'hidden' }}><div style={{ height: 80, backgroundColor: '#333' }} /><div style={{ padding: 10 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: '#F8F8F9', marginBottom: 2 }}>{name}</div><div style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575', marginBottom: 8 }}>{members} members</div><button style={{ width: '100%', height: 28, borderRadius: 14, backgroundColor: isJoined ? '#353014' : '#424242', border: isJoined ? '1px solid #E9C638' : '1px solid #757575', fontFamily: 'DM Sans', fontSize: 11, fontWeight: 700, color: isJoined ? '#E9C638' : '#F8F8F9', cursor: 'pointer' }}>{isJoined ? 'Joined' : 'Join'}</button></div></div>);

const meta: Meta<typeof GroupCard> = {
  title: 'Cards/GroupCard',
  component: GroupCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Community group card with cover image, name, and member count\n\n**Source:** `src/components/Cards/GroupCard.tsx`' } },
  },
  argTypes: { name: { control: 'text' }, members: { control: 'number' }, isJoined: { control: 'boolean' } },
  args: { name: 'Horror Enthusiasts', members: 234, isJoined: false },
};
export default meta;
type Story = StoryObj<typeof GroupCard>;

export const Default: Story = {};
export const Joined: Story = { args: { isJoined: true } };
