import React from 'react';
import { ArrowIcon, SearchIcon as SearchIconSVG, SettingsIcon as SettingsIconSVG, CrossIcon as CrossIconSVG, MenuIcon as MenuIconSVG, MoreVerticalIcon as MoreVerticalIconSVG, BellIcon as BellIconSVG, RightArrowIcon } from '../helpers/icons';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface YearWrapCardButtonProps { buttonText: string; description: string; onPress: () => void; }

const YearWrapCardButton = ({buttonText, description, onPress}: any) => (
    <div style={{ width: 343, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#FFFFFF', maxWidth: 230 }}>{description}</span>
      <button onClick={onPress} style={{ width: 66, height: 20, borderRadius: 12, backgroundColor: '#DEBF19', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 10, color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>{buttonText} →</button>
    </div>
  );

const meta: Meta<typeof YearWrapCardButton> = {
  title: 'Components/YearWrapCardButton',
  component: YearWrapCardButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Year wrap feature action button with description and small CTA\n\n**Source:** `src/components/Common/YearWrapCardButton.tsx`' } },
  },
  argTypes: { buttonText: { control: 'text' }, description: { control: 'text' }, onPress: { action: 'pressed' } },
  args: { buttonText: 'View', description: 'See your year in review highlights' },
};
export default meta;
type Story = StoryObj<typeof YearWrapCardButton>;

export const Default: Story = { args: { buttonText: 'View', description: 'See your year in review highlights' } };
