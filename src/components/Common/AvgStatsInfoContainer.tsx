import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from "react-native";
import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import { LOG } from "config";
import FastImage from "react-native-fast-image";
import { BarChart } from 'react-native-gifted-charts';
import SeenMoviesIcon from 'svg/seen_movies.svg';
import ListsIcon from 'svg/lists.svg';
import ReviewsIcon from 'svg/reviews.svg';
import FollowersIcon from 'svg/followers.svg';

export type AvgStatsInfoProps = {
  title: any,
  data: any,
  icon: any
};

export const AvgStatsInfoContainer: FC<AvgStatsInfoProps> = ({
    title,
    data,
    icon
}) => {


  return (
    <View style={[CommonStyles.rowSpaceBetween]}>
      <View style={styles.avgWatchtime}>
        <Text style={styles.avgTimeStats}>{data}</Text>
        <View style={[CommonStyles.rowAlignCenter, {marginTop: 8}]}>
          <View style={styles.iconContainer}>
            {icon}
          </View>
          <Text style={styles.avgStatsLabel}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avgWatchtime: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    padding: 11,
    borderRadius: 8,
    width: SCREEN_WIDTH * 0.44
  },
  avgTimeStats: {
    color: AppColors.GREY_VARIANT14,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 21,
  },
  iconContainer: {
    backgroundColor: AppColors.GREY_VARIANT6,
    height: scaledWidth(32),
    width: scaledWidth(32),
    borderRadius: scaledWidth(32),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avgStatsLabel: {
    color: AppColors.GREY_VARIANT4,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 12,
    marginLeft: 8,
    maxWidth: SCREEN_WIDTH * 0.27,
  }
});