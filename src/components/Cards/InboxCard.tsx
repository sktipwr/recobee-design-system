import React, { useState, useEffect } from "react";
import { AppConsumer } from "context";
import { Rating } from "react-native-ratings";
import Like from "icons/Like";
import LikeFilled from 'icons/LikeFilled'
import Dislike from "icons/Dislike";
import DislikeFill from "icons/DislikeFilled";
import MoreVertical from "icons/MoreVertical";
import FastImage from "react-native-fast-image";
import {
  View,
  Image as RNImage,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CommonStyles from "styles";
import { apiPosterImage, getMoviePoster } from "utils/utilFunctions";

export default function InboxCard({
  item,
  alignRight,
  onMoreClick = (f) => f,
  onReplyClick = (f) => f,
  onLikeClick = (f) => f,
  onMovieClick = (f) => f,
}) {
  const [isLiked, setIsLiked] = useState(item.details.islike);
  const [hasImage, setHasImage] = useState(true);
  const [imageLoadError, setImageLoadError] = useState(false)

  if (item.details.releasedate && item.details.releasedate != "") {
    item.details.releasedate = item.details.releasedate.substring(0, 4);
  }

  let recoDate = item.details.datetime;
  let createdDate = new Date(item.details.datetime);
  let todayDate = new Date();
  let month = createdDate.getMonth() + 1;

  var diffInSeconds = (todayDate.getTime() - createdDate.getTime()) / 1000;
  var timeDifference = Math.abs(Math.round(diffInSeconds / 3600));

  if (timeDifference > 24 || todayDate.getDate() != createdDate.getDate()) {
    recoDate =
      createdDate.getDate() + "/" + month + "/" + createdDate.getFullYear();
  } else {
    recoDate =
      ("0" + createdDate.getHours().toString()).slice(-2) +
      ":" +
      ("0" + createdDate.getMinutes().toString()).slice(-2);
  }

  let uri = require("assets/defaultMovie.png");

  if (item.details.posterimageurl && item.details.posterimageurl != null) {
    uri = item.details.posterimageurl;
  } else if (
    item.details.posterimage == null ||
    item.details.posterimage == ""
  ) {
    uri = item.details.movieimage;
  } else {
    uri = "https://image.tmdb.org/t/p/w780/" + item.details.posterimage;
  }

  useEffect(() => {
    if (
      item.details.posterimage == null ||
      item.details.posterimage == "" ||
      item.details.posterimageurl == null
    ) {
      if (
        item.details.movieimage == null ||
        item.details.movieimage == "" ||
        item.details.movieimage == "N/A"
      ) {
        setHasImage(false);
      }
    }
  }, []);

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={{ alignItems: alignRight ? "flex-end" : "flex-start" }}>
          <TouchableOpacity
            onPress={() => onMovieClick(item.details.id, item.details)}
            style={[
              styles.container,
              {
                backgroundColor: appConsumer.theme.colors.searchBackground,
                marginLeft: alignRight ? 36 : 8,
                marginRight: alignRight ? 8 : 36,
              },
            ]}
          >
            <View style={styles.imageContainer}>
              {!imageLoadError || apiPosterImage(item?.details) != null ? (
                <FastImage
                  style={styles.movieLogo}
                  source={{ uri: !imageLoadError ? getMoviePoster(item?.details?.id || item?.details?.movieid || item?.details?.movieId) : apiPosterImage(item?.details)}}
                  resizeMode={FastImage.resizeMode.cover}
                  onError={() => setImageLoadError(true)}
                  defaultSource={require('assets/defaultMovie.png')}
                />
              ) : (
                <RNImage
                  style={styles.movieLogo}
                  source={require("assets/defaultMovie.png")}
                ></RNImage>
              )}
            </View>
            <View style={[styles.textContainer]}>
              <View style={{ maxWidth: 220 }}>
                <Text style={styles.txtHeader}>
                  {item.details.title.toUpperCase() +
                    " (" +
                    item.details.releasedate +
                    ")"}
                </Text>
              </View>
              {item.details.recorating != 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 5,
                    paddingLeft: 12,
                  }}
                >
                  <Text
                    style={[CommonStyles.txtBodyMedium, { marginRight: 5 }]}
                  >
                    Rating:{" "}
                  </Text>
                  <Rating
                    ratingCount={5}
                    imageSize={12}
                    fractions={1}
                    startingValue={parseFloat(item.details.recorating)}
                    jumpValue={0.5}
                    ratingColor="#e9c46a"
                    tintColor={appConsumer.theme.colors.searchBackground}
                    readonly={true}
                    style={{ paddingTop: 2 }}
                  />
                </View>
              ) : null}
              {item.details.recocomment == "" ? null : (
                <View
                  style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 12 }}
                >
                  <Text
                    style={[
                      CommonStyles.txtBodyMedium,
                      { maxHeight: 40, maxWidth: 220, opacity: 0.7 },
                    ]}
                  >
                    "{item.details.recocomment}"
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "flex-end",
                  position: "absolute",
                  top: 3,
                  right: 0,
                }}
                onPress={() => onMoreClick(item.details)}
              >
                <MoreVertical height={15} width={15} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-end",
                  marginRight: 8,
                }}
              >
                <TouchableOpacity
                  style={{ padding: 8, paddingLeft: 12, paddingRight: 6 }}
                  onPress={() => {
                    setIsLiked(
                      isLiked == "null" || isLiked == "false" ? "true" : "null"
                    );
                    onLikeClick(item.details, true);
                  }}
                >
                  {isLiked == "true" ? <LikeFilled /> : <Like />}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingRight: 12, padding: 8, paddingLeft: 6 }}
                  onPress={() => {
                    setIsLiked(
                      isLiked == "null" || isLiked == "true" ? "false" : "null"
                    );
                    onLikeClick(item.details, false);
                  }}
                >
                  {isLiked == "null" || !isLiked ? (
                    <Dislike />
                  ) : isLiked == "true" ? (
                    <Dislike />
                  ) : (
                    <DislikeFill />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginBottom: 8, paddingLeft: 8 }}
                  onPress={() => onReplyClick(item.details)}
                >
                  <Text
                    style={[CommonStyles.txtBodyMedium, { color: "#E9C638" }]}
                  >
                    Reply
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    CommonStyles.txtBodyMedium,
                    {
                      opacity: 0.4,
                      paddingBottom: 6,
                      textAlign: "right",
                      flex: 1,
                    },
                  ]}
                >
                  {recoDate}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: "row",
    marginTop: 12,
    height: Dimensions.get("window").width * 0.35,
    width: Dimensions.get("window").width * 0.9 - 8,
    borderRadius: 12,
    padding: 8,
    paddingBottom: 0,
  },
  imageContainer: {
    flexDirection: "row",
    height: 128,
    width: 73,
  },
  txtHeader: {
    fontFamily: "DMSans-Bold",
    color: "#FFFFFF",
    fontSize: 14,
    paddingLeft: 12,
  },
  movieLogo: {
    flex: 1,
    height: (Dimensions.get("window").width * 0.2 * 20) / 13,
    width: Dimensions.get("window").width * 0.2,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 0,
    flex: 1,
  },
});
