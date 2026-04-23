import React from 'react';
import { StarFilledIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const MovieList = () => (<div style={{ width: 343 }}>{[{t:'Dune: Part Two',r:'8.7',y:'2024'},{t:'Oppenheimer',r:'8.5',y:'2023'},{t:'Interstellar',r:'8.6',y:'2014'}].map((m,i) => (<div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E1E1E' }}><div style={{ width: 60, height: 90, borderRadius: 8, backgroundColor: '#333', flexShrink: 0 }} /><div style={{ flex: 1 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9' }}>{m.t}</div><div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#757575', marginTop: 2 }}>{m.y}</div><div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}><StarFilledIcon color='#E9C638' width={12} height={12} /><span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: '#F8F8F9' }}>{m.r}</span></div></div></div>))}</div>);

const meta: Meta<typeof MovieList> = {
  title: 'Lists/MovieList',
  component: MovieList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Vertical movie list with poster, title, and rating\n\n**Source:** `src/components/List/MovieList.tsx`' } },
  },
  
  
};
export default meta;
type Story = StoryObj<typeof MovieList>;

export const Default: Story = {};
