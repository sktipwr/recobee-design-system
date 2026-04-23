import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface TopSectionNavigationProps { sectionCount: number; currentSection: number; }

const TopSectionNavigation = ({sectionCount, currentSection}: any) => {
    const barWidth = (343 - (sectionCount - 1) * 4) / sectionCount;
    return (
      <div style={{ display: 'flex', gap: 4, width: 343 }}>
        {Array.from({length: sectionCount}).map((_, i) => (
          <div key={i} style={{ width: barWidth, height: 4, borderRadius: 16, backgroundColor: i <= currentSection ? '#E9C638' : '#121212' }} />
        ))}
      </div>
    );
  };

const meta: Meta<typeof TopSectionNavigation> = {
  title: 'Components/TopSectionNavigation',
  component: TopSectionNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Horizontal progress bar showing sections as small rounded bars\n\n**Source:** `src/components/Common/TopSectionNavigation.tsx`' } },
  },
  argTypes: { sectionCount: { control: { type: 'range', min: 2, max: 10 } }, currentSection: { control: { type: 'range', min: 0, max: 9 } } },
  args: { sectionCount: 5, currentSection: 2 },
};
export default meta;
type Story = StoryObj<typeof TopSectionNavigation>;

export const Default: Story = { args: { sectionCount: 5, currentSection: 2 } };

export const Start: Story = { args: { sectionCount: 4, currentSection: 0 } };

export const Complete: Story = { args: { sectionCount: 5, currentSection: 4 } };
