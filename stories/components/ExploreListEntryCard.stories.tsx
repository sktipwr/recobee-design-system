import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ExploreListEntryCard = ({title = 'Explore List Entry Card'}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Entry point card for explore lists</div>
  </div>
);

const meta: Meta<typeof ExploreListEntryCard> = {
  title: 'Cards/ExploreListEntryCard',
  component: ExploreListEntryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Entry point card for explore lists\n\n**Source:** `src/components/Cards/ExploreListEntryCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ExploreListEntryCard>;

export const Default: Story = {};
