import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface ErrorTextProps {
  msg: string;
}

const ErrorText = ({ msg }: ErrorTextProps) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 4 }}>
    <span style={{ color: '#E53935', fontSize: 14 }}>⚠</span>
    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#E53935' }}>{msg}</span>
  </div>
);

const meta: Meta<typeof ErrorText> = {
  title: 'Components/ErrorText',
  component: ErrorText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Inline error message with warning icon. Used for form validation errors.\n\n**Source:** `src/components/Common/ErrorText.tsx`',
      },
    },
  },
  argTypes: {
    msg: { control: 'text', description: 'Error message text' },
  },
};
export default meta;
type Story = StoryObj<typeof ErrorText>;

export const Default: Story = {
  args: { msg: 'This field is required' },
};

export const Email: Story = {
  args: { msg: 'Invalid email address' },
};

export const Password: Story = {
  args: { msg: 'Password must be at least 8 characters' },
};
