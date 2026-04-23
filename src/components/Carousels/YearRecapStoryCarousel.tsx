import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImgToBase64 from 'react-native-image-base64';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import Config from 'react-native-config';
import HorizontalProgressBar from '../Common/HorizontalProgressBar';
import MoreOptionsModal from 'components/Modals/MoreOptionsModal';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import LottieView from 'lottie-react-native';
import Sample from 'data/sample.json';
import YearWrap from 'data/lotties/camera.json';
import PopcornLottie from 'data/lotties/popcorn.json';
import TrophyLottie from 'data/lotties/trophy.json';
import ActionLottie from 'data/lotties/action.json';
import Year from 'svg/2023';
import ShareIcon from 'svg/share_icon_black';
import Replay from 'svg/replay_yellow_icon';
import Logo from 'svg/logoWithNoBg';
import MovieRoll from 'svg/movie_roll';
import Arrow from "svg/right_arrow_yellow";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  scaledHeight,
  scaledWidth,
} from 'utils/Dimensions';
import DefaultUser from 'svg/profile';
import { useIsFocused } from '@react-navigation/native';
import yearWrapAPI from 'api/yearWrapAPI';
import { LOG } from 'config';
import { getSuffixForNumber, getUserBadgeIcon, checkBadge } from 'utils/HelperFunctions';
var extendedLog = LOG.extend('YearRecapStoryCarousel');
import Leaderboard from 'svg/leaderboard';

import CrossButton from 'svg/white_cross_icon';
import CommonStyles from '../../../Styles';
import StringConstants from 'utils/StringConstants';
import { GradientNumbers } from '../GradientNumbers';
import { CommonAppContext } from '../../stores/common/commonAppContext';

const { width } = Dimensions.get('window');

const data = [
  { title: 'Story 1', progress: 0 },
  { title: 'Story 2', progress: 0 },
  { title: 'Story 3', progress: 0 },
  { title: 'Story 4', progress: 0 },
  { title: 'Story 5', progress: 0 },
  { title: 'Story 6', progress: 0 },
];

const actionArr = [
  { actionName: 'Share on your Insta Story', actionIcon: 'insta' },
  { actionName: 'Share on Others', actionIcon: 'share' },
];

const YearRecapStoryCarousel = ({ navigation, route }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stories, setStories] = useState(data);
  const [skipPage, setSkipPage] = useState(false);
  const [sortedGenreArray, setGenreArray] = useState([]);
  const [yearWrapData, setYearWrapData] = useState(null);
  const carouselRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const isFocused = useIsFocused();
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const ref = useRef();
  const [showScrollImage, setShowScrollImage] = useState(true);
  const [recapYear, setRecapYear] = useState('')
  const { commonAppState, commonDispatch } = useContext(CommonAppContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (skipPage) {
        clearInterval(interval);
      } else {
        setStories((prevStories) =>
          prevStories.map((story, index) => ({
            ...story,
            progress:
              index < activeIndex
                ? 1
                : index === activeIndex
                ? Math.min(story.progress + 0.2, 1)
                : story.progress,
          }))
        );
      }
    }, 1000);

    if (stories[activeIndex].progress >= 1) {
      clearInterval(interval);
      setActiveIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
    }

    if (skipPage) {
      setSkipPage(false);
    }

    return () => clearInterval(interval);
  }, [activeIndex, stories, skipPage]);

  const getYearWrapData = async () => {
    yearWrapAPI
      .fetchYearWrapData()
      .then((response) => {
        if (response && response.data) {
          setYearWrapData(response.data);
          if (response.data?.genres?.length > 0) {
            const sortedData = [...response.data?.genres].sort(
              (a, b) => parseInt(b?.count) - parseInt(a?.count)
            );
            setGenreArray(sortedData);
          }
        }
      })
      .catch((error) => {
        extendedLog.error(
          'Error in retreiving User Followinfo with message: ',
          error
        );
      });
  };

  useEffect(() => {
    if (isFocused) {
      getYearWrapData();
    }
  }, [isFocused]);

  useEffect(() => {
    if(route?.params?.campaignData?.length > 0){
      const yearData = route?.params?.campaignData?.filter((value) => value?.name == 'YEAR')
      try {
        if(yearData?.length > 0){
          const yearValue = new Date(yearData[0]?.startdate)?.getFullYear();
          if(!isNaN(yearValue)){
            setRecapYear(yearValue)
          }
        }
      }
      catch (error) {
        console.log('error retrieving recap year' + error)
      }
    }
  }, [route])

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.snapToItem(activeIndex);
    }
  }, [activeIndex]);

  const actionClicked = async (item, action) => {
    if (action.actionIcon == 'insta') {
      shareToInsta();
    } else if (action.actionIcon == 'share') {
      shareToOthers();
    }
  };

  const shareToInsta = async () => {
    const uri = await ref.current.capture();
    const base64Image = await ImgToBase64.getBase64String(uri);
    await Share.shareSingle({
      appId: Config.FACEBOOK_APP_ID,
      //stickerImage: uri,
      stickerImage: `data:image/png;base64,${base64Image}`,
      //backgroundImage: uri,
      social: Share.Social.INSTAGRAM_STORIES,
      backgroundBottomColor: '#1D1D1D', // You can use any hexcode here and below
      backgroundTopColor: '#1D1D1D',
      type: 'image/*',
    });
  };

  const shareToOthers = async () => {
    const uri = await ref.current.capture();
    Share.open({
      url: uri,
    });
  };

  //navigate to analytics screen
  const onAnalyticsPress = () => {
    navigation.navigateDeprecated(
      commonAppState?.isPremiumUser || commonAppState?.userRole == 'prof' 
      ? 'AdvancedAnalytics' : 'EngagementDashboard', {
      params: { fromScreen: 'TopRecoScreen' }
    });
  }

  //handle scroll
  const handleScroll = (event) => {
    const positionX = event.nativeEvent.contentOffset.x;
    const positionY = event.nativeEvent.contentOffset.y;
    if (positionY == 0) {
      setShowScrollImage(true);
    } else {
      setShowScrollImage(false);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        {index == 0 && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              onCardPress();
            }}
          >
            <View style={styles.innerContainer}>
              <View>
                <View style={styles.middleViewContainer}>
                  <Text style={[styles.lightsCameraText]}>
                    {'Lights!\nCamera!\nRecap!'}
                  </Text>
                  <LottieView
                    autoPlay
                    style={styles.lottieStyle}
                    source={YearWrap}
                  />
                </View>
                <Text style={styles.yearText}>{recapYear}</Text>
                <Text style={styles.yearEndWrap}>
                  {'Welcome to your exclusive Year-End Wrap.'}
                </Text>
              </View>
              <Text style={styles.readyToRoll}>
                {
                  "Let's take a nostalgic journey through your cinematic adventures of the year.\nReady to roll?"
                }
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {index == 1 && (
          <TouchableOpacity
            style={[styles.prodyCard, { alignItems: 'center' }]}
            onPress={() => {
              onCardPress();
            }}
          >
            <View style={[styles.innerContainer]}>
              <View>
                <Text style={styles.popcornPrody}>{'Popcorn Prodigy '}</Text>
                <Text style={styles.moviesAccompanied}>
                  {
                    'Wondering how many movies accompanied you through your popcorn supply this year?'
                  }
                </Text>
                <Text
                  style={[styles.yearText, { marginTop: scaledHeight(53) }]}
                >
                  {yearWrapData?.seenCount ?? '0'}
                </Text>
                <Text style={[styles.moviesWatched]}>{'MOVIES WATCHED'}</Text>
              </View>
            </View>
            <View
              style={[styles.popcornLottieStyle, { bottom: scaledHeight(52) }]}
            >
              <LottieView
                autoPlay
                style={{ height: scaledWidth(192), width: scaledWidth(192) }}
                source={PopcornLottie}
              />
            </View>
            <YearContainer />
          </TouchableOpacity>
        )}
        {index == 2 && (
          <TouchableOpacity
            style={[styles.prodyCard, { alignItems: 'center' }]}
            onPress={() => {
              onCardPress();
            }}
          >
            <View style={[styles.innerContainer, { alignItems: 'center' }]}>
              <View>
                <Text style={styles.popcornPrody}>{'Review Roulette'}</Text>
                <Text style={styles.moviesAccompanied}>
                  {'Remember those moments when a movie left you speechless?'}
                </Text>
                <Text
                  style={[styles.yearText, { marginTop: scaledHeight(53) }]}
                >
                  {yearWrapData?.reviewCount ?? '0'}
                </Text>
                <Text style={[styles.moviesWatched]}>{'MOVIES REVIEWED'}</Text>
              </View>
              <View
                style={[
                  styles.popcornLottieStyle,
                  { bottom: scaledHeight(18), paddingLeft: 48 },
                ]}
              >
                <LottieView
                  autoPlay
                  style={{ height: scaledWidth(192), width: scaledWidth(192) }}
                  source={ActionLottie}
                />
              </View>
            </View>
            <YearContainer />
          </TouchableOpacity>
        )}
        {index == 3 && (
          <TouchableOpacity
            style={[styles.prodyCard, { alignItems: 'center' }]}
            onPress={() => {
              onCardPress();
            }}
          >
            <View style={[styles.innerContainer, { alignItems: 'center' }]}>
              <View>
                <Text style={styles.popcornPrody}>{'Genre Gala'}</Text>
                <Text style={styles.moviesAccompanied}>
                  {
                    'Explore the vibes that filled your movie nights! Peek into the top genres that added color to your cinematic palette.'
                  }
                </Text>
                <Text
                  style={[
                    styles.moviesWatched,
                    { marginTop: scaledHeight(34) },
                  ]}
                >
                  {'TOP GENRE YOU PREFER'}
                </Text>
                {sortedGenreArray.length == 0 && (
                  <Text
                    style={[
                      styles.moviesAccompanied,
                      { marginTop: SCREEN_HEIGHT * 0.2 },
                    ]}
                  >
                    {
                      'Looks like you haven’t explored much this year. Let this be your new year resolution and dig into different genres with RecoBee.'
                    }
                  </Text>
                )}
              </View>
              {sortedGenreArray?.length > 0 && <RankingView />}
            </View>
            <YearContainer />
          </TouchableOpacity>
        )}
        {index == 4 && (
          <TouchableOpacity
            style={[styles.prodyCard, { alignItems: 'center' }]}
            onPress={() => {
              onCardPress();
            }}
          >
            <View style={[styles.innerContainer, { alignItems: 'center' }]}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.popcornPrody}>{'Cine Sorcerer'}</Text>
                <Text style={styles.moviesAccompanied}>
                  {
                    'Your reviews and lists are casting a spell on our leaderboard. See how well the magic boosted your rank!!'
                  }
                </Text>
                <View
                  style={[
                    styles.rankStatsView,
                    { marginTop: scaledHeight(77) },
                  ]}
                >
                  <Text style={[styles.yearText, { fontSize: 96 }]}>
                    {yearWrapData?.ranks?.rank ?? ''}
                  </Text>
                  <Text
                    style={[
                      styles.yearText,
                      {
                        fontSize: 48,
                        fontFamily: FontFamily.DMSansRegular,
                        marginBottom: 14,
                      },
                    ]}
                  >
                    {yearWrapData?.ranks?.rank != null &&
                    yearWrapData?.ranks?.rank != ''
                      ? getSuffixForNumber(yearWrapData?.ranks?.rank)
                      : ''}
                  </Text>
                </View>
                <Text style={[styles.moviesWatched]}>
                  {recapYear + ' LEADERBOARD RANK'}
                </Text>
                <View
                  style={[
                    styles.rankStatsView,
                    { marginTop: scaledHeight(44) },
                  ]}
                >
                  <Text style={[styles.yearText, { fontSize: 48 }]}>
                    {yearWrapData?.ranks?.yearRank ?? ''}
                  </Text>
                  <Text
                    style={[
                      styles.yearText,
                      {
                        fontSize: 32,
                        fontFamily: FontFamily.DMSansRegular,
                        marginBottom: 6,
                      },
                    ]}
                  >
                    {yearWrapData?.ranks?.yearRank != null &&
                    yearWrapData?.ranks?.yearRank != ''
                      ? getSuffixForNumber(yearWrapData?.ranks?.yearRank)
                      : ''}
                  </Text>
                </View>
                <Text
                  style={[styles.moviesWatched, { width: scaledWidth(250) }]}
                >
                  {'YOUR RANK IN DEC ' + recapYear}
                </Text>
              </View>
            </View>
            <YearContainer />
          </TouchableOpacity>
        )}
        {index == 5 && (
          <View style={{height: SCREEN_HEIGHT * 0.9, flex: 1, width: '100%'}}>
          <ScrollView
            contentContainerStyle={[styles.statsSummaryView]}
            onScrollToTop={() => setShowScrollImage(true)}
            onScroll={(s) => {
              handleScroll(s);
            }}
          >
            <ViewShot
              ref={ref}
              options={{
                format: 'jpg',
                quality: 0.9,
                fileName: `RecoBee-${recapYear}-Recap-Card`,
              }}
              style={[styles.statsSummaryInnerView, {height: SCREEN_HEIGHT * 0.7}]}
            >
              <View style={[styles.statsSummaryInnerView]}>
                <View style={{ alignItems: 'center' }}>
                  <Logo height={44} width={106} />
                  <View style={styles.profileCardContainer}>
                    <ProfileCard />
                  </View>
                  <View style={styles.reviewedAndWatched}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={[styles.summaryInfoText]}>
                        {yearWrapData?.seenCount ?? '0'}
                      </Text>
                      <Text style={[styles.summaryInfoDesc]}>
                        {'MOVIES WATCHED'}
                      </Text>
                    </View>
                    <View style={{ width: 45 }} />
                    <View style={{ alignItems: 'center' }}>
                      <Text style={[styles.summaryInfoText]}>
                        {yearWrapData?.reviewCount ?? '0'}
                      </Text>
                      <Text style={[styles.summaryInfoDesc]}>
                        {'MOVIES REVIEWED'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.genreContainer}>
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={[
                          styles.summaryInfoText,
                          { fontSize: 24, marginBottom: 1 },
                          sortedGenreArray?.length == 0
                            ? { color: AppColors.GREY_VARIANT5 }
                            : {},
                        ]}
                      >
                        {sortedGenreArray?.length > 0
                          ? sortedGenreArray[0]?.genre
                          : 'N/A'}
                      </Text>
                      <Text style={[styles.summaryInfoDesc]}>
                        {'FAVORITE GENRE'}
                      </Text>
                    </View>
                    <View style={{ width: 45 }} />
                    <View style={{ alignItems: 'center' }}>
                      <View style={styles.rowFlexEnd}>
                        <Text
                          style={[styles.summaryInfoText, { fontSize: 36 }]}
                        >
                          {yearWrapData?.ranks?.rank ?? ''}
                        </Text>
                        <Text style={[styles.yearText, styles.thText]}>
                          {yearWrapData?.ranks?.rank != null &&
                          yearWrapData?.ranks?.rank != ''
                            ? getSuffixForNumber(yearWrapData?.ranks?.rank)
                            : ''}
                        </Text>
                      </View>
                      <Text style={[styles.summaryInfoDesc]}>
                        {'LEADERBOARD RANK'}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.moviesAccompanied,
                      { marginTop: 34 },
                    ]}
                  >
                    {
                      "Wrapped the year in cinematic style!"
                    }
                  </Text>
                  <View style={styles.bar} />
                </View>
                <YearContainer />
              </View>
            </ViewShot>

            <View style={styles.replayAndShareButton}>
              <TouchableOpacity
                style={[styles.buttonContainer, {}]}
                onPress={() => {
                  replay();
                }}
              >
                <Replay height={20} width={20} />
                <Text style={[styles.buttonText]}>{'Replay'}</Text>
              </TouchableOpacity>
              <View style={{ width: 28 }} />
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { backgroundColor: AppColors.LIGHT_YELLOW },
                ]}
                onPress={() => onShare()}
              >
                <ShareIcon height={20} width={20} />
                <Text style={[styles.buttonText, { color: AppColors.BLACK }]}>
                  {'Share'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.emptyView} />
            {
              showScrollImage ?
                <Image source={require('../../../assets/down_animation.gif')} 
                  style={styles.downArrow} 
                />
                :
                <View style={styles.downArrow} />
            }
            <View style={[styles.starRow, CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]}>
              <Image source={require('../../../assets/half_star.png')}
                  style={[styles.star, {marginLeft: - scaledWidth(67)}]} 
                />
              <Image source={require('../../../assets/down_animation.gif')} 
                  style={styles.downArrowCenter} 
                />
              <Image source={require('../../../assets/half_star.png')} 
                  style={[styles.star, styles.rightStar]} 
                />
            </View>
            <View style={[styles.emptyView, {backgroundColor: AppColors.BLACK, height: 35}]} />
            <TouchableOpacity style={styles.analytics} onPress={() => onAnalyticsPress()}>
              <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter, {marginBottom: 8}]}>
                <View style={[CommonStyles.rowAlignCenter]}>
                  <View style={styles.analyticsCircle}>
                    <Leaderboard />
                  </View>
                  <Text style={styles.yourAnalytics}>{StringConstants.YOUR_YEARLY_ANALYTICS}</Text>
                </View>
                <Arrow height={20} width={20} />
              </View>
              <Text style={styles.info}>{StringConstants.YEARLY_ANALYTICS_INFO}</Text>
            </TouchableOpacity>
            <MovieRoll />
            <View style={[CommonStyles.rowAlignCenter, {marginTop: -84}]}>
              <GradientNumbers value={'2'} fontWidth={"62"} fontSize={"90"}/>
              <GradientNumbers value={'0'} fontWidth={"62"} fontSize={"90"}/>
              <GradientNumbers value={'2'} fontWidth={"62"} fontSize={"90"}/>
              <GradientNumbers value={'4'} fontWidth={"62"} fontSize={"90"}/>
            </View>
            
            <View style={[styles.emptyView, {backgroundColor: AppColors.BLACK}]} />

          </ScrollView>
          </View>
        )}
        {moreOptionsVisible ? (
          <MoreOptionsModal
            toggleModal={moreOptionsVisible}
            cancelClick={() => setMoreOptionsVisible(false)}
            actions={actionArr}
            onClick={(item, a) => actionClicked(item, a)}
          />
        ) : null}
      </>
    );
  };

  const onShare = async () => {
    setMoreOptionsVisible(true);
  };

  const replay = () => {
    setSkipPage(true);
    setStories((prevStories) =>
      prevStories.map((story, index) => ({
        ...story,
        progress: 0,
      }))
    );
    setActiveIndex(0);
  };

  const calculateHeight = (count, maxCount, maxHeight) => {
    const ratio = count / maxCount;
    return Math.floor(ratio * maxHeight);
  };

  const RankingView = () => {
    let dramaMovieItem = sortedGenreArray[2] ?? { genre: 'Drama', count: 3 };
    let actionMovieItem = sortedGenreArray[0] ?? { genre: 'Action', count: 2 };
    let crimeMovieItem = sortedGenreArray[1] ?? { genre: 'Crime', count: 1 };

    return (
      <View style={styles.rankView}>
        <RankInfo item={dramaMovieItem} index={0} />
        <View style={{ width: 10 }} />
        <RankInfo item={actionMovieItem} index={1} />
        <View style={{ width: 10 }} />
        <RankInfo item={crimeMovieItem} index={2} />
      </View>
    );
  };

  const RankInfo = ({ item, index }) => {
    let count =
      typeof item?.count == 'string' ? parseInt(item?.count) : item?.count;
    let viewHeight = calculateHeight(
      parseInt(count),
      sortedGenreArray.length > 0 ? sortedGenreArray[0]?.count : 3,
      165
    );
   
    let rank = sortedGenreArray.findIndex(
      (value) => value.genre === item.genre
    );
    let title =
      sortedGenreArray.length > 0
        ? `${rank + 1}. ${item.genre}`
        : `${index + 1}. ${item.genre}`;
    let backgroundColor =
      rank + 1 == 2
        ? AppColors.LIGHT_YELLOW3
        : rank + 1 == 1
        ? AppColors.LIGHT_YELLOW2
        : AppColors.LIGHT_YELLOW_VARIANT2;

    return (
      <View style={{ alignItems: 'center' }}>
        {viewHeight == 165 && (
          <LottieView
            autoPlay
            style={styles.trophyImageStyle}
            source={TrophyLottie}
          />
        )}
        <View
          style={[
            {
              height: scaledHeight(viewHeight),
              backgroundColor: backgroundColor,
            },
            styles.rankContainer,
          ]}
        >
          <Text style={styles.rankInfo}>{title}</Text>
        </View>
      </View>
    );
  };

  const ProfileCard = ({}) => {
    let userRole = `${yearWrapData?.userrole ?? ''}`;
    let userTag = `${yearWrapData?.usertag ?? ''}`;
    let userDP = `${yearWrapData?.userimage ?? ''}`;
    return (
      <TouchableOpacity style={styles.profileCard}>
        {userDP == null || userDP == '' ? (
          <View style={styles.defaultUserStyle}>
            <DefaultUser height={scaledHeight(44)} width={scaledHeight(44)} />
          </View>
        ) : (
          <Image
            source={{ uri: userDP }}
            style={[
              styles.image,
              { marginVertical: scaledHeight(7), marginRight: scaledWidth(8) },
            ]}
          />
        )}

        <View style={{ justifyContent: 'center', marginLeft: scaledWidth(6) }}>
          <View style={{ flexDirection: 'row', marginRight: scaledWidth(12) }}>
            <Text
              numberOfLines={1}
              style={[
                styles.drawerText,
                { fontSize: 14, maxWidth: scaledWidth(120) },
              ]}
            >
              {/* {userName} */}
              {`${yearWrapData?.name ?? ''}`}
            </Text>
            {(checkBadge(userRole)) && (
                <View style={{ padding: 1, paddingLeft: scaledWidth(6)}}>
                  {getUserBadgeIcon(userRole)}
                </View>
                )
              }
          </View>
          <Text
            style={[
              styles.drawerText,
              {
                fontSize: 10,
                color: AppColors.GREY_VARIANT9,
                marginTop: 1,
                width: scaledWidth(128),
              },
            ]}
          >
            @{userTag}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const YearContainer = ({}) => {
    return (
      <View style={{ position: 'absolute', bottom: -35, opacity: 0.1 }}>
        <Text style={{color: AppColors.GREY_VARIANT4, fontSize: 114, fontFamily: FontFamily.DMSansBold}}>{recapYear}</Text>
      </View>
    );
  };

  const onSnapToItem = (index) => {
    setActiveIndex(index);
  };

  const onCardPress = () => {
    if (activeIndex < data.length - 1) {
      setStories((prevStories) =>
        prevStories.map((story, index) => ({
          ...story,
          progress: index < activeIndex + 1 ? 1 : 0,
        }))
      );
      setActiveIndex(activeIndex + 1);

      carouselRef.current.snapToItem(activeIndex);
    }
    setSkipPage(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBars}>
        {stories.map((story, index) => (
          <HorizontalProgressBar key={index} progress={story.progress} />
        ))}
      </View>
      <TouchableOpacity
        style={{ padding: 5, alignSelf: 'flex-end' }}
        onPress={() => navigation.goBack()}
      >
        <CrossButton height={30} width={30} />
      </TouchableOpacity>
      <Carousel
        data={stories}
        renderItem={renderItem}
        ref={carouselRef}
        sliderWidth={width}
        itemWidth={width}
        scrollEnabled={false}
        onSnapToItem={onSnapToItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
  },
  rankView: {
    position: 'absolute',
    bottom: scaledHeight(26),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  popcornLottieStyle: { position: 'absolute', bottom: scaledHeight(38) },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rankContainer: { width: scaledWidth(94), padding: 7 },
  middleViewContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: scaledHeight(76),
  },
  defaultUserStyle: {
    alignContent: 'center',
    height: scaledHeight(50),
    paddingTop: scaledHeight(7),
  },
  trophyImageStyle: { width: scaledWidth(60), height: scaledHeight(94) },
  rankStatsView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  progressBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  drawerText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  statsSummaryView: {
    flexGrow: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingTop: 4,
    backgroundColor: AppColors.BLACK,
  },
  lottieStyle: {
    height: scaledHeight(133),
    width: scaledWidth(165),
    position: 'absolute',
    top: scaledHeight(Platform.OS == 'ios' ? 20 : 34),
    left: scaledWidth(Platform.OS == 'ios' ? 45 : 57),
  },
  lightsCameraText: {
    fontSize: 32,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    //marginBottom: 90,
    marginRight: scaledWidth(5),
  },
  replayAndShareButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 5,
    marginTop: -49
  },
  yearWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: AppColors.ERROR_RED,
    width: SCREEN_WIDTH - 32
  },
  bar: {
    width: SCREEN_WIDTH - 68,
    backgroundColor: AppColors.GREY_VARIANT4,
    height: 0.4,
    marginTop: 25,
  },
  thText: {
    fontSize: 26,
    fontFamily: FontFamily.DMSansRegular,
    marginBottom: 4,
  },
  summaryInfoText: {
    fontSize: 36,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.LIGHT_YELLOW,
  },
  genreContainer: {
    marginTop: scaledHeight(24),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  reviewedAndWatched: {
    marginTop: scaledHeight(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.LIGHT_YELLOW,
  },
  profileCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCardContainer: {
    backgroundColor: AppColors.GREY_VARIANT8,
    borderRadius: 6,
    paddingVertical: scaledHeight(4),
    width: SCREEN_WIDTH * 0.65,
    borderWidth: 1,
    borderColor: AppColors.GREY_VARIANT6,
    marginTop: scaledHeight(14),
  },
  rowFlexEnd: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    borderRadius: 8,
    paddingVertical: 9,
    width: 120,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.LIGHT_YELLOW,
  },
  statsSummaryInnerView: {
    alignItems: 'center',
    backgroundColor: AppColors.GREY_VARIANT2,
    width: SCREEN_WIDTH - 32,
    paddingTop: scaledHeight(19),
    paddingHorizontal: scaledWidth(17),
    justifyContent: 'space-between',
    height: SCREEN_HEIGHT * 0.67,
  },
  greyedOutYear: {
    fontSize: 120,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREY_VARIANT5,
    textAlign: 'center',
  },
  moviesWatched: {
    fontSize: 15,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    textAlign: 'center',
    letterSpacing: 3,
  },
  summaryInfoDesc: {
    fontSize: 10,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    letterSpacing: 2,
  },
  popcornPrody: {
    fontSize: 28,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    textAlign: 'center',
  },
  rankInfo: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREY_VARIANT2,
  },
  moviesAccompanied: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    textAlign: 'center',
    marginTop: scaledHeight(39),
  },
  yearText: {
    fontSize: 106,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.LIGHT_YELLOW,
    textAlign: 'center',
  },
  yearEndWrap: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    textAlign: 'center',
  },
  readyToRoll: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE,
    marginTop: scaledHeight(106),
  },
  card: {
    flex: 1,
    paddingVertical: scaledHeight(43),
    paddingHorizontal: scaledWidth(43),
  },
  prodyCard: {
    flex: 1,
    paddingHorizontal: scaledWidth(43),
    paddingTop: scaledHeight(4),
    paddingBottom: scaledHeight(42),
    backgroundColor: AppColors.BLACK,
  },
  cardText: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    height: scaledHeight(44),
    width: scaledHeight(44),
    borderRadius: scaledHeight(25),
  },
  downArrow: {
    alignSelf: 'center', 
    height: scaledWidth(64), 
    width: scaledWidth(64),
    marginTop: - 34
  },
  emptyView: {
    backgroundColor: AppColors.GREY_VARIANT2,
    height: 50,
    width: '100%',
  },
  starRow: {
    width: SCREEN_WIDTH
  },
  downArrowCenter: {
    height: scaledWidth(92),
    width: scaledWidth(92)
  },
  analytics: {
    backgroundColor: AppColors.GREY_VARIANT2,
    borderRadius: 8,
    padding: 16,
    width: SCREEN_WIDTH - 32
  },
  analyticsCircle: {
    height: scaledWidth(32),
    width: scaledWidth(32),
    borderRadius: scaledWidth(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.GREY_VARIANT6,
    marginRight: 8
  },
  yourAnalytics: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  info: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
  },
  star: {
    height: scaledWidth(134), 
    width: scaledWidth(134)
  },
  rightStar: {
    marginRight: - scaledWidth(67),
    transform: [{ rotate: '270deg' }]
  }
});

export default YearRecapStoryCarousel;
