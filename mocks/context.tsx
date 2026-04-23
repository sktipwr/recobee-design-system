import React, { createContext, useContext } from 'react';

// Mock AppConsumer / AppContext (the app's global context)
const mockTheme = {
  name: 'dark',
  colors: {
    primary: '#121212',
    text: '#F8F8F9',
    homeCard: '#424242',
    statusbar: 'light-content',
    placeholder: '#9E9E9E',
    placeholderDark: '#343A30',
    link: '#e9c46a',
    scroll: 'white',
    searchBackground: '#272727',
    contrastText: '#FFF',
    bottomsheet: '#272727',
    grey2: '#F5F5F5',
    grey7: '#757575',
    grey4: '#E0E0E0',
    grey9: '#424242',
    grey9alt: '#212121',
    grey5: '#BDBDBD',
    grey3: '#EEEEEE',
    grey6: '#9E9E9E',
    grey10: '#121212',
    primary5: '#FBEB41',
    clientPrimary: '#E9C638',
    white: '#FFFFFF',
    buttonSecondaryPressed: '#353014',
  },
};

const mockState = {
  theme: mockTheme,
  user: {
    id: 'mock-user',
    name: 'Demo User',
    username: 'demo',
    profile_pic: '',
    is_premium: false,
  },
  isLoggedIn: true,
  isGuest: false,
};

// AppConsumer HOC mock
export const AppConsumer = ({ children }: { children: (state: any) => React.ReactNode }) => {
  return <>{children(mockState)}</>;
};

// UserPrefsContext mock
export const UserPrefsContext = createContext({
  userPrefs: { language: 'en', preferred_otts: [] },
  setUserPrefs: () => {},
});

export const useUserPrefs = () => useContext(UserPrefsContext);

// Generic context provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
