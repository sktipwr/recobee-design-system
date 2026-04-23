import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const UserProfile = ({name = 'Ankit Sharma', username = '@ankit', bio = 'Movie enthusiast | 500+ films', moviesWatched = 512, reviews = 47, followers = 234}: any) => (<div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 20, textAlign: 'center' }}><div style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: '#E9C638', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 28, color: '#121212', margin: '0 auto 12px' }}>{name[0]}</div><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, color: '#F8F8F9', marginBottom: 2 }}>{name}</div><div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#757575', marginBottom: 8 }}>{username}</div><div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#9E9E9E', marginBottom: 16 }}>{bio}</div><div style={{ display: 'flex', justifyContent: 'space-around' }}>{[{n:moviesWatched,l:'Watched'},{n:reviews,l:'Reviews'},{n:followers,l:'Followers'}].map(s => (<div key={s.l}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 18, color: '#F8F8F9' }}>{s.n}</div><div style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#757575' }}>{s.l}</div></div>))}</div></div>);

const meta: Meta<typeof UserProfile> = {
  title: 'Cards/UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'User profile card with avatar, name, stats, and bio\n\n**Source:** `src/components/Cards/UserProfile.tsx`' } },
  },
  argTypes: { name: { control: 'text' }, username: { control: 'text' }, bio: { control: 'text' } },
  args: { name: 'Ankit Sharma', username: '@ankit', bio: 'Movie enthusiast | 500+ films' },
};
export default meta;
type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {};
