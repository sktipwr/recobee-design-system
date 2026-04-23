// Mock react-native-config
export default {
  API_BASE_URL: 'https://api.example.com',
  CF_DOMAIN: 'https://cdn.example.com',
  ENV: 'development',
};

// Mock for config.js LOG utility
const noop = (..._args: any[]) => {};
const mockLogger = { info: noop, warn: noop, error: noop, debug: noop };
export const LOG = {
  ...mockLogger,
  extend: (_name: string) => mockLogger,
};

export const CLOUD_BASEURL = 'https://cdn.example.com';
