import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface SearchHeaderProps { isBackHeader: boolean; placeHolder: string; }

const SearchHeader = ({isBackHeader, placeHolder}: any) => (
    <div style={{ width: 375, display: 'flex', alignItems: 'center', padding: 16, gap: 8, backgroundColor: '#121212' }}>
      <button style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: '#121212', border: 'none', cursor: 'pointer', fontSize: 18, color: '#F8F8F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{isBackHeader ? '←' : '☰'}</button>
      <div style={{ flex: 1, height: 48, borderRadius: 10, backgroundColor: '#272727', display: 'flex', alignItems: 'center', paddingLeft: 14, gap: 8 }}>
        <span style={{ fontSize: 16, opacity: 0.6 }}><SearchIconSVG color='#9E9E9E' width={18} height={18}/></span>
        <span style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#9E9E9E' }}>{placeHolder}</span>
      </div>
    </div>
  );

const meta: Meta<typeof SearchHeader> = {
  title: 'Components/SearchHeader',
  component: SearchHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Header with left drawer/back icon and search input field\n\n**Source:** `src/components/Common/SearchHeader.tsx`' } },
  },
  argTypes: { isBackHeader: { control: 'boolean' }, placeHolder: { control: 'text' } },
  args: { isBackHeader: false, placeHolder: 'Search movies, shows...' },
};
export default meta;
type Story = StoryObj<typeof SearchHeader>;

export const WithDrawer: Story = { args: { isBackHeader: false } };

export const WithBack: Story = { args: { isBackHeader: true } };
