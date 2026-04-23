import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const LeftDrawer = () => (<div style={{ width: 280, height: 600, backgroundColor: '#121212', padding: '16px 0', display: 'flex', flexDirection: 'column' }}><div style={{ padding: '0 16px', marginBottom: 24 }}><div style={{ width: 80, height: 24, marginBottom: 16 }}><span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#E9C638' }}>RecoBee</span></div><div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 4, border: '0.5px solid #333' }}><div style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#E9C638', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, color: '#121212' }}>A</div><div><div style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#FFF' }}>Ankit</div><div style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#424242' }}>@ankit</div></div></div></div><div style={{ flex: 1 }}>{['Home', 'Explore', 'My Diary', 'Watchlist', 'Communities', 'Rewards'].map(item => (<div key={item} style={{ padding: '12px 24px', fontFamily: 'DM Sans', fontSize: 14, color: '#F8F8F9', cursor: 'pointer' }}>{item}</div>))}</div><div style={{ padding: '12px 24px', borderTop: '1px solid #272727' }}><span style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#757575' }}>Settings</span></div></div>);

const meta: Meta<typeof LeftDrawer> = {
  title: 'Components/LeftDrawer',
  component: LeftDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Left navigation drawer with user profile, menu items, and settings\n\n**Source:** `src/components/Common/LeftDrawer.tsx`' } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof LeftDrawer>;

export const Default: Story = {};
