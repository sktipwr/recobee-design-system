import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const VideoModal = (props: any) => (
  <div style={{ width: 300, backgroundColor: '#272727', borderRadius: 12, padding: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <span style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9' }}>Video</span>
      <button style={{ background: 'none', border: 'none', color: '#9E9E9E', cursor: 'pointer', fontSize: 16 }}>✕</button>
    </div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#BDBDBD', lineHeight: '22px', marginBottom: 16 }}>VideoModal component from the RecoBee mobile app</div>
    <button style={{ width: '100%', height: 36, borderRadius: 8, backgroundColor: '#E9C638', border: 'none', fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#121212', cursor: 'pointer' }}>Got it</button>
  </div>
);

const meta: Meta<typeof VideoModal> = {
  title: 'Modals/VideoModal',
  component: VideoModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'VideoModal component from the RecoBee mobile app\n\n**Source:** `src/components/Modals/VideoModal.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof VideoModal>;

export const Default: Story = {};
