import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const CarouselCard = ({title = 'Trending Now', subtitle = 'See what everyone is watching'}: any) => (<div style={{ width: 300, height: 180, borderRadius: 16, backgroundColor: '#333', position: 'relative', overflow: 'hidden' }}><div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}><div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#FFF' }}>{title}</div><div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#BDBDBD' }}>{subtitle}</div></div></div>);

const meta: Meta<typeof CarouselCard> = {
  title: 'Cards/CarouselCard',
  component: CarouselCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Generic carousel item card with image and overlay text\n\n**Source:** `src/components/Cards/CarouselCard.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, subtitle: { control: 'text' } },
  args: { title: 'Trending Now', subtitle: 'See what everyone is watching' },
};
export default meta;
type Story = StoryObj<typeof CarouselCard>;

export const Default: Story = {};
