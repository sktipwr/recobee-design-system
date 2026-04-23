import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ChatCard = ({ userName, messagePreview, unread, unreadCount, chattype, isTick, isCross }: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', padding: 10, margin: '0 16px', display: 'flex', alignItems: 'center', borderRadius: 8, cursor: 'pointer' }}>
    <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#424242', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#BDBDBD', flexShrink: 0 }}>
      {chattype === 'personal' ? '👤' : '👥'}
    </div>
    <div style={{ marginLeft: 12, flex: 1, minWidth: 0 }}>
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F5F5F5', marginBottom: 4 }}>{userName}</div>
      {unreadCount > 0 ? (
        <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#FFFFFF' }}>{unreadCount} unread messages</div>
      ) : messagePreview ? (
        <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#616161', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{messagePreview}</div>
      ) : null}
    </div>
    {unread && <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#E9C638', marginLeft: 8, flexShrink: 0 }} />}
    {isTick && <span style={{ marginLeft: 8, color: '#4CAF50', fontSize: 16 }}>✓</span>}
    {isCross && <button style={{ marginLeft: 8, background: 'none', border: 'none', color: '#E9C638', fontSize: 16, cursor: 'pointer' }}>✕</button>}
  </div>
);

const meta: Meta<typeof ChatCard> = {
  title: 'Components/ChatCard',
  component: ChatCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Inbox/chat card showing user avatar, name, message preview, and status indicators.\n\n**Source:** `src/components/InboxFlow/ChatCard.tsx`' } } },
  argTypes: {
    userName: { control: 'text' }, messagePreview: { control: 'text' },
    unread: { control: 'boolean' }, unreadCount: { control: 'number' },
    chattype: { control: 'select', options: ['personal', 'group'] },
    isTick: { control: 'boolean' }, isCross: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof ChatCard>;

export const Default: Story = { args: { userName: 'Rahul Kumar', messagePreview: 'Have you watched the new Nolan movie?', chattype: 'personal' } };
export const Unread: Story = { args: { userName: 'Priya Sharma', unread: true, unreadCount: 3, chattype: 'personal' } };
export const GroupChat: Story = { args: { userName: 'Movie Buffs', messagePreview: 'Anyone up for a movie tonight?', chattype: 'group' } };
export const WithTick: Story = { args: { userName: 'Ankit', messagePreview: 'Accepted your invite', chattype: 'personal', isTick: true } };
export const WithCross: Story = { args: { userName: 'Spam User', messagePreview: '', chattype: 'personal', isCross: true } };
