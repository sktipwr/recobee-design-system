import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { darkTheme } from '../tokens/theme';
import { colors } from '../tokens/colors';

const ThemeColorRow = ({ name, value }: { name: string; value: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: value,
        border: '1px solid #444',
        flexShrink: 0,
      }}
    />
    <div>
      <div style={{ color: colors.textPrimary, fontSize: 13, fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
        {name}
      </div>
      <div style={{ color: colors.textSecondary, fontSize: 12, fontFamily: 'monospace' }}>{value}</div>
    </div>
  </div>
);

const MockScreen = () => (
  <div style={{ width: 360, border: '1px solid #333', borderRadius: 16, overflow: 'hidden' }}>
    {/* Status bar */}
    <div style={{ height: 24, backgroundColor: darkTheme.colors.background, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 12px' }}>
      <div style={{ color: darkTheme.colors.white, fontSize: 10, fontFamily: 'DM Sans, sans-serif' }}>9:41</div>
    </div>
    {/* Header */}
    <div style={{ backgroundColor: darkTheme.colors.background, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ color: darkTheme.colors.accent, fontSize: 20, fontFamily: 'DM Sans, sans-serif', fontWeight: 700 }}>RecoBee</div>
      <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: darkTheme.colors.surface }} />
    </div>
    {/* Search */}
    <div style={{ padding: '0 16px 12px' }}>
      <div style={{ backgroundColor: darkTheme.colors.searchBg, borderRadius: 10, padding: '10px 16px' }}>
        <span style={{ color: darkTheme.colors.placeholder, fontSize: 14, fontFamily: 'DM Sans, sans-serif' }}>Search movies...</span>
      </div>
    </div>
    {/* Cards */}
    <div style={{ padding: '0 16px 16px', display: 'flex', gap: 12 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ width: 100, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ height: 140, backgroundColor: darkTheme.colors.surface }} />
          <div style={{ padding: 8, backgroundColor: darkTheme.colors.background }}>
            <div style={{ color: darkTheme.colors.text, fontSize: 11, fontFamily: 'DM Sans, sans-serif', fontWeight: 700 }}>Movie {i}</div>
            <div style={{ color: darkTheme.colors.accent, fontSize: 10, fontFamily: 'DM Sans, sans-serif' }}>★ 8.{i}</div>
          </div>
        </div>
      ))}
    </div>
    {/* Bottom nav */}
    <div style={{ backgroundColor: colors.black6, padding: '8px 0', display: 'flex', justifyContent: 'space-around' }}>
      {['Home', 'Explore', 'Diary', 'Profile'].map((tab) => (
        <div key={tab} style={{ textAlign: 'center' }}>
          <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: tab === 'Home' ? darkTheme.colors.accent : '#555', margin: '0 auto 4px' }} />
          <div style={{ color: tab === 'Home' ? darkTheme.colors.accent : '#757575', fontSize: 10, fontFamily: 'DM Sans, sans-serif' }}>{tab}</div>
        </div>
      ))}
    </div>
  </div>
);

const ThemeOverview = () => (
  <div style={{ padding: 24, backgroundColor: colors.primary, minHeight: '100vh' }}>
    <h1 style={{ color: colors.textPrimary, fontSize: 28, fontFamily: 'DM Sans, sans-serif', marginBottom: 8 }}>
      RecoBee Theme
    </h1>
    <p style={{ color: colors.textSecondary, fontSize: 14, fontFamily: 'DM Sans, sans-serif', marginBottom: 32 }}>
      Dark theme with gold/yellow accent — the app's primary visual identity
    </p>

    <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
      <div>
        <h3 style={{ color: colors.clientPrimary, fontSize: 16, fontFamily: 'DM Sans, sans-serif', marginBottom: 16, borderBottom: '1px solid #333', paddingBottom: 8 }}>
          Theme Colors
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
          {Object.entries(darkTheme.colors).map(([name, value]) => (
            <ThemeColorRow key={name} name={name} value={value as string} />
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ color: colors.clientPrimary, fontSize: 16, fontFamily: 'DM Sans, sans-serif', marginBottom: 16, borderBottom: '1px solid #333', paddingBottom: 8 }}>
          Preview
        </h3>
        <MockScreen />
      </div>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Theme',
  component: ThemeOverview,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};
export default meta;

type Story = StoryObj;
export const Overview: Story = {};
