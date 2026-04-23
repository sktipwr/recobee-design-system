import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const StreakCard = ({streakDays = 7, message = 'Keep watching to maintain your streak!'}: any) => (<div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}><div style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(233,198,56,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🔥</div><div style={{ flex: 1 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 20, color: '#E9C638' }}>{streakDays} Day Streak</div><div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginTop: 2 }}>{message}</div></div></div>);

const meta: Meta<typeof StreakCard> = {
  title: 'Cards/StreakCard',
  component: StreakCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Daily streak progress card with fire icon and count\n\n**Source:** `src/components/Cards/StreakCard.tsx`' } },
  },
  argTypes: { streakDays: { control: 'number' }, message: { control: 'text' } },
  args: { streakDays: 7, message: 'Keep watching!' },
};
export default meta;
type Story = StoryObj<typeof StreakCard>;

export const Default: Story = {};
