import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const AudienceSentimentCard = ({positive = 72, neutral = 18, negative = 10}: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}>
    <div style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 700, color: '#F8F8F9', marginBottom: 16 }}>Audience Sentiment</div>
    <div style={{ display: 'flex', gap: 12 }}>
      {[{l:'Positive',v:positive,c:'#388E3C'},{l:'Neutral',v:neutral,c:'#E9C638'},{l:'Negative',v:negative,c:'#E53935'}].map((s: any) => (
        <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: 'DM Sans', fontSize: 24, fontWeight: 700, color: s.c }}>{s.v}%</div>
          <div style={{ fontFamily: 'DM Sans', fontSize: 11, color: '#9E9E9E', marginTop: 4 }}>{s.l}</div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', height: 4, borderRadius: 2, overflow: 'hidden', marginTop: 16 }}>
      <div style={{ width: positive+'%', backgroundColor: '#388E3C' }} />
      <div style={{ width: neutral+'%', backgroundColor: '#E9C638' }} />
      <div style={{ width: negative+'%', backgroundColor: '#E53935' }} />
    </div>
  </div>
);

const meta: Meta<typeof AudienceSentimentCard> = {
  title: 'Cards/AudienceSentimentCard',
  component: AudienceSentimentCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Audience sentiment/buzz meter for movies\n\n**Source:** `src/components/Cards/AudienceSentimentCard.tsx`',
      },
    },
  },
  argTypes: { positive: {"control": {"type": "range", "min": 0, "max": 100}}, neutral: {"control": {"type": "range", "min": 0, "max": 100}}, negative: {"control": {"type": "range", "min": 0, "max": 100}} },
};
export default meta;
type Story = StoryObj<typeof AudienceSentimentCard>;

export const Default: Story = {};
