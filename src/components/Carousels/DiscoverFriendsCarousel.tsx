

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { AppConsumer } from "context";
import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import FastImage from "react-native-fast-image";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import DefaultUser from 'svg/user';
import DiscoverFriendsBg from 'svg/discover_friends_bg.svg';
import Carousel from "react-native-reanimated-carousel";

export const DiscoverFriendsCarousel: React.FC = ({ data, navigation, onUserClick, url, sectionType, onListClick }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => onListClick(null, data, null, url, sectionType)}>
        {item.image ? (
          <FastImage source={{ uri: item.image }} style={styles.profileImage} />
        ) : (
          <DefaultUser width={scaledWidth(56)} height={scaledWidth(56)} />
          )}
      </TouchableOpacity>
    );
  }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={() => onListClick(null, data, null, url, sectionType)}>
            <View style={styles.background}>
              <DiscoverFriendsBg height={155} width={SCREEN_WIDTH - 32} />
            </View>
            <Text style={styles.movieMatch}>
              {StringConstants.FIND_YOUR_MOVIE_MATCH}
            </Text>
            <Text style={styles.connectWithUsers}>
              {StringConstants.CONNECT_WITH_SIMILAR_TASTE_USERS}
            </Text>
              <Carousel
                loop
                enabled 
                style={styles.carousel}
                autoPlay={Array.isArray(data) && data.length > 1}
                height={scaledWidth(70)}
                autoPlayInterval={1700}
                width={scaledWidth(40)}
                mode="parallax"
                modeConfig={{
                  parallaxScrollingScale: 0.92,
                  parallaxScrollingOffset: scaledWidth(92),
                  parallaxAdjacentItemScale: 0.6,
                }}
                data={data}
                pagingEnabled={true}
                onSnapToItem={index => setActiveIndex(index)}
                renderItem={renderItem}
              />
              <Text
                style={[ styles.name]}
                numberOfLines={1}
                onPress={() => onListClick(null, data, null, url, sectionType)}
              >
                {data[activeIndex]?.name || data[activeIndex]?.fname}
              </Text>
        </TouchableOpacity>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
    borderRadius: 4,
    width: SCREEN_WIDTH - 32,
    height: 160,
  },
  carousel: { 
    width: SCREEN_WIDTH - 32, 
    height: scaledWidth(70), 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 12
  },
  movieMatch: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREY_VARIANT4,
    textAlign: 'center',
    marginTop: 12
  },
  name: {
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE,
    textAlign: 'center',
    fontSize: 10,
    marginTop: -10
  },
  background: {
    height: 160,
    width: SCREEN_WIDTH - 32,
    position: 'absolute',
    top: 0, 
    left: 0,
    right:0,
    bottom: 0,
  },
  connectWithUsers: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    textAlign: 'center',
    color: AppColors.GREY_VARIANT4
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContentContainer: {
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profileImage: {
    height: scaledWidth(56),
    width: scaledWidth(56),
    borderRadius: scaledWidth(56), 
  },
});
