import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddIcon, EditIcon, StarFilledIcon, ReviewIcon, UserIcon } from '../helpers/icons';

interface FABProps {
  iconName: 'add' | 'create' | 'review' | 'stats' | 'group' | 'chat';
  btnText: string;
  expanded: boolean;
  toggle: () => void;
}

const iconComponents: Record<string, any> = {
  add: AddIcon,
  create: EditIcon,
  review: ReviewIcon,
  stats: StarFilledIcon,
  group: UserIcon,
  chat: UserIcon,
};

const FAB = ({ iconName = 'add', btnText = 'Add', expanded = false, toggle }: FABProps) => {
  const IconComp = iconComponents[iconName] || AddIcon;
  return (
    <button onClick={toggle} style={{
      width: expanded ? 'auto' : 56, height: 56,
      borderRadius: expanded ? 28 : 28,
      backgroundColor: '#E9C638', border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: expanded ? 8 : 0,
      padding: expanded ? '0 20px' : 0,
      fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#121212',
      boxShadow: '0 4px 12px rgba(233,198,56,0.3)', transition: 'all 0.3s',
    }}>
      <IconComp color="#121212" width={20} height={20} />
      {expanded && btnText}
    </button>
  );
};

const meta: Meta<typeof FAB> = {
  title: 'Components/FAB',
  component: FAB,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Floating Action Button with real SVG icons. Circular when collapsed, pill-shaped when expanded.\n\n**Source:** `src/components/Common/FAB.tsx`' } },
  },
  argTypes: {
    iconName: { control: 'select', options: ['add', 'create', 'review', 'stats', 'group', 'chat'] },
    btnText: { control: 'text' },
    expanded: { control: 'boolean' },
    toggle: { action: 'toggled' },
  },
};
export default meta;
type Story = StoryObj<typeof FAB>;

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <FAB iconName="add" btnText="Add" expanded={false} toggle={() => {}} />
      <FAB iconName="create" btnText="Create" expanded={true} toggle={() => {}} />
      <FAB iconName="review" btnText="Review" expanded={true} toggle={() => {}} />
    </div>
  ),
};

export const Collapsed: Story = { args: { iconName: 'add', btnText: 'Add', expanded: false } };
export const Expanded: Story = { args: { iconName: 'create', btnText: 'Create Post', expanded: true } };
