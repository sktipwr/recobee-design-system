import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import SeenMoviesIcon from 'svg/seen_movies.svg';
import ListsIcon from 'svg/lists.svg';
import ReviewsIcon from 'svg/reviews.svg';
import FollowersIcon from 'svg/followers.svg';
import Info from 'svg/grey_info';

export type ChartInfoTitleProps = {
  title: any,
  data: any,
  paddingHorizontal: any
};

export const ChartInfoTitle: FC<ChartInfoTitleProps> = ({
    title,
    data,
    paddingHorizontal = 0
}) => {

  const getIcon = (type) => {
    let value = <View />;
    if (type == 'Reviews') {
      value = <ReviewsIcon />;
    } else if (type == 'Lists') {
      value = <ListsIcon />;
    } else if (type == 'Movie Seen') {
      value = <SeenMoviesIcon />;
    } else if (type == 'Followers') {
      value = <FollowersIcon />;
    } else {
      value = <Info height={20} width={20} />;
    }
    
    return value;
  };

  return (
    <View style={[CommonStyles.rowSpaceBetween, { marginBottom: 16, paddingHorizontal: paddingHorizontal }]}>
        <View style={[CommonStyles.rowAlignCenter]}>
          <Text style={[styles.barTitle, { marginRight: 8 }]}>
            {title}
          </Text>
          {/* TODO: not using for now, may use in future */}
          {/* {getIcon(title)} */}
        </View>
        <View style={[CommonStyles.rowAlignBottom]}>
          <Text style={[styles.barTitle, { marginLeft: 8 }]}>
            {data}
          </Text>
          {/* TODO: may need in future */}
          {/* <View style={[CommonStyles.rowAlignCenter]}>
            <Text style={[styles.fluctuation]}>
                {'5%'}
            </Text>
            <ArrowFilled height={5} width={8} />
          </View> */}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  barTitle: {
    color: AppColors.WHITE_VARIANT3,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 16,
  },
});