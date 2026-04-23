// Centralized Tab Visibility Management
import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Consolidated list of all routes that should hide the bottom tabs
export const TAB_HIDDEN_ROUTES = [
  // Profile & User related
  'RecoLens',
  'ProfileTabsScreen',
  'ProfileScreen',
  'RBUserProfileScreen',
  'UserPreferencesScreen',
  'SettingsMainScreen',
  'SettingsScreen',
  'MyFriendsScreen',
  'ContactListScreen',
  'AccountSettings',
  'DeleteAccount',
  'DeleteAccountFeedback',
  'GroupScreen',
  'CreateGroupScreen',
  'CustomizeFeed',
  'LeaderboardEntryScreen',
  
  // Chat & Messaging
  'ChatScreen',
  'GroupChat',
  'InboxDetails',
  'InboxMain',
  'InboxFlowStack',
  
  // Movie & Content Details
  'MovieDetailsScreen',
  'SeasonDetailsScreen',
  'DetailsScreen',
  'AllViewers',
  'ListItemDetails',
  'CastResult',
  
  // Reviews & Posts
  'ReviewComment',
  'ReviewMain',
  'PostReview',
  'ReviewSearch',
  'CreatePost',
  'MyDrafts',
  
  // Lists & Watchlist
  'MyWatchlist',
  'MyLists',
  'CreateList',
  'AddMoviesToList',
  'UpdateList',
  'MySeen',
  'MyReviews',
  'AddWatchlist',
  
  // Search
  'SearchScreen',
  'SearchResultScreen',
  
  // Social & Community
  'FeedScreen',
  'FollowerList',
  'InviteFriends',
  'CreateCommunity',
  'ManageCommunityMembers',
  'CommunityMembersScreen',
  'DiscoverFriendsScreen',
  
  // Notifications & Badges
  'NotificationsScreen',
  'BadgeScreen',
  'BadgeInfoScreen',
  'MostRecentBadgeScreen',
  
  // Leaderboard & Rewards
  'LeaderboardPage',
  'LeaderboardRewardsPage',
  'LeaderboardInfoPage',
  
  // Premium & Subscriptions
  'RecoBeePremiumScreen',
  'RenewPremiumScreen',
  'RecobeeP',
  
  // Analytics & Dashboard
  'EngagementDashboard',
  'EngagementDashboardScreen',
  'MyMovieTime',
  'MyReviewsAnalytics',
  'AdvancedAnalytics',
  
  // Events & Activities
  'ScheduleMovieEvent',
  'YearRecapStory',
  'TriviaQuestionScreen',
  'SurveyScreen',
  'RecoStreakScreen',
  'RecoStreakScreenInfo',
  'CoachmarkScreen',
  
  // Movie Operations
  'AddMovie',
  'RecoGeneratorScreen',
  'UpcomingReleases',
  'AllRecos',
  'AllOttRecos',
  'AllBlogsScreen',
  
  // Shorts
  'CreateClip',
  'Clips',
  
  // Other
  'OTPScreen',
  'MetadataScreen',
  'RecoStreakInfoScreen',
  'ExploreLists',
  'PointsAndRewards',
  
  // Inbox Flow specific
  'Recommend',
  'FinalRecommend',
  'MovieDiaryScreen',
  //B2B ENTRY SCREENS 
  'UpcomingMoviesTheatre',
  'B2BStatsMovieDetails',
  'MyLibrary',
];

// Routes that should always show tabs (main screens)
export const TAB_VISIBLE_ROUTES = [
  'TopRecoScreen',
  'HomeStackScreen', 
  'SocialTab',
  'ShortsHome',
  // 'MovieDiaryScreen',
  'UserProfileScreen',
  'inboxFlow',
  'ExplorationTab',
 // 'SettingsScreen', // This is the main settings/profile screen, not SettingsMainScreen
 // 'FeedScreen', // Main community feed
];

// Standard tab bar style configuration
export const TAB_BAR_STYLE = {
  display: 'flex',
  backgroundColor: '#211F26',
  borderTopWidth: 0,
};

// Hidden tab bar style
export const TAB_BAR_HIDDEN_STYLE = {
  display: 'none',
};

/**
 * Get the deepest focused route name from nested navigation
 * @param {object} route - Route object
 * @returns {string} - The deepest route name
 */
const getDeepestRouteName = (route) => {
  // Try to get the focused route name
  let currentRoute = getFocusedRouteNameFromRoute(route);
  
  // If no focused route, try to get from route state
  if (!currentRoute && route?.state?.routes) {
    const activeRoute = route.state.routes[route.state.index];
    if (activeRoute) {
      currentRoute = activeRoute.name;
      // Recursively check if this route has nested routes
      if (activeRoute.state?.routes) {
        currentRoute = getDeepestRouteName(activeRoute);
      }
    }
  }
  
  return currentRoute;
};

/**
 * Centralized function to manage tab visibility
 * @param {object} navigation - Navigation object
 * @param {object} route - Route object
 * @param {string} defaultRoute - Default route name if getFocusedRouteNameFromRoute returns null
 */
export const manageTabVisibility = (navigation, route, defaultRoute = 'Home') => {
  const focusRoute = getDeepestRouteName(route) || getFocusedRouteNameFromRoute(route) || defaultRoute;
  
  // Ensure navigation parent exists
  const parent = navigation.getParent();
  if (!parent) {
    console.warn('Navigation parent not found');
    return;
  }
  
  // Special handling for Exploration stack: hide tabs for any route except the root
  if (defaultRoute === 'ExplorationTab' && focusRoute !== 'ExplorationTab') {
    parent.setOptions({
      tabBarStyle: TAB_BAR_HIDDEN_STYLE,
    });
    return;
  }

  // Explicit check for routes that should always show tabs
  if (TAB_VISIBLE_ROUTES.includes(focusRoute)) {
    parent.setOptions({
      tabBarStyle: TAB_BAR_STYLE
    });
    return;
  }
  
  if (TAB_HIDDEN_ROUTES.includes(focusRoute)) {
    // Hide tabs
    parent.setOptions({ 
      tabBarStyle: TAB_BAR_HIDDEN_STYLE 
    });
  } else {
    // Show tabs
    parent.setOptions({
      tabBarStyle: TAB_BAR_STYLE
    });
  }
};

/**
 * Custom hook for managing tab visibility in stack screens
 * @param {object} navigation - Navigation object  
 * @param {object} route - Route object
 * @param {string} defaultRoute - Default route name
 */
export const useTabVisibility = (navigation, route, defaultRoute = 'Home') => {
  React.useLayoutEffect(() => {
    manageTabVisibility(navigation, route, defaultRoute);
  }, [navigation, route, defaultRoute]);
  
  // Listen to focus changes to ensure tabs reappear correctly
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Small delay to ensure route state is updated
      setTimeout(() => {
        manageTabVisibility(navigation, route, defaultRoute);
      }, 100);
    });

    return unsubscribe;
  }, [navigation, route, defaultRoute]);
  
  // Also listen to state changes
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      setTimeout(() => {
        manageTabVisibility(navigation, route, defaultRoute);
      }, 50);
    });

    return unsubscribe;
  }, [navigation, route, defaultRoute]);
};

export default {
  TAB_HIDDEN_ROUTES,
  TAB_VISIBLE_ROUTES,
  TAB_BAR_STYLE,
  TAB_BAR_HIDDEN_STYLE,
  manageTabVisibility,
  useTabVisibility,
}; 