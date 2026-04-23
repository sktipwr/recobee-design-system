import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const SocialFeedCarousel = (props: any) => (
  <div style={{ width: 375, padding: '0 16px' }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9', marginBottom: 12 }}>Social Feed</div>
    <div style={{ display: 'flex', gap: 12, overflow: 'auto' }}>
      {[1,2,3,4].map((i: number) => (
        <div key={i} style={{ width: 200, height: 120, borderRadius: 12, backgroundColor: '#1E1E1E', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#757575' }}>Slide {i}</span>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
      {[0,1,2,3].map((i: number) => <div key={i} style={{ width: i===0?16:6, height: 6, borderRadius: 3, backgroundColor: i===0?'#E9C638':'#424242' }} />)}
    </div>
  </div>
);

const meta: Meta<typeof SocialFeedCarousel> = {
  title: 'Carousels/SocialFeedCarousel',
  component: SocialFeedCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'SocialFeedCarousel component from the RecoBee mobile app\n\n**Source:** `src/components/Carousels/SocialFeedCarousel.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SocialFeedCarousel>;

export const Default: Story = {};
