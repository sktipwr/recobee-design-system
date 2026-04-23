import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const inputStyle: React.CSSProperties = { width: '100%', height: 44, borderRadius: 4, border: '1px solid #757575', backgroundColor: 'transparent', color: '#F8F8F9', fontFamily: 'DM Sans', fontSize: 14, padding: '0 12px', marginBottom: 8, outline: 'none' };

const UpsertMovie = () => {
  const [movieId, setMovieId] = useState('');
  return (
    <div style={{ width: 343, padding: 16, borderBottom: '1px solid #F8F8F9', backgroundColor: '#121212' }}>
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9', marginBottom: 12 }}>Upsert Movie Details</div>
      <input style={inputStyle} placeholder="Enter IMDB ID" value={movieId} onChange={e => setMovieId(e.target.value)} />
      <button style={{ height: 50, width: 250, borderRadius: 4, backgroundColor: '#E9C638', border: 'none', color: '#121212', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 8 }}>Submit Changes</button>
    </div>
  );
};

const meta: Meta<typeof UpsertMovie> = {
  title: 'Components/UpsertMovie',
  component: UpsertMovie,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Admin form to upsert (add/update) movie details by IMDB ID.\n\n**Source:** `src/components/MetadataEntries/UpsertMovie.tsx`' } } },
};
export default meta;
type Story = StoryObj<typeof UpsertMovie>;
export const Default: Story = {};
