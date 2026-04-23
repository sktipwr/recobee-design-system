import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const inputStyle: React.CSSProperties = { width: '100%', height: 44, borderRadius: 4, border: '1px solid #757575', backgroundColor: 'transparent', color: '#F8F8F9', fontFamily: 'DM Sans', fontSize: 14, padding: '0 12px', marginBottom: 8, outline: 'none' };
const labelStyle: React.CSSProperties = { fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: '#BDBDBD', marginBottom: 4, marginTop: 8 };

const UpdateUserList = () => {
  const [movieId, setMovieId] = useState('');
  const [sentences, setSentences] = useState('15');
  const [language, setLanguage] = useState('english');
  const [summary, setSummary] = useState('');
  return (
    <div style={{ width: 343, padding: 16, borderBottom: '1px solid #F8F8F9', backgroundColor: '#121212' }}>
      <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9', marginBottom: 12 }}>Get Review for Movie</div>
      <div style={labelStyle}>Movie Id</div>
      <input style={inputStyle} placeholder="Movie Id" value={movieId} onChange={e => setMovieId(e.target.value)} />
      <div style={labelStyle}>Number of Sentences</div>
      <input style={inputStyle} placeholder="Number of Sentences" value={sentences} onChange={e => setSentences(e.target.value)} />
      <div style={labelStyle}>Language</div>
      <input style={inputStyle} placeholder="Enter language" value={language} onChange={e => setLanguage(e.target.value)} />
      <button onClick={() => setSummary('This movie delivers a compelling narrative with outstanding performances...')} style={{ height: 50, width: 250, borderRadius: 4, backgroundColor: '#424242', border: 'none', color: '#F8F8F9', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, cursor: 'pointer', marginTop: 8 }}>Submit Changes</button>
      {summary && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9', marginBottom: 8 }}>Review Summary</div>
          <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD' }}>{summary}</div>
        </div>
      )}
    </div>
  );
};

const meta: Meta<typeof UpdateUserList> = {
  title: 'Components/UpdateUserList',
  component: UpdateUserList,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Admin form to get AI-generated review summary for a movie with language and sentence count controls.\n\n**Source:** `src/components/MetadataEntries/UpdateUserList.tsx`' } } },
};
export default meta;
type Story = StoryObj<typeof UpdateUserList>;
export const Default: Story = {};
