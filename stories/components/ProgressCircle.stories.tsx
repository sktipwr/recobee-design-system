import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface ProgressCircleProps { percent: number; radius: number; ringColor: string; ringBgColor: string; innerText: string; category: string; }

const ProgressCircle = ({percent, radius, ringColor, ringBgColor, innerText, category}: any) => {
    const circumference = 2 * Math.PI * (radius - 6);
    const offset = circumference - (percent / 100) * circumference;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg width={radius * 2} height={radius * 2}>
          <circle cx={radius} cy={radius} r={radius - 6} fill="none" stroke={ringBgColor} strokeWidth={3} />
          <circle cx={radius} cy={radius} r={radius - 6} fill="none" stroke={ringColor} strokeWidth={3} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${radius} ${radius})`} />
          <text x={radius} y={radius} textAnchor="middle" dominantBaseline="central" fill="#F8F8F9" fontSize="14" fontWeight="700" fontFamily="DM Sans">{innerText}</text>
        </svg>
        {category && <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#BDBDBD', marginTop: 4 }}>{category}</span>}
      </div>
    );
  };

const meta: Meta<typeof ProgressCircle> = {
  title: 'Components/ProgressCircle',
  component: ProgressCircle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Circular progress indicator with percentage text and category label\n\n**Source:** `src/components/Common/ProgressCircle.tsx`' } },
  },
  argTypes: { percent: { control: { type: 'range', min: 0, max: 100 } }, radius: { control: { type: 'range', min: 30, max: 80 } }, ringColor: { control: 'color' }, ringBgColor: { control: 'color' }, innerText: { control: 'text' }, category: { control: 'text' } },
  args: { percent: 75, radius: 50, ringColor: '#E9C638', ringBgColor: '#424242', innerText: '75%', category: 'Watched' },
};
export default meta;
type Story = StoryObj<typeof ProgressCircle>;

export const Default: Story = { args: { percent: 75, innerText: '75%', category: 'Watched' } };

export const Low: Story = { args: { percent: 25, innerText: '25%', category: 'Progress', ringColor: '#E53935' } };

export const Complete: Story = { args: { percent: 100, innerText: '100%', category: 'Done', ringColor: '#388E3C' } };
