// Mock @react-navigation/native
export const useNavigation = () => ({
  navigate: (screen: string, params?: any) => console.log('navigate:', screen, params),
  goBack: () => console.log('goBack'),
  push: (screen: string, params?: any) => console.log('push:', screen, params),
  reset: () => console.log('reset'),
  setOptions: () => {},
  addListener: () => () => {},
  dispatch: () => {},
  canGoBack: () => true,
  getParent: () => null,
  getState: () => ({ routes: [], index: 0 }),
  isFocused: () => true,
});

export const useRoute = () => ({
  params: {},
  name: 'MockScreen',
  key: 'mock-key',
});

export const useFocusEffect = (cb: any) => { try { cb(); } catch {} };
export const useIsFocused = () => true;
export const CommonActions = { navigate: () => ({}) };
export const StackActions = { push: () => ({}), pop: () => ({}) };
export const DrawerActions = { openDrawer: () => ({}), closeDrawer: () => ({}) };
export const createNavigationContainerRef = () => ({ current: null });
