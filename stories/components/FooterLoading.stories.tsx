import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface FooterLoadingProps { loadMore: boolean; }

const FooterLoading = ({loadMore}: any) => (
    <div style={{ width: 375, padding: '12px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      {loadMore && <>
        <div style={{ width: 24, height: 24, border: '2px solid #333', borderTopColor: '#F8F8F9', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <span style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#757575' }}>LOADING</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </>}
    </div>
  );

const meta: Meta<typeof FooterLoading> = {
  title: 'Components/FooterLoading',
  component: FooterLoading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Loading spinner indicator shown at list footer during pagination\n\n**Source:** `src/components/Common/FooterLoading.tsx`' } },
  },
  argTypes: { loadMore: { control: 'boolean' } },
  args: { loadMore: true },
};
export default meta;
type Story = StoryObj<typeof FooterLoading>;

export const Loading: Story = { args: { loadMore: true } };

export const Hidden: Story = { args: { loadMore: false } };
