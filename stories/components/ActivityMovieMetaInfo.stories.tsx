import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface ActivityMovieMetaInfoProps { year: string; duration: string; genres: string; }

const ActivityMovieMetaInfo = ({year, duration, genres}: any) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#9E9E9E' }}>{year}</span>
      <span style={{ fontSize: 4, color: '#757575' }}>●</span>
      <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#9E9E9E' }}>{duration}</span>
      <span style={{ fontSize: 4, color: '#757575' }}>●</span>
      <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#9E9E9E' }}>{genres}</span>
    </div>
  );

const meta: Meta<typeof ActivityMovieMetaInfo> = {
  title: 'Components/ActivityMovieMetaInfo',
  component: ActivityMovieMetaInfo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Movie metadata row showing year, duration, genres in activity context\n\n**Source:** `src/components/Common/ActivityMovieMetaInfo.tsx`' } },
  },
  argTypes: { year: { control: 'text' }, duration: { control: 'text' }, genres: { control: 'text' } },
  args: { year: '2026', duration: '2h 15m', genres: 'Action, Sci-Fi' },
};
export default meta;
type Story = StoryObj<typeof ActivityMovieMetaInfo>;

export const Default: Story = {};
