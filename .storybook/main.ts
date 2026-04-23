import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = join(__dirname, '..');
const mocks = join(root, 'mocks');
const src = join(root, 'src');

const config: StorybookConfig = {
  stories: [
    '../stories/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          // React Native → Web
          'react-native': 'react-native-web',
          'react-native-svg': 'react-native-svg-web',

          // Native module mocks
          'react-native-linear-gradient': join(mocks, 'linear-gradient.tsx'),
          'react-native-fast-image': join(mocks, 'fast-image.tsx'),
          'react-native-encrypted-storage': join(mocks, 'storage.ts'),
          'react-native-config': join(mocks, 'config.ts'),
          'react-native-modal': join(mocks, 'modal.tsx'),
          'react-native-skeleton-placeholder': join(mocks, 'skeleton-placeholder.tsx'),
          'react-native-share': join(mocks, 'misc.ts'),
          'react-native-toast-message': join(mocks, 'misc.ts'),
          'react-native-view-shot': join(mocks, 'misc.ts'),
          'react-native-video': join(mocks, 'misc.ts'),
          'react-native-youtube-iframe': join(mocks, 'misc.ts'),
          'react-native-image-crop-picker': join(mocks, 'misc.ts'),
          'react-native-ratings': join(mocks, 'misc.ts'),
          'react-native-google-mobile-ads': join(mocks, 'misc.ts'),
          'lottie-react-native': join(mocks, 'misc.ts'),
          'react-native-in-app-review': join(mocks, 'misc.ts'),
          '@react-native-clipboard/clipboard': join(mocks, 'misc.ts'),
          'react-native-fbsdk-next': join(mocks, 'misc.ts'),
          'react-native-image-base64': join(mocks, 'misc.ts'),
          'react-native-otp-verify': join(mocks, 'misc.ts'),
          'react-native-calendars': join(mocks, 'misc.ts'),
          'react-native-gifted-charts': join(mocks, 'misc.ts'),
          'react-native-progress': join(mocks, 'misc.ts'),
          'react-native-circular-progress': join(mocks, 'misc.ts'),
          'react-native-element-dropdown': join(mocks, 'misc.ts'),
          'react-native-snap-carousel': join(mocks, 'misc.ts'),
          'react-native-reanimated-carousel': join(mocks, 'misc.ts'),
          'react-native-reanimated': join(mocks, 'misc.ts'),
          'react-native-gesture-handler': 'react-native-web',
          'react-native-keyboard-aware-scroll-view': join(mocks, 'misc.ts'),
          'react-native-safe-area-context': join(mocks, 'misc.ts'),
          'react-native-paper': join(mocks, 'misc.ts'),
          '@react-native-community/datetimepicker': join(mocks, 'misc.ts'),
          '@react-native-masked-view/masked-view': join(mocks, 'misc.ts'),
          'react-native-check-version': join(mocks, 'misc.ts'),
          'react-native-branch': join(mocks, 'misc.ts'),
          '@sentry/react-native': join(mocks, 'misc.ts'),
          'react-native-contacts': join(mocks, 'misc.ts'),
          'react-native-permissions': join(mocks, 'misc.ts'),
          'react-native-geolocation-service': join(mocks, 'misc.ts'),
          'react-native-compressor': join(mocks, 'misc.ts'),
          'react-native-photo-manipulator': join(mocks, 'misc.ts'),
          'react-native-controlled-mentions': join(mocks, 'misc.ts'),
          'react-native-deck-swiper': join(mocks, 'misc.ts'),
          'react-native-countdown-circle-timer': join(mocks, 'misc.ts'),
          'react-native-country-picker-modal': join(mocks, 'misc.ts'),
          'react-native-confirmation-code-field': join(mocks, 'misc.ts'),
          'react-native-calendar-events': join(mocks, 'misc.ts'),
          'react-native-app-auth': join(mocks, 'misc.ts'),
          'react-native-icon-badge': join(mocks, 'misc.ts'),
          'react-native-pager-view': join(mocks, 'misc.ts'),
          'react-native-collapsible-tab-view': join(mocks, 'misc.ts'),
          'react-native-draggable-flatlist': join(mocks, 'misc.ts'),
          'react-native-purchases': join(mocks, 'misc.ts'),
          'react-native-razorpay': join(mocks, 'misc.ts'),
          'react-native-onesignal': join(mocks, 'misc.ts'),
          'react-native-device-info': join(mocks, 'misc.ts'),
          'react-native-vision-camera': join(mocks, 'misc.ts'),
          'react-native-webview': join(mocks, 'misc.ts'),
          '@revopush/react-native-code-push': join(mocks, 'misc.ts'),
          'react-native-logs': join(mocks, 'misc.ts'),

          // Navigation mocks
          '@react-navigation/native': join(mocks, 'navigation.ts'),
          '@react-navigation/native-stack': join(mocks, 'navigation.ts'),
          '@react-navigation/stack': join(mocks, 'navigation.ts'),
          '@react-navigation/bottom-tabs': join(mocks, 'navigation.ts'),
          '@react-navigation/drawer': join(mocks, 'navigation.ts'),

          // App internal aliases
          'utils': join(src, 'utils'),
          'icons': join(src, 'icons'),
          'context': join(mocks, 'context.tsx'),

          // API mocks
          'api/recommendationsAPI': join(mocks, 'api.ts'),
          'api/searchAPI': join(mocks, 'api.ts'),
          'api/userProfileAPI': join(mocks, 'api.ts'),
          'api/homeScreenAPI': join(mocks, 'api.ts'),
          'api/watchlistAPI': join(mocks, 'api.ts'),
          'api/communityAPI': join(mocks, 'api.ts'),
          'api/inboxFlowAPIs': join(mocks, 'api.ts'),
          'api/staticFormsAPI': join(mocks, 'api.ts'),
          'api/guestAPI': join(mocks, 'api.ts'),
          'api/yearWrapAPI': join(mocks, 'api.ts'),

          // Internal module aliases
          'components': join(src, 'components'),
          'stores': join(src, 'stores'),
          'src': src,
          'config': join(mocks, 'config.ts'),
          'mixpanel': join(mocks, 'misc.ts'),
          'styles': join(mocks, 'styles-mock.ts'),
        },
        extensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js'],
      },
      define: {
        __DEV__: true,
      },
      plugins: [
        // Resolve all svg/* imports to the SVG mock
        {
          name: 'svg-mock-resolver',
          resolveId(source: string) {
            if (source.startsWith('svg/')) {
              return join(mocks, 'svg-mock.tsx');
            }
            // Handle relative paths to root Styles.tsx or CommonStyles
            if (source.endsWith('/Styles') || source.endsWith('/Styles.tsx') || source.includes('../Styles') || source === 'Styles') {
              return join(mocks, 'styles-mock.ts');
            }
            // Handle assets/ imports (images, beemojis, etc.)
            if (source.startsWith('assets/') || source.includes('/assets/')) {
              return join(mocks, 'svg-mock.tsx');
            }
            // Handle data/ imports (lotties, constants, etc.)
            if (source.startsWith('data/')) {
              return join(mocks, 'misc.ts');
            }
            // Handle any .svg file imports
            if (source.endsWith('.svg')) {
              return join(mocks, 'svg-mock.tsx');
            }
            // Handle MixPanel import
            if (source.includes('MixPanel')) {
              return join(mocks, 'misc.ts');
            }
            // Handle env.json
            if (source.includes('env.json') || source === 'env') {
              return join(mocks, 'config.ts');
            }
            return null;
          },
        },
      ],
    });
  },
};
export default config;
