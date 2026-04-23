import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface CustomProgressProps { progress: number; maxValue: number; showPercentSymbol: boolean; fillColor: string; }

const CustomProgress = ({progress, maxValue, showPercentSymbol, fillColor}: any) => {
    const pct = Math.min(progress / maxValue * 100, 100);
    return (
      <div style={{ width: 300, position: 'relative', padding: '20px 0' }}>
        <div style={{ height: 3, borderRadius: 4, backgroundColor: '#424242', position: 'relative' }}>
          <div style={{ height: 5, borderRadius: 0, backgroundColor: fillColor, width: pct + '%', position: 'absolute', top: -1 }} />
        </div>
        <div style={{ position: 'absolute', top: 0, left: `calc(${pct}% - 15px)`, minWidth: 25, height: 19, borderRadius: 10, border: `1px solid ${fillColor}`, backgroundColor: '#1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontSize: 12, color: '#EEEEEE' }}>
          {progress}{showPercentSymbol ? '%' : ''}
        </div>
      </div>
    );
  };

const meta: Meta<typeof CustomProgress> = {
  title: 'Components/CustomProgress',
  component: CustomProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Horizontal progress bar with animated fill and floating value badge\n\n**Source:** `src/components/Common/CustomProgress.tsx`' } },
  },
  argTypes: { progress: { control: { type: 'range', min: 0, max: 100 } }, maxValue: { control: { type: 'range', min: 1, max: 100 } }, showPercentSymbol: { control: 'boolean' }, fillColor: { control: 'color' } },
  args: { progress: 65, maxValue: 100, showPercentSymbol: false, fillColor: '#E9C638' },
};
export default meta;
type Story = StoryObj<typeof CustomProgress>;

export const Default: Story = { args: { progress: 65, maxValue: 100 } };

export const WithPercent: Story = { args: { progress: 42, maxValue: 100, showPercentSymbol: true } };

export const Low: Story = { args: { progress: 10, maxValue: 100 } };
