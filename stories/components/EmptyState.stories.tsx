import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface EmptyStateProps {
  title: string;
  message: string;
  emoji: string;
  hasButton: boolean;
  buttonText: string;
  onButtonClick: () => void;
}

const EmptyState = ({ title, message, emoji, hasButton = false, buttonText = 'Try Again', onButtonClick }: EmptyStateProps) => (
  <div style={{
    width: 375, minHeight: 300,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#121212', padding: 24,
  }}>
    {emoji && <div style={{ fontSize: 48, marginBottom: title ? 30 : 20 }}>{emoji}</div>}
    {title && <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 20, color: '#FFFFFF', marginBottom: 12, textAlign: 'center' }}>{title}</div>}
    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9E9E9E', textAlign: 'center', maxWidth: 280, opacity: 0.7 }}>{message}</div>
    {hasButton && <button onClick={onButtonClick} style={{ marginTop: 20, height: 36, minWidth: 125, borderRadius: 20, border: 'none', backgroundColor: '#E9C638', color: '#212121', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: '0 24px' }}>{buttonText}</button>}
  </div>
);

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Empty state placeholder shown when content is unavailable. Supports emoji icon, title, message, and optional CTA button.\n\n**Source:** `src/components/Common/EmptyState.tsx`',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    emoji: { control: 'select', options: ['😢', '🤔', '😮', '😭', '😊', '😃', ''] },
    hasButton: { control: 'boolean' },
    buttonText: { control: 'text' },
    onButtonClick: { action: 'buttonClicked' },
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <EmptyState title="No Movies Found" message="Try adjusting your filters" emoji="🤔" hasButton={false} buttonText="" onButtonClick={() => {}} />
      <EmptyState title="Your Watchlist is Empty" message="Start adding movies you want to watch" emoji="😢" hasButton={true} buttonText="Explore Movies" onButtonClick={() => {}} />
    </div>
  ),
};

export const WithButton: Story = {
  args: { title: 'Your Watchlist is Empty', message: 'Start adding movies you want to watch', emoji: '😢', hasButton: true, buttonText: 'Explore Movies' },
};

export const NoButton: Story = {
  args: { title: 'No Movies Found', message: 'Try adjusting your filters or search for something else', emoji: '🤔', hasButton: false },
};

export const NoIcon: Story = {
  args: { title: 'Nothing here yet', message: 'Check back later for updates', emoji: '', hasButton: false },
};
