import React, { useState, useEffect, useContext } from "react";
import { AppConsumer } from "context";
import { LOG } from "config";

//import * as SecureStore from "expo-secure-store";
import EncryptedStorage from "react-native-encrypted-storage";
//import { LinearGradient } from 'expo-linear-gradient';
import SuccessTick from "svg/success-tick";
import searchAPI from "api/searchAPI";
import FastImage from "react-native-fast-image";
import Config from "react-native-config";
import { UserPrefsContext } from "../../stores/userPrefs/userPrefsContext";
import { CLOUD_BASEURL, POSTER_IMAGE_BASEURL, getOTTLinkingUrl, lowestMatchingIndexInFirstArray, openLinkingUrl } from "utils/HelperFunctions";
import Add from "svg/addBox";

//import { CF_DOMAIN } from "env";
var extendedLog = LOG.extend("Poster");

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  Image as RNImage,
} from "react-native";
import CommonStyles from "../../../Styles";
import AppColors from "utils/Colors";
import Tick from "icons/Tick";
import AddCircle from "icons/AddCircle";
import StringConstants from "utils/StringConstants";
import { apiPosterImage, getMoviePoster } from "utils/utilFunctions";

function MovieSearchCard({
  item,
  isSelect,
  backgroundColor = "#212121",
  isSingle = false,
  isSocial = false,
  height = 60,
  padding = 16,
  hasPrimaryAction = false,
  primaryBtnName,
  hasNoStyle = false,
  onMovieClick,
  onPrimaryClick,
  isWatching = false,
  isWatchlisted = false,
  initialSelected = false
}) {
  const [hasOTTList, setHasOTTList] = useState(false);
  const [selected, setSelected] = useState(initialSelected);
  const [movieOTTList, setMovieOTTList] = useState([]);
  const { userPrefsState, dispatch } = useContext(UserPrefsContext);
  const [image, setImage] = useState()
  const [imageLoadError, setImageLoadError] = useState(false)

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  useEffect(() => {
    let uri = require("assets/defaultMovie.png");

    if(isWatching){
      if (item?.backdropimage == null || item?.backdropimage == '') {
        uri = item.movieimage;
      } else {
        uri = POSTER_IMAGE_BASEURL + item.backdropimage;
      }
    }
    else if (item.posterimageurl && item.posterimageurl != null) {
      uri = item.posterimageurl;
    } else if (item.posterimage == null || item.posterimage == "") {
      uri = item.movieimage;
    } else {
      uri = POSTER_IMAGE_BASEURL + item.posterimage;
    }
    setImage(uri)
  
  },[item])

  let title = item.title;
  let desc = "";
  if (item.releasedate && item.releasedate != null) {
    desc = desc + item.releasedate;
  }
  if (item.genre && item.genre != null && item.genre.length > 0) {
    if (Array.isArray(item.genre)) {
      desc = desc + " | " + item.genre[0];
    } else {
      if (item.genre.indexOf(", ") > 0) {
        desc =
          desc +
          " | " +
          item.genre
            .toString()
            .substring(0, item.genre.toString().indexOf(", "));
      } else {
        desc = desc + " | " + item.genre;
      }
    }
  }
  if (
    item.director &&
    item.director != null &&
    item.director != "" &&
    item.director != "N/A"
  ) {
    if (Array.isArray(item.director)) {
      desc = desc + " | " + item.director[0];
    } else {
      if (item.director.indexOf(", ") > 0) {
        desc =
          desc +
          " | " +
          item.director
            .toString()
            .substring(0, item.director.toString().indexOf(", "));
      } else {
        desc = desc + " | " + item.director;
      }
    }
  }
  const [hasImage, setHasImage] = useState(true);
  let Headers = {};
  if (isSocial && item.title && item.title != "" && item.title.length > 22) {
    title = item.title.substring(0, 20) + "..";
  }

  
  useEffect(() => {
    if (
      (item.posterimage == null || item.posterimage == "") &&
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
    if (!hasPrimaryAction || isSocial) {
      try{
        EncryptedStorage.getItem("user_country").then((country) => {
          getOTTInfoForMovie(item?.movieid || item?.movieId || item?.id, country);
        });
      }
      catch(error){
        extendedLog.error(
          "Error executing EncryptedStorage user_country with message:",
          error
        );
      }
    }
  }, []);

  // fetch ottinfo
  const getOTTInfoForMovie = async (movieID, countryCode) => {
    searchAPI
      .getMovieOTTInfo(movieID, countryCode)
      .then((response) => {
        if (response && response.data) {
          let prefsOTTs = userPrefsState?.prefsData?.ott;
          let supportedOTTs = userPrefsState?.prefsData?.supportedOTTs;
          let finalSelectedOTTItems = null

          let supportedOTTsResponse = response.data.filter(value => supportedOTTs.includes(value));
          if(supportedOTTsResponse?.length > 0){
            finalSelectedOTTItems = prefsOTTs.filter(value => supportedOTTsResponse.includes(value.name));
            if(supportedOTTsResponse.includes('Amazon Prime')){
              let primeItem = prefsOTTs.filter(value => value.name ==  'Amazon Prime');
              finalSelectedOTTItems.push(primeItem)
            }
            setMovieOTTList(finalSelectedOTTItems);
            setHasOTTList(true);
            }

      
        }
      })
      .catch((error) => {
        extendedLog.error(
          "Error executing searchAPI.getOTTInfoForMovie with message:",
          error
        );
      });
  };

  const OTTView = (value) => {
    return (
      <View
        style={[
          styles.ott,
          movieOTTList?.length > 0 && isSocial && styles.singleOTT,
          { backgroundColor: "#121212" },
        ]}
      >
        <RNImage
          source={{ uri: CLOUD_BASEURL + value.logoName}}
          fadeDuration={0}
          style={{
            width: 18,
            height: 18,
          }}
        />
      </View>
    )
  }

  //ui for added to watchlist
  const addedToWatchlist = () => {
    return (
      <View style={CommonStyles.rowAlignCenter}> 
        <Tick color={AppColors.GREY_VARIANT4} height={14} width={14} strokeWidth={"2"} />
        <Text style={[styles.txtBody, { color: AppColors.GREY_VARIANT4 }]}>
          {StringConstants.ADDED}
        </Text>
      </View>
    )
  }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View
          style={[
            styles.container,
            {
              padding: hasNoStyle ? 0 : padding,
              height: hasNoStyle ? 40 : height,
              paddingBottom: hasNoStyle ? 0 : 10,
              paddingTop: hasNoStyle ? 0 : 10,
              //borderWidth: isSelect && selected ? 1 : hasNoStyle ? 0 : 0.5,
              borderColor: isSelect && selected ? "#BDBDBD" : "#424242",
              borderTopWidth: isSingle ? 0.5 : 0,
              backgroundColor: backgroundColor,
              borderLeftWidth: isSocial ? 1 : 0,
              borderRightWidth: isSocial ? 1 : 0,
              borderBottomWidth:
                isSelect && selected ? 1 : hasNoStyle ? 0 : 0.5,
              borderBottomColor: isSelect && selected ? "#BDBDBD" : "#424242",
              borderBottomLeftRadius: isSocial ? 8 : 0,
              borderBottomRightRadius: isSocial ? 8 : 0
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              let newVal = !selected;
              setSelected(newVal);
              onMovieClick(item.id, item, newVal);
            }}
            style={[
              {
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            {!isSocial && <View style={{ paddingRight: 8 }}>
              {!imageLoadError || apiPosterImage(item) != null ? (
                <FastImage
                  style={styles.movieLogo}
                  source={{ uri: !imageLoadError ? getMoviePoster(item?.id || item?.movieid || item?.movieId) : apiPosterImage(item) }}
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
            </View>}
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 3 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.txtHeader,
                      { color: appConsumer.theme.colors.text },
                    ]}
                  >
                    {title}
                  </Text>
                </View>
                <View style={CommonStyles.rowAlignCenter}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.txtBody,
                      {
                        color: appConsumer.theme.colors.grey5,
                        maxWidth: Dimensions.get("window").width * 0.48,
                      },
                    ]}
                  >
                    {desc}
                  </Text>
                  {movieOTTList?.length > 0 && isSocial && (hasPrimaryAction || isWatching)
                    ? <View style={CommonStyles.rowAlignCenter}>
                        <Text
                          style={[
                            styles.txtBody,
                            {
                              color: appConsumer.theme.colors.grey5,
                            },
                          ]}
                        >
                          {' | '}
                        </Text>
                        {OTTView(movieOTTList[0])}
                      </View> 
                    : 
                    null
                  }
                </View>
              </View>
              {isSelect && selected ? (
                <View
                  style={{
                    flex: 1,
                    marginRight: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <View style={CommonStyles.successTick}>
                    <Tick height={18} width={18} color={AppColors.GREY_VARIANT4} strokeWidth="2" />
                  </View>
                </View>
              ) : (
                <>
                  {!hasNoStyle && (
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "flex-end",
                        paddingRight: isSocial ? 0 : 32,
                        alignItems: "center",
                        alignContent: "center"
                      }}
                    >
                      {!hasOTTList ? (
                        <>
                          {hasPrimaryAction ?
                            <View >
                              <TouchableOpacity
                                onPress={onPrimaryClick}
                                style={styles.actionAltButtonStyle}
                              >
                                {primaryBtnName == 'Watchlist' 
                                  ? 
                                  isWatchlisted ? addedToWatchlist()
                                    :
                                    <View style={[CommonStyles.rowAlignCenter]}>
                                      <AddCircle color={AppColors.LIGHT_YELLOW_VARIANT4} height={14} width={14} strokeWidth="1.6" />
                                      <Text style={[styles.txtBody, styles.btnLabel, {marginLeft: 2}]}>
                                        {primaryBtnName}
                                      </Text>
                                    </View>
                                  :
                                    <Text style={[styles.txtBody, { fontSize: 12, color: "#F5D31C" }]}>
                                      {primaryBtnName}
                                    </Text>
                                }
                              </TouchableOpacity>
                            </View> :
                            <View style={{ paddingRight: 0, flex: 1 }}></View>}</>
                      ) : (
                        <View style={{ paddingRight: 0, flexDirection: 'row' }}>
                          {hasPrimaryAction || movieOTTList.length == 0 || isWatching ? null : (
                            <View style={{ marginLeft: 5 }}>
                              <View style={{ flexDirection: "row" }}>

                              {movieOTTList.map(value => {
                                return (
                                  OTTView(value)
                                )
                              } )}
                              
                              </View>
                            </View>
                          )}
                          {hasPrimaryAction && <View >
                            <TouchableOpacity
                              onPress={onPrimaryClick}
                              style={styles.actionAltButtonStyle}
                            >
                              {primaryBtnName == 'Watchlist' 
                                  ? 
                                    isWatchlisted ? addedToWatchlist()
                                    :
                                    <View style={[CommonStyles.rowAlignCenter]}>
                                      <AddCircle color={AppColors.LIGHT_YELLOW_VARIANT4} height={14} width={14} strokeWidth="1.6" />
                                      <Text style={[styles.txtBody, styles.btnLabel, {marginLeft: 2}]}>
                                        {primaryBtnName}
                                      </Text>
                                    </View>
                                  :
                                    <Text style={[styles.txtBody, styles.btnLabel, ]}>
                                      {primaryBtnName}
                                    </Text>
                                }
                              
                            </TouchableOpacity>
                          </View>}
                        </View>
                      )}
                    </View>
                  )}
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </AppConsumer>
  );
}

export default React.memo(MovieSearchCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    height: 60,
  },
  singleOTT: {
    marginLeft: 0, 
    height: 20, 
    width: 20
  },
  movieLogo: {
    height: 40,
    width: 33,
  },
  txtHeader: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
  },
  ott: {
    height: 30,
    width: 30,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginLeft: 4
  },
  txtBody: {
    fontSize: 10,
    fontFamily: "DMSans-Regular",
  },
  actionAltButtonStyle: {
    width: Dimensions.get("window").width * 0.28,
    height: 32,
    backgroundColor: "#121212",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#424242",
    borderRadius: 16,
  },
  btnLabel: { 
    fontSize: 12, 
    color: AppColors.LIGHT_YELLOW_VARIANT4 
  }
});
