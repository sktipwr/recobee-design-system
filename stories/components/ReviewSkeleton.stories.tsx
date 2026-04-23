import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ReviewSkeleton = (props: any) => (
  <div style={{ width: 343, padding: 16 }}>
    <style>{`@keyframes shimmer { 0% { background-position: -343px 0 } 100% { background-position: 343px 0 } }`}</style>
    <div style={{ display: 'flex', gap: 12 }}>
      <div style={{ width: 50, height: 72, borderRadius: 6, background: 'linear-gradient(90deg, #424242 25%, #555 50%, #424242 75%)', backgroundSize: '686px 100%', animation: 'shimmer 1.5s infinite linear' }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: 14, borderRadius: 4, marginBottom: 8, width: '70%', background: 'linear-gradient(90deg, #424242 25%, #555 50%, #424242 75%)', backgroundSize: '686px 100%', animation: 'shimmer 1.5s infinite linear' }} />
        <div style={{ height: 10, borderRadius: 4, width: '50%', background: 'linear-gradient(90deg, #424242 25%, #555 50%, #424242 75%)', backgroundSize: '686px 100%', animation: 'shimmer 1.5s infinite linear' }} />
        <div style={{ height: 10, borderRadius: 4, width: '35%', marginTop: 8, background: 'linear-gradient(90deg, #424242 25%, #555 50%, #424242 75%)', backgroundSize: '686px 100%', animation: 'shimmer 1.5s infinite linear' }} />
      </div>
    </div>
  </div>
);

const meta: Meta<typeof ReviewSkeleton> = {
  title: 'Skeletons/ReviewSkeleton',
  component: ReviewSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'ReviewSkeleton component from the RecoBee mobile app\n\n**Source:** `src/components/Skeletons/ReviewSkeleton.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ReviewSkeleton>;

export const Default: Story = {};
