import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const inputStyle: React.CSSProperties = { width: '100%', height: 44, borderRadius: 4, border: '1px solid #757575', backgroundColor: 'transparent', color: '#F8F8F9', fontFamily: 'DM Sans', fontSize: 14, padding: '0 12px', marginBottom: 8, outline: 'none' };

const UpdateTrailerKey = () => {
  const [movieId, setMovieId] = useState('');
  const [trailerKey, setTrailerKey] = useState('');
  return (
    <div style={{ width: 343, padding: 16, borderBottom: '1px solid #F8F8F9', backgroundColor: '#121212' }}>
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9', marginBottom: 12 }}>Update Trailer Key</div>
      <input style={inputStyle} placeholder="Enter IMDB ID" value={movieId} onChange={e => setMovieId(e.target.value)} />
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: '#BDBDBD', marginBottom: 4, marginTop: 8 }}>Enter Trailer Key</div>
      <input style={inputStyle} placeholder="trailer key" value={trailerKey} onChange={e => setTrailerKey(e.target.value)} />
      <button style={{ height: 50, width: 250, borderRadius: 4, backgroundColor: '#424242', border: 'none', color: '#F8F8F9', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 8 }}>Submit Changes</button>
    </div>
  );
};

const meta: Meta<typeof UpdateTrailerKey> = {
  title: 'Components/UpdateTrailerKey',
  component: UpdateTrailerKey,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Admin form to update YouTube trailer key for a movie by IMDB ID.\n\n**Source:** `src/components/MetadataEntries/UpdateTrailerKey.tsx`' } } },
};
export default meta;
type Story = StoryObj<typeof UpdateTrailerKey>;
export const Default: Story = {};
