import React, { createContext, useContext, useReducer } from 'react';
import communityAPI from 'api/communityAPI';

const CommunityContext = createContext({
  state: {
    communities: [],
    subscribedCommunities: [],
    adminCommunities: [],
    isLoading: false,
  },
  dispatch: () => {},
});

const CommunityContextProvider = ({ children }) => {
  const initialState = {
    communities: [],
    subscribedCommunities: [],
    isLoading: false,
  };

  function CommunityReducer(state, action) {
    switch (action.type) {
      case 'ACTIVATE_LOADING':
        return { ...state, isLoading: true };
      case 'LOAD_ALL_COMM':
        return {
          ...state,
          communities: action.payload.communities ? action.payload.communities : state.communities,
          subscribedCommunities: action.payload.subscribedCommunities ? action.payload.subscribedCommunities : state.subscribedCommunities,
          adminCommunities: action.payload.adminCommunities ? action.payload.adminCommunities : state.adminCommunities,
          isLoading: false,
        };
      case 'ADD_COMMUNITY':
        return {
          ...state,
          communities: state.communities.map((comm) => {
            if (comm.id === action.payload.id) {
              return action.payload;
            }
            return comm;
          }),
        };
        case 'EDIT_SUBSCRIBED_COMMUNITY':
        return {
          ...state,
          subscribedCommunities: state.subscribedCommunities.map((comm) => {
            if (comm.id === action.payload.id) {
              return action.payload;
            }
            return comm;
          }),
        };
        case 'EDIT_ADMIN_COMMUNITY':
          return {
            ...state,
            adminCommunities: state.adminCommunities.map((comm) => {
              if (comm.id === action.payload.id) {
                return action.payload;
              }
              return comm;
            }),
           
          };
      case 'JOIN_COMMUNITY':
        var { subscribedCommunities } = state;
        if (
          subscribedCommunities.findIndex(
            (comm) => comm.id === action.payload.id
          ) == -1
        ) {
          var newSubscribedCommunities = [
            ...subscribedCommunities,
            action.payload,
          ];
          subscribedCommunities = newSubscribedCommunities?.slice();
        }

        return { ...state, subscribedCommunities };

      case 'ADD_ADMIN_COMMUNITY':
        var { adminCommunities } = state;
        if (
          adminCommunities.findIndex(
            (comm) => comm.id === action.payload.id
          ) == -1
        ) {
          var newAdminCommunities = [
            ...adminCommunities,
            action.payload,
          ];
          adminCommunities = newAdminCommunities?.slice();
        }

        return { ...state, adminCommunities };

      case 'LEAVE_COMMUNITY':
        var { subscribedCommunities, communities } = state;
        return {
          ...state,
          communities: communities, // popular comm
          subscribedCommunities: subscribedCommunities.filter(
            (comm) => comm.id != action.payload.id
          ),
        };

      case 'DELETE_COMMUNITY':
        var { subscribedCommunities, communities, adminCommunities } = state;
        return {
          ...state,
          communities: communities.filter(
            (comm) => comm.id != action.payload.id
          ), // popular comm
          subscribedCommunities: subscribedCommunities.filter(
            (comm) => comm.id != action.payload.id
          ),
          adminCommunities: adminCommunities.filter(
            (comm) => comm.id != action.payload.id
          ),
        };

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(CommunityReducer, initialState);

  return (
    <CommunityContext.Provider value={{ state, dispatch }}>
      {children}
    </CommunityContext.Provider>
  );
};

export { CommunityContext, CommunityContextProvider };
