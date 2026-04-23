import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface EmptyStateCardProps { heading: string; subheading: string; buttonText: string; }

const EmptyStateCard = ({heading, subheading, buttonText}: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', textAlign: 'center' }}>
      <div style={{ fontSize: 32, marginBottom: 2 }}>📝</div>
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: '#9E9E9E', marginBottom: 2 }}>{heading}</div>
      <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginBottom: 4 }}>{subheading}</div>
      <button style={{ background: 'linear-gradient(90deg, #F9FE11, #FF9A3D)', border: 'none', borderRadius: 16, padding: '6px 16px', cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 500, fontSize: 14, color: '#333', display: 'flex', alignItems: 'center', gap: 8 }}>{buttonText} →</button>
    </div>
  );

const meta: Meta<typeof EmptyStateCard> = {
  title: 'Components/EmptyStateCard',
  component: EmptyStateCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Card variant of empty state with icon, heading, subheading, and gradient CTA button\n\n**Source:** `src/components/Common/EmptyStateCard.tsx`' } },
  },
  argTypes: { heading: { control: 'text' }, subheading: { control: 'text' }, buttonText: { control: 'text' } },
  args: { heading: 'No Reviews Yet', subheading: 'Be the first to review this movie', buttonText: 'Write Review' },
};
export default meta;
type Story = StoryObj<typeof EmptyStateCard>;

export const Default: Story = { args: { heading: 'No Reviews Yet', subheading: 'Be the first to review this movie', buttonText: 'Write Review' } };
