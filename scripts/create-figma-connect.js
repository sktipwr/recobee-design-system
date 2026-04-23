#!/usr/bin/env node
/**
 * Generate a Code Connect .figma.tsx file from command line args.
 *
 * Usage:
 *   node scripts/create-figma-connect.js <figma-url> <component-path> <component-name>
 *
 * Example:
 *   node scripts/create-figma-connect.js \
 *     "https://www.figma.com/design/GN3NGt1umjyBxhnulUcdv7/RB-Design-System?node-id=11:2128" \
 *     "src/components/Common/Header" \
 *     "Header"
 */
const fs = require('fs');
const path = require('path');

const [,, figmaUrl, componentPath, componentName] = process.argv;

if (!figmaUrl || !componentPath || !componentName) {
  console.log('Usage: node scripts/create-figma-connect.js <figma-url> <component-path> <component-name>');
  console.log('');
  console.log('Example:');
  console.log('  node scripts/create-figma-connect.js \\');
  console.log('    "https://figma.com/design/GN3NGt1umjyBxhnulUcdv7/RB?node-id=11:2128" \\');
  console.log('    "src/components/Common/Header" \\');
  console.log('    "Header"');
  process.exit(1);
}

const content = `import figma from "@figma/code-connect";
import { ${componentName} } from "${componentPath}";

/**
 * ${componentName}
 * Figma: ${figmaUrl}
 * Storybook: Components/${componentName}
 */
figma.connect(
  "${figmaUrl}",
  {
    props: {
      // TODO: Map Figma properties to component props
      // title: figma.string("Title"),
      // disabled: figma.boolean("Disabled"),
      // variant: figma.enum("Variant", { Primary: "primary" }),
    },
    example: (props) => (
      <${componentName} {...props} />
    ),
  }
);
`;

const outDir = path.join(__dirname, '..', 'src', 'figma-connect');
const outFile = path.join(outDir, `${componentName}.figma.tsx`);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, content);
console.log(`Created: ${outFile}`);
console.log('Next: edit the props mapping, then run: npx figma connect publish');
