import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { AppConsumer } from 'context';
import { SCREEN_WIDTH, scaledHeight, scaledWidth } from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import DefaultUser from 'svg/user';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import { checkBadge, getUserBadgeIcon } from 'utils/HelperFunctions';
import VectorLeft from 'assets/images/icon/vector_left';
import VectorRight from 'assets/images/icon/vector_right';
import BadgeLottie from 'data/lotties/congratulationsBadge.json';
import LottieView from 'lottie-react-native';
import RenderBadgeImage from 'components/Common/RenderBadgeImage';

export default function BadgeShareCard({
  item,
  badgeType,
  name,
  photo,
  seenCount,
  reviewCount,
}) {

  return (
    <View style={[styles.container]}>
      <View style={styles.lottieContainer}>
        <LottieView autoPlay style={styles.lottie} source={BadgeLottie} />
      </View>

      <Image
        source={require('../../../assets/yellowRay.png')}
        style={[styles.backGroundImage]}
      />
      <View style={[CommonStyles.rowSpaceBetween, styles.header]}>
        <View style={[CommonStyles.rowAlignCenter,styles.userPhotoContainer]}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <DefaultUser height={32} width={32} />
          )}
          <Text style={styles.userName}>{name}</Text>
        </View>
        <Image
          source={require('../../../assets/Logo_For_Dark_Bg.png')}
          style={styles.logo}
        ></Image>
      </View>
      <View style={styles.imageContainer}>
        <RenderBadgeImage
          condition={
            badgeType === StringConstants.BADGE_TYPE_MOVIE ||
            badgeType === StringConstants.BADGE_TYPE_MOVIE_CONRATULATIONS
          }
          tier={item.name}
          width={188.14}
          height={180}
        />
      </View>
      <View
        style={[CommonStyles.flexRowAlignCenter, styles.badgeNameContainer]}
      >
        <VectorLeft />
        <Text style={styles.badgeName}>{item.name}</Text>
        <VectorRight />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {StringConstants.MOVIE_SEEN}{' '}
          <Text style={styles.number}>{seenCount}</Text>
        </Text>
        <Text style={styles.text}>
          {StringConstants.REVIEWED}{' '}
          <Text style={styles.number}>{reviewCount}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeNameContainer: {
    marginTop: 30,
  },
  container: {
    backgroundColor: AppColors.GREY_VARIANT25,
    paddingTop: 20,
    borderRadius: 20,
    marginTop: scaledHeight(30),
    width: SCREEN_WIDTH - 40,
    marginHorizontal: 16,
    paddingBottom: scaledHeight(35),
  },
  number: {
    color: AppColors.LIGHT_YELLOW,
    fontFamily: FontFamily.DMSansBold,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaledHeight(35),
  },
  text: {
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansBold,
  },
  photo: {
    width: 32,
    height: 32,
    borderRadius: 50,
    borderWidth: 0.1,
    borderColor: AppColors.LIGHT_YELLOW_VARIANT6,
  },
  backGroundImage: {
    width: '100%',
    position: 'absolute',
  },
  header: {
    marginHorizontal: 20,
  },
  userName: {
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansRegular,
  },
  lottieContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    top: -50,
  },
  lottie: {
    height: 500,
    width: 500,
  },
  userPhotoContainer: {
    gap: 10,
  },
  logo: {
    width: scaledWidth(85),
    height: scaledHeight(25),
  },
  imageContainer: { marginTop: 40, alignItems: 'center' },
  badgeName: {
    color: AppColors.WHITE,
    fontSize: 32,
    marginHorizontal: 10,
  },
});
