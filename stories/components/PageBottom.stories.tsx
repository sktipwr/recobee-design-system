import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const PageBottom = () => (<div style={{ width: 375, padding: '24px 16px', textAlign: 'center' }}><div style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#424242' }}>Made with ❤️ by RecoBee</div></div>);

const meta: Meta<typeof PageBottom> = {
  title: 'Cards/PageBottom',
  component: PageBottom,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Page footer spacer with optional branding\n\n**Source:** `src/components/Cards/PageBottom.tsx`' } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof PageBottom>;

export const Default: Story = {};
