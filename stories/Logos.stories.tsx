import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

interface LogoAsset {
  name: string;
  slug: string;
  description: string;
  usage: string;
}

const LIGHT_THEME_LOGOS: LogoAsset[] = [
  {
    name: 'Primary Logo',
    slug: 'logo-original',
    description: 'Full-color RecoBee logo with yellow bee mark and "RecoBee" wordmark',
    usage: 'Default logo. Marketing sites, landing pages, email signatures.',
  },
  {
    name: 'Black & White',
    slug: 'logo-black-white',
    description: 'Full logo in pure black, no color',
    usage: 'Print, fax, monochrome contexts. When color is unavailable.',
  },
  {
    name: 'Black Bee Mark',
    slug: 'logo-black-bee',
    description: 'Bee mascot icon with yellow body and black clapper',
    usage: 'Hero illustrations, loading states, mascots, stickers, merchandise.',
  },
];

const DARK_THEME_LOGOS: LogoAsset[] = [
  {
    name: 'Dark Background Logo',
    slug: 'logo-dark-bg',
    description: 'Yellow bee mark + "Bee" wordmark in yellow, optimized for dark backgrounds',
    usage: 'Use on #121212, #1E1E1E, or any dark surface. In-app headers, dark mode UI.',
  },
  {
    name: 'Icon for Dark',
    slug: 'logo-icon-dark',
    description: 'Standalone bee icon with yellow + black color',
    usage: 'Icon-only contexts. App icons, favicons, small spaces where the wordmark does not fit.',
  },
  {
    name: 'White Logo',
    slug: 'logo-white',
    description: 'All-white monochrome variant for dark backgrounds',
    usage: 'Dark photo overlays, video watermarks, embossed materials.',
  },
];

const downloadFile = (path: string, filename: string) => {
  const link = document.createElement('a');
  link.href = path;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const copyToClipboard = (text: string, onCopy?: () => void) => {
  navigator.clipboard.writeText(text);
  onCopy?.();
};

const LogoCard: React.FC<{ logo: LogoAsset; theme: 'light' | 'dark' }> = ({ logo, theme }) => {
  const [copied, setCopied] = useState(false);
  const path = `/logos/${logo.slug}.png`;
  const previewBg = theme === 'dark' ? '#121212' : '#F5F5F5';

  return (
    <div
      style={{
        background: '#1E1E1E',
        border: '1px solid #424242',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      {/* Preview */}
      <div
        style={{
          background: previewBg,
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <img
          src={path}
          alt={logo.name}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: 16 }}>
        <div style={{ color: '#F8F8F9', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
          {logo.name}
        </div>
        <div style={{ color: '#9E9E9E', fontFamily: 'DM Sans', fontSize: 11, marginBottom: 8 }}>
          PNG · Transparent background
        </div>

        <div style={{ color: '#BDBDBD', fontFamily: 'DM Sans', fontSize: 12, marginBottom: 8 }}>
          {logo.description}
        </div>

        <div style={{ color: '#757575', fontFamily: 'DM Sans', fontSize: 11, fontStyle: 'italic', marginBottom: 12, lineHeight: 1.4 }}>
          {logo.usage}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => downloadFile(path, `${logo.slug}.png`)}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: '#E9C638',
              color: '#121212',
              border: 'none',
              borderRadius: 6,
              fontFamily: 'DM Sans',
              fontWeight: 700,
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            ↓ Download PNG
          </button>
          <button
            onClick={() =>
              copyToClipboard(window.location.origin + path, () => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              })
            }
            style={{
              padding: '8px 12px',
              background: 'transparent',
              color: copied ? '#E9C638' : '#BDBDBD',
              border: '1px solid #424242',
              borderRadius: 6,
              fontFamily: 'DM Sans',
              fontWeight: 500,
              fontSize: 12,
              cursor: 'pointer',
              minWidth: 80,
            }}
          >
            {copied ? '✓ Copied' : '⧉ URL'}
          </button>
        </div>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle: string; theme: 'light' | 'dark' }> = ({ title, subtitle, theme }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
      paddingBottom: 16,
      borderBottom: '1px solid #424242',
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: theme === 'dark' ? '#121212' : '#F5F5F5',
        border: '1px solid #424242',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
      }}
    >
      {theme === 'dark' ? '🌙' : '☀'}
    </div>
    <div>
      <div style={{ color: '#F8F8F9', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 20 }}>
        {title}
      </div>
      <div style={{ color: '#9E9E9E', fontFamily: 'DM Sans', fontSize: 13, marginTop: 2 }}>
        {subtitle}
      </div>
    </div>
  </div>
);

const LogoGallery: React.FC = () => (
  <div style={{ padding: 32, minHeight: '100vh', background: '#121212' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Title */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#F8F8F9', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 32, margin: 0, marginBottom: 8 }}>
          RecoBee Logos
        </h1>
        <p style={{ color: '#BDBDBD', fontFamily: 'DM Sans', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
          Official brand assets for the RecoBee team. Each logo is served as a transparent PNG.
          Pick the variant that matches your background, then download or copy the URL.
        </p>
      </div>

      {/* Guidelines */}
      <div
        style={{
          background: '#1E1E1E',
          border: '1px solid #424242',
          borderRadius: 12,
          padding: 20,
          marginBottom: 40,
        }}
      >
        <div style={{ color: '#E9C638', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
          ⚠ Brand Usage Guidelines
        </div>
        <ul style={{ color: '#BDBDBD', fontFamily: 'DM Sans', fontSize: 13, margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li><strong>Clear space</strong> — Leave at least the height of the bee mark around the logo</li>
          <li><strong>Minimum size</strong> — 80px width for digital, 25mm for print</li>
          <li><strong>Do not</strong> distort, rotate, recolor, add effects, or place on busy backgrounds</li>
          <li><strong>Pick by background</strong> — Use Light Theme logos on light backgrounds, Dark Theme logos on dark</li>
        </ul>
      </div>

      {/* Light Theme Section */}
      <section style={{ marginBottom: 48 }}>
        <SectionHeader
          title="Light Theme Logos"
          subtitle="For use on light backgrounds (#FFFFFF, #F5F5F5, and other light surfaces)"
          theme="light"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 20,
          }}
        >
          {LIGHT_THEME_LOGOS.map((logo) => (
            <LogoCard key={logo.slug} logo={logo} theme="light" />
          ))}
        </div>
      </section>

      {/* Dark Theme Section */}
      <section style={{ marginBottom: 48 }}>
        <SectionHeader
          title="Dark Theme Logos"
          subtitle="For use on dark backgrounds (#121212, #1E1E1E, and other dark surfaces)"
          theme="dark"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 20,
          }}
        >
          {DARK_THEME_LOGOS.map((logo) => (
            <LogoCard key={logo.slug} logo={logo} theme="dark" />
          ))}
        </div>
      </section>

      {/* Footer */}
      <div
        style={{
          padding: 20,
          background: '#1E1E1E',
          borderRadius: 12,
          border: '1px solid #424242',
        }}
      >
        <div style={{ color: '#F8F8F9', fontFamily: 'DM Sans', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
          Need a custom format or size?
        </div>
        <div style={{ color: '#BDBDBD', fontFamily: 'DM Sans', fontSize: 13, lineHeight: 1.6 }}>
          Contact the design team at{' '}
          <a href="mailto:shakti@reco-bee.com" style={{ color: '#E9C638', textDecoration: 'none' }}>
            shakti@reco-bee.com
          </a>{' '}
          or visit our{' '}
          <a
            href="https://www.figma.com/design/1vjYzboEY2BFvwNutJfaI6/App-Design-System"
            target="_blank"
            rel="noopener"
            style={{ color: '#E9C638', textDecoration: 'none' }}
          >
            Figma design system
          </a>{' '}
          for more assets.
        </div>
      </div>
    </div>
  </div>
);

const meta: Meta<typeof LogoGallery> = {
  title: 'Brand/Logos',
  component: LogoGallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Official RecoBee brand logos (PNG), organized by Light Theme and Dark Theme usage.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogoGallery>;

export const Gallery: Story = {};
