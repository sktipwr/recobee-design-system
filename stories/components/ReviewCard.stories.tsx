import React from 'react';
import { StarFilledIcon, LikeIcon as LikeIconSVG, ShareAndroidIcon as ShareIconSVG } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface ReviewCardProps {
  movieTitle: string;
  rating: number;
  reviewText: string;
  reviewer: string;
  time: string;
}

const ReviewCard = ({ movieTitle = 'Dune: Part Two', rating = 4.5, reviewText = 'A masterpiece of visual storytelling. Denis Villeneuve delivers an epic conclusion.', reviewer = 'Ankit', time = '2d ago' }: ReviewCardProps) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 14 }}>
    <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
      <div style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#E9C638', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontWeight: 700, color: '#121212', flexShrink: 0 }}>{reviewer[0]}</div>
      <div>
        <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 13, color: '#F8F8F9' }}>{reviewer}</div>
        <div style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575' }}>{time}</div>
      </div>
    </div>
    <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9', marginBottom: 4 }}>{movieTitle}</div>
    <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <StarFilledIcon key={i} color={i <= rating ? '#E9C638' : '#424242'} width={14} height={14} />
      ))}
    </div>
    <div style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#BDBDBD', lineHeight: '18px', marginBottom: 10 }}>{reviewText}</div>
    <div style={{ display: 'flex', gap: 16 }}>
      <button style={{ background: 'none', border: 'none', fontFamily: 'DM Sans', fontSize: 12, color: '#757575', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
        <LikeIconSVG color="#757575" width={14} height={14} /> Like
      </button>
      <button style={{ background: 'none', border: 'none', fontFamily: 'DM Sans', fontSize: 12, color: '#757575', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
        <ShareIconSVG color="#757575" width={14} height={14} /> Share
      </button>
    </div>
  </div>
);

const meta: Meta<typeof ReviewCard> = {
  title: 'Cards/ReviewCard',
  component: ReviewCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'User movie review card with real SVG star rating, like/share icons.\n\n**Source:** `src/components/Cards/ReviewCard.tsx`' } },
  },
  argTypes: {
    movieTitle: { control: 'text' },
    rating: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
    reviewText: { control: 'text' },
    reviewer: { control: 'text' },
    time: { control: 'text' },
  },
  args: { movieTitle: 'Dune: Part Two', rating: 4.5, reviewText: 'A masterpiece of visual storytelling.', reviewer: 'Ankit', time: '2d ago' },
};
export default meta;
type Story = StoryObj<typeof ReviewCard>;

export const Default: Story = {};
