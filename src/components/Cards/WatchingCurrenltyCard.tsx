

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Platform,
} from "react-native";
import { SCREEN_WIDTH, scaledHeight, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import FastImage from "react-native-fast-image";
import FontFamily from "utils/FontFamily";
import LinearGradient from "react-native-linear-gradient";
import CommonStyles from "../../../Styles";
import UserProfile from "./UserProfile";
import StarFilled from 'svg/star-main';
import { POSTER_IMAGE_BASEURL } from "utils/HelperFunctions";
import mixpanel from 'mixpanel';
import { apiPosterImage, getMoviePoster } from "utils/utilFunctions";

export const WatchingCurrentlyCard: React.FC = ({ data, navigation, isOTT, onUserClick, onMovieClick, url, sectionType, onListClick }) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  const getTitle = (item) => {
    let title = item?.title ?? '';
    if (item.title && item.title != '' && item.title.length > 16) {
      title = item.title.substring(0, 15) + '..';
    }
    return title;
  }

  const getURI = (item) => {
    let uri = null;
    if (item.posterimageurl && item.posterimageurl != null) {
      uri = item.posterimageurl;
    } else if (item.posterimage && item.posterimage != null) {
      uri = POSTER_IMAGE_BASEURL + item.posterimage;
    } else if (item.movieimage && item.movieimage != null){
      uri =  item.movieimage;
    }
    return uri;
  }

  const addEvent = () => {
    mixpanel.track('WatchingNow', {
      screen: 'HomeTab',
      purpose: 'WatchingNowRailMovieClicked',
      source: 'HomeTab'
    });
  }

  return (
        <View style={styles.container}>
          <FlatList
            horizontal
            data={data}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item?.movieId ?? item?.id}
            renderItem={({ item, index }) => {
              let uri = getURI(item);
              let title = getTitle(item)
              return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => 
                  {
                    addEvent()
                    onMovieClick(
                      item.movieid || item.id,
                      item,
                      data,
                      false,
                      sectionType,
                      'WatchingCurrentlyCard'
                    )}}>
                  <LinearGradient
                    colors={['#00000000', AppColors.BLACK]} 
                    style={[styles.darkOverlay, Platform.OS == 'android' && {zIndex: 1}]}>
                  </LinearGradient>
                  <View>
                    <View>
                        { 
                          !imageLoadError || apiPosterImage(item) != null ?
                            <FastImage
                              style={[styles.movieLogo]}
                              source={{ uri: !imageLoadError ? getMoviePoster(item?.id || item?.movieid || item?.movieId) : apiPosterImage(item) }}
                              resizeMode={FastImage.resizeMode.cover}
                              onError={() => setImageLoadError(true)}
                              defaultSource={require('assets/defaultMovie.png')}
                            />
                          : 
                            <View
                              style={[
                                styles.movieLogo,
                                styles.titleView
                              ]}
                            >
                              <Text style={styles.txtImage}>{title}</Text>
                            </View>
                        }
                        <View
                          style={[
                            CommonStyles.rowAlignCenter,
                            styles.rating]}
                        >
                          {!item.arrating ? null : (
                            <StarFilled width={18} height={18} />
                          )}
                          {!item.arrating ? null : (
                            <Text style={styles.ratingValue}>
                              {item.arrating}
                            </Text>
                          )}
                        </View>
                    </View>
                    <View style={styles.topGap}>
                      <UserProfile
                        item={item}
                        bgColor={AppColors.TRANSPARENT}
                        index={index + 1}
                        removeClicked={onUserClick}
                        sectionType={sectionType}
                        zIndex={4}
                        hideButtons={true}
                        radius={scaledWidth(52)}
                        containerWidth={scaledWidth(102)}
                        borderColor={AppColors.GREY_VARIANT2}
                        borderWidth={5}
                        height={scaledWidth(52)}
                        width={scaledWidth(52)}
                        type='home'
                      />
                    </View>
                </View>
              </TouchableOpacity>
              );
            }}
          />
    </View>
     
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 32,
    height: scaledWidth(251),
  },
  topGap: {
    marginTop: - scaledWidth(40)
  },
  titleView: {
    backgroundColor: AppColors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  ratingValue: {
    color: AppColors.WHITE_VARIANT3,
    marginTop: 0,
    marginLeft: 2,
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
  },
  rating: {
    paddingTop: 5,
    position: 'absolute',
    right: 22
  },
  movieLogo: {
    height: scaledWidth(185),
    width: scaledWidth(102),
    borderRadius: 4
  },
  cover: {
    width: SCREEN_WIDTH - 32,
    height: scaledHeight(153),
    borderRadius: 10, 
    resizeMode: 'stretch'
  },
  movieImage: {
    height: scaledHeight(153),
    width: SCREEN_WIDTH * 0.295,
    borderRadius: 10,
    position: 'absolute'
  },
  darkOverlay: {
    borderRadius: 10, 
    position: 'absolute',
    height: scaledWidth(185),
    width: scaledWidth(102),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  recoText: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 10,
    color: AppColors.WHITE_VARIANT3
  },
  overlayItems: {
    position: 'absolute', 
    left: 10, 
    right: 10,
    bottom: 16,
    alignItems: 'center'
  },
  activityBased: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
    color: AppColors.WHITE_VARIANT3
  },
  txtImage: {
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'DMSans-Bold',
    color: '#FFFFFF',
  },
});
