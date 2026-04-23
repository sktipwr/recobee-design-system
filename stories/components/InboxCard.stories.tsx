import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const InboxCard = ({sender = 'Rahul', message = 'Check out this movie!', time = '2h ago', unread = true}: any) => (<div style={{ width: 343, display: 'flex', gap: 12, padding: '12px 16px', backgroundColor: unread ? 'rgba(233,198,56,0.05)' : 'transparent', borderBottom: '1px solid #272727' }}><div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#E9C638', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#121212', flexShrink: 0 }}>{sender[0]}</div><div style={{ flex: 1 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9' }}>{sender}</span><span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575' }}>{time}</span></div><div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginTop: 2 }}>{message}</div></div></div>);

const meta: Meta<typeof InboxCard> = {
  title: 'Cards/InboxCard',
  component: InboxCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Inbox notification card with avatar, message preview, and timestamp\n\n**Source:** `src/components/Cards/InboxCard.tsx`' } },
  },
  argTypes: { sender: { control: 'text' }, message: { control: 'text' }, time: { control: 'text' }, unread: { control: 'boolean' } },
  args: { sender: 'Rahul', message: 'Check out this movie!', time: '2h ago', unread: true },
};
export default meta;
type Story = StoryObj<typeof InboxCard>;

export const Unread: Story = {};
export const Read: Story = { args: { unread: false } };
