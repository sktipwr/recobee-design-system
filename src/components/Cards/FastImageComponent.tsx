

import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import { CLOUD_BASEURL } from "utils/HelperFunctions";

import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, TouchableOpacity,   Image as RNImage } from 'react-native';
import FastImage from "react-native-fast-image";
import { apiPosterImage, getMoviePoster } from "utils/utilFunctions";

export const FastImageComponent: React.FC = ({ item, movieId, imgStyle }) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  return (
    <>
    {!imageLoadError || apiPosterImage(item) != null ? 
        (
          <FastImage
            style={imgStyle}
            onError={() => setImageLoadError(true)}
            defaultSource={require('assets/defaultMovie.png')}
            source={{ uri: !imageLoadError ? getMoviePoster(movieId) :  apiPosterImage(item)}}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) 
        :
          (
            <RNImage
              style={imgStyle}
              source={require('assets/defaultMovie.png')}
            ></RNImage>
          )
      }
    </>
  );
}
