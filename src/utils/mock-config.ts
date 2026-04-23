// Mock for config.js LOG utility
export const LOG = {
  extend: (name: string) => ({
    info: (...args: any[]) => {},
    warn: (...args: any[]) => {},
    error: (...args: any[]) => {},
    debug: (...args: any[]) => {},
  }),
  info: (...args: any[]) => {},
  warn: (...args: any[]) => {},
  error: (...args: any[]) => {},
};
