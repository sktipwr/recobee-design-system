import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '../tokens/colors';

const ColorSwatch = ({ name, value }: { name: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 4,
        padding: '8px 12px',
        borderRadius: 8,
        transition: 'background 0.15s',
        backgroundColor: copied ? 'rgba(233,198,56,0.1)' : 'transparent',
      }}
      title={`Click to copy ${value}`}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: value,
          border: '1px solid rgba(255,255,255,0.1)',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ color: '#F8F8F9', fontSize: 13, fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
          {name}
        </div>
        <div style={{ color: '#757575', fontSize: 11, fontFamily: 'monospace' }}>
          {value}
        </div>
      </div>
      <div style={{ fontSize: 10, color: copied ? '#E9C638' : '#555', fontFamily: 'monospace', minWidth: 50, textAlign: 'right' }}>
        {copied ? 'Copied!' : 'Click'}
      </div>
    </div>
  );
};

const ColorGroup = ({ title, entries }: { title: string; entries: [string, string][] }) => (
  <div style={{ marginBottom: 28 }}>
    <h3 style={{ color: '#E9C638', fontSize: 14, fontFamily: 'DM Sans, sans-serif', marginBottom: 12, borderBottom: '1px solid #333', paddingBottom: 8 }}>
      {title} ({entries.length})
    </h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 2 }}>
      {entries.map(([name, value]) => (
        <ColorSwatch key={name} name={name} value={value} />
      ))}
    </div>
  </div>
);

const groups: Record<string, [string, string][]> = {
  'Primary & Brand': [],
  'Text': [],
  'Black Variants': [],
  'Grey Palette': [],
  'Yellow / Gold Accent': [],
  'Gradients': [],
  'Transparent': [],
  'Status': [],
  'Rank Badges': [],
  'Discover Cards': [],
  'UI Surfaces': [],
};

Object.entries(colors).forEach(([key, value]) => {
  if (['primary', 'clientPrimary', 'themeBg', 'white'].includes(key)) groups['Primary & Brand'].push([key, value]);
  else if (key.startsWith('text') || key === 'white') groups['Text'].push([key, value]);
  else if (key.startsWith('black')) groups['Black Variants'].push([key, value]);
  else if (key.startsWith('grey') && !key.includes('Transparent')) groups['Grey Palette'].push([key, value]);
  else if (key.startsWith('yellow') && !key.includes('Gradient') && !key.includes('transparent')) groups['Yellow / Gold Accent'].push([key, value]);
  else if (key.includes('Gradient')) groups['Gradients'].push([key, value]);
  else if (key.includes('ransparent') || key.includes('Opacity')) groups['Transparent'].push([key, value]);
  else if (['error', 'errorAlt', 'success', 'successAlt'].includes(key)) groups['Status'].push([key, value]);
  else if (['gold', 'gold2', 'silver', 'bronze', 'bronze2', 'blue', 'blue2'].includes(key)) groups['Rank Badges'].push([key, value]);
  else if (['purple', 'teal', 'lime', 'pink', 'purple2', 'orange', 'lime2', 'teal2'].includes(key)) groups['Discover Cards'].push([key, value]);
  else groups['UI Surfaces'].push([key, value]);
});

const AllColors = () => (
  <div style={{ padding: 24, backgroundColor: '#121212', minHeight: '100vh' }}>
    <h1 style={{ color: '#F8F8F9', fontSize: 24, fontFamily: 'DM Sans, sans-serif', marginBottom: 4 }}>
      Color System
    </h1>
    <p style={{ color: '#9E9E9E', fontSize: 13, fontFamily: 'DM Sans, sans-serif', marginBottom: 24 }}>
      {Object.keys(colors).length} tokens — click any swatch to copy the hex value
    </p>
    {Object.entries(groups)
      .filter(([, entries]) => entries.length > 0)
      .map(([title, entries]) => (
        <ColorGroup key={title} title={title} entries={entries} />
      ))}
  </div>
);

const meta: Meta = {
  title: 'Tokens/Colors',
  component: AllColors,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
};
export default meta;

type Story = StoryObj;
export const Interactive: Story = {};
