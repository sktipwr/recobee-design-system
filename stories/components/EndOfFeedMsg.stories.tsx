import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const EndOfFeedMsg = ({msg = "You're all caught up!"}: any) => (<div style={{ width: 375, padding: '20px 16px', textAlign: 'center' }}><span style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#757575' }}>{msg}</span></div>);

const meta: Meta<typeof EndOfFeedMsg> = {
  title: 'Components/EndOfFeedMsg',
  component: EndOfFeedMsg,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Footer message at end of scrollable feed\n\n**Source:** `src/components/Common/EndOfFeedMsg.tsx`' } },
  },
  argTypes: { msg: { control: 'text' } },
  args: { msg: "You're all caught up!" },
};
export default meta;
type Story = StoryObj<typeof EndOfFeedMsg>;

export const Default: Story = {};
