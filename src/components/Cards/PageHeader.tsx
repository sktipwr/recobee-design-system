import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Search from 'svg/search1';
import Menu from 'svg/menu';
import Back from 'svg/back';
import Users from 'icons/Users';
import NotificationButton from 'components/NotificationButton';
import userProfileAPI from 'api/userProfileAPI';
import inboxFlowAPIs from 'api/inboxFlowAPIs';
import mixpanel from 'mixpanel';
import Close from 'icons/Cross';
import ScanCamera from 'svg/camera_scan';
import AppColors from '../../utils/Colors';
import CommonStyles from '../../../Styles';
import { AdvanceFilterBtn } from '../Common/AdvanceFilterBtn';
import FontFamily from '../../utils/FontFamily';
import ChatTyping from 'svg/chat_typing';
import StringConstants from 'utils/StringConstants';
//import ChatButton from 'components/ChatButton';
import recommendationsAPI from '../../../api/recommendationsAPI';
const SearchButton = () => (
  <View style={styles.searchButton}>
    <Search width={18} height={18} />
  </View>
);

// placeholder: Placeholder text for the search input
// navigation: Navigation object
// isGlobalSearch = false: Boolean indicating if it's a global search
// showNotification = true: Boolean indicating if notifications should be shown
// fromScreen = '': Name of the source screen
// initialRoute = '': Initial route for navigation
// onSearchTextChange = (value) => {}: Callback function for search text change
// onSearchKeyPress = () => {}, // Callback function for search input key press

const PageHeader = ({
  placeholder,
  navigation,
  isGlobalSearch = false,
  showNotification = true,
  searchString = '',
  showBackButton = false,
  showMenuButton = false,
  fromScreen = '',
  initialRoute = '',
  searchInputWidth,
  onSearchTextChange = (value) => {},
  onSearchKeyPress = () => {},
  showAdvanceFilter,
  isAdvanceFilterActive,
  onAdvanceFilterPress,
  customBackNavigation = false,
  //FOR GROUP ICON
  showGroupIcon = false,
  showInbox = false,
  onGroupAdd = () => {},
  topSpace = 10,
  showCameraIcon = false
}) => {
  const [searchValue, setSearchValue] = useState(searchString ?? '');
  const [badgeCount, setBadgeCount] = useState('0');
  const [unread,setUnread] = useState(false);
 const [trendingMovies,setTrending] = useState();

  useEffect(()=>{
    recommendationsAPI.getPopularMovies().then((response) =>{
      setTrending(response.data);
    })
  },[])

  useFocusEffect(
    useCallback(() => {
      // Load data on focus
      getNotificationsForUser();
     // getMessages();
    }, [])
  );
  useEffect(() => {
    onSearchTextChange(searchValue); // Call the callback when localValue changes
  }, [searchValue]);

  // fetch notifications
  const getNotificationsForUser = async () => {
    let badgeCountResp = await userProfileAPI.getBadgeCount();
    if (badgeCountResp?.status == 200) {
      if (badgeCountResp.data > 10) {
        setBadgeCount('10+');
      } else {
        setBadgeCount(badgeCountResp.data);
      }
    }
  };
  //fetch messages
 const getMessages = async () => {
  try {
    let messagesResp = await inboxFlowAPIs.getUnreadMessages();
      setUnread(messagesResp.data.hasUnreadMessages); 
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

  const buzzClicked = () => {
    mixpanel.track('Buzz_Bee', {
      screen: fromScreen ? fromScreen : 'TopRecoScreen',
      purpose: 'Buzz the Bee clicked',
    });
    navigation.navigateDeprecated('SearchScreen', { fromScreen: fromScreen , trendingMovies:trendingMovies});
  };

  return (
    <View style={[styles.container, {marginTop: topSpace}]}>
      <View style={styles.pageHeader}>
        {(showMenuButton || showBackButton || fromScreen) && (
          <TouchableOpacity
            style={styles.drawerConatiner}
            onPress={() => {
              if (showMenuButton) {
                navigation.toggleDrawer();
              } else if (showBackButton && !customBackNavigation) {
                navigation.goBack();
              } else if (showBackButton && customBackNavigation) {
                // For custom back navigation, always go back instead of opening drawer
                navigation.goBack();
              } else if (fromScreen && initialRoute) {
                navigation.navigateDeprecated(initialRoute, { screen: fromScreen });
              } else {
                navigation.toggleDrawer();
              }
            }}
          >
            <View style={[CommonStyles.headerRightBtn, styles.drawer]}>
              {!showMenuButton && (showBackButton || fromScreen) ? (
                <Back width={26} height={26} />
              ) : (
                <Menu width={18} height={12} />
              )}
            </View>
          </TouchableOpacity>
        )}
        <View
          style={[
            CommonStyles.flexDirRow,
            searchInputWidth ? { width: searchInputWidth } : { flex: 1 },
          ]}
        >
          {isGlobalSearch ? (
            <Pressable
              style={[styles.searchContainer]}
              onPress={() => buzzClicked()}
            >
              <SearchButton />
              <View style={[styles.inputStyle]}>
                <Text style={styles.placeHolder}>
                  {searchString != '' ? searchString : placeholder}
                </Text>
              </View>
              {showCameraIcon && (
                <TouchableOpacity
                  onPress={() => navigation.navigateDeprecated('RecoLens')}
                >
                  <ScanCamera width={24} height={24} />
                </TouchableOpacity>
              )}
            </Pressable>
          ) : (
            <View
              style={[
                styles.searchContainer,
                !(showMenuButton || showBackButton || fromScreen) && {
                  marginRight: 0,
                },
              ]}
            >
              <SearchButton />
              <TextInput
                style={[styles.inputStyle, { color: '#FFFFFF' }]}
                onChangeText={(text) => {
                  setSearchValue(text);
                }}
                onKeyPress={onSearchKeyPress}
                value={searchValue}
                placeholder={placeholder}
                keyboardType='default'
                keyboardAppearance='dark'
                placeholderTextColor='#9E9E9E'
              />
              {searchValue == '' ? null : (
                <TouchableOpacity onPress={() => setSearchValue('')}>
                  <View style={{ paddingRight: 12 }}>
                    <Close color='#FFFFFF' width={24} height={24} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}
          {showAdvanceFilter && (
            <AdvanceFilterBtn
              isAdvanceFilterActive={isAdvanceFilterActive}
              onAdvanceFilterPress={() => onAdvanceFilterPress()}
            />
          )}
          {/* {showInbox && (
              <View
                style={[CommonStyles.headerRightBtn, styles.inboxContainer]}
              >
                <ChatButton hasUnreadMessages={unread} navigation={navigation} />
              </View>
          )} */}
          {showNotification && (
            <View
              style={[CommonStyles.headerRightBtn, { flexDirection: 'row' }]}
            >
              <NotificationButton count={badgeCount} navigation={navigation} />
            </View>
          )}
          {showGroupIcon && (
            <TouchableOpacity
              onPress={onGroupAdd}
              style={[styles.groupButton, CommonStyles.flexRowAlignCenter]}
            >
              <Users height={18} width={18} color={AppColors.LIGHT_YELLOW} />
              <Text style={styles.groupButtonText}>{StringConstants.GROUP}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  drawerConatiner: {
    marginRight: 8,
  },
  drawer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeHolder: {
    color: '#9E9E9E',
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
  },
  pageHeader: {
    flexDirection: 'row',
  },
  groupButton: {
    backgroundColor: AppColors.GREY_TRANSPARENT2,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  inboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  groupButtonText: {
    fontSize: 15,
    color: AppColors.LIGHT_YELLOW,
    fontFamily: FontFamily.DMSansBold,
    marginLeft: 5
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2B2930',
    marginLeft: 0,
    marginRight: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    flexGrow: 1,
    height: 48,
  },
  inputStyle: {
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexGrow: 1,
  },
  searchButton: {
    height: 24,
    width: 24,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PageHeader;
