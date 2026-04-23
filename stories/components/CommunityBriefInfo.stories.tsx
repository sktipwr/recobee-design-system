import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const CommunityBriefInfo = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Community Brief Info</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Brief community/group info card</div>
  </div>
);

const meta: Meta<typeof CommunityBriefInfo> = {
  title: 'Components/CommunityBriefInfo',
  component: CommunityBriefInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Brief community/group info card\n\n**Source:** `src/components/Common/CommunityBriefInfo.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof CommunityBriefInfo>;

export const Default: Story = {};
