import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface ChipWrapperProps { label: string; selected: boolean; disabled: boolean; }

const ChipWrapper = ({label, selected, disabled}: any) => (
    <button disabled={disabled} style={{ padding: '6px 16px', borderRadius: 8, border: selected ? '1px solid #F6CE3D' : '1px solid transparent', backgroundColor: selected ? '#353014' : '#424242', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans', fontSize: 14, color: selected ? '#F6CE3D' : '#F8F8F9', opacity: disabled ? 0.5 : 1 }}>{label}</button>
  );

const meta: Meta<typeof ChipWrapper> = {
  title: 'Components/ChipWrapper',
  component: ChipWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Paper Chip component with selection state and gold highlight\n\n**Source:** `src/components/Common/ChipWrapper.tsx`' } },
  },
  argTypes: { label: { control: 'text' }, selected: { control: 'boolean' }, disabled: { control: 'boolean' } },
  args: { label: 'Action', selected: false, disabled: false },
};
export default meta;
type Story = StoryObj<typeof ChipWrapper>;

export const Default: Story = {};

export const Selected: Story = { args: { label: 'Comedy', selected: true } };

export const Disabled: Story = { args: { label: 'Horror', disabled: true } };
