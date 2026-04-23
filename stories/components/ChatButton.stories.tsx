import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ChatButton = ({unread = 3}: any) => (<button style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#E9C638', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 4px 12px rgba(233,198,56,0.3)' }}><span style={{ fontSize: 20 }}>💬</span>{unread > 0 && <div style={{ position: 'absolute', top: -2, right: -2, width: 20, height: 20, borderRadius: 10, backgroundColor: '#E53935', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700, color: '#FFF' }}>{unread}</div>}</button>);

const meta: Meta<typeof ChatButton> = {
  title: 'Components/ChatButton',
  component: ChatButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Floating chat button with unread indicator\n\n**Source:** `src/components/ChatButton.tsx`' } },
  },
  argTypes: { unread: { control: { type: 'number', min: 0, max: 99 } } },
  args: { unread: 3 },
};
export default meta;
type Story = StoryObj<typeof ChatButton>;

export const WithBadge: Story = { args: { unread: 3 } };
export const NoBadge: Story = { args: { unread: 0 } };
