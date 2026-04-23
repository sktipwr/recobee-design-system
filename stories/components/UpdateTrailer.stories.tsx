import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const inputStyle: React.CSSProperties = { width: '100%', height: 44, borderRadius: 4, border: '1px solid #757575', backgroundColor: 'transparent', color: '#F8F8F9', fontFamily: 'DM Sans', fontSize: 14, padding: '0 12px', marginBottom: 8, outline: 'none' };
const labelStyle: React.CSSProperties = { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: '#BDBDBD', marginBottom: 4, marginTop: 8 };

const UpdateTrailer = () => {
  const [movieId, setMovieId] = useState('');
  const [trailerDate, setTrailerDate] = useState('');
  const [movieDate, setMovieDate] = useState('');
  const [caption, setCaption] = useState('');
  const [recommended, setRecommended] = useState('');
  return (
    <div style={{ width: 343, padding: 16, borderBottom: '1px solid #F8F8F9', backgroundColor: '#121212' }}>
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9', marginBottom: 12 }}>Update Trailer</div>
      <input style={inputStyle} placeholder="Enter IMDB ID" value={movieId} onChange={e => setMovieId(e.target.value)} />
      <div style={labelStyle}>Trailer Release Date (YYYY-MM-DD)</div>
      <input style={inputStyle} placeholder="YYYY-MM-DD" value={trailerDate} onChange={e => setTrailerDate(e.target.value)} />
      <div style={labelStyle}>Movie Release Date (YYYY-MM-DD)</div>
      <input style={inputStyle} placeholder="YYYY-MM-DD" value={movieDate} onChange={e => setMovieDate(e.target.value)} />
      <div style={labelStyle}>Is Recommended</div>
      <input style={inputStyle} placeholder="true or false" value={recommended} onChange={e => setRecommended(e.target.value)} />
      <input style={inputStyle} placeholder="Enter caption for notification" value={caption} onChange={e => setCaption(e.target.value)} />
      <button style={{ height: 50, width: 250, borderRadius: 4, backgroundColor: '#424242', border: 'none', color: '#F8F8F9', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 8 }}>Submit Changes</button>
    </div>
  );
};

const meta: Meta<typeof UpdateTrailer> = {
  title: 'Components/UpdateTrailer',
  component: UpdateTrailer,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Admin form to update trailer info including release dates, caption, and recommendation flag.\n\n**Source:** `src/components/MetadataEntries/UpdateTrailer.tsx`' } } },
};
export default meta;
type Story = StoryObj<typeof UpdateTrailer>;
export const Default: Story = {};
