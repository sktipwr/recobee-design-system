import type { Preview } from '@storybook/react-vite';

// Load DM Sans font globally
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Set global body font and dark background
document.body.style.fontFamily = 'DM Sans, sans-serif';
document.body.style.backgroundColor = '#121212';

// Inject global dark canvas styles
const style = document.createElement('style');
style.textContent = `
  body, .sb-show-main, .docs-story > div { background-color: #121212 !important; }
  .sb-show-main.sb-main-padded { background: #121212 !important; }
`;
document.head.appendChild(style);

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#121212' },
        { name: 'surface', value: '#1E1E1E' },
        { name: 'card', value: '#424242' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  initialGlobals: {
    backgrounds: { value: '#121212' },
  },
};

export default preview;
