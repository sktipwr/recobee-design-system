import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ListMain = () => (<div style={{ width: 343, backgroundColor: '#121212' }}><div style={{ padding: '12px 16px', borderBottom: '1px solid #272727', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9' }}>My Lists</div>{['Top 10 Sci-Fi', 'Best of 2025', 'Watch Later'].map((item, i) => (<div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid #1E1E1E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#F8F8F9' }}>{item}</span><span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#757575' }}><RightArrowIcon color='#F8F8F9' width={14} height={14}/></span></div>))}</div>);

const meta: Meta<typeof ListMain> = {
  title: 'Lists/ListMain',
  component: ListMain,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Main list view with header, items, and pagination\n\n**Source:** `src/components/List/ListMain.tsx`' } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof ListMain>;

export const Default: Story = {};
