import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const SearchBox = ({placeholder = 'Search...'}: any) => (<div style={{ width: 300, height: 40, borderRadius: 8, backgroundColor: '#272727', display: 'flex', alignItems: 'center', paddingLeft: 12, gap: 8 }}><span style={{ opacity: 0.5, fontSize: 14 }}><SearchIconSVG color='#9E9E9E' width={18} height={18}/></span><span style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#757575' }}>{placeholder}</span></div>);

const meta: Meta<typeof SearchBox> = {
  title: 'Components/SearchBox',
  component: SearchBox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Compact search input box\n\n**Source:** `src/components/SearchBox.tsx`' } },
  },
  argTypes: { placeholder: { control: 'text' } },
  args: { placeholder: 'Search...' },
};
export default meta;
type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {};
