import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface MarqueeComponentProps { text: string; }

const MarqueeComponent = ({text}: any) => (
    <div style={{ width: 300, overflow: 'hidden', padding: '8px 0' }}>
      <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'marquee 8s linear infinite', fontFamily: 'DM Sans', fontSize: 14, color: '#F8F8F9' }}>
        {text}
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(100%) } 100% { transform: translateX(-100%) } }`}</style>
    </div>
  );

const meta: Meta<typeof MarqueeComponent> = {
  title: 'Components/MarqueeComponent',
  component: MarqueeComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Scrolling marquee text animation for overflowing text\n\n**Source:** `src/components/Common/MarqueeComponent.tsx`' } },
  },
  argTypes: { text: { control: 'text' } },
  args: { text: 'This is a scrolling marquee text that moves horizontally when content overflows the container width' },
};
export default meta;
type Story = StoryObj<typeof MarqueeComponent>;

export const Default: Story = {};
