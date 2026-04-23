import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import { getMovieBackdropImage, apiBackdropImage, getMovieBackdropImageJpg } from 'utils/utilFunctions';
import PlayIcon from 'icons/PlayIcon';
import Heart from 'icons/Heart';
import StringConstants from 'utils/StringConstants';

interface MoviePosterHeaderProps {
  item: any;
  onPlayPress?: () => void;
  onLikePress?: () => void;
  isLiked?: boolean | null;
  showLikeButton?: boolean;
  metadata?: string;
  genres?: string[];
  gradientColors?: string[];
  onGenrePress?: (genre: string) => void;
  releaseDate?: string;
}

export const MoviePosterHeader: React.FC<MoviePosterHeaderProps> = ({
  item,
  onPlayPress,
  onLikePress,
  isLiked,
  showLikeButton = true,
  metadata,
  genres = [],
  gradientColors = ['transparent', AppColors.GREY_VARIANT2 + 'CC', AppColors.GREY_VARIANT2],
  onGenrePress,
  releaseDate,
}) => {
  const [errorCount, setErrorCount] = useState(0);

  const formatReleaseDate = (date: string) => {
    if (!date) return '';
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${StringConstants.RELEASING_ON} ${month} ${day}, ${year}`;
  };

  return (
    <View style={styles.posterContainer}>
      {errorCount < 3 && (
        errorCount === 0 && getMovieBackdropImage(item?.id || item?.movieid) ||
        errorCount === 1 && getMovieBackdropImageJpg(item?.id || item?.movieid) ||
        errorCount === 2 && apiBackdropImage(item)
      ) ? (
        <FastImage
          style={styles.posterImage}
          source={{
            uri: errorCount === 0
              ? getMovieBackdropImage(item?.id || item?.movieid)
              : errorCount === 1
              ? getMovieBackdropImageJpg(item?.id || item?.movieid)
              : apiBackdropImage(item)
          }}
          resizeMode={FastImage.resizeMode.cover}
          onError={() => setErrorCount(prev => prev + 1)}
        />
      ) : (
        <Image
          style={styles.posterImage}
          source={require('assets/defaultMovie.png')}
          resizeMode='cover'
        />
      )}
      <LinearGradient colors={gradientColors} style={styles.gradient} />
      {item?.trailerkeytmdb && onPlayPress && (
        <TouchableOpacity style={styles.playButton} onPress={onPlayPress}>
          <View style={styles.playButtonCircle}>
            <PlayIcon width={28} height={28} color={AppColors.BLACK} />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.overlayContent}>
        {releaseDate && (
          <View style={styles.releaseDateContainer}>
            <Text style={styles.releaseDate}>{formatReleaseDate(releaseDate)}</Text>
          </View>
        )}
        <View style={styles.titleInnerContainer}>
          {item?.title && item?.title != '' ? (
            <View style={styles.metaInfo}>
              <Text style={styles.title}>{item?.title}</Text>
              {metadata && <Text style={styles.txtBody}>{metadata}</Text>}
            </View>
          ) : null}
          {showLikeButton && onLikePress && (
            <View style={styles.likeRatingContainer}>
              <TouchableOpacity style={styles.marginBottom2} onPress={onLikePress}>
                {isLiked == true ? (
                  <Heart color={AppColors.WHITE_VARIANT3} />
                ) : (
                  <Heart stroke={AppColors.WHITE_VARIANT3} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
        {genres?.length > 0 && Array.isArray(genres) && (
          <View style={styles.genreChipsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              {genres.map((genre, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.genresContainer}
                  onPress={() => onGenrePress?.(genre)}
                >
                  <Text style={styles.genre}>{genre}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  posterContainer: {
    height: SCREEN_WIDTH * 1.25,
    position: 'relative',
    overflow: 'hidden',
  },
  posterImage: {
    width: SCREEN_WIDTH ,
    height: SCREEN_WIDTH * 1.25,
    position: 'absolute',
    top: 0,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SCREEN_WIDTH * 0.8,
  },
  overlayContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  playButton: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    marginTop: -15,
  },
  playButtonCircle: {
    width: 60,
    height: 40,
    borderRadius: 8,
    backgroundColor: AppColors.LIGHT_YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaInfo: {
    flex: 1,
  },
  releaseDateContainer: {
    backgroundColor: AppColors.LIGHT_YELLOW4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  releaseDate: {
    color: AppColors.BLACK,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  title: {
    color: AppColors.WHITE,
    fontFamily: 'DMSans-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  txtBody: {
    fontSize: Platform.OS === 'ios' ? 13.5 : 13,
    fontFamily: 'DMSans-Regular',
    color: AppColors.GREY_VARIANT9,
  },
  likeRatingContainer: {
    alignItems: 'center',
  },
  marginBottom2: { marginBottom: 4 },
  genreChipsContainer: {
    marginBottom: 8,
  },
  genresContainer: {
    backgroundColor: AppColors.GREY_VARIANT6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  genre: {
    fontSize: 12,
    color: AppColors.GREY_VARIANT4,
    fontFamily: FontFamily.DMSansRegular,
  },
});
