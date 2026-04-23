import React, { useState, useEffect } from "react";
import watchlistAPI from "api/watchlistAPI";
import Toast from "react-native-toast-message";
import AddCircle from "icons/AddCircle";
import MinusCircle from "icons/MinusCircle";
//import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from "react-native-linear-gradient";

import Review from "icons/Review";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { View, Text, StyleSheet, Image as RNImage } from "react-native";
import { apiPosterImage, getMoviePoster } from "utils/utilFunctions";

export default function MovieList({
  key,
  item,
  showButton,
  canReview,
  showImage = true,
  isSearch = false,
  width = 105,
  borderRadius = 8,
  border = 0,
  aspectRatio = 1.339,
  onMovieClick = (f) => f,
  onReviewClick = (f) => f,
}) {
  const height = aspectRatio * width;
  const [hasImage, setHasImage] = useState(true);
  const [imageLoadError, setImageLoadError] = useState(false)

  const [isWatchlisted, setIsWatchlisted] = useState(item.is_in_watchlist);
  let Headers = {};

  let uri = null;
  if (item.posterimageurl && item.posterimageurl != null && item.posterimageurl !== 'N/A') {
    uri = item.posterimageurl;
  } else if (item.posterimage && item.posterimage != null && item.posterimage !== '') {
    uri = "https://image.tmdb.org/t/p/w780/" + item.posterimage;
  } else if (item.movieimage && item.movieimage != null && item.movieimage !== 'N/A') {
    uri = item.movieimage;
  } else {
    
      uri = null; // No valid image source
    
  }

  useEffect(() => {
    if (uri == null || uri == "N/A" || uri == "") {
      setHasImage(false);
    } else {
      setHasImage(true);
    }
  }, [uri]);

  const btnClicked = async (movieID, watchlisted) => {
    if (watchlisted) {
      let remRes = await watchlistAPI.removeItemFromWatchlist(movieID);
      Toast.show({
        type: "beeToast",
        text1: "Removed from your Watchlist",
        visibilityTime: 2000,
        position: "bottom",
        autoHide: true,
      });
      setIsWatchlisted(!watchlisted);
    } else {
      let addRes = await watchlistAPI.addItemToWatchlist(
        movieID,
        "1",
        "Movie List"
      );
      Toast.show({
        type: "beeToast",
        text1: "Added to your Watchlist",
        visibilityTime: 2000,
        position: "bottom",
        autoHide: true,
      });
      setIsWatchlisted(!watchlisted);
    }
  };

  return (
    <View key={key}>
      <TouchableOpacity
        onPress={() => onMovieClick(item.movieid || item.id, item)}
      >
        {hasImage && uri ? (
          <>
            {showButton || canReview ? (
              <>
                <FastImage
                  style={[
                    //styles.movieLogo,
                    {
                      width: width,
                      height: height,
                      borderRadius: borderRadius,
                      borderWidth: border,
                    },
                  ]}
                  source={{ uri: !imageLoadError ? getMoviePoster(item?.movieid || item?.id || item?.movieId) : apiPosterImage(item)}}
                  resizeMode={FastImage.resizeMode.cover}
                  onError={(error) => {
                    setImageLoadError(true);
                  }}
                  defaultSource={require('assets/defaultMovie.png')}
                />
                <LinearGradient
                  colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)", "#030303"]}
                  locations={[0.05, 0.73, 1]}
                  style={[styles.background, { height: height }]}
                />
              </>
            ) : (
              <RNImage
                style={[
                  //styles.movieLogo,
                  {
                    width: width,
                    height: height,
                    borderRadius: borderRadius,
                    borderWidth: border,
                  },
                ]}
                source={{ uri: uri }}
                resizeMode="cover"
                onError={(error) => {
                    setHasImage(false);
                }}
              ></RNImage>
            )}
          </>
        ) : (
          <View
            style={[
              //styles.movieLogo,
              {
                backgroundColor: "#000000",
                width: width,
                height: height,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 5,
                paddingRight: 5,
                borderRadius: borderRadius,
                borderWidth: border,
              },
            ]}
          >
            <Text style={styles.txtImage}>{item.title}</Text>
          </View>
        )}
      </TouchableOpacity>
      {isSearch && <View style={{marginTop: 4}}>
        <Text
          style={[
            styles.txtImageBody,
            {
              width: width,
            },
          ]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.txtImageBody,
            {
              width: width,
              color: "#757575",
            },
          ]}
          numberOfLines={1}
        >
          {item.releasedate} {item.genre[0]}
        </Text>
      </View>}
      {showButton ? (
        <View style={[styles.imageTextContainer, { width: width }]}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.actionButtonStyle}
              onPress={() => btnClicked(item.movieid, isWatchlisted)}
            >
              {isWatchlisted ? (
                <MinusCircle
                  width={20}
                  height={20}
                  color="rgba(255,255,255, 0.7)"
                  strokeWidth={'1.5'}
                />
              ) : (
                <AddCircle
                  width={20}
                  height={20}
                  color="rgba(255,255,255, 0.7)"
                  strokeWidth={"1.2"}
                />
              )}
              {isWatchlisted ? (
                <Text style={[styles.txtImageBody, { opacity: 0.7 }]}>
                  Remove
                </Text>
              ) : (
                <Text style={[styles.txtImageBody, { opacity: 0.7 }]}>
                  Watchlist
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {canReview ? (
        <View style={[styles.reviewContainer]}>
          <View style={{}}>
            <TouchableOpacity
              style={[styles.actionButtonStyle, { paddingLeft: 5 }]}
              onPress={() => btnClicked(item.movieid || item.id, isWatchlisted)}
            >
              {isWatchlisted ? (
                <MinusCircle
                  width={20}
                  height={20}
                  color="rgba(255,255,255, 0.7)"
                  strokeWidth={'1.5'}
                />
              ) : (
                <AddCircle
                  width={20}
                  height={20}
                  color="rgba(255,255,255, 0.7)"
                  strokeWidth={"1.2"}
                />
              )}
              {isWatchlisted ? (
                <Text
                  style={[styles.txtImageBody, { paddingTop: 3, opacity: 0.7 }]}
                >
                  Remove
                </Text>
              ) : (
                <Text
                  style={[styles.txtImageBody, { paddingTop: 3, opacity: 0.7 }]}
                >
                  Watch
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() =>
                onReviewClick(item.movieid || item.id, item.title, item)
              }
              style={[styles.actionButtonStyle, { paddingRight: 5 }]}
            >
              <View style={{}}>
                <Review color="rgba(255,255,255, 0.7)" strokeWidth="1.8"  />
              </View>
              <Text style={[styles.txtImageBody, { opacity: 0.7 }]}>
                Review
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  txtHeader: {
    fontSize: 16,
    fontFamily: "DMSans-Bold",
    color: "#FFF",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    borderRadius: 8,
  },
  movieLogo: {
    flex: 1,
    //borderRadius: 8
  },
  txtImage: {
    fontSize: 16,
    textAlign: "center",
    alignItems: "center",
    fontFamily: "DMSans-Bold",
    color: "#FFFFFF",
  },
  actionButtonStyle: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  imageTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  reviewContainer: {
    flexDirection: "row",
    position: "absolute",
    paddingTop: 4,
    bottom: 0,
    right: 0,
    left: 0,
    height: 40,
  },
  txtImageBody: {
    fontSize: 10,
    fontFamily: "DMSans-Regular",
    color: "white",
  },
});
