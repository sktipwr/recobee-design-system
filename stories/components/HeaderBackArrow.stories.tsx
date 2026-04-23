import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface HeaderBackArrowProps { bgColor: string; showTitle: boolean; title: string; showLogo: boolean; }

const HeaderBackArrow = ({bgColor, showTitle, title, showLogo}: any) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: bgColor, border: 'none', cursor: 'pointer', fontSize: 18, color: '#F8F8F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowIcon color='#F8F8F9' width={20} height={20} style={{transform:'rotate(90deg)'}}/></button>
      {showLogo && <div style={{ width: 80, height: 24, backgroundColor: '#E9C638', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 10, color: '#121212' }}>RecoBee</div>}
      {showTitle && <span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#FFFFFF' }}>{title}</span>}
    </div>
  );

const meta: Meta<typeof HeaderBackArrow> = {
  title: 'Components/HeaderBackArrow',
  component: HeaderBackArrow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Back arrow button with optional logo and title\n\n**Source:** `src/components/Common/HeaderBackArrow.tsx`' } },
  },
  argTypes: { bgColor: { control: 'color' }, showTitle: { control: 'boolean' }, title: { control: 'text' }, showLogo: { control: 'boolean' } },
  args: { bgColor: '#424242', showTitle: false, title: '', showLogo: false },
};
export default meta;
type Story = StoryObj<typeof HeaderBackArrow>;

export const Default: Story = {};

export const WithTitle: Story = { args: { showTitle: true, title: 'Settings' } };

export const WithLogo: Story = { args: { showLogo: true } };
