import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface DropdownComponentProps { placeholder: string; value: string; options: string; }

const DropdownComponent = ({placeholder, value, options}: any) => (
    <div style={{ width: 300, padding: '4px 0' }}>
      <select style={{ width: '100%', height: 44, borderRadius: 8, backgroundColor: '#424242', border: 'none', color: value ? '#BDBDBD' : '#757575', fontFamily: 'DM Sans', fontSize: 14, padding: '0 12px', appearance: 'none', cursor: 'pointer', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath d=\'M3 5l3 3 3-3\' fill=\'%23757575\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}>
        <option value="" disabled selected>{placeholder}</option>
        {options.split(',').map((o: string) => <option key={o} value={o.trim()}>{o.trim()}</option>)}
      </select>
    </div>
  );

const meta: Meta<typeof DropdownComponent> = {
  title: 'Components/DropdownComponent',
  component: DropdownComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
    docs: { description: { component: 'Dropdown select menu with dark themed styling\n\n**Source:** `src/components/Common/DropdownComponent.tsx`' } },
  },
  argTypes: { placeholder: { control: 'text' }, value: { control: 'text' }, options: { control: 'text', description: 'Comma-separated options' } },
  args: { placeholder: 'Select genre...', value: '', options: 'Action,Comedy,Drama,Horror,Thriller,Romance' },
};
export default meta;
type Story = StoryObj<typeof DropdownComponent>;

export const Default: Story = {};
