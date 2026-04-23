import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const AvgStatsInfoContainer = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Avg Stats Info Container</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Container showing average statistics</div>
  </div>
);

const meta: Meta<typeof AvgStatsInfoContainer> = {
  title: 'Components/AvgStatsInfoContainer',
  component: AvgStatsInfoContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Container showing average statistics\n\n**Source:** `src/components/Common/AvgStatsInfoContainer.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AvgStatsInfoContainer>;

export const Default: Story = {};
