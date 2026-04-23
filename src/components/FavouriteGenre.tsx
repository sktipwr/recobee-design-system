import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import Bg from 'svg/horror_bg.svg';
import LinearGradient from "react-native-linear-gradient";

export type FavouriteGenreProps = {
  analyticsData: any,
};

export const FavouriteGenre: FC<FavouriteGenreProps> = ({
  analyticsData,
}) => {


  // show count for reviews & movies
  const countInfo = (title: any, count: any) => {
    return (
      <View style={[CommonStyles.rowAlignCenter, ]}>
        <Text style={[styles.count, ]}>{title}</Text>
        <Text style={[styles.count, styles.stats]}>{' ' + count}</Text>
      </View>
    )
  }
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{StringConstants.MOST_LIKED_GENRE}</Text>
      {/* TODO: in future will use genre wise poster */}
      {/* <Bg height={(160)} width={'100%'} /> */}
        <LinearGradient colors={['#00000000', AppColors.BLACK]} style={styles.darkOverlay}>
          <View style={styles.container}>
            <Text style={styles.genre}>{analyticsData?.favGenre?.genre ?? 'test'}</Text>
            <View style={[CommonStyles.rowAlignCenter, {justifyContent: 'center'}]}>
              {countInfo(StringConstants.REVIEWS_WRITE_COUNT, analyticsData?.favGenre?.reviewCount)}
              <View style={{width: 8}} />
              {countInfo(StringConstants.MOVIES_WATCH_COUNT, analyticsData?.favGenre?.seenCount)}
            </View>
          </View>
        </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: AppColors.WHITE_VARIANT3,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 16,
    marginBottom: 12,
    marginTop: 20
  },
  mainContainer: {
    height:160, 
    marginBottom: 54
  },
  darkOverlay: {
    height: (220),
    width: '100%',
    position: 'absolute',
    zIndex: 5
  },
  container: {
    width: '100%',
    position: 'absolute',
    top: (127),
    alignItems: 'center',
    zIndex: 6
  },
  genre: {
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 20,
    marginBottom: 12
  },
  count: {
    color: AppColors.WHITE_VARIANT3,
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 10,
  },
  stats: {
    fontSize: 12, 
    fontFamily: FontFamily.DMSansBold
  }
});