import React, { FC, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledHeight, scaledWidth } from 'utils/Dimensions';
import StringConstants from 'utils/StringConstants';
import { TriviaCard } from '../Cards/TriviaCard';
import { StreakCard } from '../Cards/StreakCard';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import { CommonAppContext } from '../../stores/common/commonAppContext';
import { AdPosition, TriviaStatus, showAdForUser } from 'utils/HelperFunctions';
import { AdmobBannerSize } from '../Common/AdmobBannerSize';
import { UpgradePremiumModalBody } from '../UpgradePremiumModalBody';
import { GenericModal } from '../Modals/GenericModal';
import { setAdImpressionCount } from 'utils/DataFormattingHelperFunction';
import ActionTypes from '../../stores/actionTypes';
import { YearRecapCard } from '../Cards/YearRecapCard';

export type StreakAndTriviaCarouselProps = {
    triviaStatus: any,
    onCardPress: Function,
    userStreak: any,
    navigation: any,
    triviaCardRef: any,
    onTriviaAdBannerClick: any,
    screenFocused: any,
    campaignData: any,
    isHome: any
  };

  const StreakAndTriviaCarousel: FC<StreakAndTriviaCarouselProps> = ({
    triviaStatus,
    onCardPress,
    userStreak,
    navigation,
    triviaCardRef,
    onTriviaAdBannerClick,
    screenFocused,
    campaignData,
    isHome = false
  }) => {  

  const { commonAppState } = useContext(CommonAppContext);
  const [closeAdsModalVisible, setCloseAdsModalVisible] = useState(false);
  const [recapData, setRecapData] = useState([])
  const [adVisible, setAdVisible] = useState(false);

  const [carouselData, setCarouselData] = useState(
    [
      {type: 'trivia', screen:'TriviaQuestionScreen', title: 'Trivia Time', 
        activeDescription: StringConstants.TAKE_TRIVIA_CHALLENGE, 
      },
      {type: 'streak', screen:'RecoStreakScreen', title: 'Reco Streak'},
      //TODO: survey will be used in future
      // {type: 'survey', screen:'SurveyScreen', title: 'Quick Survey', activeDescription: StringConstants.EARN_POINTS_WITH_SURVEY}
    ]
  )
 
  // go to premium screen
  const goToPremiumScreen = () => {
    setCloseAdsModalVisible(false)
    navigation.navigateDeprecated("RecoBeePremiumScreen")
  }

  const closeAdsModalBody = () => (
    <UpgradePremiumModalBody planInfo={StringConstants.MONTH_PRICE} description={StringConstants.BUY_SUBSCRIP_TO_REMOVE_ADS} goToPremiumScreen={goToPremiumScreen} />
  )

  // premium modal visibility
  const closeAds = () => {
    setCloseAdsModalVisible(true)
  }

  useEffect(() => {
    if(campaignData?.length > 0){
      let campaignRecapItem = campaignData?.filter((item) => item?.name == 'YEAR');
      if(campaignRecapItem?.length > 0){
        let data = carouselData?.slice();
        const carouselTypes = carouselData?.filter((value) => value?.type == 'recap')
        if(carouselTypes?.length == 0){
          let itemToAdd = {type: 'recap', screen:'YearRecapStory', title: '', 
            activeDescription: '', 
          }
          data.splice(0, 0, itemToAdd);
          setCarouselData(data?.slice())
          setRecapData(campaignRecapItem[0])
        }
        
      }
    }
  }, [campaignData])

  useEffect(() => {
    if(!commonAppState.shwoTriviaCarouselAd || ((commonAppState.isPremiumUser && commonAppState.isPremiumFlowEnabled) && !(showAdForUser(commonAppState.userRole)))){
        let entryExists = carouselData.some(element => element.type === 'SHOW_AD');

        if(entryExists){
          let carouselCopy = carouselData?.filter((value) => value.type != 'SHOW_AD')
          setAdVisible(false);
          setCarouselData(carouselCopy?.slice());
        }
      
    }
  }, [commonAppState])

  useEffect(() => {
      if(commonAppState?.shwoTriviaCarouselAd && (!commonAppState.isPremiumUser || !commonAppState.isPremiumFlowEnabled) && showAdForUser(commonAppState.userRole)){
        setAdVisible(true)
        let data = carouselData?.slice();
        let itemToAdd = {type: 'SHOW_AD', screen:'', title: ''};
        data.splice(1, 0, itemToAdd);
        setCarouselData(data?.slice())
      }
  }, [])

  const renderCarouselItem = ({ item }) => {
    return (
      <View>
          {item.type == 'recap' && <YearRecapCard
            item={recapData}
            onCardPress={onCardPress}
          /> }
          {item.type == 'trivia' && <TriviaCard triviaCardRef={triviaCardRef} triviaStatus={triviaStatus} item={item} onCardPress={onCardPress} /> }
          {item.type == 'SHOW_AD' && showAdForUser(commonAppState.userRole) && (!commonAppState.isPremiumUser || !commonAppState.isPremiumFlowEnabled) && commonAppState.shwoTriviaCarouselAd && 
            <TouchableOpacity style={styles.adView} onPress={() => onTriviaAdBannerClick()}>
              <AdmobBannerSize closeAds={closeAds} adWidth={Math.floor(SCREEN_WIDTH - 32)} adHeight={Math.floor(scaledWidth(130))} screenName="MovieDetailsTab" adPosition={AdPosition.TRIVIA_CAROUSEL} />
            </TouchableOpacity>}
          {item.type == 'streak' && <StreakCard userStreak={userStreak} item={item} onCardPress={onCardPress} />}
          {item.type == 'survey' && <TriviaCard item={item} onCardPress={onCardPress} />}
      </View>
    );
  }

  const [carouselActiveSlideIndex, setCarouselActiveSlideIndex] = useState(0);
  const snapToItem = (idx) => setCarouselActiveSlideIndex(idx);

  useEffect(() => {
    if(carouselData?.length > 0 && screenFocused){
      if(carouselData[carouselActiveSlideIndex]?.type == 'SHOW_AD'){
        setAdImpressionCount(StringConstants.TRIVIA_BANNER_AD, ActionTypes.VIEW)
      }
    }
  },[carouselActiveSlideIndex])

  return (
    <View style={[styles.container, isHome && styles.homeStyle, adVisible && {marginTop: 24}]}>
      <View style={[CommonStyles.alignCenter]}>
        <Carousel
          loop
          width={SCREEN_WIDTH - 32}
          style={styles.carouselStyle}
          autoPlay={true}
          data={carouselData}
          snapEnabled
          mode="parallax"
          scrollAnimationDuration={1000}
          autoPlayInterval={3000}
          modeConfig={{
              parallaxScrollingScale: 1,
              parallaxScrollingOffset: 50,
              parallaxAdjacentItemScale: 0.6,
          }}
          onSnapToItem={snapToItem}
          renderItem={renderCarouselItem}
        />
      </View>
      <View style={styles.carouselIndicatorContainer}>
        {carouselData.map((item, i) => (
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
      {closeAdsModalVisible ?
        <GenericModal
          borderRadius={48}
          isModalVisible={closeAdsModalVisible}
          cancelModal={() =>  setCloseAdsModalVisible(false)}
          modalHeight={SCREEN_HEIGHT * 0.27}
          modalTitle={''}
          modalBody={
            closeAdsModalBody()
          }
        />
        :
        null
      }
    </View>
  );

};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    },
    homeStyle: {
      height: scaledWidth(132),
      marginTop: 6,
      marginBottom: 28
    },
    carouselIndicatorContainer: {
        height: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      carouselStyle: {
        width: SCREEN_WIDTH - 32, 
        height: scaledWidth(128)
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
      adView: {
        height: scaledHeight(130),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }
});

export default StreakAndTriviaCarousel;
