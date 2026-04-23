import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface IdpButtonProps { bgColor: string; label: string; labelColor: string; }

const IdpButton = ({bgColor, label, labelColor}: any) => (
    <button style={{ width: 343, height: 44, borderRadius: 20, backgroundColor: bgColor, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 12, paddingRight: 12, fontFamily: 'DM Sans', fontWeight: 700, fontSize: 17, color: labelColor }}>
      {label}
    </button>
  );

const meta: Meta<typeof IdpButton> = {
  title: 'Components/IdpButton',
  component: IdpButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Identity provider login button (Google, Apple, etc.) with logo and label\n\n**Source:** `src/components/Common/IdpButton.tsx`' } },
  },
  argTypes: { bgColor: { control: 'color' }, label: { control: 'text' }, labelColor: { control: 'color' } },
  args: { bgColor: '#FFFFFF', label: 'Continue with Google', labelColor: '#333333' },
};
export default meta;
type Story = StoryObj<typeof IdpButton>;

export const Google: Story = { args: { bgColor: '#FFFFFF', label: 'Continue with Google', labelColor: '#333333' } };

export const Apple: Story = { args: { bgColor: '#000000', label: 'Continue with Apple', labelColor: '#FFFFFF' } };

export const Facebook: Story = { args: { bgColor: '#1877F2', label: 'Continue with Facebook', labelColor: '#FFFFFF' } };
