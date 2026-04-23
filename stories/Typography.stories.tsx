import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { textStyles, fontSize, fontWeight } from '../tokens/typography';
import { colors } from '../tokens/colors';

const TypeSpecimen = ({ label, style }: { label: string; style: Record<string, any> }) => (
  <div style={{ marginBottom: 24, display: 'flex', alignItems: 'baseline', gap: 24 }}>
    <div style={{ width: 160, flexShrink: 0 }}>
      <div style={{ color: colors.clientPrimary, fontSize: 12, fontFamily: 'monospace' }}>{label}</div>
      <div style={{ color: colors.grey7, fontSize: 11, fontFamily: 'monospace' }}>
        {style.fontSize}px / {style.fontWeight}
      </div>
    </div>
    <div style={{ ...style, color: colors.textPrimary }}>
      The quick brown fox jumps over the lazy dog
    </div>
  </div>
);

const AllTypography = () => (
  <div style={{ padding: 24, backgroundColor: colors.primary, minHeight: '100vh' }}>
    <h1 style={{ color: colors.textPrimary, fontSize: 28, fontFamily: 'DM Sans, sans-serif', marginBottom: 8 }}>
      RecoBee Typography
    </h1>
    <p style={{ color: colors.textSecondary, fontSize: 14, fontFamily: 'DM Sans, sans-serif', marginBottom: 32 }}>
      DM Sans — Regular (400), Medium (500), Bold (700)
    </p>

    <h3 style={{ color: colors.clientPrimary, fontSize: 16, fontFamily: 'DM Sans, sans-serif', marginBottom: 16, borderBottom: '1px solid #333', paddingBottom: 8 }}>
      Font Scale
    </h3>
    <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
      {Object.entries(fontSize).map(([key, value]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div style={{ color: colors.textPrimary, fontSize: value, fontFamily: 'DM Sans, sans-serif', fontWeight: 700 }}>
            Aa
          </div>
          <div style={{ color: colors.grey7, fontSize: 11, fontFamily: 'monospace' }}>{key}</div>
          <div style={{ color: colors.textSecondary, fontSize: 11, fontFamily: 'monospace' }}>{value}px</div>
        </div>
      ))}
    </div>

    <h3 style={{ color: colors.clientPrimary, fontSize: 16, fontFamily: 'DM Sans, sans-serif', marginBottom: 16, borderBottom: '1px solid #333', paddingBottom: 8 }}>
      Body Styles (Regular)
    </h3>
    <TypeSpecimen label="bodySmall" style={textStyles.bodySmall} />
    <TypeSpecimen label="bodyMedium" style={textStyles.bodyMedium} />
    <TypeSpecimen label="bodyLarge" style={textStyles.bodyLarge} />
    <TypeSpecimen label="bodyXL" style={textStyles.bodyXL} />
    <TypeSpecimen label="bodyXXL" style={textStyles.bodyXXL} />

    <h3 style={{ color: colors.clientPrimary, fontSize: 16, fontFamily: 'DM Sans, sans-serif', marginBottom: 16, marginTop: 16, borderBottom: '1px solid #333', paddingBottom: 8 }}>
      Header Styles (Bold)
    </h3>
    <TypeSpecimen label="headerSmall" style={textStyles.headerSmall} />
    <TypeSpecimen label="headerMedium" style={textStyles.headerMedium} />
    <TypeSpecimen label="headerLarge" style={textStyles.headerLarge} />
    <TypeSpecimen label="header" style={textStyles.header} />

    <h3 style={{ color: colors.clientPrimary, fontSize: 16, fontFamily: 'DM Sans, sans-serif', marginBottom: 16, marginTop: 16, borderBottom: '1px solid #333', paddingBottom: 8 }}>
      Font Weights
    </h3>
    <div style={{ display: 'flex', gap: 48, marginBottom: 32 }}>
      {Object.entries(fontWeight).map(([key, value]) => (
        <div key={key}>
          <div style={{ color: colors.textPrimary, fontSize: 24, fontFamily: 'DM Sans, sans-serif', fontWeight: value }}>
            DM Sans {key}
          </div>
          <div style={{ color: colors.grey7, fontSize: 11, fontFamily: 'monospace' }}>weight: {value}</div>
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Typography',
  component: AllTypography,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};
export default meta;

type Story = StoryObj;
export const Overview: Story = {};
