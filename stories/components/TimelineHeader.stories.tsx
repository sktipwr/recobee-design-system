import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface TimelineHeaderProps { title: string; isExpanded: boolean; }

const TimelineHeader = ({title, isExpanded}: any) => (
    <div style={{ width: 375, display: 'flex', alignItems: 'center', padding: '5px 10px', backgroundColor: '#121212', cursor: 'pointer' }}>
      <span style={{ fontSize: 14, color: '#F8F8F9', marginRight: 8, transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▶</span>
      <span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9', marginRight: 16 }}>{title}</span>
      <div style={{ flex: 1, height: 0.5, backgroundColor: '#757575', marginRight: 16 }} />
    </div>
  );

const meta: Meta<typeof TimelineHeader> = {
  title: 'Components/TimelineHeader',
  component: TimelineHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Collapsible timeline section header with arrow and title, plus horizontal line\n\n**Source:** `src/components/Common/TimelineHeader.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, isExpanded: { control: 'boolean' } },
  args: { title: 'March 2026', isExpanded: true },
};
export default meta;
type Story = StoryObj<typeof TimelineHeader>;

export const Expanded: Story = { args: { title: 'March 2026', isExpanded: true } };

export const Collapsed: Story = { args: { title: 'February 2026', isExpanded: false } };
