import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface SearchHeaderWithBackProps { placeHolder: string; }

const SearchHeaderWithBack = ({placeHolder}: any) => (
    <div style={{ width: 375, display: 'flex', alignItems: 'center', padding: 16, gap: 8, backgroundColor: '#121212' }}>
      <button style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: '#212121', border: 'none', cursor: 'pointer', fontSize: 18, color: '#F8F8F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowIcon color='#F8F8F9' width={20} height={20} style={{transform:'rotate(90deg)'}}/></button>
      <div style={{ flex: 1, height: 48, borderRadius: 10, backgroundColor: '#2B2930', display: 'flex', alignItems: 'center', paddingLeft: 14, gap: 8 }}>
        <span style={{ fontSize: 16, opacity: 0.6 }}><SearchIconSVG color='#9E9E9E' width={18} height={18}/></span>
        <span style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#9E9E9E' }}>{placeHolder}</span>
      </div>
    </div>
  );

const meta: Meta<typeof SearchHeaderWithBack> = {
  title: 'Components/SearchHeaderWithBack',
  component: SearchHeaderWithBack,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Back button on left with search input on right, for search screens\n\n**Source:** `src/components/Common/SearchHeaderWithBack.tsx`' } },
  },
  argTypes: { placeHolder: { control: 'text' } },
  args: { placeHolder: 'Search...' },
};
export default meta;
type Story = StoryObj<typeof SearchHeaderWithBack>;

export const Default: Story = { args: { placeHolder: 'Search movies, people...' } };
