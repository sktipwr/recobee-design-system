import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const AboutSection = ({ releaseDate, language, seasons, directors }: any) => {
  const hasSeasons = seasons && seasons.length > 0;
  const hasDirectors = directors && directors.length > 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 343 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {releaseDate && (
          <div style={{ flex: 1, backgroundColor: '#1E1E1E', borderRadius: 8, padding: 12 }}>
            <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#BDBDBD', marginBottom: 4 }}>
              {new Date(releaseDate) > new Date() ? 'Releasing On' : 'Released On'}
            </div>
            <div style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#FFFFFF' }}>
              {new Date(releaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        )}
        {language && (
          <div style={{ flex: 1, backgroundColor: '#1E1E1E', borderRadius: 8, padding: 12 }}>
            <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#BDBDBD', marginBottom: 4 }}>Languages</div>
            <div style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#FFFFFF' }}>{language}</div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {hasSeasons && (
          <div style={{ flex: 1, backgroundColor: '#1E1E1E', borderRadius: 8, padding: 12, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#BDBDBD', marginBottom: 4 }}>Seasons</div>
              <span style={{ color: '#E9C638', fontSize: 14 }}>→</span>
            </div>
            <div style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#FFFFFF' }}>{seasons.length} Seasons</div>
          </div>
        )}
        {hasDirectors && (
          <div style={{ flex: 1, backgroundColor: '#1E1E1E', borderRadius: 8, padding: 12, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#BDBDBD', marginBottom: 4 }}>Director</div>
              <span style={{ color: '#E9C638', fontSize: 14 }}>→</span>
            </div>
            <div style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{directors[0]}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const meta: Meta<typeof AboutSection> = {
  title: 'Components/AboutSection',
  component: AboutSection,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Movie/show about section with release date, language, seasons, and director info cards.\n\n**Source:** `src/components/Sections/AboutSection.tsx`' } } },
};
export default meta;
type Story = StoryObj<typeof AboutSection>;

export const Movie: Story = {
  args: { releaseDate: '2024-11-15', language: 'Hindi, English', directors: ['Rajkumar Hirani'] },
};

export const TVShow: Story = {
  args: { releaseDate: '2023-06-01', language: 'English', seasons: ['S1', 'S2', 'S3'], directors: ['David Fincher'] },
};

export const Upcoming: Story = {
  args: { releaseDate: '2027-03-20', language: 'Hindi', directors: ['Anurag Kashyap'] },
};
