import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const NotificationButton = ({label = 'Notification'}: any) => (
  <button style={{ padding: '8px 20px', borderRadius: 8, backgroundColor: '#E9C638', border: 'none', fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#121212', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
    {label}
  </button>
);

const meta: Meta<typeof NotificationButton> = {
  title: 'Components/NotificationButton',
  component: NotificationButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'NotificationButton component from the RecoBee mobile app\n\n**Source:** `src/components/Common/NotificationButton.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof NotificationButton>;

export const Default: Story = {};
