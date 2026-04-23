import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ViewMore = ({text = 'View More'}: any) => (<button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 12, color: '#E9C638', display: 'flex', alignItems: 'center', gap: 4 }}>{text} →</button>);

const meta: Meta<typeof ViewMore> = {
  title: 'Components/ViewMore',
  component: ViewMore,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'View more / See all link button\n\n**Source:** `src/components/ViewMore.tsx`' } },
  },
  argTypes: { text: { control: 'text' } },
  args: { text: 'View More' },
};
export default meta;
type Story = StoryObj<typeof ViewMore>;

export const Default: Story = {};
export const SeeAll: Story = { args: { text: 'See All' } };
