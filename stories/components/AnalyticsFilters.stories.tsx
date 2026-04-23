import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const AnalyticsFilters = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Analytics Filters</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Filter controls for analytics dashboard</div>
  </div>
);

const meta: Meta<typeof AnalyticsFilters> = {
  title: 'Components/AnalyticsFilters',
  component: AnalyticsFilters,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Filter controls for analytics dashboard\n\n**Source:** `src/components/Common/AnalyticsFilters.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AnalyticsFilters>;

export const Default: Story = {};
