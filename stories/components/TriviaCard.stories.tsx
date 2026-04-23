import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const TriviaCard = ({question = 'Who directed Inception?', options = ['Christopher Nolan', 'Steven Spielberg', 'Martin Scorsese', 'James Cameron']}: any) => (<div style={{ width: 343, backgroundColor: '#1E1E1E', borderRadius: 12, padding: 16 }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#E9C638', marginBottom: 4 }}>🎬 Movie Trivia</div><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F8F8F9', marginBottom: 16 }}>{question}</div><div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{options.map((o: string, i: number) => (<button key={i} style={{ padding: '10px 16px', borderRadius: 8, backgroundColor: '#272727', border: '1px solid #333', fontFamily: 'DM Sans', fontSize: 14, color: '#F8F8F9', cursor: 'pointer', textAlign: 'left' }}>{o}</button>))}</div></div>);

const meta: Meta<typeof TriviaCard> = {
  title: 'Cards/TriviaCard',
  component: TriviaCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Movie trivia question card with answer options\n\n**Source:** `src/components/Cards/TriviaCard.tsx`' } },
  },
  argTypes: { question: { control: 'text' } },
  args: { question: 'Who directed Inception?' },
};
export default meta;
type Story = StoryObj<typeof TriviaCard>;

export const Default: Story = {};
