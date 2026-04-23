import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const AnalyticsTopSection = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Analytics Top Section</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Top summary section of analytics screen</div>
  </div>
);

const meta: Meta<typeof AnalyticsTopSection> = {
  title: 'Components/AnalyticsTopSection',
  component: AnalyticsTopSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Top summary section of analytics screen\n\n**Source:** `src/components/Common/AnalyticsTopSection.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AnalyticsTopSection>;

export const Default: Story = {};
