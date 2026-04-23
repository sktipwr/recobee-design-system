import React from 'react';
import { StarFilledIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const BorderGradient = ({isPremium = false}: any) => (<div style={{ padding: 2, borderRadius: 20, background: 'linear-gradient(135deg, #F9FE11, #FF9A3D)' }}><div style={{ backgroundColor: '#121212', borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><StarFilledIcon color='#F8F8F9' width={14} height={14} /><span style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#F8F8F9' }}>{isPremium ? 'A Premium User' : 'Upgrade To Premium'}</span></div></div>);

const meta: Meta<typeof BorderGradient> = {
  title: 'Components/BorderGradient',
  component: BorderGradient,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'View with gradient border effect and premium text\n\n**Source:** `src/components/Common/BorderGradient.tsx`' } },
  },
  argTypes: { isPremium: { control: 'boolean' } },
  args: { isPremium: false },
};
export default meta;
type Story = StoryObj<typeof BorderGradient>;

export const Default: Story = {};
export const Premium: Story = { args: { isPremium: true } };
