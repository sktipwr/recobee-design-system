import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface ActivityTypeAndTimeProps { activityType: string; time: string; }

const ActivityTypeAndTime = ({activityType, time}: any) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 10, color: '#E9C638' }}>{activityType}</span>
      <span style={{ fontSize: 4, color: '#757575' }}>●</span>
      <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575' }}>{time}</span>
    </div>
  );

const meta: Meta<typeof ActivityTypeAndTime> = {
  title: 'Components/ActivityTypeAndTime',
  component: ActivityTypeAndTime,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Activity type label with timestamp display\n\n**Source:** `src/components/Common/ActivityTypeAndTime.tsx`' } },
  },
  argTypes: { activityType: { control: 'text' }, time: { control: 'text' } },
  args: { activityType: 'Reviewed', time: '2 hours ago' },
};
export default meta;
type Story = StoryObj<typeof ActivityTypeAndTime>;

export const Reviewed: Story = { args: { activityType: 'Reviewed', time: '2 hours ago' } };

export const Added: Story = { args: { activityType: 'Added to Watchlist', time: '1 day ago' } };
