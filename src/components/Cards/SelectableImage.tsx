//Returns a flat list of Clickable items passed in an array

import React, { useEffect, useState } from "react";
import { AppConsumer } from "context";

import Tick from "../../icons/Tick";
// This is stopping scroll.
//import { TouchableOpacity } from "react-native-gesture-handler";

import {
  View,
  Image as RNImage,
  Text,
  Platform,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import CommonStyles from "styles";
import FastImage from "react-native-fast-image";
import { apiPosterImage, getMoviePoster } from "utils/utilFunctions";

export default function SelectableImage({
  item,
  onItemCheck,
  bgColor,
  showTitle,
  selectionMode,
}) {
  const [hasImage, setHasImage] = useState(true);
  const [isSelected, setIsSelected] = useState(item.check);
  const [imageLoadError, setImageLoadError] = useState(false)

  let uri = require("assets/defaultMovie.png");

  if (item.posterimageurl && item.posterimageurl != null) {
    uri = item.posterimageurl;
  } else if (item.posterimage == null || item.posterimage == "") {
    uri = item.movieimage;
  } else {
    uri = "https://image.tmdb.org/t/p/w780/" + item.posterimage;
  }
  let Headers = {};

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
    <AppConsumer>
      {(appConsumer) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: bgColor
                ? bgColor
                : appConsumer.theme.colors.primary,
            },
          ]}
        >
          <Pressable
            style={{
              flexDirection: "row",
            }}
            onPress={() => {
              setIsSelected(!isSelected);
              onItemCheck(item, !isSelected);
            }}
          >
            <View>
              {!imageLoadError || apiPosterImage(item) != null ? (
                <FastImage 
                  style={styles.movieLogo}
                  source={{ uri: !imageLoadError ? getMoviePoster(item?.movieid || item?.id || item?.movieId) : apiPosterImage(item) }}
                  resizeMode={FastImage.resizeMode.cover}
                  onError={() => setImageLoadError(true)}
                  defaultSource={require('assets/defaultMovie.png')}
                />
                
              ) : (
                <View
                  style={[
                    styles.movieLogo,
                    {
                      backgroundColor: "#000000",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: 5,
                      paddingRight: 5,
                    },
                  ]}
                >
                  <Text style={styles.txtImage}>{item.title}</Text>
                </View>
              )}
              {showTitle && (
                <View style={styles.titleContainer}>
                  <Text style={CommonStyles.txtBodyMedium}>{item.title}</Text>
                </View>
              )}

              <View style={[styles.overlay, item.check && styles.itemOverlay]}>
                {item.check && (
                  <View style={styles.checkContainer}>
                    <Tick width={25} height={25} color="#E9C638" strokeWidth={"2"} />
                  </View>
                )}
              </View>
              {/* <View style={[styles.overlay, item.check && (selectionMode === "single" ? styles.selectedItemOverlay : styles.itemOverlay)]} >
                                {selectionMode === "single" &&
                                    <>{item.check ?
                                        <View style={[styles.radioCheck, {
                                            backgroundColor: appConsumer.theme.colors.clientPrimary
                                        }]}>
                                            <Tick height={15} width={15} />
                                        </View> :
                                        <View style={[styles.radio, {
                                            borderWidth: 1,
                                            borderColor: appConsumer.theme.colors.clientPrimary
                                        }]}>
                                        </View>}</>
                                }

                                {selectionMode !== "single" && item.check && <View style={{ position: 'absolute', top: 60, right: 40 }}><Tick width={25} height={25} color="#E9C638" /></View>}
                            </View> */}
            </View>
          </Pressable>
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingBottom: 9,
  },
  titleContainer: {
    width: Dimensions.get("window").width * 0.3 - 3,
    paddingTop: 6,
    alignItems: "center",
    paddingBottom: 8,
  },
  checkContainer: {
    position: "absolute",
    top: 60,
    right: 40,
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(100, 100, 100, 0.0)", //'rgba(246,206,61, 0.8)',
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingBottom: 10,
    paddingRight: 10,
  },
  selectedItemOverlay: {
    backgroundColor: "rgba(100, 100, 100, 0.3)",
    borderWidth: 1,
    borderColor: "#E9C638",
  },
  txtImage: {
    fontSize: 16,
    textAlign: "center",
    alignItems: "center",
    fontFamily: "DMSans-Bold",
    color: "#FFFFFF",
  },
  itemOverlay: {
    backgroundColor: "rgba(100, 100, 100, 0.3)",
    borderWidth: 1,
    borderColor: "#E9C638",
  },
  movieLogo: {
    width: Dimensions.get("window").width * 0.3 - 3,
    height: Dimensions.get("window").width * 0.39,
    borderRadius: 8,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 15,
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  radioCheck: {
    height: 20,
    width: 20,
    borderRadius: 15,
    position: "absolute",
    bottom: 8,
    right: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
