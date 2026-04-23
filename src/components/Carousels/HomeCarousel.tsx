import React, { useState, useRef, useCallback, FC } from 'react';
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-reanimated-carousel';
import CarouselCard from 'components/Cards/CarouselCard';
import CarouselImageCard from 'components/Cards/CarouselImageCard';

import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import StringConstants from 'utils/StringConstants';
import CommonStyles from '../../../Styles';
import AppColors from 'utils/Colors';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import { RecoGeneratorCard } from '../Cards/RecoGeneratorCard';
import FontFamily from '../../utils/FontFamily';

export type HomeCarouselProps = {
  data?: any;
  titleText?: string;
  noResultsText?: string;
  onMovieClick?: Function;
  onAddClick?: (id: any, isWatchlisted: any, source: string) => void;
  onMoreClick?: Function;
  onFeedbackClick?: Function;
  likeClicked?: Function;
  onCardPress: Function;
  commonAppState: any,
  isCritic: any,
  ottClicked: Function,
  dailyPicksOtts: any,
  countryCode: any,
  onReviewClick?: Function,
  createPostClicked?: Function,
  preferredOttNames?: string[],
  onRemoveCard?: (movieId: string) => void,
};
const HomeCarousel: FC<HomeCarouselProps> = ({
  data,
  titleText,
  noResultsText,
  onMovieClick,
  onAddClick,
  onMoreClick,
  onFeedbackClick,
  likeClicked,
  onCardPress,
  onReviewClick,
  createPostClicked,
  commonAppState,
  isCritic = false,
  ottClicked: _ottClicked,
  dailyPicksOtts: _dailyPicksOtts,
  countryCode,
  preferredOttNames,
  onRemoveCard
}) => {
  const [carouselActiveSlideIndex, setCarouselActiveSlideIndex] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const renderCarouselItem = useCallback(({ item, index }: { item: any; index: number }) => {
    if (item && item.type === 'reco-generator') {
      return (
        <View style={styles.itemWrapper}>
          <RecoGeneratorCard onCardPress={onCardPress} />
        </View>
      );
    }
    // return (
     //  <CarouselCard
     //    key={item.id || index}
     //    item={item}
     //    activeIndex={carouselActiveSlideIndex}
     //    index={index}
     //    onReviewClick={onReviewClick}
     //    onMovieClick={(movieID: any, item: any, autoPlay: any) => {
     //      if (onMovieClick) onMovieClick(movieID, item, autoPlay, data);
     //    }}
     //    onFeedbackClick={onFeedbackClick}
     //    likeClicked={likeClicked}
     //    isCritic={isCritic}
     //    createPostClicked={createPostClicked}
     //    onAddClick={(id: any, isWatchlisted: any) => {
     //      if (onAddClick) onAddClick(id, isWatchlisted, 'daily_picks');
     //    }}
     //    countryCode={countryCode}
     //  />
     //);
     return (
      <View style={styles.itemWrapper}>
        <CarouselImageCard
          key={item.id || index}
          item={item}
          onMovieClick={(movieID: any, item: any, autoPlay: any) => {
            if (onMovieClick) onMovieClick(movieID, item, autoPlay, data);
          }}
          countryCode={countryCode}
          onAddClick={onAddClick}
          commonAppState={{ ...commonAppState, setCarouselPaused: setIsCarouselPaused }}
          onReviewClick={onReviewClick}
          preferredOttNames={preferredOttNames}
          onRemoveCard={onRemoveCard}
        />
      </View>
     );
  }, [carouselActiveSlideIndex, onReviewClick, onMovieClick, onFeedbackClick, likeClicked, isCritic, createPostClicked, onAddClick, countryCode, data, onCardPress]);
 
  const snapToItem = (idx: number) => {
    // Handle loop mode by using modulo to get the correct index
    const actualIndex = idx % data.length;
    setCarouselActiveSlideIndex(actualIndex);
  };
  
  const handleProgressChange = useCallback((offsetProgress: number, absoluteProgress: number) => {
    setCurrentProgress(absoluteProgress);
    // Update the active slide index based on the current progress
    // For loop mode, we need to handle the case where data might be duplicated
    const newIndex = Math.round(absoluteProgress) % data.length;
    if (newIndex !== carouselActiveSlideIndex && newIndex >= 0 && newIndex < data.length) {
      setCarouselActiveSlideIndex(newIndex);
    }
  }, [carouselActiveSlideIndex, data.length]);
  
  // console.log("data",data);
  return (
    <View style={styles.bottomGap}>
      <View style={styles.titleContainer}>
        <Text style={[styles.txtBody, CommonStyles.flexOne]}>
          {titleText
            ? titleText
            : (commonAppState?.userRole != 'critic' && (!isCritic)
              ? StringConstants.TOP_3_DAILY_PICS_FOR_YOU
              : StringConstants.SEE_WHAT_IS_NEW)}
        </Text>
        { 
          commonAppState.userRole != 'critic' && !isCritic &&
            onMoreClick && (
            <TouchableOpacity
              style={styles.ott}
              onPress={() =>
                // Navigate to Upcoming Releases screen with Recent Releases flag
                onMoreClick({
                  // id: 'vaTR',
                  // url: 'AllRecos',
                  id: 'vaUpcomingRecent',
                  url: 'UpcomingReleases',
                  name: 'View more...',
                  showViewAll: true,
                  recentType: 'R'
                })
              }
            >
              <Text style={[styles.labelContainer, { color: AppColors.LIGHT_YELLOW }]}>
                {StringConstants.VIEW_ALL}
              </Text>
            </TouchableOpacity>
            )
      }
      </View>
      {noResultsText ? (
        <Text style={styles.noResultsText}>{noResultsText}</Text>
      ) : null}
      {/* {commonAppState.userRole != 'critic' && !isCritic && dailyPicksOtts?.length > 0 && 
        <View style={[CommonStyles.flexRowWrap, CommonStyles.paddingHorizontal16]}> 
          <OttCircle otts={dailyPicksOtts} ottClicked={ottClicked} showNames={false} />
        </View>
      } */}
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={SCREEN_WIDTH}
          height={(SCREEN_WIDTH - 60) * 1.35}
          autoPlay={Array.isArray(data) && data.length > 1 && !isCarouselPaused}
          autoPlayInterval={2000}
          data={data}
          snapEnabled
          mode="parallax"
          modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 80,
              parallaxAdjacentItemScale: 0.5,
          }}
          scrollAnimationDuration={800}
          onSnapToItem={snapToItem}
          onProgressChange={handleProgressChange}
          renderItem={renderCarouselItem}
        />
      </View>
      <View style={styles.carouselIndicatorContainer}>
        {data.map((item: any, i: number) => (
          <View
            key={i}
            style={[
              styles.carouselIndicatorNode,
              carouselActiveSlideIndex === i &&
                styles.carouselIndicatorActiveNode,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselIndicatorContainer: {
    height: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: { 
    flexDirection: 'row', 
    paddingRight: 8 
  },
  bottomGap: { marginBottom: 24 },
  alignCenter: {alignItems: 'center'},
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselIndicatorNode: {
    height: 2,
    width: 8,
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: '#999',
  },
  carouselIndicatorActiveNode: {
    backgroundColor: '#F6CE3D',
    height: 2,//6
    width: 8,
  },
  txtBody: {
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    lineHeight: 20,
    paddingLeft: 16,
    marginBottom: 16,
  },
  labelContainer: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
  },
  noResultsText: {
    color: AppColors.GREY_VARIANT1,
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    textAlign: 'left',
    lineHeight: 16,
    marginTop: -16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom:8
  },
  ott: {
    width: Dimensions.get('window').width * 0.267,
    height: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 8,
    borderRadius: 12,
    flexDirection: 'row',
  },
});

export default React.memo(HomeCarousel);
