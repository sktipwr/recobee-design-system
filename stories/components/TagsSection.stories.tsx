import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const TagsSection = ({ tags, genres }: any) => {
  const allItems: Array<{ value: string; type: string }> = [];
  if (tags) tags.split(',').forEach((t: string) => allItems.push({ value: t.trim(), type: 'tag' }));
  if (genres) genres.split(',').forEach((g: string) => allItems.push({ value: g.trim(), type: 'genre' }));

  return (
    <div style={{ backgroundColor: '#1E1E1E', borderRadius: 8, padding: 16, width: 343 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {allItems.map((item, i) => (
          <button key={i} style={{ padding: '6px 14px', borderRadius: 16, border: '1px solid #424242', backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 12, color: item.type === 'genre' ? '#E9C638' : '#BDBDBD' }}>
            {item.value}
          </button>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof TagsSection> = {
  title: 'Components/TagsSection',
  component: TagsSection,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Tags and nano-genres chip section for movie detail pages.\n\n**Source:** `src/components/Sections/TagsSection.tsx`' } } },
  argTypes: { tags: { control: 'text' }, genres: { control: 'text' } },
};
export default meta;
type Story = StoryObj<typeof TagsSection>;

export const Default: Story = {
  args: { tags: 'Mind-bending, Time Travel, Emotional', genres: 'Psychological Thriller, Neo-noir, Heist' },
};

export const TagsOnly: Story = { args: { tags: 'Feel Good, Family, Heartwarming, Comedy' } };
export const GenresOnly: Story = { args: { genres: 'Action, Sci-Fi, Cyberpunk' } };
