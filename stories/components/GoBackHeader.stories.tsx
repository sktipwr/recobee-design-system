import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowIcon } from '../helpers/icons';

interface GoBackHeaderProps {
  title: string;
  goBack: () => void;
}

const GoBackHeader = ({ title, goBack }: GoBackHeaderProps) => (
  <div style={{
    height: 56, width: 375,
    backgroundColor: '#121212',
    display: 'flex', alignItems: 'center', paddingLeft: 8, paddingRight: 16,
  }}>
    <button onClick={goBack} style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(90deg)' }}>
      <ArrowIcon color="#F8F8F9" width={24} height={24} />
    </button>
    <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#F8F8F9', marginLeft: 8, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
  </div>
);

const meta: Meta<typeof GoBackHeader> = {
  title: 'Components/GoBackHeader',
  component: GoBackHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Simple navigation header with back arrow and title. Uses the app\'s Arrow SVG icon.\n\n**Source:** `src/components/Common/GoBackHeader.tsx`' } },
  },
  argTypes: {
    title: { control: 'text', description: 'Header title text' },
    goBack: { action: 'goBack' },
  },
};
export default meta;
type Story = StoryObj<typeof GoBackHeader>;

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <GoBackHeader title="Movie Details" goBack={() => {}} />
      <GoBackHeader title="My Watchlist" goBack={() => {}} />
      <GoBackHeader title="Settings & Preferences" goBack={() => {}} />
    </div>
  ),
};

export const Default: Story = { args: { title: 'Movie Details' } };
export const LongTitle: Story = { args: { title: 'Advanced Settings & Notification Preferences' } };
