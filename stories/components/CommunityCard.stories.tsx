import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const CommunityCard = ({ name, memberCount, isJoined, isRecentlyJoined, backdropImage }: any) => (
  <div style={{ width: 343, backgroundColor: '#1E1E1E', padding: 10, margin: '0 16px', display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
    <div style={{ width: 80, height: 80, borderRadius: 2, backgroundColor: '#333', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {backdropImage ? (
        <div style={{ width: 80, height: 80, background: `linear-gradient(135deg, #424242, #1E1E1E)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🐝</div>
      ) : (
        <div style={{ width: 80, height: 80, backgroundColor: '#272727', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🐝</div>
      )}
    </div>
    <div style={{ marginLeft: 12, flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#F5F5F5', lineHeight: '24px', maxWidth: 200 }}>{name}</div>
        <span style={{ color: '#FFFFFF', fontSize: 16, cursor: 'pointer' }}>⋮</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: '#9E9E9E' }}>👤</span>
        <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#F5F5F5', marginLeft: 5 }}>{memberCount} Members</span>
      </div>
      {!isJoined && !isRecentlyJoined && (
        <button style={{ width: 80, height: 28, borderRadius: 25, border: '1px solid #E9C638', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <span style={{ color: '#E9C638', fontSize: 14 }}>+</span>
          <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#E9C638' }}>Join</span>
        </button>
      )}
      {isRecentlyJoined && (
        <div style={{ width: 80, height: 28, borderRadius: 25, border: '1px solid #616161', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <span style={{ color: '#616161', fontSize: 12 }}>✓</span>
          <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#616161' }}>Joined</span>
        </div>
      )}
    </div>
  </div>
);

const meta: Meta<typeof CommunityCard> = {
  title: 'Components/CommunityCard',
  component: CommunityCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered', backgrounds: { default: 'dark' },
    docs: { description: { component: 'Community card with backdrop image, name, member count, and join/joined state.\n\n**Source:** `src/components/Community/CommunityCard.tsx`' } } },
  argTypes: {
    name: { control: 'text' }, memberCount: { control: 'number' },
    isJoined: { control: 'boolean' }, isRecentlyJoined: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof CommunityCard>;

export const Default: Story = { args: { name: 'Bollywood Fans', memberCount: 1250, isJoined: false, isRecentlyJoined: false } };
export const Joined: Story = { args: { name: 'Sci-Fi Universe', memberCount: 890, isJoined: true } };
export const RecentlyJoined: Story = { args: { name: 'Horror Club', memberCount: 340, isRecentlyJoined: true } };
