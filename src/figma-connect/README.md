# Figma Code Connect

This directory contains Code Connect mapping files that link Figma components to their code implementations.

## Setup

1. Generate a [Figma Personal Access Token](https://www.figma.com/developers/api#access-tokens)
2. Set it as an environment variable:
   ```bash
   export FIGMA_ACCESS_TOKEN=your_token_here
   ```
3. Publish mappings:
   ```bash
   npx figma connect publish
   ```

## How to Add a New Mapping

1. Open the Figma component and copy its node URL (right-click > Copy link)
2. Create a new `.figma.tsx` file in this directory:

```tsx
import figma from "@figma/code-connect";
import { ComponentName } from "src/components/Category/ComponentName";

figma.connect(
  "https://www.figma.com/design/FILE_KEY/FILE_NAME?node-id=X:Y",
  {
    props: {
      // Map Figma properties to component props
      title: figma.string("Title"),
      disabled: figma.boolean("Disabled"),
      variant: figma.enum("Variant", { Primary: "primary", Secondary: "secondary" }),
    },
    example: (props) => (
      <ComponentName title={props.title} disabled={props.disabled} variant={props.variant} />
    ),
  }
);
```

3. Run `npx figma connect publish` to sync

## Current Mappings

| Figma Component | Code Component | Node ID |
|----------------|---------------|---------|
| Bottom Tab / Action Bar | `Common/BottomButton` | `11:2128` |

## Figma File

- **RB Design System**: https://www.figma.com/design/GN3NGt1umjyBxhnulUcdv7/RB-Design-System
- **App Design System** (new): https://www.figma.com/design/1vjYzboEY2BFvwNutJfaI6/App-Design-System
