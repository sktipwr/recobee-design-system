import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface PinnedReviewsHeaderProps { reviewCount: number; }

const PinnedReviewsHeader = ({reviewCount}: any) => (
    <div style={{ width: 375, height: 56, backgroundColor: '#1E1E1E', borderTop: '1px solid #616161', borderBottom: '1px solid #616161', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#272727', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>📌</div>
        <span style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#EEEEEE' }}>PINNED REVIEWS</span>
      </div>
      <div style={{ display: 'flex', position: 'relative', width: 60 }}>
        {Array.from({length: Math.min(reviewCount, 3)}).map((_, i) => (
          <div key={i} style={{ width: 31, height: 44, borderRadius: 4, backgroundColor: '#555', position: 'absolute', right: i * 10, opacity: 1 - i * 0.2, border: '1px solid #333' }} />
        ))}
      </div>
    </div>
  );

const meta: Meta<typeof PinnedReviewsHeader> = {
  title: 'Components/PinnedReviewsHeader',
  component: PinnedReviewsHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Header for pinned reviews section with pin icon and stacked poster thumbnails\n\n**Source:** `src/components/Common/PinnedReviewsHeader.tsx`' } },
  },
  argTypes: { reviewCount: { control: { type: 'range', min: 0, max: 5 } } },
  args: { reviewCount: 3 },
};
export default meta;
type Story = StoryObj<typeof PinnedReviewsHeader>;

export const Default: Story = { args: { reviewCount: 3 } };
