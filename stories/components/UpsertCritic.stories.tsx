import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const inputStyle: React.CSSProperties = { width: '100%', height: 44, borderRadius: 4, border: '1px solid #757575', backgroundColor: 'transparent', color: '#F8F8F9', fontFamily: 'DM Sans', fontSize: 14, padding: '0 12px', marginBottom: 8, outline: 'none' };

const UpsertCritic = () => {
  const [userId, setUserId] = useState('');
  return (
    <div style={{ width: 343, padding: 16, borderBottom: '1px solid #F8F8F9', backgroundColor: '#121212' }}>
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9', marginBottom: 12 }}>Update User to Critic</div>
      <input style={inputStyle} placeholder="Enter User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <button style={{ height: 50, width: 250, borderRadius: 4, backgroundColor: '#424242', border: 'none', color: '#F8F8F9', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 8 }}>Submit Changes</button>
    </div>
  );
};

const meta: Meta<typeof UpsertCritic> = {
  title: 'Components/UpsertCritic',
  component: UpsertCritic,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Admin form to upgrade a user role to critic by user ID.\n\n**Source:** `src/components/MetadataEntries/UpsertCritic.tsx`' } } },
};
export default meta;
type Story = StoryObj<typeof UpsertCritic>;
export const Default: Story = {};
