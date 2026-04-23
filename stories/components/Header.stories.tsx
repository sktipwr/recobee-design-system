import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowIcon, SettingsIcon, SearchIcon, MoreVerticalIcon, MenuIcon, ShareAndroidIcon, CrossIcon } from '../helpers/icons';

interface HeaderProps {
  title: string;
  leftIcon: 'back' | 'menu' | 'close' | 'none';
  rightIcon: 'settings' | 'search' | 'share' | 'more' | 'none';
  rightLinkName: string;
  headerBgColor: string;
  disabled: boolean;
}

const leftIcons: Record<string, any> = {
  back: (p: any) => <div style={{ transform: 'rotate(90deg)' }}><ArrowIcon {...p} /></div>,
  menu: MenuIcon,
  close: CrossIcon,
  none: () => <div style={{ width: 24 }} />,
};

const rightIcons: Record<string, any> = {
  settings: SettingsIcon,
  search: SearchIcon,
  share: ShareAndroidIcon,
  more: MoreVerticalIcon,
  none: () => <div style={{ width: 24 }} />,
};

const Header = ({ title, leftIcon = 'back', rightIcon = 'settings', rightLinkName = '', headerBgColor = '#212121', disabled = false }: HeaderProps) => {
  const LeftComp = leftIcons[leftIcon] || leftIcons.none;
  const RightComp = rightIcons[rightIcon] || rightIcons.none;
  return (
    <div style={{ width: 375, height: 56, backgroundColor: headerBgColor, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 8, paddingRight: 8 }}>
      <button style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LeftComp color="#F8F8F9" width={24} height={24} />
      </button>
      <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#F8F8F9' }}>{title}</span>
      {rightLinkName ? (
        <button style={{ backgroundColor: 'transparent', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 14, color: disabled ? '#BDBDBD' : '#E9C638', padding: '0 8px' }}>{rightLinkName}</button>
      ) : (
        <button style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#1E1E1E', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RightComp color="#F8F8F9" width={20} height={20} />
        </button>
      )}
    </div>
  );
};

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Top navigation header with real SVG icons from the app.\n\n**Source:** `src/components/Common/Header.tsx`' } },
  },
  argTypes: {
    title: { control: 'text' },
    leftIcon: { control: 'select', options: ['back', 'menu', 'close', 'none'] },
    rightIcon: { control: 'select', options: ['settings', 'search', 'share', 'more', 'none'] },
    rightLinkName: { control: 'text' },
    headerBgColor: { control: 'color' },
    disabled: { control: 'boolean' },
  },
  args: { title: 'Explore', leftIcon: 'back', rightIcon: 'settings', rightLinkName: '', headerBgColor: '#212121', disabled: false },
};
export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = { args: { title: 'Explore' } };
export const WithLink: Story = { args: { title: 'Reviews', rightIcon: 'none', rightLinkName: 'See All' } };
export const MenuHeader: Story = { args: { title: 'Profile', leftIcon: 'menu', rightIcon: 'settings' } };
export const ShareHeader: Story = { args: { title: 'Movie Details', leftIcon: 'back', rightIcon: 'share' } };
