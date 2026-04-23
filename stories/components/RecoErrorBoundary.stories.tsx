import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const RecoErrorBoundary = ({ hasError }: any) => {
  if (!hasError) {
    return (
      <div style={{ width: 375, height: 300, backgroundColor: '#121212', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
        <span style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#757575' }}>App content renders normally when no error</span>
      </div>
    );
  }
  return (
    <div style={{ width: 375, height: 500, backgroundColor: '#121212', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12, padding: 24 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>😔</div>
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, color: '#F8F8F9', marginBottom: 12, textAlign: 'center' }}>Oops! Something went wrong</div>
      <div style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#9E9E9E', textAlign: 'center', marginBottom: 24, maxWidth: 280 }}>
        An error has occurred. We're sorry for the inconvenience. Please reload the app and try again!
      </div>
      <button style={{ borderRadius: 8, backgroundColor: '#E9C638', border: 'none', padding: 12, cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#121212', minWidth: 150 }}>
        Reload App
      </button>
    </div>
  );
};

const meta: Meta<typeof RecoErrorBoundary> = {
  title: 'Components/RecoErrorBoundary',
  component: RecoErrorBoundary,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Error boundary fallback UI with sad icon, error message, and reload button.\n\n**Source:** `src/components/RecoErrorBoundary/RecoErrorBoundary.tsx`' } } },
  argTypes: { hasError: { control: 'boolean' } },
};
export default meta;
type Story = StoryObj<typeof RecoErrorBoundary>;

export const NoError: Story = { args: { hasError: false } };
export const ErrorState: Story = { args: { hasError: true } };
