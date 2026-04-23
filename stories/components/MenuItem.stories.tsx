import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const MenuItem = ({title = 'Notifications', subtitle = 'Manage notification preferences', hasToggle = false, isOn = false}: any) => (<div style={{ width: 343, display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 12, borderBottom: '1px solid #1E1E1E', cursor: 'pointer' }}><div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#272727', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}><BellIconSVG color='#F8F8F9' width={20} height={20}/></div><div style={{ flex: 1 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 14, color: '#F8F8F9' }}>{title}</div>{subtitle && <div style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#757575', marginTop: 1 }}>{subtitle}</div>}</div>{hasToggle ? <div style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: isOn ? '#E9C638' : '#424242', padding: 2, cursor: 'pointer' }}><div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#FFF', transform: isOn ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 0.2s' }} /></div> : <span style={{ color: '#555', fontSize: 14 }}><RightArrowIcon color='#F8F8F9' width={14} height={14}/></span>}</div>);

const meta: Meta<typeof MenuItem> = {
  title: 'Cards/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Settings/menu item row with icon, title, and optional toggle\n\n**Source:** `src/components/Cards/MenuItem.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, subtitle: { control: 'text' }, hasToggle: { control: 'boolean' }, isOn: { control: 'boolean' } },
  args: { title: 'Notifications', subtitle: 'Manage notification preferences' },
};
export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {};
export const WithToggle: Story = { args: { title: 'Dark Mode', subtitle: '', hasToggle: true, isOn: true } };
