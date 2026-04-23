import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const PageHeader = ({title = 'Trending', subtitle = 'Most popular movies this week'}: any) => (<div style={{ padding: '16px 16px 8px', width: 375 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 20, color: '#F8F8F9' }}>{title}</div>{subtitle && <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#757575', marginTop: 4 }}>{subtitle}</div>}</div>);

const meta: Meta<typeof PageHeader> = {
  title: 'Cards/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Page title header with optional subtitle\n\n**Source:** `src/components/Cards/PageHeader.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, subtitle: { control: 'text' } },
  args: { title: 'Trending', subtitle: 'Most popular movies this week' },
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {};
export const NoSubtitle: Story = { args: { subtitle: '' } };
