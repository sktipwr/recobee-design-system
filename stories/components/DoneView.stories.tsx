import React from 'react';
import { TickIcon as TickIconSVG } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const DoneView = ({bgColor = '#388E3C', tickColor = '#FFFFFF'}: any) => (<div style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TickIconSVG color={tickColor} width={24} height={24} /></div>);

const meta: Meta<typeof DoneView> = {
  title: 'Components/DoneView',
  component: DoneView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Circular completion indicator with checkmark\n\n**Source:** `src/components/Common/DoneView.tsx`' } },
  },
  argTypes: { bgColor: { control: 'color' }, tickColor: { control: 'color' } },
  args: { bgColor: '#388E3C', tickColor: '#FFFFFF' },
};
export default meta;
type Story = StoryObj<typeof DoneView>;

export const Default: Story = {};
export const Gold: Story = { args: { bgColor: '#E9C638', tickColor: '#121212' } };
