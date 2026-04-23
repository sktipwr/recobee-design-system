import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface AlertProps { title: string; message: string; buttonText: string; showSecondary: boolean; secButtonText: string; }

const Alert = ({title, message, buttonText, showSecondary, secButtonText}: any) => (
    <div style={{ width: 314, backgroundColor: '#272727', borderRadius: 8, padding: '16px 24px', position: 'relative' }}>
      <button style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#9E9E9E', cursor: 'pointer', fontSize: 16 }}><CrossIconSVG color='#BDBDBD' width={16} height={16}/></button>
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
        <div style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#F8F8F9', marginBottom: 20, maxHeight: 80, overflow: 'hidden' }}>{message}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
          <button style={{ width: 105, height: 36, borderRadius: 8, backgroundColor: '#E9C638', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#121212' }}>{buttonText}</button>
          {showSecondary && <button style={{ width: 105, height: 36, borderRadius: 8, backgroundColor: 'transparent', border: '1px solid #757575', cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#BDBDBD' }}>{secButtonText}</button>}
        </div>
      </div>
    </div>
  );

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Modal alert dialog with title, message text, action buttons, and close icon\n\n**Source:** `src/components/Common/Alert.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, message: { control: 'text' }, buttonText: { control: 'text' }, showSecondary: { control: 'boolean' }, secButtonText: { control: 'text' } },
  args: { title: 'Remove from Watchlist?', message: 'This movie will be removed from your watchlist.', buttonText: 'Remove', showSecondary: true, secButtonText: 'Cancel' },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = { args: { title: 'Remove from Watchlist?', message: 'This movie will be removed from your watchlist.' } };

export const SingleButton: Story = { args: { title: 'Success!', message: 'Your review has been posted.', buttonText: 'OK', showSecondary: false } };
