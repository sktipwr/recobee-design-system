import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { AppConsumer } from 'context';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  scaledHeight,
  scaledWidth,
} from 'utils/Dimensions';
import DefaultUser from 'svg/user';
import * as Progress from 'react-native-progress';
import Video, { VideoRef } from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import YoutubePlayer from 'react-native-youtube-iframe';
import FastImage from 'react-native-fast-image';
import EncryptedStorage from 'react-native-encrypted-storage';
import { CLOUD_BASEURL, checkIsSeries, getOTTLinkingUrl, openLinkingUrl } from 'utils/HelperFunctions';
import userProfileAPI from 'api/userProfileAPI';
import StringConstants from 'utils/StringConstants';
import ActionTypes from '../../stores/actionTypes';
import { CommonAppContext } from '../../stores/common/commonAppContext';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import FontFamily from 'utils/FontFamily';
import Logo from 'svg/logoWithNoBg';
import Mute from 'svg/mute';
import Unmute from 'svg/unmute';
import StarFilled from 'svg/star-main';
import RatingStart from 'svg/rating_star';
import { UserPrefsContext } from '../../stores/userPrefs/userPrefsContext';
import mixpanel from 'mixpanel';

export const ShortsShareCard: React.FC = ({
  activeIndex,
  selectedVideoId,
  onPlayVideo,
  isShare,
  item,
  hasOTTList,
  selectedOTTItem,
  onMovieClick,
  ViewableItem,
  userID,
  likeClickedOnDoubleTap,
  navigation,
  pauseVideo = false
}) => {
  const videoRef = useRef(null);
  const reelVideoRef = useRef<VideoRef>(null);

  const rating = item?.arrating;
  const parsedRating = parseFloat(rating);
  const [showVideo, setShowVideo] = useState(true);
  const [startLoading, setStartLoading] = useState(false);
  const [showMore, setShowMore] = useState(item?.feedText?.length > (SCREEN_WIDTH * 0.35));
  const [isPaused, setIsPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const { commonAppState, commonDispatch } = useContext(CommonAppContext);
  const { userPrefsState, dispatch } = useContext(UserPrefsContext);

  useEffect(() => {
    if (selectedVideoId != item?.videoLink && isShare != true) {
      onPlayVideo('NA');
    }
  }, [activeIndex]);

  useEffect(() => {
    setStartLoading(true);
    return () => {
      setStartLoading(false);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  const onChangeState = (e) => {
    if (e == 'playing') {
      onPlayVideo(item?.videoLink);
    }
  };

  const onPlayError = (error?) => {
    setShowVideo(false);
  };

  const ratingBar = () => {
    return (
      <View style={[CommonStyles.rowSpaceBetween, styles.ratingView]}>
        <View style={[CommonStyles.flexDirRow, styles.ratingInnerView]}>
          <RatingStart height={36} width={36} />
          <View style={styles.progressBar}>
            <View style={[CommonStyles.rowSpaceBetween]}>
              <Text style={styles.rating}>{StringConstants.RATING}</Text>
              <Text style={[styles.rating]}>{`${item?.arrating}/5`}</Text>
            </View>
            <Progress.Bar
              color={AppColors.GREY_VARIANT1}
              progress={parsedRating / 5}
              width={SCREEN_WIDTH * 0.78}
              height={10}
              borderWidth={0}
              unfilledColor={AppColors.GREY_VARIANT6}
              borderRadius={11}
            />
          </View>
        </View>
      </View>
    );
  };

  //show logo on youtube video
  const logoUI = () => {
    return (
      <View style={[styles.newGrpContainer, { opacity: 1, borderRadius: 20 }]}>
        <Image
          source={require('assets/BlackBee.png')}
          fadeDuration={0}
          style={{
            width: 10,
            height: 20,
          }}
        />
      </View>
    );
  };

  let isSeries =
    checkIsSeries(item?.releasedate) ||
    item?.isseries == 'true' ||
    item?.isseries == true;

  useEffect(() => {
    if (ViewableItem === item?.id) {
      setIsPaused(pauseVideo)
    }
    else setIsPaused(true);
  }, [ViewableItem, pauseVideo]);

  //mute unmute reel
  const toggleMute = () => {
    commonDispatch({
      type: ActionTypes.IS_MUTED,
      payload: !commonAppState?.isMuted,
    });
  };

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      if (item?.postType == 'REEL') runOnJS(toggleMute)();
    });

  // function to like reel on double tap
  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      if (item?.postType == 'REEL') runOnJS(likeClickedOnDoubleTap)();
    });

  //show volume and ott button on top of screen
  const renderVolumeAndOttButton = () => {
    return (
      <View style={styles.ottContainer}>
        <View style={[CommonStyles.flexDirRow, styles.ottVolumeInner, Platform.OS == 'ios' && {marginTop: 16}]}>
          {item?.postType == 'REEL' ? renderVolumeButton() : <></>}
          <TouchableOpacity style={styles.ottInnerContainer} onPress={() => openOTT()}>
            {renderOttView()}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderVolumeButton = () => {
    return (
      <TouchableOpacity
        style={styles.volumeBtnContainer}
        onPress={() => toggleMute()}
      >
        {commonAppState?.isMuted 
          ? 
            <Mute height={24} width={24} />
          :
            <Unmute height={24} width={24} />
        }
      </TouchableOpacity>
    );
  };

  const openOTT = () => {
    let ottID, networkProvider;
    ottID = selectedOTTItem?.ottitemid;
    networkProvider = selectedOTTItem?.code;

    // Log which ott was clicked
    mixpanel.track('OTTClicked', {
      ottName: networkProvider,
      screen: 'ShortsScreen',
    });
    let appUrl = '';

    appUrl = getOTTLinkingUrl(networkProvider, userPrefsState?.prefsData?.ott, ottID, item?.title, false);
    if(appUrl)
    openLinkingUrl(appUrl);
  };

  const renderOttView = () => {
    return (
      hasOTTList &&
      selectedOTTItem != null && (
        <View style={[styles.ott]} >
          <FastImage
            source={{
              uri: CLOUD_BASEURL + selectedOTTItem?.logoName,
            }}
            style={styles.ottImage}
          />
        </View>
      )
    );
  };

  //show reels video if posttype is reel
  const renderReelView = () => {
    return (
      <Video
        source={{
          uri: item?.videoLink,
        }}
        ref={reelVideoRef} // Store reference
        ignoreSilentSwitch="ignore"
        onError={(error) => onPlayError(error)} // Callback when video cannot be loaded
        style={styles.reelStyle}
        fullscreenAutorotate={true}
        resizeMode={item?.mode == 'landscape' ? 'contain' : 'cover'}
        controls={false}
        rate={1.0}
        paused={isPaused}
        repeat={true}
        muted={commonAppState?.isMuted}
        useTextureView={false}
        bufferConfig={{
          cacheSizeMB: 5,
        }}
      />
    );
  };

  //show video in youtube player if posttype type is review
  const renderYoutubePlayerView = () => {
    return (
      <YoutubePlayer
        ref={videoRef}
        height={SCREEN_WIDTH * 0.58}
        play={selectedVideoId == item?.videoLink && selectedVideoId != null}
        mute={commonAppState?.isMuted}
        forceAndroidAutoplay={false}
        videoId={item?.videoLink}
        onChangeState={onChangeState}
        webViewProps={{
          allowsInlineMediaPlayback: false,
          playing: true,
        }}
        webViewStyle={{ opacity: 0.99 }}
        onError={() => onPlayError()}
      />
    );
  };

  //show full video description when clicked on more
  const renderFullDescriptionView = () => {
    return (
      <View style={[item?.feedText?.length > (SCREEN_WIDTH * 0.35) && { height: 170 }]}>
        <ScrollView nestedScrollEnabled={true} persistentScrollbar={true}>
          <Text
            style={[
              styles.description,
              {
                width: SCREEN_WIDTH * 0.83,
              },
            ]}
          >
            {item?.feedText}
            { 
              item?.feedText?.length > SCREEN_WIDTH * 0.35 &&
              <TouchableOpacity
                style={styles.positionRelative}
                onPress={() => setShowMore(true)}
              >
                <Text
                  style={[styles.txtBody, Platform.OS == 'ios' && { left: 16 }]}
                >
                  {' '}
                  less
                </Text>
              </TouchableOpacity>
            }
          </Text>
        </ScrollView>
      </View>
    );
  };

  //show short description of video
  const renderShortDescriptionView = () => {
    return (
      <Text style={[styles.description, { width: SCREEN_WIDTH * 0.83 }]}>
        {item?.feedText.substring(0, SCREEN_WIDTH * 0.35).trim()}...
        <TouchableOpacity
          style={[styles.positionRelative]}
          onPress={() => setShowMore(false)}
        >
          <Text style={[styles.txtBody, Platform.OS == 'ios' && { left: 16 }]}>
            {' '}
            more
          </Text>
        </TouchableOpacity>
      </Text>
    );
  };

  //show movie name, icon and other details
  const renderMoviewView = () => {
    return (
      <View style={[CommonStyles.flexDirRow, styles.movieInfo]}>
        <TouchableOpacity
          onPress={() => onMovieClick(item?.movieId)}
          style={[styles.bottomView, { width: SCREEN_WIDTH * 0.77 }]}
        >
          {((item?.image && item?.image != '') ||
            (item?.posterImage && item?.posterImage != '')) && (
            <Image
              source={{
                uri:
                  item?.posterImage && item?.posterImage != ''
                    ? item?.posterImage
                    : item?.image,
              }}
              style={styles.movieImage}
            />
          )}
          <View>
            <Text numberOfLines={1} style={styles.title}>
              {item?.title}
            </Text>
            <View>
              <View style={CommonStyles.rowAlignCenter}>
                {
                  item?.title &&
                  <Text style={styles.movieInfoText}>
                    {isSeries ? StringConstants.SERIES : StringConstants.MOVIE}
                    {' | '}
                  </Text>
                }
                {!item.arrating ? null : <StarFilled width={15} height={15} />}
                {!item.arrating ? null : (
                  <Text
                    style={[
                      styles.movieInfoText,
                      {
                        marginLeft: 2,
                      },
                    ]}
                  >
                    {item.arrating + ' | '}
                  </Text>
                )}
                <Text numberOfLines={1} style={styles.subTitle}>
                  {item?.titleSubText}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderImageView = (isShare) => {
    return (
      ((item?.image && item?.image != '') ||
        (item?.posterImage && item?.posterImage != '')) && (
        <Image
          source={{
            uri:
              item?.image && item?.image != ''
                ? item?.image
                : item?.posterImage,
          }}
          style={[
            styles.image,
            isShare ? {} : styles.poster,
          ]}
        />
      )
    );
  };

  //ui for sharing reel
  const renderShareMovieView = () => {
    return (
      <View style={[CommonStyles.flexDirRow, styles.movieInfo]}>
        <TouchableOpacity
          onPress={() => onMovieClick(item?.movieId || item?.movieid || item?.id)}
          style={[styles.bottomView, styles.shareStyleForTitle]}
        >
          {((item?.image && item?.image != '') ||
            (item?.posterImage && item?.posterImage != '')) && (
            <Image
              source={{
                uri:
                  item?.posterImage && item?.posterImage != ''
                    ? item?.posterImage
                    : item?.image,
              }}
              style={styles.movieImage}
            />
          )}
          <View>
            <Text numberOfLines={1} style={styles.title}>
              {item?.title}
            </Text>
            <Text style={styles.subTitle}>{item?.titleSubText}</Text>
          </View>
          {renderOttView()}
        </TouchableOpacity>
      </View>
    );
  };

  //function to "steal" taps absolutely positioned to the top height must be adjusted to just cover the top 3 dots
  const renderStealTapView = () => {
    return <TouchableOpacity style={CommonStyles.videoPlayer} />;
  };

  // navigate to user profile 
  const userPressed = () => {
    mixpanel.track("Nav_UserProfile", {
      screen: "ShortsTab",
      uid: item?.user?.id,
      source: "ShortsTab",
    });
    if (item?.user?.id === userID) {
      navigation.navigateDeprecated('Profile');
    } else {
      navigation.navigateDeprecated("RBUserProfileScreen", { userid: item?.user?.id });
    }
  }

  // show user info
  const renderUserInfo = () => {
    return (
      <TouchableOpacity style={[CommonStyles.rowAlignCenter, {marginLeft: 17}]} onPress={() => userPressed()}>
        {(item?.user?.thumbnail != null && item?.user?.thumbnail != '' && item?.user?.thumbnail) ? 
            <Image
              source={{ uri: item?.user.thumbnail }}
              style={[
                styles.userImage,
                
              ]}
          />
          :
            <View style={styles.userImage}>
              <DefaultUser height={scaledHeight(18)} width={scaledHeight(18)} />
            </View>
          }
          {item?.user?.name && <Text numberOfLines={1} style={styles.userName}>
              {item?.user?.name}
            </Text>}
      </TouchableOpacity>
    )
  }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <>
          {isShare ? (
            <View style={[styles.horizontalSpace, styles.container]}>
              <View style={[styles.shareButtonContainer]}>{logoUI()}</View>
              {renderImageView(isShare)}
              <View>
                {renderShareMovieView()}
                {item?.arrating != null && item?.arrating && ratingBar()}
              </View>
              <Text style={[styles.description, { width: SCREEN_WIDTH - 16 }]}>
                {item?.feedText}
              </Text>
              <View style={styles.center}>
                <Text style={[styles.metaData, { marginVertical: 18 }]}>
                  {StringConstants.REVIEW_SHOTS}
                </Text>
                <Logo height={44} width={scaledWidth(106)} />
              </View>
            </View>
          ) : (
            <View style={[styles.container]}>
              {renderVolumeAndOttButton()}
              {item?.videoLink && showVideo ? (
                <GestureDetector
                  gesture={Gesture.Exclusive(doubleTap, singleTap)}
                >
                  <View
                    style={[
                      styles.txtContainer,
                      {
                        marginTop:
                          item?.postType == 'REEL' ? 0 : scaledHeight(125),
                      },
                    ]}
                  >
                    {item?.postType != 'REEL' && (
                      <View style={[styles.shareButtonContainer]}>
                        {logoUI()}
                      </View>
                    )}
                    {startLoading &&
                      (item?.postType == 'REEL'
                        ? isFocused && renderReelView()
                        : renderYoutubePlayerView())}
                    {item?.postType != 'REEL' && renderStealTapView()}
                  </View>
                </GestureDetector>
              ) : (
                <>{renderImageView(isShare)}</>
              )}
              <View style={styles.descOuterCont}>
                {renderUserInfo()}
                {(item?.titleSubText || item?.image || item?.posterImage  || item.arrating || item?.titleSubText) ?  renderMoviewView() : <View style={styles.height15} />}
                {!showMore
                  ? renderFullDescriptionView()
                  : renderShortDescriptionView()
                }
              </View>
            </View>
          )}
        </>
      )}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  ottImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  movieInfoText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
  },
  ratingView: {
    alignItems: 'center',
    paddingLeft: 16,
    marginTop: 8,
  },
  ratingInnerView: {
    alignItems: 'center',
    marginBottom: scaledHeight(10),
  },
  movieInfo: {
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
    marginTop: 12
  },
  horizontalSpace: { paddingHorizontal: scaledWidth(15) },
  container: { height: SCREEN_HEIGHT, backgroundColor: '#121212' },
  progressBar: {
    marginLeft: scaledWidth(10),
  },
  txtContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: AppColors.GREY_VARIANT2,
  },
  bottomView: {
    alignItems: 'center',
    padding: 2,
    flexDirection: 'row',
    borderRadius: 3,
  },
  description: {
    fontSize: 15,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE_VARIANT2,
    paddingLeft: 16,
    width: SCREEN_WIDTH * 0.83,
  },
  shareStyleForTitle: {
    width: SCREEN_WIDTH * 0.77,
  },
  title: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    width: SCREEN_WIDTH * 0.7,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    width: SCREEN_WIDTH * 0.405,
  },
  shareButtonContainer: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 10,
  },
  newGrpContainer: {
    borderRadius: 4,
    width: 32,
    height: 32,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
    //opacity: 0.6
  },
  rating: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    marginBottom: 3,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.5667,
    marginBottom: 12,
  },
  ott: {
    borderRadius: 5,
  },
  metaData: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    //marginTop: 25
  },
  movieImage: {
    width: scaledWidth(31),
    height: scaledWidth(44),
    marginVertical: 2,
    borderRadius: scaledWidth(0),
    marginRight: 8,
  },
  txtBody: {
    fontSize: 15,
    fontFamily: 'DMSans-Regular',
    top: 4,
    position: 'relative',
    color: AppColors.LIGHT_YELLOW,
    opacity: 0.8,
  },
  ottContainer: {
    // justifyContent: 'flex-end',
    // marginRight: 16,
    // marginTop: 10,
    position: 'absolute',
    top: Platform.OS == 'ios' ? 30 : 12,
    width: SCREEN_WIDTH,
    zIndex: 10,
  },
  volumeBtnContainer: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: AppColors.GREY_VARIANT6,
    borderRadius: 25,
  },
  ottInnerContainer: {
    alignItems: 'center',
    padding: 2,
    flexDirection: 'row',
    backgroundColor: AppColors.GREY_VARIANT8,
    borderRadius: 3,
  },
  shareText: { justifyContent: 'center', alignItems: 'center' },
  descOuterCont: { marginTop: 10, position: 'absolute', bottom: 100 },
  positionRelative: { position: 'relative' },
  center: { justifyContent: 'center', alignItems: 'center' },
  reelStyle: {
    height: SCREEN_HEIGHT - scaledHeight(57),
    width: SCREEN_WIDTH,
  },
  volumeBtn: {
    width: 24,
    height: 24,
  },
  ottVolumeInner: { justifyContent: 'space-between', paddingHorizontal: 16 },
  userImage: {
    height: scaledWidth(18),
    width: scaledWidth(18),
    borderRadius: scaledWidth(18),
    marginRight: 4
  },
  userName: {
    fontSize: 14,
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansBold,
    maxWidth: SCREEN_WIDTH * 0.7
  },
  height15: {height: 15},
  poster: { marginTop: scaledHeight(125), height: SCREEN_WIDTH }
});
