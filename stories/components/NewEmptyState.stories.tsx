import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface NewEmptyStateProps { mainText: string; subText: string; buttonText: string; buttonShow: boolean; }

const NewEmptyState = ({mainText, subText, buttonText, buttonShow}: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20, margin: 10, textAlign: 'center' }}>
      <div style={{ width: '100%', height: 120, backgroundColor: '#272727', borderRadius: 12, marginBottom: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🎬</div>
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#FFFFFF', marginBottom: 10 }}>{mainText}</div>
      <div style={{ fontSize: 12, color: '#BDBDBD', marginBottom: 20 }}>{subText}</div>
      {buttonShow && <button style={{ padding: '12px 30px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 14, color: '#E9C638', display: 'flex', alignItems: 'center', gap: 4 }}>{buttonText} →</button>}
    </div>
  );

const meta: Meta<typeof NewEmptyState> = {
  title: 'Components/NewEmptyState',
  component: NewEmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Updated empty state card with image, main text, subtext, and optional CTA\n\n**Source:** `src/components/Common/NewEmptyState.tsx`' } },
  },
  argTypes: { mainText: { control: 'text' }, subText: { control: 'text' }, buttonText: { control: 'text' }, buttonShow: { control: 'boolean' } },
  args: { mainText: 'Start Your Movie Diary', subText: 'Track and rate every movie you watch', buttonText: 'Get Started', buttonShow: true },
};
export default meta;
type Story = StoryObj<typeof NewEmptyState>;

export const Default: Story = {};

export const NoButton: Story = { args: { mainText: 'Coming Soon', subText: 'This feature is being developed', buttonShow: false } };
