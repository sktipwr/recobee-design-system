import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const AdmobBannerSize = (props: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9', marginBottom: 8 }}>Admob Banner Size</div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '20px' }}>Google AdMob banner placeholder</div>
  </div>
);

const meta: Meta<typeof AdmobBannerSize> = {
  title: 'Components/AdmobBannerSize',
  component: AdmobBannerSize,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Google AdMob banner placeholder\n\n**Source:** `src/components/Common/AdmobBannerSize.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AdmobBannerSize>;

export const Default: Story = {};
