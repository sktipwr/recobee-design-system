import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const UserContactRow = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>User Contact Row</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Compact user contact row</div>
  </div>
);

const meta: Meta<typeof UserContactRow> = {
  title: 'Components/UserContactRow',
  component: UserContactRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Compact user contact row\n\n**Source:** `src/components/Common/UserContactRow.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof UserContactRow>;

export const Default: Story = {};
