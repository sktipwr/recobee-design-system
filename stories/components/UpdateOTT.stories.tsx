import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const inputStyle: React.CSSProperties = { width: '100%', height: 44, borderRadius: 4, border: '1px solid #757575', backgroundColor: 'transparent', color: '#F8F8F9', fontFamily: 'DM Sans', fontSize: 14, padding: '0 12px', marginBottom: 8, outline: 'none' };
const chipStyle = (sel: boolean): React.CSSProperties => ({ padding: '4px 12px', borderRadius: 16, border: sel ? '1px solid #E9C638' : '1px solid #757575', backgroundColor: sel ? 'rgba(233,198,56,0.1)' : 'transparent', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 12, color: sel ? '#E9C638' : '#F8F8F9', margin: 4 });

const UpdateOTT = () => {
  const [movieId, setMovieId] = useState('');
  const [country, setCountry] = useState('IN - India');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const otts = ['Netflix', 'Prime Video', 'Disney+ Hotstar', 'JioCinema', 'Zee5', 'SonyLiv'];
  return (
    <div style={{ width: 343, padding: 16, borderBottom: '1px solid #F8F8F9', backgroundColor: '#121212' }}>
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9', marginBottom: 12 }}>Update OTT (non tmdb)</div>
      <input style={inputStyle} placeholder="Enter IMDB ID" value={movieId} onChange={e => setMovieId(e.target.value)} />
      <button style={{ ...inputStyle, cursor: 'pointer', textAlign: 'left', color: '#BDBDBD' }}>🌍 {country}</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 12 }}>
        {otts.map(o => (
          <button key={o} style={chipStyle(!!selected[o])} onClick={() => setSelected(p => ({ ...p, [o]: !p[o] }))}>{o}</button>
        ))}
      </div>
      <button style={{ height: 50, width: 250, borderRadius: 4, backgroundColor: '#424242', border: 'none', color: '#F8F8F9', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Submit Changes</button>
    </div>
  );
};

const meta: Meta<typeof UpdateOTT> = {
  title: 'Components/UpdateOTT',
  component: UpdateOTT,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Admin form to update OTT platform availability for a movie by IMDB ID and country.\n\n**Source:** `src/components/MetadataEntries/UpdateOTT.tsx`' } } },
};
export default meta;
type Story = StoryObj<typeof UpdateOTT>;
export const Default: Story = {};
