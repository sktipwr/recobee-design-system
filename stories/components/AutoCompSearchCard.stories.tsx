import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const AutoCompSearchCard = ({title = 'The Dark Knight', subtitle = '2008 · Action, Crime', type = 'movie'}: any) => (
  <div style={{ width: 343, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', backgroundColor: '#1E1E1E', borderRadius: 8 }}>
    <div style={{ width: 40, height: 56, borderRadius: 4, backgroundColor: '#424242', flexShrink: 0 }} />
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 700, color: '#F8F8F9' }}>{title}</div>
      <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginTop: 2 }}>{subtitle}</div>
    </div>
    <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: '#757575', textTransform: 'uppercase' }}>{type}</span>
  </div>
);

const meta: Meta<typeof AutoCompSearchCard> = {
  title: 'Cards/AutoCompSearchCard',
  component: AutoCompSearchCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component: 'Autocomplete search result card\n\n**Source:** `src/components/Cards/AutoCompSearchCard.tsx`',
      },
    },
  },
  argTypes: { title: { control: 'text' }, subtitle: { control: 'text' }, type: { control: 'text' } },
};
export default meta;
type Story = StoryObj<typeof AutoCompSearchCard>;

export const Default: Story = {};
