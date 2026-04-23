import React from 'react';
import { StarFilledIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface MovieMetadataRowProps { rating: string; year: string; duration: string; language: string; }

const MovieMetadataRow = ({rating, year, duration, language}: any) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <StarFilledIcon color='#E9C638' width={14} height={14} />
        <span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9' }}>{rating}</span>
      </div>
      <span style={{ fontSize: 4, color: '#757575' }}>●</span>
      <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E' }}>{year}</span>
      <span style={{ fontSize: 4, color: '#757575' }}>●</span>
      <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E' }}>{duration}</span>
      <span style={{ fontSize: 4, color: '#757575' }}>●</span>
      <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E' }}>{language}</span>
    </div>
  );

const meta: Meta<typeof MovieMetadataRow> = {
  title: 'Components/MovieMetadataRow',
  component: MovieMetadataRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Row showing movie metadata like rating, year, duration\n\n**Source:** `src/components/Common/MovieMetadataRow.tsx`' } },
  },
  argTypes: { rating: { control: 'text' }, year: { control: 'text' }, duration: { control: 'text' }, language: { control: 'text' } },
  args: { rating: '8.5', year: '2026', duration: '2h 30m', language: 'Hindi' },
};
export default meta;
type Story = StoryObj<typeof MovieMetadataRow>;

export const Default: Story = {};
