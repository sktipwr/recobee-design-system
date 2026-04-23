import React, { createContext, useContext, useReducer } from 'react';
import communityAPI from 'api/communityAPI';

const UserPrefsContext = createContext({
  userPrefsState: {
    prefsData: null,
    userPrefsApiData: null,
  },
  dispatch: () => {},
});

const UserPrefsContextProvider = ({ children }) => {
  const initialState = {
    prefsData: null,
    userPrefsApiData: null,
  };

  function UserPrefsReducer(state, action) {
    switch (action.type) {
      case 'SET_USER_PREFS_DATA':
        return {
          ...state,
          prefsData: action.payload,
        };
      case 'SET_USER_PREFS_API_DATA':
        return {
          ...state,
          userPrefsApiData: action.payload
        };

      default:
        return state;
    }
  }

  const [userPrefsState, dispatch] = useReducer(UserPrefsReducer, initialState);

  return (
    <UserPrefsContext.Provider value={{ userPrefsState, dispatch }}>
      {children}
    </UserPrefsContext.Provider>
  );
};

export { UserPrefsContext, UserPrefsContextProvider };
