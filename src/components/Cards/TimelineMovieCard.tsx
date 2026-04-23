import React, { useState, useEffect } from "react";
import MoreVertical from 'icons/MoreVertical';

import FastImage from "react-native-fast-image";
import {
  View,
  Image as RNImage,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";
import { MovieMetadataRow } from "../Common/MovieMetadataRow";
import recommendationsAPI from 'api/recommendationsAPI';
import { apiPosterImage, getMoviePoster } from "utils/utilFunctions";

export const TimelineMovieCard: React.FC = ({
  item,
  onMovieClick = (f) => f,
  isReview = false,
  onCommentClick = (f) => f,
  moreOptionsClicked,
  isUpcoming = false,
  isMySeen = false,
  isWatchlist = false,
   isVisibleMoreOptions = true
}) => {

  const [hasImage, setHasImage] = useState(true);
  const [imageLoadError, setImageLoadError] = useState(false)

  if (item.releasedate && item.releasedate != "") {
    item.releasedate = item.releasedate.substring(0, 4);
  }

  var options = { year: "numeric", month: "short", day: "numeric" };
  var reviewDate = new Date(item.datetime);
  reviewDate = reviewDate.toLocaleDateString("en-US", options);

  let uri = require("assets/defaultMovie.png");

  if (item.posterimageurl && item.posterimageurl != null) {
    uri = item.posterimageurl;
  } else if (item.posterimage == null || item.posterimage == "") {
    uri = item.movieimage;
  } else {
    uri = "https://image.tmdb.org/t/p/w780/" + item.posterimage;
  }

  useEffect(() => {
    if (
      item.posterimage == null ||
      item.posterimage == "" ||
      item.posterimageurl == null
    ) {
      if (
        item.movieimage == null ||
        item.movieimage == "" ||
        item.movieimage == "N/A"
      ) {
        setHasImage(false);
      }
    }
  }, []);

  return (
    <Pressable
      onPress={() => onCommentClick(item, false)}
      style={styles.container}
    >
      <View style={CommonStyles.rowAlignCenter}>
        <Pressable
            onPress={() => onMovieClick(item?.movieid || item?.id , item)}
            style={styles.imageContainer}
        >
            {!imageLoadError || apiPosterImage(item) != null ? (
            <FastImage
                style={isWatchlist && item?.watchdate != null && typeof item?.watchdate != 'undefined' ? styles.movieLogoBig : styles.movieLogo}
                source={{ uri: !imageLoadError ? getMoviePoster(item?.movieid || item?.id || item?.movieId) : apiPosterImage(item) }}
                resizeMode={FastImage.resizeMode.cover}
                onError={() => setImageLoadError(true)}
                defaultSource={require('assets/defaultMovie.png')}
            />
            ) : (
            <RNImage
              style={isWatchlist && item?.watchdate != null && typeof item?.watchdate != 'undefined' ? styles.movieLogoBig : styles.movieLogo}
              source={require("assets/defaultMovie.png")}
            ></RNImage>
            )}
            <MovieMetadataRow isWatchlist={isWatchlist} isUpcoming={isUpcoming} isReview={isReview} item={item} isMySeen={isMySeen}/>
        </Pressable>
      </View>
      {isReview != true && isVisibleMoreOptions &&
        <TouchableOpacity onPress={() => moreOptionsClicked(item)}>
          <MoreVertical
            width={20}
            height={20}
            color={AppColors.WHITE}
          />
        </TouchableOpacity>
        }
      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: "row", 
    marginBottom: 14, 
    justifyContent:'space-between' 
  },
  commentHeader: {
    fontSize: 15,
    fontFamily: FontFamily.DMSansBold
  },

  imageContainer: {
    flexDirection: "row",
    paddingTop: 1,
  },
  movieLogo: {
    width: scaledWidth(44),
    height: scaledWidth(64),
    borderRadius: 3,
    marginRight: 8
  },
  movieLogoBig: {
    width: scaledWidth(48),
    height: scaledWidth(80),
    borderRadius: 3,
    marginRight: 8
  }
});
