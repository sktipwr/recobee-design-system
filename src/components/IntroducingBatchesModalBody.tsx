import React, {  } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import StringConstants from 'utils/StringConstants';
import CommonStyles from '../../Styles';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import LevelUp from 'assets/images/icon/badge_levelup';
import Review from 'assets/images/icon/badge_review';
import { RoundedBtn } from './Common/RoundedBtn';
import { SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';

export const IntroducingBadgesModalBody: React.FC = ({ goToBadgeScreen }) => {
  return (
    <View style={[styles.container]}>
      <View style={CommonStyles.alignCenter}>
        <Image source={require('../../assets/introducingBadges.png')} />
        <Text style={styles.introduction}>{StringConstants.INTRODUCING}</Text>
        <Image source={require('../../assets/badges.png')} />
        <View style={[CommonStyles.rowJustifyCenter, styles.textContainer]}>
          <LevelUp />
          <View >
            <Text style={styles.tagLine}>
              {StringConstants.LEVEL_UP_YOUR_MOVIE_JOURNEY}
            </Text>
            <Text style={styles.subText}>
              {StringConstants.EARN_BADGES_AS_YOU_EXPLORE}
            </Text>
          </View>
        </View>

        <View style={[CommonStyles.rowJustifyCenter, styles.textContainer]}>
          <Review />
          <View >
            <Text style={styles.tagLine}>
              {StringConstants.YOUR_REVIEWS_YOUR_LEGACY}
            </Text>
            <Text style={styles.subText}>
              {StringConstants.COLLECT_BADGES_AS_YOU_RATE_AND_REVIEW}
            </Text>
          </View>
        </View>
      </View>
      <RoundedBtn
        text={StringConstants.SEE_ALL_BADGES}
        textColor={AppColors.BLACK}
        onClick={() => goToBadgeScreen()}
        borderRadius={scaledWidth(42)}
        borderColor={AppColors.LIGHT_YELLOW}
        width={SCREEN_WIDTH - 64}
        bgColor={AppColors.LIGHT_YELLOW}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  introduction: {
    color: AppColors.GREY_VARIANT4,
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 16,
    marginTop: 30,
  },
  container: {
    alignItems: 'center',
    width: '100%',
    marginTop: 18,
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 36
  },
  textContainer: {
    gap: 10,
    marginTop: 40,
    marginHorizontal:scaledWidth(70)
  },
  tagLine: {
    color: AppColors.WHITE_VARIANT,
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
  },
  subText: {
    color: AppColors.GREY_VARIANT4,
    fontSize: 12,
    marginTop: 5,
    fontFamily: FontFamily.DMSansRegular,
  },
});
