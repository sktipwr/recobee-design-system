import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface AdvanceFilterBtnProps { isAdvanceFilterActive: boolean; onAdvanceFilterPress: () => void; bgColor: string; }

const AdvanceFilterBtn = ({isAdvanceFilterActive, onAdvanceFilterPress, bgColor}: any) => (
    <button onClick={onAdvanceFilterPress} style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: bgColor, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: isAdvanceFilterActive ? '#E9C638' : '#BDBDBD' }}>
      ⚙
    </button>
  );

const meta: Meta<typeof AdvanceFilterBtn> = {
  title: 'Components/AdvanceFilterBtn',
  component: AdvanceFilterBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Icon button to toggle advanced filters, gold when active\n\n**Source:** `src/components/Common/AdvanceFilterBtn.tsx`' } },
  },
  argTypes: { isAdvanceFilterActive: { control: 'boolean' }, bgColor: { control: 'color' }, onAdvanceFilterPress: { action: 'pressed' } },
  args: { isAdvanceFilterActive: false, bgColor: '#212121' },
};
export default meta;
type Story = StoryObj<typeof AdvanceFilterBtn>;

export const Inactive: Story = { args: { isAdvanceFilterActive: false } };

export const Active: Story = { args: { isAdvanceFilterActive: true } };
