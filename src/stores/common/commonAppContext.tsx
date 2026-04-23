import React, { createContext, useContext, useReducer } from 'react';
import ActionTypes from '../actionTypes';
import mixpanel from 'mixpanel';

interface DispatchActionParams {
  type: string;
  payload: any;
}

const initialState = {
  userRole: null,
  showHomeTopAd: true,
  showHomeBottomAd: true,
  showMovieDetailsAd: true,
  showShortsAd: true,
  showRecentReleaseAd: true,
  showSocialFeedBottomAd: true,
  isPremiumUser: false,
  defaultPremiumInfo: null,
  isPremiumFlowEnabled: false,
  createCommunityFromPremiumScreen: false,
  communityIdParam: null,
  reviewSearchFromSocial: false,
  isMuted: false,
  shwoTriviaCarouselAd: true,
  shortsData: null,
  triviaData: null,
  initialReelIndex: 0,
  isNewUser: false,
  loginCarouselImages: [],
  isEvenUserID: true,
  showGuestFlow: true,
  hasUnreadMessages: false
  
}

const CommonAppContext = createContext({
  commonAppState: initialState,
  commonDispatch: ({ type, payload }: DispatchActionParams) => {},
});

const CommonContextProvider = ({ children }) => {

  function CommonContextReducer(state, action) {
    switch (action.type) {
      case ActionTypes.SET_USER_ROLE:
        if(action.payload && action.payload != null){
          mixpanel.track("UserRole", {
            screen: "CommonAppContext",
            userRole: action.payload,
            purpose: "retrive user role"
          });
        }
        return {
          ...state,
          userRole: action.payload == 'critic_ob' ? null : action.payload,
        };
      case ActionTypes.SET_HOME_TOP_AD_VISIBILITY:
        return {
          ...state,
          showHomeTopAd: action.payload,
        };
      case ActionTypes.SET_HOME_BOTTOM_AD_VISIBILITY:
        return {
          ...state,
          showHomeBottomAd: action.payload,
        };
      case ActionTypes.SET_SHORTS_AD_VISIBILITY:
        return {
          ...state,
          showShortsAd: action.payload,
        };
      case ActionTypes.SET_MOVIE_DETAILS_AD_VISIBILITY:
        return {
          ...state,
          showMovieDetailsAd: action.payload,
        };
      case ActionTypes.SET_RECENT_RELEASE_AD_VISIBILITY:
        return {
          ...state,
          showRecentReleaseAd: action.payload,
        };
      case ActionTypes.SET_SOCIAL_FEED_BOTTOM_AD_VISIBILITY:
        return {
          ...state,
          showSocialFeedBottomAd: action.payload,
        };
      case ActionTypes.SET_IS_PREMIUM_USER:
        return {
          ...state,
          isPremiumUser: action.payload,
        };
      case ActionTypes.IS_PREMIUM_FLOW_ENABLED:
        return {
          ...state,
          isPremiumFlowEnabled: action.payload,
        };
      case ActionTypes.SET_DEFAULT_MEMBERSHIP_INFO:
        return {
          ...state,
          defaultPremiumInfo: action.payload,
        };
      case ActionTypes.CREATE_COMMUNITY_FROM_PREMIUM_SCREEN:
        return {
          ...state,
          createCommunityFromPremiumScreen: action.payload,
        };
      case ActionTypes.SET_BOTTOM_TAB_COMMUNITY_ID_PARAM:
        return {
          ...state,
          communityIdParam: action.payload,
        };
      case ActionTypes.REVIEW_SEARCH_FROM_SOCIAL:
        return {
          ...state,
          reviewSearchFromSocial: action.payload,
        };
      case ActionTypes.IS_MUTED:
        return {
          ...state,
          isMuted: action.payload,
        };
      case ActionTypes.SET_TRIVIA_CAROUSEL_AD_VISIBILITY:
        return {
          ...state,
          shwoTriviaCarouselAd: action.payload,
        };
      case ActionTypes.SET_SHORTS_DATA:
        return {
          ...state,
          shortsData: action.payload,
        };
      case ActionTypes.SET_TRIVIA_DATA:
        return {
          ...state,
          triviaData: action.payload,
        };
      case ActionTypes.SET_INITIAL_REEL_INDEX:
        return {
          ...state,
          initialReelIndex: action.payload,
        };
      case ActionTypes.SET_IS_NEW_USER:
        return {
          ...state,
          isNewUser: action.payload,
        };
      case ActionTypes.LOGIN_CAROUSEL_IMAGES:
        return {
          ...state,
          loginCarouselImages: action.payload,
        };
      case ActionTypes.CHECK_IF_EVEN_USER_ID:
        return {
          ...state,
          isEvenUserID: action.payload,
        };
      case ActionTypes.SHOW_GUEST_FLOW:
        return {
          ...state,
          showGuestFlow: action.payload,
        };
      case ActionTypes.SET_HAS_UNREAD_MESSAGES:
        return {
          ...state,
          hasUnreadMessages: action.payload,
        };
      case ActionTypes.RESET_COMMON_CONTEXT_STATE:
        return initialState;
      default:
        return state;
    }
  }

  const [commonAppState, commonDispatch] = useReducer(
    CommonContextReducer,
    initialState
  );

  return (
    <CommonAppContext.Provider value={{ commonAppState, commonDispatch }}>
      {children}
    </CommonAppContext.Provider>
  );
};

export { CommonAppContext, CommonContextProvider };
