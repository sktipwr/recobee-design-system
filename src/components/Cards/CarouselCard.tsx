import React, { useState, useEffect, useContext } from "react";
import OttBox from "components/Cards/OttBox";
import LinearGradient from "react-native-linear-gradient";
var extendedLog = LOG.extend("TopRecoScreen");
import AddCircle from "icons/AddCircle";
import { LOG } from "config";
import StarFilled from "svg/star-main.svg";
import Like from "icons/Like";
import Dislike from "icons/Dislike";
import searchAPI from "api/searchAPI";
import EncryptedStorage from "react-native-encrypted-storage";
import recommendationsAPI from "api/recommendationsAPI";
import Tick from "icons/Tick";
import Eyes from "icons/Eyes";
import Play from "svg/play.svg";
import LikeFilled from 'icons/LikeFilled'
import mixpanel from "mixpanel";
import FastImage from "react-native-fast-image";
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
  Linking,
  Image as RNImage,
} from "react-native";
import { TMDB_BASEURL, getOTTLinkingUrl, lowestMatchingIndexInFirstArray, openLinkingUrl } from "utils/HelperFunctions";
import { UserPrefsContext } from "../../stores/userPrefs/userPrefsContext";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import StringConstants from "utils/StringConstants";
import { ReportMovieModalBody } from "../ReportMovieModalBody";
import { dailyPicsReportReasons } from "utils/DataConstants";
import Toast from 'react-native-toast-message';
import userProfileAPI from "api/userProfileAPI";
import { GenericModal } from "../Modals/GenericModal";
import YoutubePlayer from 'react-native-youtube-iframe';
import { CommonAppContext } from "../../stores/common/commonAppContext";
import { RoundedBtn } from "../Common/RoundedBtn";
import Post from "icons/Post";
import Review from "icons/Review";
import { apiBackdropImage, apiPosterImage, getMovieBackdropImage, getMoviePoster, getOTTData } from "utils/utilFunctions";
import Remove from 'svg/minus_circular'

export default function CarouselCard({
  key,
  item,
  onMovieClick,
  onAddClick,
  onFeedbackClick,
  likeClicked,
  activeIndex,
  index,
  onReviewClick,
  createPostClicked,
  isCritic = false,
  countryCode = null
}) {
  const [hasImage, setHasImage] = useState(true);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [movieOTTList, setMovieOTTList] = useState([]);
  const [ottID, setOttID] = useState(item.ottitemid);
  const { userPrefsState, dispatch } = useContext(UserPrefsContext);
  const [isOTTExpanded, setIsOTTExpanded] = useState(false)
  const [reportModalVisible, setReportModalVisibility] = useState(false)
  const [otherSelected, setOtherSelected] = useState(false)
  const [showVideo, setShowVideo] = useState(true)
  const [startLoading, setStartLoading] = useState(false)
  const [playingKey, setPlayingKey] = useState('')
  const [play, setPlay] = useState(false)
  const [uri, setUri] = useState(null)
  const [ottData, setOttData]  = useState([])
  const [posterImage, setPosterImage] = useState('')
  const { commonAppState } = useContext(CommonAppContext);
  const [posterLoadError, setPosterLoadError] = useState(false)
  const [backdropLoadError, setBackdropLoadError] = useState(false)
  const isFocused = useIsFocused();

  let title = item.title;
  let synopsis = item.synopsis;
  let genreArr = [];
  let displayGenre = item.releasedate ? item.releasedate : "";

  if (
    item?.genre &&
    item?.genre != null &&
    item?.genre != "" &&
    item?.genre?.length > 0
  ) {
    if (Array.isArray(item?.genre)) {
      item.genre = item.genre.splice(0, 2);
      genreArr = item.genre;
    } else {
      item.genre = item?.genre?.split(", ");
      item.genre = item?.genre?.splice(0, 2);
      genreArr = item?.genre;
    }
  }

  genreArr.forEach((element) => {
    displayGenre = displayGenre + "   " + element;
  });

  if (synopsis?.length > 150) {
    synopsis = synopsis.substring(0, 140);
  }

  //get poster image
  const checkPosterImage = () => {
    let uri = null;

    if (item?.posterimageurl && item?.posterimageurl != null) {
      uri = item?.posterimageurl;
    } else if (item?.posterimage && item?.posterimage != null && item?.posterimage != "") {
      uri = TMDB_BASEURL + item?.posterimage;
    } else if (item?.movieimage && item?.movieimage != null && item?.movieimage != "") {
      uri = item?.movieimage;
    }
    setPosterImage(uri)
  }


  useEffect(() => {
    if(item?.otts?.length > 0){
      setOTTData()
    }
    else if(countryCode) {
      getOTTInfoForMovie(item?.movieid ?? item?.id, countryCode);
    }
    getMovieInfo();
  }, [item, countryCode])

  useEffect(() => {
    let imageUrl = require("assets/defaultMovie.png");
    if (item?.backdropimageurl != null && item?.backdropimageurl != "") {
      imageUrl = item.backdropimageurl;
    } else if (
      !(
        item?.movieimage == null ||
        item?.movieimage == "" ||
        item?.movieimage == "N/A"
      )
    ) {
      imageUrl = item.movieimage;
    } else if (item?.backdropimage != null && item?.backdropimage != "") {
      imageUrl = "https://image.tmdb.org/t/p/w780/" + item?.backdropimage;
    } else {
      setHasImage(false);
    }
    checkPosterImage()
    setUri(imageUrl)
    if(isWatchlisted){
      setIsWatchlisted(false)
    }
  },[item])

  // set ott data
  const setOTTData = () => {
    const ottData = getOTTData(item?.otts, userPrefsState);
    if(ottData?.finalOTTItem?.length > 0){
      setMovieOTTList(ottData.finalOTTItem?.slice());
    }
  }

  useEffect(() => {
    if(item?.otts?.length > 0){
      setOTTData()
    }
    else if(countryCode) {
      getOTTInfoForMovie(item?.movieid ?? item?.id, countryCode);
    }
    getMovieInfo();
  }, [item, countryCode])

  const getMovieInfo = async () => {
    let response = await recommendationsAPI.getMovieStateForUser(item.id);
    if (response && response.data) {
      setIsWatchlisted(response.data.is_in_watchlist);
    }
  };

  const onOTTPress = (appLink, ottName) => {
    if(isOTTExpanded){
      openOTT(appLink, ottName)
    }
    else {
      setIsOTTExpanded(true)
    }
  }

  const openOTT = (appLink, ottName) => {
    // Log which ott was clicked
    mixpanel.track("OTTClicked", {
      ott: appLink,
      screen: "Carousel",
      movieID: item.movieid || item.id,
      ottName: ottName,
    });
    let appUrl = "";

    appUrl = getOTTLinkingUrl(appLink, userPrefsState?.prefsData?.ott, ottID, title, false);

    openLinkingUrl(appUrl);
  };

  // fetch ottinfo
  const getOTTInfoForMovie = async (movieID, countryCode) => {
    searchAPI
      .getMovieOTTInfo(movieID, countryCode)
      .then((response) => {
        if (response && response.data && response.data.length > 0) {
          let prefsOTTs = userPrefsState?.prefsData?.ott;
          let supportedOTTs = userPrefsState?.prefsData?.supportedOTTs;
          let finalSelectedOTTItem = null

          let supportedOTTsResponse = response.data.filter(value => supportedOTTs.includes(value));
         
          if(supportedOTTsResponse?.length > 0){
            //
            let ottPrefsApiData = userPrefsState.userPrefsApiData?.otts;
            if(ottPrefsApiData?.length > 0){
              const apiOTTPrefNames = ottPrefsApiData.map(obj => obj.name);

              let matchingOTTs = supportedOTTsResponse.filter(value => apiOTTPrefNames.includes(value));

              if(matchingOTTs?.length > 0){
                if(supportedOTTs?.length > 0){
                  let lowestIndex = lowestMatchingIndexInFirstArray(supportedOTTs, matchingOTTs);
                  if(lowestIndex != -1){
                    finalSelectedOTTItem = prefsOTTs.filter(value => value.name == supportedOTTs[lowestIndex]);
                    setMovieOTTList(finalSelectedOTTItem);
                  }
                }
              }
              else {
                setMovieOTTList([])
              }
            }
            //
            if(finalSelectedOTTItem == null){
              let lowestIndex = lowestMatchingIndexInFirstArray(supportedOTTs, supportedOTTsResponse);
              if(lowestIndex != -1){
                finalSelectedOTTItem = prefsOTTs.filter(value => value.name == supportedOTTs[lowestIndex]);
                setMovieOTTList(finalSelectedOTTItem);
              }
            }
          }
        }
      })
      .catch((error) => {
        setMovieOTTList([])
        extendedLog.error(
          "Error executing searchAPI.getOTTInfoForMovie with message:",
          error
        );
      });
  };

  const onReportModalClose = () => {
    setReportModalVisibility(false)
    setOtherSelected(false)
  }

  const dislikeMovie = () => {
    recommendationsAPI.updateIsLikeFlag(item?.id || item?.movieid, 'false').then((res) => {
      onFeedbackClick("D", item);
    }).catch((e) => {
      extendedLog.error(
        "Error executing userProfileAPI.updateIsLikeFlag with message:",
        e
      );
    })
  }
  

  const reportClicked = async (reason) => {
    onReportModalClose()
    try {
      dislikeMovie();
      mixpanel.track("DislikeClicked", {
        screen: "HomeCarousel",
        movieID: item?.movieid || item?.id,
        reason: reason,
      });
      let res = await userProfileAPI.insertUserFeedback((item?.id || item?.movieid) + ' -- ' + reason)
      if (res.status == 200) {
        Toast.show({
          type: 'beeToast',
          text1:
            StringConstants.CONTINUOUSLY_WORKING_TO_MAKE_BETTER,
          visibilityTime: 2000,
          position: 'bottom',
          autoHide: true,
        });
      }
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.code == 'dup'
      ) {
        Toast.show({
          type: 'infoToast',
          text1: StringConstants.UNDER_REVIEW,
          visibilityTime: 2000,
          position: 'bottom',
          autoHide: true,
        });
      } else {
        extendedLog.error(
          'Error executing  userProfileAPI.insertReportedEvent with message:',
          error
        );
      }
    }
  }

  const onOtherSelected = (isOtherSelected: boolean) => {
    setOtherSelected(isOtherSelected)
  }

  const reportModalBody = () => {
    return (
      <ReportMovieModalBody reportReasons={dailyPicsReportReasons} reportClicked={reportClicked} otherSelected={onOtherSelected} />
    )
  }
  
  useEffect(() => {
    if(index != activeIndex && play){
      setPlay(false)
    }
  }, [index, activeIndex])

  useEffect(() => {
    if (isFocused) {
      setStartLoading(true)
      setPlayingKey(item?.key)
    }
    return () => {
      setPlay(false)
      setStartLoading(false)
      setPlayingKey('')
    }
  }, [isFocused]);


  const onPlayerError = () => {
    setShowVideo(false)
    // obj.setState({ showVideo: false });
    userProfileAPI.insertUserFeedback(
     item.movieid || item.id + '--' + 'Trailer Error'
    );
  }

  return (
    <View>
      {item?.trailersitetmdb &&
        item?.trailersitetmdb == 'YouTube' &&
        showVideo && play ? (
          <View
            style={[
              styles.txtContainer,
              {
                backgroundColor:
                  AppColors.THEME_BG_COLOR,
              },
            ]}
          >
            {startLoading && (
              <View style={[styles.playerContainer, Platform.OS == 'android' && styles.borderRadius8]}>
                <YoutubePlayer
                  height={SCREEN_WIDTH * 0.51}
                  width={'100%'}
                  play={
                    playingKey === item.key && index == activeIndex && play
                  }
                  forceAndroidAutoplay={false}
                  videoId={item.trailerkeytmdb}
                  webViewProps={{
                    allowsInlineMediaPlayback: false,
                    playing: true,
                  }}
                  webViewStyle={{ opacity: 0.99 }}
                  onError={() => onPlayerError()}
                />
                </View>
            )}
          </View>
        ) : (
        <View style={styles.container} key={key}>
          <TouchableOpacity
            //TODO: not being used now
            // onPress={(e) => {
            //   mixpanel.track("TrailerPlayClicked", {
            //     screen: "HomeCarousel",
            //     movieID: item?.movieid || item?.id,
            //   });
            //   setPlay(true)
            // }}
            style={styles.carouselImage}
          >
            <View>
              {!backdropLoadError || apiBackdropImage(item) != null ? (
                <TouchableOpacity activeOpacity={1} onPress={() => onMovieClick(item.id, item, false)}>
                  <FastImage
                    style={[styles.movieImage]}
                    source={{ uri: !backdropLoadError ? getMovieBackdropImage(item?.id || item?.movieid || item?.movieId) : apiBackdropImage(item)}}
                    resizeMode={FastImage.resizeMode.cover}
                    onError={() => {
                      setBackdropLoadError(true)
                    }}
                    defaultSource={require('assets/defaultMovie.png')}
                  />
                  <View
                    style={styles.ratingContainer}
                  >
                    {!item.arrating ? null : (
                      <StarFilled width={15} height={15} />
                    )}
                    {!item.arrating ? null : (
                      <Text
                        style={[
                          styles.ratingText
                        ]}
                      >
                        {item.arrating}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ) : (
                <FastImage
                  style={styles.movieImage}
                  source={require("assets/defaultMovie.png")}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
          )}
        <View style={styles.ottPositioned}>
          {movieOTTList?.length == 0 ? (
            <View style={styles.emptyOttView}></View>
          ) : (
            <View
              style={styles.ottContainer}
            >
              {/* TODO: we need to get this code value from api to get appUrl dynamically for ott platforms */}
              
                <View
                  style={CommonStyles.flexWrapRow}
                >
                  {movieOTTList != null && (
                      <OttBox
                        name={movieOTTList[0]?.name}
                        code={movieOTTList[0]?.code}
                        onOpenOTT={onOTTPress}
                        hideName={!isOTTExpanded}
                        isExpanded={isOTTExpanded}
                        style={ !isOTTExpanded ? {
                          ott: styles.ott,
                          ottImage: styles.ottImage,
                          txtBody: [styles.ottText],
                        }: {}}
                      />
                    )
                }
              
              </View>
          </View>
        )}
      </View>
      <View style={[CommonStyles.flexDirRow]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => onMovieClick(item.id, item, false)}>
            {
              !posterLoadError || apiPosterImage(item) != null?
                <FastImage
                  style={[styles.posterImage]}
                  source={{ uri : !posterLoadError ? getMoviePoster(item?.id || item?.movieid || item?.movieId) : apiPosterImage(item)}}
                  resizeMode={FastImage.resizeMode.cover}
                  onError={() => {
                    setPosterLoadError(true)
                  }}
                  defaultSource={require('assets/defaultMovie.png')}
                />
                :
                <FastImage
                    style={[styles.posterImage]}
                    source={require("assets/defaultMovie.png")}
                    resizeMode={FastImage.resizeMode.cover}
                  />
            }
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <TouchableOpacity style={styles.title} onPress={() => {
              onMovieClick(item.id, item, false);
            }}>
              <Text
                style={[styles.titleText, {marginBottom: 12}]}
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text style={[styles.txtBody, { fontSize: 12, color: AppColors.GREY_VARIANT1, marginBottom: 6 }]}>
                {displayGenre}
              </Text>
              {commonAppState.userRole != 'critic' && !isCritic ?
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              onPress={() => {
                let isLiked = item?.is_liked ?? false;
                likeClicked(item?.id || item?.movieid, !isLiked)
              }}
              style={[CommonStyles.rowAlignCenter, styles.bottomCTAContainer]}
            >
              <View>
                {item?.is_liked ? <LikeFilled height={24} width={24} /> : <Like height={24} width={24} />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setReportModalVisibility(true)
              }}
              style={[CommonStyles.rowAlignCenter, styles.bottomCTAContainer]}
            >
              <Dislike height={24} width={24} />
            </TouchableOpacity>
            <View
              style={[CommonStyles.rowAlignCenter, styles.bottomCTAContainer]}
            >
              <TouchableOpacity onPress={() => {
                onFeedbackClick("S", item);
              }}>
                <Eyes color={AppColors.GREY_VARIANT10} height={24} width={24} />
              </TouchableOpacity>
              {commonAppState.userRole != 'critic' && !isCritic  ?
                <TouchableOpacity
                  style={[
                    styles.ott,
                    styles.watchlistBtnSpacing
                  ]}
                  onPress={(e) => {
                    if(!isWatchlisted){
                      onAddClick(
                        item.movieid || item.id,
                        isWatchlisted,
                        "DailyPick"
                      );
                      setIsWatchlisted(!isWatchlisted);
                    }
                  }}
                >
                  <View style={[CommonStyles.flexDirRow]}>
                   {isWatchlisted 
                    ? 
                      <Remove height={24} width={24} color={AppColors.GREY_VARIANT4} strokeWidth={"2"} />
                    :
                      <AddCircle width={24} height={24} color={AppColors.GREY_VARIANT10} strokeWidth={"1.5"} />
                   }
                  </View>
                </TouchableOpacity>
            :
            <View
              style={styles.btnWrapper}
            />
            }
            </View>
          </View>
          :
          <TouchableOpacity style={[styles.ott, styles.addBtnSpacing]}
              onPress={(e) => onReviewClick(item?.id, item?.title, item, 'post_review')}
          >
            <AddCircle width={24} height={24} color={AppColors.GREY_VARIANT10} strokeWidth={"1.5"} />
          </TouchableOpacity>
        }
        </TouchableOpacity>
      </View>
      </View>
      {reportModalVisible ?
          <GenericModal
            borderRadius={48}
            isModalVisible={reportModalVisible}
            cancelModal={() => onReportModalClose()}
            modalHeight={otherSelected ? SCREEN_HEIGHT * 0.78 : SCREEN_HEIGHT * 0.56}
            modalTitle={StringConstants.TELL_US_WHY}
            modalBody={
              reportModalBody()
            }
          />
          :
          null
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_WIDTH * 0.51,
    backgroundColor: AppColors.BLACK_VARIANT3
  },
  playerContainer: {
    borderTopLeftRadius: 3, 
    alignItems: 'center',
    borderColor: AppColors.GREY,
    overflow: 'hidden',
    borderWidth: 1,
    borderBottomColor: "transparent",
    borderBottomWidth: 0,
    borderTopRightRadius: 3,
    height: SCREEN_WIDTH * 0.51
  },
  borderRadius8 : {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  emptyOttView: { 
    paddingRight: 0, 
    flex: 1 
  },
  ratingText: {
    color: AppColors.WHITE,
    marginTop: 0,
    marginLeft: 2,
    fontSize: 12,
    fontFamily: FontFamily.DMSansBold,
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
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 4,
    paddingRight: 3,
    paddingBottom: 16,
    paddingTop: 4,
    width: 40,
    position: "absolute",
    left: 7,
    top: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  ottPositioned: {
    flexDirection: "row", 
    flex: 1, 
    position: "absolute",
    top: 10,
  },
  btnWrapper: {
    justifyContent: "flex-end",
    flex: 1,
    alignItems: "flex-end",
  },
  addedBtn: {
    backgroundColor: AppColors.GREY_VARIANT6, 
    borderRadius: 12, 
    padding: 6,
  },
  bottomCTAContainer: {
    justifyContent: 'center',
    padding: 4,
    marginRight: 24,
    alignItems: 'center'
  },
  carouselBtn: {
    backgroundColor: AppColors.LIGHT_YELLOW, 
    borderRadius: 12, 
    width: SCREEN_WIDTH * 0.267,
    height: 32
  },
  carouselImage: {
    flexDirection: "row",
    borderColor: AppColors.GREY,
    borderBottomWidth: 0,
  },
  watchlistText: { 
    color: AppColors.GREY_VARIANT2, 
    fontSize: 12, 
    paddingLeft: 4 
  },
  titleText: { 
    fontSize: 14, 
    fontFamily: FontFamily.DMSansBold, 
    color: AppColors.WHITE 
  },
  ottContainer: { 
    paddingRight: 0, 
    flex: 1, 
    alignItems: "flex-end" 
  },
  title: { 
    marginBottom: 7, 
    maxWidth: SCREEN_WIDTH * 0.533 
  },
  infoContainer: {
    flexDirection: 'row',
    borderWidth: 0, 
    borderTopWidth: 0,  
    padding: 16, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  txtImageBody: {
    fontSize: 10,
    fontFamily: "DMSans-Regular",
  },
  smallBtn: {
    backgroundColor: "#333333",
    height: 24,
    width: 24,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    opacity: 0.6,
    alignItems: "center",
  },
  feedbackContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomLeftRadius: 8, 
    borderBottomRightRadius: 8, 
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: AppColors.GREY, 
    backgroundColor: AppColors.THEME_BG_COLOR
  },
  feedbackSubContainer: {
    flexDirection: "row",
    flex: 1,
    marginVertical: 10,
    justifyContent: "space-evenly",
  },
  feedbackBtn: {
    fontSize: 12,
    color: AppColors.GREY_VARIANT10,
    fontFamily: FontFamily.DMSansRegular,
    marginLeft: 6
  },
  ottText: { color: "#E9C638", fontSize: 12, fontFamily: "DMSans-Regular" },
  txtHeader: {
    fontSize: 20,
    fontFamily: "DMSans-Bold",
    color: "#EEEEEE",
  },
  txtBody: {
    fontSize: 15,
    fontFamily: "DMSans-Regular",
    color: "#EEEEEE",
  },
  ott: {
    width: 22,
    height: 22,
    borderRadius: 4.5,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  txtImage: {
    fontSize: 16,
    textAlign: "center",
    alignItems: "center",
    fontFamily: "DMSans-Bold",
    color: "#FFFFFF",
  },
  movieImage: {
    height: SCREEN_WIDTH * 0.51,
    width: SCREEN_WIDTH,
  },
  posterImage: {
    height: scaledWidth(117),
    width: scaledWidth(85),
    marginLeft: 20,
    marginTop: - scaledWidth(58)
  },
  ottImage: {
    height: 26,
    width: 26,
  },
  btnStyle: {
    padding: 12,
    borderRadius: 8,
    height: 30,
    flexDirection: "row",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    borderRadius: 8,
    height: SCREEN_WIDTH * 0.7
  },
  txtContainer: {
    width: '100%',
    alignSelf: 'center',
    
  },
  gap12: {width: 12},
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addBtnSpacing: {
    padding: 6, 
    marginTop: 7
  },
  watchlistBtnSpacing: {
    padding: 6, 
    marginLeft: 28
  }
});
