import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { spacing, borderRadius } from '../tokens/spacing';
import { colors } from '../tokens/colors';

const SpacingBlock = ({ token, value }: { token: string; value: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
    <div style={{ width: 80, color: colors.textSecondary, fontSize: 12, fontFamily: 'monospace', textAlign: 'right' }}>
      spacing.{token}
    </div>
    <div
      style={{
        width: value,
        height: 24,
        backgroundColor: colors.clientPrimary,
        borderRadius: 4,
        minWidth: 2,
      }}
    />
    <div style={{ color: colors.grey7, fontSize: 12, fontFamily: 'monospace' }}>{value}px</div>
  </div>
);

const RadiusBlock = ({ token, value }: { token: string; value: number }) => (
  <div style={{ textAlign: 'center', marginRight: 24 }}>
    <div
      style={{
        width: 64,
        height: 64,
        backgroundColor: colors.clientPrimary,
        borderRadius: value,
        marginBottom: 8,
      }}
    />
    <div style={{ color: colors.textSecondary, fontSize: 11, fontFamily: 'monospace' }}>{token}</div>
    <div style={{ color: colors.grey7, fontSize: 11, fontFamily: 'monospace' }}>{value}px</div>
  </div>
);

const AllSpacing = () => (
  <div style={{ padding: 24, backgroundColor: colors.primary, minHeight: '100vh' }}>
    <h1 style={{ color: colors.textPrimary, fontSize: 28, fontFamily: 'DM Sans, sans-serif', marginBottom: 8 }}>
      Spacing & Border Radius
    </h1>
    <p style={{ color: colors.textSecondary, fontSize: 14, fontFamily: 'DM Sans, sans-serif', marginBottom: 32 }}>
      Base spacing scale and border radius tokens
    </p>

    <h3 style={{ color: colors.clientPrimary, fontSize: 16, fontFamily: 'DM Sans, sans-serif', marginBottom: 16, borderBottom: '1px solid #333', paddingBottom: 8 }}>
      Spacing Scale
    </h3>
    {Object.entries(spacing).map(([token, value]) => (
      <SpacingBlock key={token} token={token} value={value} />
    ))}

    <h3 style={{ color: colors.clientPrimary, fontSize: 16, fontFamily: 'DM Sans, sans-serif', marginBottom: 16, marginTop: 32, borderBottom: '1px solid #333', paddingBottom: 8 }}>
      Border Radius
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {Object.entries(borderRadius).map(([token, value]) => (
        <RadiusBlock key={token} token={token} value={value} />
      ))}
    </div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Spacing',
  component: AllSpacing,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};
export default meta;

type Story = StoryObj;
export const Overview: Story = {};
