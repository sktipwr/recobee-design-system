import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import AppColors from 'utils/Colors';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Play from "svg/play.svg";
import { SCREEN_WIDTH } from 'utils/Dimensions';
import { apiBackdropImage, apiPosterImage, getMovieBackdropImage, getMoviePoster } from 'utils/utilFunctions';

  export type RecoPlayerViewProps = {
    playPressed: Function,
    item: any,
    key: any,
    uri: any,
    imageHeight: any
  };

  export const RecoPlayerView: React.FC<RecoPlayerViewProps> = ({
    hasImage, 
    playPressed, 
    item,
    key,
    uri,
    imageHeight = SCREEN_WIDTH * 0.51
  }) => 
  {
    const [imageLoadError, setImageLoadError] = useState(false);

    //render ui for image section
    const imageUI = (url: any) => {
      return (
        <>
          <FastImage
            style={[styles.movieImage, {height: imageHeight}]}
            source={{ uri: url}}
            resizeMode={FastImage.resizeMode.cover}
            onError={() => setImageLoadError(true)}
            defaultSource={require('assets/defaultMovie.png')}
          />
          {item?.trailersitetmdb &&
            item?.trailersitetmdb == "YouTube" && <View style={styles.playBtn}>
              <Play width={48} height={48} />
            </View>}
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0)", "#030303"]}
            locations={[0.05, 0.55, 1]}
            style={[styles.background]}
          />
        </>
      )
    }

    return (
      <View style={[styles.container, {height: imageHeight}]} key={key}>
          <TouchableOpacity
            onPress={() => {
              playPressed()
            }}
            style={styles.carouselImage}
          >
            <View>
              {!imageLoadError ? (
                imageUI(getMovieBackdropImage(item?.id || item?.movieid || item?.movieId))
              ) : (
                apiBackdropImage(item) != null ? 
                  imageUI(apiBackdropImage(item))
                :
                  <FastImage
                    style={styles.movieImage}
                    source={require("assets/defaultMovie.png")}
                  />
              )}
            </View>
          </TouchableOpacity>
        </View>
    );
  };

const styles = StyleSheet.create({
  container: {},
  movieImage: {
    width: SCREEN_WIDTH - 24,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    borderRadius: 8,
    height: SCREEN_WIDTH * 0.7
  },
  playBtn: { 
    position: "absolute", 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  carouselImage: {
    flexDirection: "row",
    borderColor: AppColors.GREY,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 0,
  },
});
