// Mock react-native-encrypted-storage
const store: Record<string, string> = {};
export default {
  setItem: async (key: string, value: string) => { store[key] = value; },
  getItem: async (key: string) => store[key] || null,
  removeItem: async (key: string) => { delete store[key]; },
  clear: async () => { Object.keys(store).forEach(k => delete store[k]); },
};
