import React from 'react';
import { TickIcon as TickIconSVG } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const DoneModal = ({message = 'Added to Watchlist!'}: any) => (<div style={{ width: 280, backgroundColor: '#272727', borderRadius: 16, padding: 32, textAlign: 'center' }}><div style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#388E3C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', }}><TickIconSVG color='#FFF' width={28} height={28} /></div><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9' }}>{message}</div></div>);

const meta: Meta<typeof DoneModal> = {
  title: 'Modals/DoneModal',
  component: DoneModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Success completion modal with checkmark animation\n\n**Source:** `src/components/Modals/DoneModal.tsx`' } },
  },
  argTypes: { message: { control: 'text' } },
  args: { message: 'Added to Watchlist!' },
};
export default meta;
type Story = StoryObj<typeof DoneModal>;

export const Default: Story = {};
