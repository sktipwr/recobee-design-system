import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from "react-native";
import { SCREEN_WIDTH } from "utils/Dimensions";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import { LOG } from "config";
import FastImage from "react-native-fast-image";

export type ActivityMovieMetaInfoProps = {
  movieImage: any,
  title: any,
  releaseDate: any,
  onMovieClick: Function,
};

export const ActivityMovieMetaInfo: FC<ActivityMovieMetaInfoProps> = ({
    movieImage,
    title,
    releaseDate,
    onMovieClick
}) => {
  return (
    <Pressable style={CommonStyles.rowAlignCenter} onPress={() => onMovieClick()}>
      <View style={[styles.movieMeta, CommonStyles.rowAlignCenter]}>
          {movieImage && movieImage != '' ? (
            <FastImage
                style={styles.movieLogo}
                source={{ uri: movieImage }}
                resizeMode={FastImage.resizeMode.cover}
            />
            ) : (
            <Image
                style={styles.movieLogo}
                source={require("assets/defaultMovie.png")}
            ></Image>
          )}
          <View style={CommonStyles.rowAlignCenter}>
            <View style={styles.titleWrapper}>
              <Text
                  numberOfLines={1}
                  style={[
                      styles.movieTitle,
                  ]}
                  >
                  {title}
              </Text>
            </View>
            {releaseDate != '' && releaseDate && 
              <Text style={styles.movieTitle}>{" (" + releaseDate + ")"}</Text>
            }
          </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  movieMeta: {
    marginVertical: 8,
  },
  movieTitle: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  titleWrapper: {maxWidth: SCREEN_WIDTH * 0.63},
  movieLogo: {
    height: 23,
    width: 16,
    borderRadius: 3,
    marginRight: 8
  },
});