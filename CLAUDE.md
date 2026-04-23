# RecoBee Design System — Figma Integration Rules

## Overview
This is the RecoBee mobile app design system built with Storybook. It contains 257 React Native components rendered as web recreations for documentation and Figma Code Connect integration. **Dark mode is the primary and only theme.**

## Design Tokens

### Colors
All colors come from `src/utils/Colors.ts`. Use these exact hex values when implementing Figma designs.

**Primary & Brand:**
| Token | Hex | Usage |
|-------|-----|-------|
| primary | `#121212` | App background |
| clientPrimary / LIGHT_YELLOW | `#E9C638` | Primary accent, CTAs, highlights |
| themeBg / THEME_BG_COLOR | `#1E1E1E` | Card/surface background |
| white | `#FFFFFF` | Primary text |

**Surface Hierarchy (darkest to lightest):**
| Token | Hex | Usage |
|-------|-----|-------|
| GREY_VARIANT2 | `#121212` | Base background |
| THEME_BG_COLOR | `#1E1E1E` | Cards, elevated surfaces |
| BLACK_VARIANT3 | `#212121` | Header background |
| GREY_VARIANT8 | `#272727` | Secondary cards |
| GREY_VARIANT6 | `#424242` | Inputs, chips, tertiary surfaces |
| GREY_VARIANT25 | `#1D1D1D` | OTT box background |

**Text Colors:**
| Token | Hex | Usage |
|-------|-----|-------|
| WHITE / F8F8F9 | `#F8F8F9` | Primary text |
| WHITE_VARIANT3 | `#EEEEEE` | Secondary text |
| GREY_VARIANT10 | `#E0E0E0` | Tertiary text |
| GREY_VARIANT4 | `#BDBDBD` | Muted text, subtitles |
| GREY_VARIANT1 / GREY_VARIANT3 | `#9E9E9E` | Placeholder text |
| GREY_VARIANT9 | `#757575` | Disabled/faint text |
| GREY | `#616161` | Borders, dividers |

**Accent & Status:**
| Token | Hex | Usage |
|-------|-----|-------|
| LIGHT_YELLOW | `#E9C638` | Primary CTA, active states, links |
| LIGHT_YELLOW_VARIANT | `#DEBF19` | Secondary yellow |
| GOLD_DIM | `rgba(233,198,56,0.15)` | Yellow tinted backgrounds |
| ERROR_RED | `#E53935` | Error states |
| GREEN | `#388E3C` | Success, positive sentiment |

**Gradient:**
| Name | Values | Usage |
|------|--------|-------|
| Gold Gradient | `#F9FE11` → `#FF9A3D` | Premium badges, gradient text |
| Dark Gradient | `transparent` → `#000` | Poster overlays |

### Typography
**Font Family:** DM Sans (Regular 400, Medium 500, Bold 700)

**Scale:**
| Size | Px | Usage |
|------|-----|-------|
| xs | 10px | Timestamps, badges, micro labels |
| sm | 12px | Subtitles, secondary info, chips |
| md | 14px | Body text, buttons, descriptions |
| lg | 16px | Titles, section headers |
| xl | 18-20px | Page titles, large headers |
| 2xl | 24px | Hero text, stat numbers |
| 3xl | 28-36px | Trending numbers, display text |
| 4xl | 48px | Prediction values |

**Common Patterns:**
- Title: `DM Sans Bold 16px #F8F8F9`
- Subtitle: `DM Sans Regular 12px #9E9E9E`
- Body: `DM Sans Regular 14px #BDBDBD`
- CTA Button: `DM Sans Bold 14px #121212` (on gold bg)
- Activity label: `DM Sans Bold 10px #E9C638`

### Spacing (4px Grid)
| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Micro gaps, icon padding |
| space-2 | 8px | Chip gaps, small margins |
| space-3 | 12px | Card padding, list item gaps |
| space-4 | 16px | Section padding, standard margin |
| space-5 | 20px | Large section spacing |
| space-6 | 24px | Section dividers |
| space-8 | 32px | Page-level spacing |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| radius-sm | 4px | Small chips, progress bars |
| radius-md | 8px | Cards, buttons, inputs |
| radius-lg | 10-12px | Large cards, search bars |
| radius-xl | 16px | Feature cards, modals |
| radius-round | 9999px | Avatars, pills, badges |

### Responsive Scaling
- **Figma canvas:** 360 x 640px (base device)
- `scaledWidth(value) = value * (deviceWidth / 360)`
- `scaledHeight(value) = value * (deviceHeight / 640)`
- Standard card width: `343px` (360 - 16px padding each side)

## Component Architecture

### Categories (257 total)
| Category | Count | Location |
|----------|-------|----------|
| Cards | 73 | `src/components/Cards/` |
| Common | 68 | `src/components/Common/` |
| Skeletons | 18 | `src/components/Skeletons/` |
| Modals | 15 | `src/components/Modals/` |
| Lists | 12 | `src/components/List/` |
| Carousels | 11 | `src/components/Carousels/` |
| MetadataEntries | 6 | `src/components/MetadataEntries/` |
| Root-level | 47 | `src/components/` |
| Atoms | 2 | `src/components/Atoms/` |
| Sections | 2 | `src/components/Sections/` |
| Community | 1 | `src/components/Community/` |
| InboxFlow | 1 | `src/components/InboxFlow/` |
| RecoErrorBoundary | 1 | `src/components/RecoErrorBoundary/` |

### Component Naming Convention
- PascalCase for all components: `AIReviewCard`, `BottomPositionedBtn`
- Storybook path: `{Category}/{ComponentName}` (e.g., `Cards/AIReviewCard`)
- Story file: `{ComponentName}.stories.tsx`

### Common Props Patterns
```typescript
// Navigation/Action
onPress: () => void
onLeftClick: () => void
onRightClick: () => void
navigation: NavigationProp

// Styling
bgColor: string        // Override background
borderRadius: number   // Override radius
disabled: boolean      // Disabled state

// Data
item: object          // Data payload
title: string         // Display title
```

## Icon System

### Location
- Design System: `src/icons/` (94 SVG components)
- App Custom: `src/app/components/icons/` (5 icons)

### Icon Props Interface
```typescript
interface IconProps {
  width?: string;       // Default: "24"
  height?: string;      // Default: "24"
  color?: string;       // Fill/stroke color
  stroke?: string;      // Stroke color
  strokeWidth?: number; // Default: varies
}
```

### Icon Categories
- **Navigation:** Home, Explore, Inbox, User, Search, Menu
- **Actions:** Add, Edit, Delete, Share, Pin, Post, Create
- **Reactions:** Heart, Like/Dislike (filled/outline), Rate, Star
- **Content:** Play, Shorts, Trailer, MovieDiary, Watchparty
- **Moods:** Happy, Sad, Scary, Bored, Nostalgic, Inspiring (11 total)
- **Languages:** English, Hindi, Telugu, Tamil, etc. (12 total)

## Figma Code Connect Mapping

### When mapping Figma components to code:
1. Use `add_code_connect_map` with label `"React"` for web Storybook components
2. Source paths follow pattern: `src/components/{Category}/{Name}.tsx`
3. Component names must match exactly (PascalCase)

### Mapping Rules:
- **Colors in Figma** must use exact hex values from the token table above
- **Typography** must use DM Sans at sizes from the scale
- **Spacing** must follow the 4px grid
- **Border radius** must use one of the defined token values
- **All designs** must work on `#121212` dark background
- **Mobile width** is 375px for previews (360px Figma canvas + scaling)

### Code Connect Template Example:
```javascript
// For a Card component in Figma → Code mapping:
{
  nodeId: "123:456",
  fileKey: "abc123",
  source: "src/components/Cards/AIReviewCard.tsx",
  componentName: "AIReviewCard",
  label: "React"
}
```

## Storybook

### Configuration
- **Framework:** React + Vite (`@storybook/react-vite`)
- **Port:** 6006
- **Theme:** Dark (canvas `#121212`, manager sidebar dark)
- **Font:** DM Sans loaded from Google Fonts CDN
- **Build output:** `storybook-static/`
- **Deploy:** Vercel (RecoBee team)

### Module Aliases (for RN → Web)
```
react-native → react-native-web
react-native-svg → react-native-svg-web
icons → src/icons
components → src/components
utils → src/utils
```

### Story Structure
```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const ComponentName = (props) => ( /* web recreation */ );

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  argTypes: { /* interactive controls */ },
};
export default meta;
type Story = StoryObj<typeof ComponentName>;
export const Default: Story = {};
```

## File Paths Reference
| What | Path |
|------|------|
| RN Components | `~/RecoBee/ads-analysis-ui/Design System/RecoBee-UI-New-main/src/components/` |
| Storybook Stories | `~/RecoBee/design-system/stories/components/` |
| Design System Icons | `~/RecoBee/design-system/src/icons/` |
| Color Tokens (RN) | `~/RecoBee/ads-analysis-ui/.../src/utils/Colors.ts` |
| Font Config (RN) | `~/RecoBee/ads-analysis-ui/.../src/utils/FontFamily.tsx` |
| Dimensions (RN) | `~/RecoBee/ads-analysis-ui/.../src/utils/Dimensions.tsx` |
| CSS Variables (Web) | `~/Shakti/RecoBee/src/styles/theme.css` |
| Storybook Config | `~/RecoBee/design-system/.storybook/` |
| Launch Config | `~/RecoBee/design-system/.claude/launch.json` |
