import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const AdvanceFiltersView = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Advance Filters View</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Advanced filter panel with multiple options</div>
  </div>
);

const meta: Meta<typeof AdvanceFiltersView> = {
  title: 'Components/AdvanceFiltersView',
  component: AdvanceFiltersView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Advanced filter panel with multiple options\n\n**Source:** `src/components/Common/AdvanceFiltersView.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AdvanceFiltersView>;

export const Default: Story = {};
