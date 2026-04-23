//Returns a flat list of Clickable items passed in an array

import React, { useContext } from 'react';
import { AppConsumer } from 'context';

import {
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DefaultUser from 'svg/user.svg';
import CommonStyles from 'styles';
import FastImage from 'react-native-fast-image';
import { getUserBadgeIcon } from 'utils/HelperFunctions';
import AppColors from 'utils/Colors';
import PremiumBadge from 'svg/premium_badge_icon';
import { CommonAppContext } from '../../stores/common/commonAppContext';
import { getCastImageById } from '../../utils/utilFunctions';
const trunCateName = (name,limit) =>{
  return name && name.length > limit? name.substring(0,limit) + "...": name;
}
export default function UserProfile({
  item,
  height = 68,
  width = 68,
  containerHeight = null,
  containerWidth = 126,
  radius = 30,
  zIndex = null,
  removeClicked,
  borderColor = AppColors.TRANSPARENT,
  borderWidth = 0,
  followClicked,
  isTrending = false,
  isSearch = false,
  isGrid = false,
  index,
  sectionType,
  type,
  bgColor = AppColors.BLACK_VARIANT3,
  hideButtons = false
}) {
  const [isFollowing, setIsFollowing] = React.useState(item.following);
  const { commonAppState, commonDispatch } = useContext(CommonAppContext);

  if(type == 'cast'){
    if (item?.tmdbprofilepath && item?.tmdbprofilepath != null) {
      item.image = 'https://image.tmdb.org/t/p/w780/' + item?.tmdbprofilepath;
    }
    else if(item.id && item.id != null){
            item.image = getCastImageById(item.id);
          }
  }
  const displayName = trunCateName(item.fname || item.name,8)
  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={{ flexDirection: 'row' }}>
          {isTrending && (
            <View style={[{ minWidth: 20 }]}>
              <Text style={styles.trendingText}>{index}</Text>
            </View>
          )}
          <View
            style={[
              styles.container,
              zIndex != null && {zIndex: zIndex},
              {
                backgroundColor: bgColor,
                width: containerWidth,
                marginBottom: isGrid ? 16 : 0,
              },
              containerHeight != null && {height: containerHeight}
            ]}
          >
            <TouchableOpacity
              onPress={() => removeClicked(item, sectionType)}
              style={{
                alignItems: 'center',
                
              }}
            >
              <View style={[styles.newGrpContainer]}>
                {item?.photo != null && item?.photo != '' ? (
                  <FastImage
                    style={[
                      styles.dp,
                      { height: height, width: width, borderRadius: radius, borderWidth: borderWidth, borderColor: borderColor },
                    ]}
                    source={{ uri: item.photo }}
                  />
                ) : item?.image != null && item?.image != undefined ? (
                  <FastImage
                    style={[
                      styles.dp,
                      { height: height, width: width, borderRadius: radius, borderWidth: borderWidth, borderColor: borderColor },
                    ]}
                    source={{ uri: item?.image }}
                  />
                ) : (
                  <View style={[{ height: height, width: width, borderRadius: radius, borderWidth: borderWidth, borderColor: borderColor }, styles.userProfile]}>
                    <DefaultUser height={height - borderWidth} width={width - borderWidth} />
                  </View>
                )}
                {item?.ispremium && commonAppState.isPremiumFlowEnabled &&
                  (
                  type == 'home' ?
                    <View style={[styles.homePremium]}>
                      <PremiumBadge height={17} width={17} />
                    </View>
                  :
                    <View style={[styles.premium]}>
                      <PremiumBadge height={13} width={13} />
                    </View>
                  )
                }
              </View>
              <View style={{ marginBottom: 8, marginTop: 4 }}>
                <View style={CommonStyles.flexRowAlignCenter}>
                  <Text
                    style={[CommonStyles.txtBodyLarge, CommonStyles.txtCentre, styles.nameRow]}
                    numberOfLines={1}
                  >
                    {displayName}
                  </Text>
                  {getUserBadgeIcon(item?.userrole, 13)}
                </View>
                <Text
                  numberOfLines={1}
                  style={[
                    CommonStyles.txtBodyMedium,
                    { color: '#9E9E9E' },
                    type == 'cast' ? CommonStyles.txtCentre : null,
                  ]}
                >
                  {type == 'cast' ? item?.profession : `@${item.usertag}`}
                </Text>
              </View>
              {!isSearch && type != 'cast' && (type == 'home' || type == 'user') && !hideButtons && (
                <TouchableOpacity
                  style={[
                    styles.btnContainer,
                    { width: item.following ? 80 : 64 },
                  ]}
                  onPress={() => {
                    setIsFollowing(!isFollowing);
                    followClicked(item, sectionType);
                  }}
                >
                  {isFollowing ? (
                    <Text style={[styles.followingButtonText, {marginTop: 3}]}>Following</Text>
                  ) : (
                    <View style={styles.followContainer}>
                      <Text style={CommonStyles.txtHeaderSmallLink}>Follow</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 3,
    marginRight: 16,
    padding: 12,
    justifyContent: 'center',
  },
  userProfile: {
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: AppColors.THEME_BG_COLOR
  },
  premium: {
    position: 'absolute',
    bottom: 3,
    right: -3
  },
  homePremium: {
    position: 'absolute',
    bottom: 4,
    right: -1.5
  },
  followContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: AppColors.GREY_VARIANT6, 
    width: 80, 
    paddingVertical: 5, 
    borderRadius: 30
  },
  txtHeader: {
    fontSize: 12,
    fontFamily: 'DMSans-Bold',
  },
  nameRow: {
    marginRight: 3, 
  },
  trendingText: {
    color: '#121212',
    textAlign: 'center',
    textShadowColor: '#E9C638',
    textShadowRadius: 2,
    fontFamily: 'DMSans',
    lineHeight: 36,
    fontSize: 36,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  newGrpContainer: {
    alignItems: 'center',
  },
  dp: {
    borderRadius: 30,
  },
  followingButtonText: {
    color: '#FFFFFF',
    opacity: 0.6,
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
  },
});
