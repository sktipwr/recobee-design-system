

import { SCREEN_WIDTH, scaledHeight, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import { CLOUD_BASEURL } from "utils/HelperFunctions";

import React, { useEffect, useRef, useState } from 'react';
import {  View, StyleSheet, Image, Dimensions, TouchableOpacity,   Image as RNImage, Text, Platform } from 'react-native';
import FastImage from "react-native-fast-image";
import { apiPosterImage, getMoviePoster } from "utils/utilFunctions";
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";

export const PosterAndTitleCard: React.FC = ({ item, index }) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  return (
    <>
    {!imageLoadError || apiPosterImage(item) != null ? (
        <>
        <View style={[CommonStyles.flexDirRow]}>
            <View style={[styles.minWidth, Platform.OS == 'ios' && {zIndex: 2}]}>
                <Text style={styles.trendingText}>{index + 1}</Text>
            </View>
            <FastImage
                style={[
                  styles.posterImage
                ]}
                source={{ uri: !imageLoadError ? getMoviePoster(item?.movieid || item?.id || item?.movieId) : apiPosterImage(item) }}
                resizeMode={FastImage.resizeMode.cover}
                onError={() => setImageLoadError(true)}
                defaultSource={require('assets/defaultMovie.png')}
            />
          </View>
          
        </>
      ) : (
        <View style={[CommonStyles.flexDirRow]}>
            <View style={[styles.minWidth]}>
                <Text style={styles.trendingText}>{index + 1}</Text>
            </View>
            <View
                style={[
                styles.titleView
            ]}
            >
                <Text style={styles.txtImage}>{item?.title ?? title}</Text>
            </View>
        </View>
      )}
    </>
  );
//};
}

const styles = StyleSheet.create({
  minWidth: { minWidth: 17 },
  title: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE_VARIANT3
  },
  trendingText: {
    color: AppColors.GREY_VARIANT2,
    textShadowColor: AppColors.LIGHT_YELLOW,
    textShadowRadius: 5,
    textShadowOffset: { width: 0, height: 2 },
    fontFamily: 'DMSans',
    fontSize: 36,
    lineHeight: 36,
    marginRight: -8,
    zIndex: 5
  },
  imageContainer: {
    // flex: 1,
    borderRadius: 4,
    marginRight: 9
  },
  movieLogo: {
    width: 0.38055 * SCREEN_WIDTH,
    height: 0.511 * SCREEN_WIDTH,
    justifyContent: 'flex-end',
    borderRadius: 4,
  },
  txtImage: {
    fontSize: 14,
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE
  },
  posterImage: {
    height: 118,
    width: 76,
    borderRadius: 4
  },
  titleView: {
    backgroundColor: AppColors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    height: 118,
    width: 76,
    borderRadius: 4
  },
});
