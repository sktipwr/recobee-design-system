import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface BottomPositionedBtnProps { title: string; showArrow: boolean; isDisabled: boolean; buttonBgColor: string; textColor: string; borderRadius: number; }

const BottomPositionedBtn = ({title, showArrow, isDisabled, buttonBgColor, textColor, borderRadius}: any) => (
    <div style={{ width: 375, padding: '12px 16px', backgroundColor: '#121212' }}>
      <button style={{ width: '100%', height: 40, borderRadius, backgroundColor: isDisabled ? '#424242' : buttonBgColor, border: 'none', cursor: isDisabled ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: isDisabled ? '#757575' : textColor, opacity: isDisabled ? 0.6 : 1 }}>
        {title} {showArrow && <span><RightArrowIcon color='#F8F8F9' width={14} height={14}/></span>}
      </button>
    </div>
  );

const meta: Meta<typeof BottomPositionedBtn> = {
  title: 'Components/BottomPositionedBtn',
  component: BottomPositionedBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Floating bottom-positioned CTA button with optional arrow\n\n**Source:** `src/components/Common/BottomPositionedBtn.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, showArrow: { control: 'boolean' }, isDisabled: { control: 'boolean' }, buttonBgColor: { control: 'color' }, textColor: { control: 'color' }, borderRadius: { control: { type: 'range', min: 0, max: 30 } } },
  args: { title: 'Continue', showArrow: true, isDisabled: false, buttonBgColor: '#DEBF19', textColor: '#121212', borderRadius: 8 },
};
export default meta;
type Story = StoryObj<typeof BottomPositionedBtn>;

export const Default: Story = { args: { title: 'Continue' } };

export const Disabled: Story = { args: { title: 'Continue', isDisabled: true } };

export const CustomColor: Story = { args: { title: 'Subscribe Now', buttonBgColor: '#E9C638', showArrow: false } };
