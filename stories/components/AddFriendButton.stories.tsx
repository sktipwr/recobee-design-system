import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface AddFriendButtonProps { friend: boolean; addFriend: () => void; }

const AddFriendButton = ({friend, addFriend}: any) => (
    <button onClick={addFriend} style={{ height: 28, width: friend ? 100 : 80, borderRadius: 60, backgroundColor: '#424242', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700, color: friend ? '#9E9E9E' : '#E9C638' }}>
      {friend ? 'REQUEST SENT' : 'ADD FRIEND'}
    </button>
  );

const meta: Meta<typeof AddFriendButton> = {
  title: 'Components/AddFriendButton',
  component: AddFriendButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Friend request action button with REQUEST SENT / ADD FRIEND states\n\n**Source:** `src/components/Common/AddFriendButton.tsx`' } },
  },
  argTypes: { friend: { control: 'boolean', description: 'Whether request is already sent' }, addFriend: { action: 'addFriend' } },
  args: { friend: false },
};
export default meta;
type Story = StoryObj<typeof AddFriendButton>;

export const Default: Story = { args: { friend: false } };

export const RequestSent: Story = { args: { friend: true } };
