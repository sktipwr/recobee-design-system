import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const WeeklyList = ({title = 'This Week\'s Picks', movies = ['Dune: Part Two', 'Oppenheimer', 'Barbie']}: any) => (<div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#E9C638', marginBottom: 12 }}>📋 {title}</div>{movies.map((m: string, i: number) => (<div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < movies.length - 1 ? '1px solid #272727' : 'none' }}><span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#424242', width: 24 }}>{i+1}</span><div style={{ width: 40, height: 56, borderRadius: 4, backgroundColor: '#333', flexShrink: 0 }} /><span style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#F8F8F9' }}>{m}</span></div>))}</div>);

const meta: Meta<typeof WeeklyList> = {
  title: 'Cards/WeeklyList',
  component: WeeklyList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Weekly curated movie list card\n\n**Source:** `src/components/Cards/WeeklyList.tsx`' } },
  },
  argTypes: { title: { control: 'text' } },
  args: { title: "This Week's Picks" },
};
export default meta;
type Story = StoryObj<typeof WeeklyList>;

export const Default: Story = {};
