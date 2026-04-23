import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const BarChartUI = () => { const data = [{v:65,l:'Mon'},{v:40,l:'Tue'},{v:80,l:'Wed'},{v:55,l:'Thu'},{v:90,l:'Fri'}]; const max = Math.max(...data.map(d=>d.v)); return (<div style={{ width: 300, padding: 16 }}><div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 112 }}>{data.map((d,i) => (<div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}><div style={{ width: 18, height: (d.v/max)*100, backgroundColor: '#616161', borderRadius: 4 }} /><span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575' }}>{d.l}</span></div>))}</div></div>); };

const meta: Meta<typeof BarChartUI> = {
  title: 'Components/BarChartUI',
  component: BarChartUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Animated bar chart visualization using gifted-charts\n\n**Source:** `src/components/Common/BarChartUI.tsx`' } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof BarChartUI>;

export const Default: Story = {};
