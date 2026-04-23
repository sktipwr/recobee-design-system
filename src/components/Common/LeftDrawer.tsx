import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DefaultUser from 'svg/user';
import Leaderboard from 'svg/leaderboard';
import RankBg from 'svg/rank_bg';
import PaymentBtn from 'svg/payment_btn';
import MenuItem from '../Cards/MenuItem';
import Critic from 'svg/critic';
import EncryptedStorage from 'react-native-encrypted-storage';
import { checkBadge, getUserBadgeIcon, retriveUserRank } from 'utils/HelperFunctions';
import { CommonAppContext } from '../../stores/common/commonAppContext';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import CommonStyles from '../../../Styles';
import BorderGradient from './BorderGradient';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import userProfileAPI from 'api/userProfileAPI';
import Logo from 'svg/logoWithNoBg';
import PremiumBadge from 'svg/premium_badge_icon';
import mixpanel from 'mixpanel';

export default function LeftDrawer(props) {
  const [userDP, setUserDP] = useState();
  const [userName, setUserName] = useState();
  const [userTag, setUserTag] = useState();
  const [userRank, setUserRank] = useState();
  const { commonAppState, commonDispatch } = useContext(CommonAppContext);

  const menu = [
     {
      key: '0',
      text: 'My Reviews',
      screen: 'MyReviews',
      baseScreen: props?.navigateToScreen,
      icon: 'Review',
      type: 'drawer',
    },
    {
      key: '1',
      text: 'My Library',
      screen: 'MyLibrary',
      baseScreen: props?.navigateToScreen,
      icon: 'MovieDiary',
      type: 'drawer',
    },
    {
      key: '2',
      text: 'My Badges',
      baseScreen: props?.navigateToScreen,
      screen: 'BadgeScreen',
      icon: 'Badge',
      type: 'drawer',
    },
    {
      key: '3',
      text: 'My Preferences',
      baseScreen: 'SettingsScreen',
      screen: 'UserPreferencesScreen',
      icon: 'Filter',
      type: 'drawer',
    },
    {
      key: '4',
      text: 'Communities',
      screen: 'FeedScreen',
      baseScreen: 'CommunityStack',
      icon: 'CommunityIcon',
      type: 'drawer',
    },
    {
      key: "5",
      text: 'Refer Friends to RecoBee',
      screen: "InviteFriends",
      baseScreen: props?.navigateToScreen,
      icon: 'Invite',
      type: "drawer",
    },
    // removed for now, may be used later
    // {
    //   key: '1',
    //   text: 'My Watchlist',
    //   screen: 'MyWatchlist',
    //   baseScreen: props?.navigateToScreen,
    //   icon: 'WlSetting',
    //   type: 'drawer',
    // },
    // {
    //   key: '2',
    //   text: 'My Seen Movies',
    //   screen: 'MySeen',
    //   baseScreen: props?.navigateToScreen,
    //   icon: 'SeenSetting',
    //   type: 'drawer',
    // },
    // {
    //   key: '3',
    //   text: 'My Lists',
    //   screen: 'MyLists',
    //   baseScreen: props?.navigateToScreen,
    //   icon: 'List',
    //   type: 'drawer',
    // },
  ];

  const arrowClicked = (icon, screen, baseScreen) => {
    if (baseScreen) {
      props?.props.navigation.navigateDeprecated(baseScreen, {
        screen: screen,
        params: { fromScreen: props?.navigateFromScreen },
      })
      return;
    } else {
      props?.props.navigation.navigateDeprecated(screen, {
        params: { fromScreen: props?.navigateFromScreen },
      })
    }
  };

  EncryptedStorage.getItem('user_dp').then((storedUserDP) => {
    setUserDP(storedUserDP);
  });
  EncryptedStorage.getItem('user_fname').then((storedUserName) => {
    setUserName(storedUserName);
  });
  EncryptedStorage.getItem('user_rank').then((storedUserRank) => {
    if (storedUserRank != null) {
      try {
        const parsedRankData = JSON.parse(storedUserRank);
        const criticRank = typeof parsedRankData?.criticRank === 'number' ? parsedRankData.criticRank : (typeof parsedRankData?.criticRank === 'string' ? parseInt(parsedRankData.criticRank) : Infinity);
        const moviebuffRank = typeof parsedRankData?.moviebuffRank === 'number' ? parsedRankData.moviebuffRank : (typeof parsedRankData?.moviebuffRank === 'string' ? parseInt(parsedRankData.moviebuffRank) : Infinity);
        const bestRank = Math.min(criticRank, moviebuffRank);
        if (bestRank !== Infinity) {
          setUserRank(bestRank);
        }
      } catch (error) {
        console.error('Error:', error?.message);
      }
    }
  });

  EncryptedStorage.getItem('user_unq_id').then((storedUserTag) => {
    setUserTag(storedUserTag);
  });

  const goToPremiumScreen = () => {
    props?.props.navigation.toggleDrawer();
    mixpanel.track('Nav_RecoBeePremiumScreen', {
      screen: 'LeftDrawer',
      source: 'leftMenu',
      purpose: 'Navigate to RecoBeePremiumScreen'
    });
    props?.props.navigation.navigateDeprecated(props?.navigateToScreen, {
      screen: "RecoBeePremiumScreen",
      params: { fromScreen: props?.navigateFromScreen },
    })
  }


  return (
    <View style={styles.outerContainer}>
      <StatusBar
        backgroundColor={AppColors.GREY_VARIANT2}
      />
      <View style={{ height: '90%' }}>
        <DrawerContentScrollView {...props}>
          {/* <View style={styles.logo}>
            <Logo height={48} width={113} />
          </View> */}
          <View style={styles.logoContainer}>
            <TouchableOpacity
              style={styles.profileCard}
              onPress={() => {
                props?.props.navigation.toggleDrawer();
                props?.props.navigation.navigateDeprecated('Profile', {
                  fromScreen: props?.navigateFromScreen,
                });
              }}
            >
              {userDP == null || userDP == '' ? (
                <View style={{ alignContent: 'center' }}><DefaultUser height={36} width={36} />
                </View>
              ) : (
                <Image source={{ uri: userDP }} style={styles.image} />
              )}
              {commonAppState?.isPremiumUser && commonAppState.isPremiumFlowEnabled && 
                <View style={[styles.premium]}>
                  <PremiumBadge height={14} width={14} />
              </View>
              }
              <View style={[styles.name, commonAppState?.isPremiumFlowEnabled && commonAppState?.isPremiumUser && {marginLeft: 9}]}>
                <View style={{ flexDirection: 'row' }}><Text
                  style={[styles.drawerText, { fontSize: 14 }]}
                >
                  {userName}
                </Text>
                  {
                    (
                      checkBadge(commonAppState?.userRole)) && (
                      <View style={{ padding: 1, paddingLeft: 6 }}>
                        {getUserBadgeIcon(commonAppState?.userRole)}
                      </View>
                    )
                  }
                </View>
                <Text
                  style={[styles.drawerText, styles.userTag]}
                >
                  @{userTag}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rankView}
              onPress={() => {
                  mixpanel.track('Nav_LeaderboardPage', {
                    screen: 'LeftDrawer',
                    source: 'leftMenu',
                    purpose: 'Navigate to LeaderboardPage'
                  });
                  props?.props.navigation.navigateDeprecated(props?.navigateToScreen, {
                    screen: 'LeaderboardEntryScreen',
                    params: { fromScreen: props?.navigateFromScreen },
                  })
                }
              }
            >
              <View style={CommonStyles.flexDirRow}>
                <View style={{ justifyContent: 'center' }}>
                  <Leaderboard />
                </View>
                <Text style={styles.leaderboard}>
                  {StringConstants.LEADERBOARD}
                </Text>
              </View>
              <Text style={styles.userRank}>
                #{userRank}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={menu}
            numColumns={1}
            scrollEnabled={false}
            contentContainerStyle={styles.itemsList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <MenuItem
                  key={item.key}
                  item={item}
                  bgColor={'rgba(224, 224, 224, 0.01)'}
                  onArrowClick={arrowClicked}
                ></MenuItem>
              );
            }}
          />
        </DrawerContentScrollView>

      </View>
      <View style={styles.settings}>
        {commonAppState.isPremiumFlowEnabled && <TouchableOpacity activeOpacity={0.9} style={styles.upgradeToPremium} onPress={() => goToPremiumScreen()}>
            <BorderGradient isPremiumUser={commonAppState?.isPremiumUser} height={48} width={(SCREEN_WIDTH * 0.77) - 24} radius={8} text={StringConstants.UPGRADE_TO_PREMIUM} />
          </TouchableOpacity>
        }
        <MenuItem
          key={"7"}
          item={{
            key: "7",
            text: "Settings",
            baseScreen: "SettingsScreen",
            screen: "SettingsMainScreen",
            icon: "Settings",
            type: "drawer"
          }}
          bgColor={AppColors.THEME_BG_COLOR}
          onArrowClick={arrowClicked}
        ></MenuItem>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#121212',
    marginTop: 0,
  },
  // logo: {
  //   marginLeft: 12,
  //   marginTop: 8
  // },
  settings: {
    position: 'absolute',
    bottom: 34,
    width: '100%'
  },
  premium: {
    position: 'absolute',
    bottom: 2,
    left: 25.5
  },
  rankView: {
    paddingHorizontal: 15,
    backgroundColor: 'rgba(233, 198, 56, 0.09)',
    height: 31,
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.6,
    borderColor: AppColors.LIGHT_YELLOW
  },
  name: {
    justifyContent: 'center',
    marginLeft: 8
  },
  container: {
    flex: 1,
  },
  itemsList: {
    borderTopWidth: 0,
    borderTopColor: AppColors.GREY_VARIANT1
  },
  logoContainer: {
    justifyContent: 'center',
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 14,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderColor: AppColors.GREY,
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderWidth: 0.4,
    borderRadius: 4
  },
  upgradeToPremium: {
    alignItems: 'center',
    marginBottom: 10
  },
  userRank: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 15,
    color: AppColors.LIGHT_YELLOW
  },
  profileCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 36,
    width: 36,
    borderRadius: 36
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 42,
    padding: 12,
    marginBottom: 10,
    paddingLeft: 28,
    alignItems: 'center',
  },
  userTag: {
    fontSize: 10,
    color: AppColors.GREY_VARIANT9
  },
  drawerText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  linkText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    color: '#E9C638',
  },
  heading: {
    fontSize: 20,
    fontFamily: 'DMSans-Bold',
    color: '#EEEEEE',
    marginLeft: 16,
    marginBottom: 10,
  },
  leaderboard: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT10,
    alignSelf: 'center',
    marginLeft: 16
  }
});
