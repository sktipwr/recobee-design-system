import React, { useState, useEffect, useContext, FC } from "react";
import OttBox from "components/Cards/OttBox";
import { LOG } from "config";
import StarFilled from "svg/star-main.svg";

import searchAPI from "api/searchAPI";
import EncryptedStorage from "react-native-encrypted-storage";
import recommendationsAPI from "api/recommendationsAPI";

import mixpanel from "mixpanel";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform } from "react-native";
import { getNumericValue, getOTTLinkingUrl, lowestMatchingIndexInFirstArray, openLinkingUrl } from "utils/HelperFunctions";
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
import { RecoCarouselCTAs } from "../RecoCarouselCTAs";
import { AddedBtn } from "../AddedBtn";
import { WatchlistBtn } from "../WatchlistBtn";
import { RecoPlayerView } from "../RecoPlayerView";
import { useIsFocused } from "@react-navigation/native";
import Pencil from 'svg/pencil_gradient';
import Eye from 'svg/eye_gradient';
import Plus from 'svg/plus_gradient';
import ReviewCard from "./ReviewCard";
import Carousel from "react-native-reanimated-carousel";
import guestAPI from "api/guestAPI";

var extendedLog = LOG.extend("RecoGeneratorScreen");

export type RecoGeneratorInfoCardProps = {
  key: string,
  item: any,
  onMovieClick: any,
  onAddClick: any,
  onFeedbackClick: any,
  likeClicked: any,
  toggleLoginModal:any, 
  showGuestFlow: any,
  userID: any,
  userClicked: any,
  userName: any,
  navigation: any
};

export const RecoGeneratorInfoCard: FC<RecoGeneratorInfoCardProps> = ({
  key,
  item,
  onMovieClick,
  onAddClick,
  onFeedbackClick,
  likeClicked,
  showGuestFlow = false,
  toggleLoginModal,
  userID,
  userClicked,
  userName,
  navigation
}) => {

  const [hasImage, setHasImage] = useState(true);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [movieOTTList, setMovieOTTList] = useState([]);
  const { userPrefsState, dispatch } = useContext(UserPrefsContext);
  const [isOTTExpanded, setIsOTTExpanded] = useState(false)
  const [reportModalVisible, setReportModalVisibility] = useState(false)
  const [otherSelected, setOtherSelected] = useState(false)
  const [showVideo, setShowVideo] = useState(true)
  const [startLoading, setStartLoading] = useState(false)
  const [playingKey, setPlayingKey] = useState('')
  const [play, setPlay] = useState(false)
  const [uri, setUri] = useState(null)
  const [genres, setGenres] = useState('')
  const [reviewsData, setReviewsData] = useState([])
  const isFocused = useIsFocused();
  const [activeIndex, setActiveIndex] = useState(0)
  const [seenCount, setSeenCount] = useState(null)
  const [watchlistCount, setWatchlistCount] = useState(null)
  const [reviewCount, setReviewCount] = useState(null)

  let title = item?.title ?? '';
  let synopsis = item?.synopsis ?? '';

  if (synopsis.length > 150) {
    synopsis = synopsis.substring(0, 140);
  }

  // set data for genres
  const getGenreData = () => {
    let genreArr = [];
    let displayGenre = item?.releasedate ? item?.releasedate : "";
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
      displayGenre = displayGenre + " | " + element;
    });
    setGenres(displayGenre)
  }

    //reviews for guest user
    const guestFlowReviews = (movieID) => {
      guestAPI
      .getMovieReviewsData(movieID)
      .then((response) => {
        if (response?.data?.length > 0) {
          if(response?.data?.length > 3){
            setReviewsData(JSON.parse(JSON.stringify(response.data?.slice(0, 3))));
          }
          else {
            setReviewsData(JSON.parse(JSON.stringify(response.data?.slice())));
          }
        }
      })
      .catch((error) => {
        extendedLog.error(
          "Error in retreiving reviews for movie with movieID: " +
            movieID +
            " with message: ",
          error
        );
      });
    }

  //get reviews for logged in user
  const getReviews = (movieID) => {
    recommendationsAPI
    .getReviewsForMovie(movieID)
    .then((response) => {
      if (response.data?.items) {
        if(response?.data?.items?.length > 3){
          setReviewsData(JSON.parse(JSON.stringify(response.data?.items?.slice(0, 3))));
        }
        else {
          setReviewsData(JSON.parse(JSON.stringify(response.data?.items?.slice())));
        }
      }
    })
    .catch((error) => {
      extendedLog.error(
        "Error in retreiving reviews for movie with movieID: " +
          movieID +
          " with message: ",
        error
      );
    });
  }
  
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
    if(play){
      setPlay(false)
    }
    setUri(imageUrl)
    getGenreData()
  },[item])

  useEffect(() => {
    EncryptedStorage.getItem("user_country").then((country) => {
      getOTTInfoForMovie(item?.movieid ?? item?.id, country);
    });
    getMovieInfo();
    if(showGuestFlow){
      guestFlowReviews(item?.movieid ?? item?.id)
    }
    else {
      getReviews(item?.movieid ?? item?.id)
    }
    getMovieDetails(item?.movieid ?? item?.id)
  }, [item]);

  //get movie watchlist state info
  const getMovieInfo = async () => {
    let response = await recommendationsAPI.getMovieStateForUser(item?.id);
    if (response && response.data) {
      setIsWatchlisted(response.data.is_in_watchlist);
    }
  };

  // on ott press
  const onOTTPress = (appLink, ottName) => {
    if(isOTTExpanded){
      openOTT(appLink, ottName)
    }
    else {
      setIsOTTExpanded(true)
    }
  }

  const openOTT = (appLink, ottName) => {
    mixpanel.track("OTTClicked", {
      ott: appLink,
      screen: "RecoGeneratorScreen",
      movieID: item.movieid || item.id,
      ottName: ottName,
    });
    let appUrl = "";

    appUrl = getOTTLinkingUrl(appLink, userPrefsState?.prefsData?.ott, item?.ottitemid ?? null, title, false);

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
    }).catch((e) => {
      extendedLog.error(
        "Error executing userProfileAPI.updateIsLikeFlag with message:",
        e
      );
    })
  }
  

  // handle report click
  const reportClicked = async (reason) => {
    onReportModalClose()
    onFeedbackClick("D", item);
    try {
      dislikeMovie();
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

  //option for manual input of reason
  const onOtherSelected = (isOtherSelected: boolean) => {
    setOtherSelected(isOtherSelected)
  }

  // report modal body UI
  const reportModalBody = () => {
    return (
      <ReportMovieModalBody reportReasons={dailyPicsReportReasons} reportClicked={reportClicked} otherSelected={onOtherSelected} />
    )
  }

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

  // player error api call
  const onPlayerError = () => {
    setShowVideo(false)
    userProfileAPI.insertUserFeedback(
     item?.movieid || item?.id + '--' + 'Trailer Error'
    );
  }

  // handle watchlist btn press
  const onWatchlistBtnPress = () => {
    onAddClick(
      item.movieid || item.id,
      isWatchlisted,
      "DailyPick"
    );
    if(!showGuestFlow)
      setIsWatchlisted(!isWatchlisted);
  }
  
  useEffect(() => {
    if(play)
      mixpanel.track("TrailerPlayClicked", {
        screen: "RecoGeneratorCard",
        movieID: item?.movieid || item?.id,
      });
  },[play])

  //show login modal
  const reportCTA = () => {
    if(!showGuestFlow)
      setReportModalVisibility(true)
    else {
      toggleLoginModal()
    }
  }

  const getMovieDetails = async (movieID) => {
    if(showGuestFlow){
      guestAPI.getMovieMeta(movieID).then((response) => {
        if(response?.data)
          setMovieCount(response?.data)
      })
      .catch((error) => {
        extendedLog.error(
          'Error executing recommendationsAPI.getMovieDetails with message:',
          error
        );
      });
    }
    else {
      recommendationsAPI
      .getMovieByID(movieID)
      .then((response) => {
        if(response?.data)
          setMovieCount(response?.data)
      })
      .catch((error) => {
        extendedLog.error(
          'Error executing recommendationsAPI.getMovieDetails with message:',
          error
        );
      });
    }
    
  };

  //get numeric value
  const setMovieCount = (data: any) => {
    setSeenCount(getNumericValue(data?.seen))
    setWatchlistCount(getNumericValue(data?.watchlisted))
    setReviewCount(getNumericValue(data?.reviewed))
  }


  //go to comments screen
  const commentClicked = (postID, collapsed) => {
    mixpanel.track("Comment_Feed", {
      screen: "RecoGeneratorInfoCard",
      source: "reviewCard",
      movieID: item?.movieid || item?.id,
    });
    if(showGuestFlow){
      toggleLoginModal()
    }
    else {
      let newReviewArray = [];
      newReviewArray = reviewsData?.filter((f) => f?.postid === postID);
      navigation.navigateDeprecated("ReviewComment", {
        reviewObj: newReviewArray,
        movieID: item?.movieid || item?.id,
        lastEvaluatedKey: null,
        postid: postID,
        userName: userName,
        movieName: item.title,
        userID: userID,
        collapsed: collapsed,
      });
    }
  }

  const moreOptionsClicked = () => {}

  //count section UI
  const renderCountSection = (count: any, title: string, icon: any) => {
    return (
      <View style={[styles.countView, reviewsData?.length == 0 && {marginBottom: 16}, (title == 'Seen' || title == 'Reviews') && {borderRightColor: AppColors.GREY, borderRightWidth: 0.3}]}>
        {icon}
        <Text style={styles.statsValue}>{count} {title}</Text>
      </View>
    )
  }

  const renderReviewItem = ({ item, i }) => {
    return (
      <ReviewCard
        item={item}
        showGuestFlow={showGuestFlow}
        movieID={item?.movieid || item?.id}
        userID={userID}
        onUserClick={userClicked}
        onCommentClick={commentClicked}
        onLikeClick={likeClicked}
        showTop3={true}
        showComments={false}
        onMoreClick={moreOptionsClicked}
      />
    );
  };

  return (
    <View style={[CommonStyles.flexOne, styles.mainContainer]}>
      {item?.trailersitetmdb &&
        item?.trailersitetmdb == 'YouTube' &&
        showVideo && play ? (
          <View
            style={[
              styles.player
            ]}
          >
            {startLoading && (
              <View style={[styles.playerContainer, Platform.OS == 'android' && styles.borderRadius8]}>
                <YoutubePlayer
                  height={SCREEN_WIDTH * 0.7}
                  width={'100%'}
                  play={
                   play
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
            <RecoPlayerView 
              hasImage={hasImage}
              key={key}
              playPressed={() => setPlay(true)}
              item={item}
              uri={uri}
              imageHeight={SCREEN_WIDTH * 0.52}
            />
          )}
        <View style={styles.ottPositioned}>
          {movieOTTList?.length == 0 ? (
            <View style={styles.emptyOttView}></View>
          ) : (
            <View
              style={styles.ottContainer}
            >
              
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
                          ott: [CommonStyles.ottContainer, styles.iconContainer],
                          ottImage: [styles.ottImage, styles.icon],
                          txtBody: [styles.ottText],
                        }: {}}
                      />
                    )
                }
              </View>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.title} onPress={() => {
          onMovieClick(item);
        }}>
          <View style={[CommonStyles.rowSpaceBetween, {}]}>
            <Text
              style={[styles.titleText]}
              numberOfLines={2}
            >
              {title}
            </Text>
            <View
                style={styles.ratingContainer}
              >
                {!item?.arrating ? null : (
                  <StarFilled width={15} height={15} />
                )}
                {!item?.arrating ? null : (
                  <Text
                    style={[
                      styles.ratingText
                    ]}
                  >
                    {item.arrating}
                  </Text>
                )}
              </View>
          </View>
          <Text style={[styles.txtBody, { fontSize: 12, color: AppColors.WHITE_VARIANT3 }]}>
            {genres}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ctaContainer}>
          {item?.synopsis ?
            <View style={styles.synopsisContainer}>
              <Text numberOfLines={3} style={styles.synopsis}>
                {item?.synopsis}
              </Text>
            </View>
            :
            <View />
          }
          <View style={[CommonStyles.rowAlignCenter, CommonStyles.alignCenter]}>
            {reviewCount != null && reviewCount != 0 && reviewCount != '' && renderCountSection(reviewCount, 'Reviews', <Pencil />)}
            {seenCount != null && seenCount != 0 && seenCount != '' && renderCountSection(seenCount, 'Seen', <Eye />)}
            {watchlistCount != null && watchlistCount != 0 && watchlistCount != '' && renderCountSection(watchlistCount, 'Watchlisted', <Plus />)}
          </View>
          <View>
            {reviewsData?.length > 0 && 
              <View style={{marginBottom: 12}}>
                <View style={[CommonStyles.rowAlignCenter, {marginTop: 3}]}>
                  <Text style={styles.reviewTitle}>{StringConstants.TOP_COMMENTS}</Text>
                  <Text style={styles.reviewCount}>{reviewsData?.length}</Text>
                </View>
                <View style={styles.reviewHeight}>
                  <Carousel
                    loop
                    enabled 
                    style={styles.carousel}
                    autoPlay={true}
                    height={scaledWidth(84)}
                    autoPlayInterval={1700}
                    width={SCREEN_WIDTH - 10}
                    mode="parallax"
                    modeConfig={{
                      parallaxScrollingScale: 0.92,
                      parallaxScrollingOffset: scaledWidth(62),
                      parallaxAdjacentItemScale: 0.6,
                    }}
                    data={reviewsData}
                    pagingEnabled={true}
                    onSnapToItem={index => setActiveIndex(index)}
                    renderItem={renderReviewItem}
                  />
                </View>
                <View style={styles.carouselIndicatorContainer}>
                  {reviewsData.map((item, i) => (
                    <View
                      key={i}
                      style={[
                        styles.carouselIndicatorNode,
                        activeIndex === i &&
                          styles.carouselIndicatorActiveNode,
                      ]}
                    />
                  ))}
                </View>
              </View>
            }
          {isWatchlisted ? (
                <AddedBtn />
              ) : (
                <WatchlistBtn onPress={onWatchlistBtnPress} />
              )}
          <RecoCarouselCTAs
            likeClicked={likeClicked}
            showReportModal={() => reportCTA()}
            onFeedbackClick={onFeedbackClick}
            item={item}
          />
        </View>
      </View>
      {reportModalVisible 
        ?
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
  mainContainer: {
    overflow: 'hidden',
  },
  playerContainer: {
    borderTopLeftRadius: 3, 
    alignItems: 'center',
    overflow: 'hidden',
    borderTopRightRadius: 3,
    height: SCREEN_WIDTH * 0.71,
  },
  borderRadius8 : {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
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
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  ottPositioned: {
    flexDirection: "row", 
    flex: 1, 
    position: "absolute",
    top: 20,
    right: 8
  },
  titleText: { 
    fontSize: 16, 
    fontFamily: FontFamily.DMSansBold, 
    color: AppColors.WHITE,
    width: SCREEN_WIDTH * 0.633,
  },
  ottContainer: { 
    paddingRight: 0, 
    flex: 1, 
    alignItems: "flex-end" 
  },
  title: { 
    marginBottom: 5, 
    width: '100%'
  },
  infoContainer: {
    width: '100%', 
    flexDirection: 'row',
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderTopWidth: 0,  
    paddingTop: 12, 
    paddingBottom: 8, 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  ottText: { 
    color: AppColors.LIGHT_YELLOW, 
    fontSize: 12, 
    fontFamily: FontFamily.DMSansRegular
  },
  txtBody: {
    fontSize: 15,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE_VARIANT3
  },
  ottImage: {
    height: 16,
    width: 16,
  },
  btnStyle: {
    padding: 12,
    borderRadius: 8,
    height: 30,
    flexDirection: "row",
  },
  player: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: AppColors.THEME_BG_COLOR,
  },
  synopsis: {
    fontSize: 13,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT14,
  },
  synopsisContainer: {
    marginBottom: 13,
    backgroundColor: AppColors.THEME_BG_COLOR,
  },
  ctaContainer: {
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: AppColors.THEME_BG_COLOR
  },
  countView: {
    width: SCREEN_WIDTH * 0.3,
    alignItems: 'center',
    marginBottom: 9
  },
  statsValue: {
    fontSize: 10,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginTop: 3
  },
  carousel: { 
    width: SCREEN_WIDTH - 32, 
    height: scaledWidth(75), 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 12, 
  },
  carouselIndicatorContainer: {
    height: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselIndicatorNode: {
    height: 2,
    width: 8,
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: AppColors.GREY_VARIANT20
  },
  carouselIndicatorActiveNode: {
    backgroundColor: AppColors.LIGHT_YELLOW_VARIANT7,
    height: 2,//6
    width: 8,
  },
  icon: {
    height: 23, 
    width: 23
  },
  iconContainer: {
    height: 28, 
    width: 28
  },
  reviewTitle: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE_VARIANT3,
  },
  reviewCount: {
    fontSize: 10,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    marginLeft: 2,
    marginTop: 2
  },
  reviewHeight: {minHeight: scaledWidth(89)}
});
