import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const UpdatePrefsCard = (props: any) => (
  <div style={{ width: 343, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9', marginBottom: 16 }}>Update Prefs Card</div>
    {['Field 1', 'Field 2'].map((f: string) => (
      <div key={f} style={{ marginBottom: 12 }}>
        <div style={{ fontFamily: 'DM Sans', fontSize: 12, fontWeight: 700, color: '#BDBDBD', marginBottom: 4 }}>{f}</div>
        <div style={{ height: 40, borderRadius: 8, backgroundColor: '#424242', padding: '0 12px', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#9E9E9E' }}>Enter value...</span>
        </div>
      </div>
    ))}
    <button style={{ width: '100%', height: 40, borderRadius: 8, backgroundColor: '#E9C638', border: 'none', fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#121212', cursor: 'pointer', marginTop: 8 }}>Save</button>
  </div>
);

const meta: Meta<typeof UpdatePrefsCard> = {
  title: 'Cards/UpdatePrefsCard',
  component: UpdatePrefsCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Update preferences prompt card\n\n**Source:** `src/components/Cards/UpdatePrefsCard.tsx`',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof UpdatePrefsCard>;

export const Default: Story = {};
