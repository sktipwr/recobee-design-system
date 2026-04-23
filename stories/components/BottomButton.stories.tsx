import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface BottomButtonProps { primaryText: string; secText: string; disabled: boolean; }

const BottomButton = ({primaryText, secText, disabled}: any) => (
    <div style={{ width: 375, height: 80, backgroundColor: '#212121', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, borderTop: '1px solid #333' }}>
      <button style={{ flex: 1, height: 44, borderRadius: 3, border: `1px solid ${disabled ? '#9E9E9E' : '#E9C638'}`, backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: disabled ? '#9E9E9E' : '#E9C638' }}>{primaryText}</button>
      <button style={{ width: 100, height: 44, borderRadius: 3, border: '1px solid #BDBDBD', backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#BDBDBD' }}>{secText}</button>
      <button style={{ width: 48, height: 48, borderRadius: 3, border: '1px solid #EEEEEE', backgroundColor: 'transparent', cursor: 'pointer', fontSize: 16, color: '#EEEEEE' }}><MoreVerticalIconSVG color='#EEEEEE' width={20} height={20}/></button>
    </div>
  );

const meta: Meta<typeof BottomButton> = {
  title: 'Components/BottomButton',
  component: BottomButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Multi-button fixed bottom action bar with primary, secondary, and icon buttons\n\n**Source:** `src/components/Common/BottomButton.tsx`' } },
  },
  argTypes: { primaryText: { control: 'text' }, secText: { control: 'text' }, disabled: { control: 'boolean' } },
  args: { primaryText: 'Add to Watchlist', secText: 'Seen', disabled: false },
};
export default meta;
type Story = StoryObj<typeof BottomButton>;

export const Default: Story = { args: { primaryText: 'Add to Watchlist', secText: 'Seen', disabled: false } };

export const Disabled: Story = { args: { primaryText: 'Add to Watchlist', secText: 'Seen', disabled: true } };
