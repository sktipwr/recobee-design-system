import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface FeedbackComponentProps { question: string; }

const FeedbackComponent = ({question}: any) => (
    <div style={{ width: 375, display: 'flex', alignItems: 'center', padding: 9, borderTop: '1px solid #393939', backgroundColor: '#121212' }}>
      <div style={{ flex: 1, paddingRight: 16 }}>
        <span style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#E0E0E0', lineHeight: '20px' }}>{question}</span>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button style={{ padding: '4px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>👍</button>
        <button style={{ padding: '4px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>👎</button>
      </div>
    </div>
  );

const meta: Meta<typeof FeedbackComponent> = {
  title: 'Components/FeedbackComponent',
  component: FeedbackComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Inline feedback bar with question text and Like/Dislike buttons\n\n**Source:** `src/components/Common/FeedbackComponent.tsx`' } },
  },
  argTypes: { question: { control: 'text' } },
  args: { question: 'Was this recommendation helpful?' },
};
export default meta;
type Story = StoryObj<typeof FeedbackComponent>;

export const Default: Story = { args: { question: 'Was this recommendation helpful?' } };
