import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface BasicUserInfoProps { name: string; username: string; }

const BasicUserInfo = ({name, username}: any) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E9C638', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#121212' }}>{name[0]}</div>
      <div>
        <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9' }}>{name}</div>
        <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#757575' }}>{username}</div>
      </div>
    </div>
  );

const meta: Meta<typeof BasicUserInfo> = {
  title: 'Components/BasicUserInfo',
  component: BasicUserInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'User name, avatar thumbnail, and basic info display\n\n**Source:** `src/components/Common/BasicUserInfo.tsx`' } },
  },
  argTypes: { name: { control: 'text' }, username: { control: 'text' } },
  args: { name: 'Ankit Sharma', username: '@ankit' },
};
export default meta;
type Story = StoryObj<typeof BasicUserInfo>;

export const Default: Story = {};
