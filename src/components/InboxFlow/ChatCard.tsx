import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppColors from '../../utils/Colors';
import UserIcon from 'svg/user.svg';
import Tick from 'svg/checked_circle.svg';
import Cross from 'svg/cross_yellow.svg'
import FamilyFriendly from 'svg/group.svg';

import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';

const InboxCard = ({
  unread = false,
  isCircle = false,
  isTick = false,
  isCross = false,
  userImage = null,
  userName = 'Username',
  onPress = () => { },
  chattype = 'personal',
  messagePreview = '',
  unreadCount = 0,
  onCross = () => { },

}) => {
  return (
    <TouchableOpacity
      style={styles.inboxCard}
      onPress={onPress}
    >
      {userImage &&
        userImage.trim() !== '' ? (
        <FastImage
          source={{ uri: userImage }}
          style={styles.userImage}
          resizeMode="cover"
        />
      ) : (
        chattype === 'personal' ? (
          <UserIcon width={40} height={40} />
        ) : (
          <FamilyFriendly width={30} height={30} />
        )
      )}
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{userName}</Text>
        {(unreadCount > 0) ? (<Text style={styles.unread}>{` ${unreadCount} ${StringConstants.UNREAD_MESSAGES}`}</Text>) :
          ((messagePreview != '') &&
            <Text style={styles.previewText} numberOfLines={2} ellipsizeMode="tail">{messagePreview}</Text>)}
      </View>
      {unread && (
        <View style={styles.unreadIcon}></View>
      )}
      {isCircle && (
        <View style={styles.circleIcon}></View>
      )}
      {isTick && (
        <Tick width={20} height={20} style={styles.icon} />)}
      {isCross && (
        <TouchableOpacity onPress={onCross}>
        <Cross width={20} height={20} style={styles.icon} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  unreadIcon: {
    backgroundColor: AppColors.LIGHT_YELLOW,
    borderRadius: 5,
    height: 10,
    width: 10,
    marginLeft: 8
  },
  circleIcon: {
    borderColor: AppColors.WHITE,
    borderWidth: 1,
    borderRadius: 8,
    height: 16,
    width: 16,
    marginLeft: 8
  },
  unread: {
    color: AppColors.WHITE,
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
  },
  inboxCard: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    padding: 10,
    margin: 16,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.GREY,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    color: AppColors.WHITE_VARIANT3,
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    marginBottom: 4,
  },
  previewText: {
    color: AppColors.GREY,
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
  },
  icon: {
    marginLeft: 8,
  },
});

export default InboxCard;
