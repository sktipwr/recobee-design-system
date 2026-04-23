import React from 'react';
import { StarFilledIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface PremiumBenefitItemProps { title: string; description: string; }

const PremiumBenefitItem = ({title, description}: any) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '8px 0' }}>
      <div style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(233,198,56,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✨</div>
      <div>
        <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, color: '#F8F8F9' }}>{title}</div>
        <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9E9E9E', marginTop: 2 }}>{description}</div>
      </div>
    </div>
  );

const meta: Meta<typeof PremiumBenefitItem> = {
  title: 'Components/PremiumBenefitItem',
  component: PremiumBenefitItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Single premium feature benefit item with icon and text\n\n**Source:** `src/components/Common/PremiumBenefitItem.tsx`' } },
  },
  argTypes: { title: { control: 'text' }, description: { control: 'text' } },
  args: { title: 'Ad-Free Experience', description: 'Enjoy RecoBee without any ads' },
};
export default meta;
type Story = StoryObj<typeof PremiumBenefitItem>;

export const Default: Story = {};

export const Stats: Story = { args: { title: 'Advanced Stats', description: 'See detailed analytics about your movie habits' } };
