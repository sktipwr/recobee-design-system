// Mock various native modules
// Default export for modules that use `import X from 'module'`
const _defaultMock = () => null;
export default _defaultMock;

// react-native-share
export const Share = {
  open: async (options: any) => console.log('Share:', options),
  shareSingle: async (options: any) => console.log('ShareSingle:', options),
};

// react-native-toast-message
export const Toast = {
  show: (options: any) => console.log('Toast:', options),
  hide: () => {},
};

// react-native-view-shot
export const captureRef = async () => 'mock-uri';
export const captureScreen = async () => 'mock-uri';

// react-native-in-app-review
export const InAppReview = {
  RequestInAppReview: async () => {},
  isAvailable: () => true,
};

// react-native-clipboard
export const Clipboard = {
  setString: (text: string) => console.log('Clipboard:', text),
  getString: async () => '',
};

// Mixpanel
export const mixpanel = {
  track: (event: string, props?: any) => {},
  identify: (id: string) => {},
  reset: () => {},
  getPeople: () => ({ set: () => {} }),
};

// react-native-google-mobile-ads (admob)
export const BannerAd = () => null;
export const BannerAdSize = { BANNER: 'BANNER', LARGE_BANNER: 'LARGE_BANNER' };
export const TestIds = { BANNER: 'test-banner' };

// Lottie
export const LottieView = ({ style }: any) => null;

// react-native-video
export const Video = () => null;

// react-native-youtube-iframe
export const YoutubePlayer = () => null;

// react-native-image-crop-picker
export const ImagePicker = {
  openPicker: async () => ({ path: '', mime: '' }),
  openCamera: async () => ({ path: '', mime: '' }),
};

// react-native-ratings
export const Rating = ({ imageSize, readonly, startingValue, style }: any) => null;
export const AirbnbRating = Rating;
