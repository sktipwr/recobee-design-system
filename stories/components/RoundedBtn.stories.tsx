import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface RoundedBtnProps {
  text: string;
  width: number;
  height: number;
  bgColor: string;
  borderColor: string;
  textColor: string;
  borderRadius: number;
  borderWidth: number;
  fontSize: number;
  onClick: () => void;
}

const RoundedBtn = ({ text, width = 120, height = 44, bgColor = '#424242', borderColor = '#E9C638', textColor = '#F8F8F9', borderRadius = 8, borderWidth = 1, fontSize = 14, onClick }: RoundedBtnProps) => (
  <button onClick={onClick} style={{
    width, height, borderRadius,
    border: `${borderWidth}px solid ${borderColor}`,
    backgroundColor: bgColor, cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize,
    color: textColor,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  }}>{text}</button>
);

const meta: Meta<typeof RoundedBtn> = {
  title: 'Components/RoundedBtn',
  component: RoundedBtn,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Configurable bordered button with customizable colors, size, and border radius. Used for secondary actions like Follow, Rate, Share, Edit.\n\n**Source:** `src/components/Common/RoundedBtn.tsx`',
      },
    },
  },
  argTypes: {
    text: { control: 'text' },
    width: { control: { type: 'range', min: 60, max: 300 } },
    height: { control: { type: 'range', min: 28, max: 64 } },
    bgColor: { control: 'color', description: 'Background color' },
    borderColor: { control: 'color', description: 'Border color' },
    textColor: { control: 'color', description: 'Text color' },
    borderRadius: { control: { type: 'range', min: 0, max: 30 } },
    borderWidth: { control: { type: 'range', min: 0, max: 3 } },
    fontSize: { control: { type: 'range', min: 10, max: 20 } },
    onClick: { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<typeof RoundedBtn>;

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <RoundedBtn text="Follow" onClick={() => {}} width={120} height={44} bgColor="#424242" borderColor="#E9C638" textColor="#F8F8F9" borderRadius={8} borderWidth={1} fontSize={14} />
      <RoundedBtn text="Following" onClick={() => {}} width={130} height={44} bgColor="#E9C638" borderColor="#E9C638" textColor="#121212" borderRadius={8} borderWidth={1} fontSize={14} />
      <RoundedBtn text="Edit" onClick={() => {}} width={80} height={44} bgColor="#424242" borderColor="#E9C638" textColor="#F8F8F9" borderRadius={8} borderWidth={1} fontSize={14} />
      <RoundedBtn text="Rate" onClick={() => {}} width={80} height={32} bgColor="#424242" borderColor="#E9C638" textColor="#F8F8F9" borderRadius={16} borderWidth={1} fontSize={12} />
      <RoundedBtn text="Share" onClick={() => {}} width={90} height={44} bgColor="#424242" borderColor="#757575" textColor="#F8F8F9" borderRadius={8} borderWidth={1} fontSize={14} />
    </div>
  ),
};

export const Default: Story = {
  args: { text: 'Follow', width: 120, height: 44 },
};

export const Active: Story = {
  args: { text: 'Following', width: 130, height: 44, bgColor: '#E9C638', borderColor: '#E9C638', textColor: '#121212' },
};

export const Small: Story = {
  args: { text: 'Rate', width: 80, height: 32, borderRadius: 16, fontSize: 12 },
};

export const Subtle: Story = {
  args: { text: 'Share', width: 90, height: 44, borderColor: '#757575' },
};
