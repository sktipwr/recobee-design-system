import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchIcon, CrossIcon } from '../helpers/icons';

interface SearchInputProps {
  placeholder: string;
  backgroundColor: string;
  width: number;
}

const SearchInput = ({ placeholder = 'Search...', backgroundColor = '#272727', width = 343 }: SearchInputProps) => {
  const [value, setValue] = useState('');
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      width, height: 48, borderRadius: 10,
      backgroundColor, paddingLeft: 12, paddingRight: 4,
    }}>
      <div style={{ marginRight: 8, opacity: 0.6, display: 'flex', alignItems: 'center' }}>
        <SearchIcon color="#9E9E9E" width={18} height={18} />
      </div>
      <input
        type="text" value={value} onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent',
          fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: 14,
          color: '#F8F8F9', padding: '8px 0',
        }}
      />
      {value && (
        <button onClick={() => setValue('')} style={{
          width: 32, height: 32, borderRadius: 16, border: 'none',
          backgroundColor: 'transparent', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <CrossIcon color="#BDBDBD" width={16} height={16} />
        </button>
      )}
    </div>
  );
};

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Search text input with real Search and Cross SVG icons from the app. Clear button appears when text is entered.\n\n**Source:** `src/components/Common/SearchInput.tsx`' } },
  },
  argTypes: {
    placeholder: { control: 'text' },
    backgroundColor: { control: 'color' },
    width: { control: { type: 'range', min: 200, max: 400 } },
  },
};
export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = { args: { placeholder: 'Search movies, shows, people...', width: 343 } };
export const Narrow: Story = { args: { placeholder: 'Search...', width: 240 } };
