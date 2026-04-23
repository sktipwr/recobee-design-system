import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const EpisodesInfo = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Episodes Info</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>EpisodesInfo component from the RecoBee mobile app</div>
  </div>
);

const meta: Meta<typeof EpisodesInfo> = {
  title: 'Components/EpisodesInfo',
  component: EpisodesInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'EpisodesInfo component from the RecoBee mobile app\n\n**Source:** `src/components/Common/EpisodesInfo.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EpisodesInfo>;

export const Default: Story = {};
