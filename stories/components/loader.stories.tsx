import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface loaderProps { loading: boolean; }

const loader = ({loading}: any) => loading ? (
    <div style={{ width: 375, height: 300, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
      <div style={{ width: 100, height: 100, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid #424242', borderTopColor: '#E9C638', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </div>
  ) : null;

const meta: Meta<typeof loader> = {
  title: 'Components/loader',
  component: loader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Full-screen loading overlay with centered spinner\n\n**Source:** `src/components/Common/loader.tsx`' } },
  },
  argTypes: { loading: { control: 'boolean' } },
  args: { loading: true },
};
export default meta;
type Story = StoryObj<typeof loader>;

export const Active: Story = { args: { loading: true } };

export const Hidden: Story = { args: { loading: false } };
