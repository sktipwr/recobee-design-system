import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { apiPosterImage, getMoviePoster } from 'utils/utilFunctions';

  interface TopBottomPosterParams {
    height: any,
    width: any,
    uri: any,
    imageLoadError: Function,
    movieId: any,
    item: any,
    hasImage: boolean
  }

  export const TopBottomPosterGradient: React.FC<TopBottomPosterParams> = ({
    height,
    width,
    uri,
    imageLoadError,
    movieId,
    item,
    hasImage
  }) => 
    {
      let url = '../../assets/defaultMovie.png';
    return (
      <>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.7)', 'transparent']}
          style={[styles.topGradient, {height: height * 0.22}]}
        />
          <FastImage
            style={[styles.movieLogo, { height: height, width: width }]}
            source={{ uri: hasImage ? getMoviePoster(movieId) : apiPosterImage(item) }}
            onError={() => imageLoadError()}
            resizeMode={FastImage.resizeMode.cover}
            defaultSource={require('assets/defaultMovie.png')}
          />
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
          style={[styles.bottomGradient, {height: height * 0.44}]}
        />
      </>
    );
};

const styles = StyleSheet.create({
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  movieLogo: {
    borderRadius: 8,
  },
});
