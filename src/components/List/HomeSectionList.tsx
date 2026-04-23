import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import ReviewCarousel from 'components/Carousels/ReviewCarousel';
import VideoCarousel from 'components/Carousels/VideoCarousel';
import Settings from 'icons/Settings';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import { WeeklyListCard } from '../Cards/WeeklyList';
import { OTTRecosCard } from '../Cards/OTTRecosCard';
import StringConstants from 'utils/StringConstants';
import { LeadersHomeTabcard } from '../Cards/LeadersHomeTabCard';
import { DiscoverFriendsCard } from '../Cards/DiscoverFriendsCard';
import { DiscoverFriendsCarousel } from '../Carousels/DiscoverFriendsCarousel';
import { WatchingCurrentlyCard } from '../Cards/WatchingCurrenltyCard';
import CommonStyles from '../../../Styles';
import Premium from 'svg/premium'
import PremiumBadge from 'svg/premium_badge_icon';
import { OttCircle } from '../OttCircle';
import { LOG } from 'config';
import { MoviesListRail } from './MoviesListRail';
import { checkIfOttLinked, getOTTData, getOTTInfoForMovie } from 'utils/utilFunctions';
import { UserPrefsContext } from '../../stores/userPrefs/userPrefsContext';
import { MarqueeComponent } from '../Common/MarqueeComponent';
import mixpanel from 'mixpanel';

var extendedLog = LOG.extend('TopRecoScreen');

const HomeSectionList = ({
  sections,
  themeColors,
  onAddClick,
  onShareClick,
  onDeleteClick,
  onMovieClick,
  onRightClick,
  onUserClick,
  onListClick,
  onSeenClick,
  onFollowClick,
  navigation,
  closeAds,
  onReelClick,
  releaseAdViewRef,
  onBannerAdClick,
  ottData,
  countryCode,
  isPremiumUser,
  selectedOttNames = [],
  hasGlobalOttFiltersApplied = false,
  isLoadingOttFilter = false,
}) => {

  const [weeklyListData, setWeeklyListData] = useState([])
  const [initialWeeklyList, setInitialWeeklyList] = useState([])
  const [sinceYouLiked, setSinceYouLikedData] = useState([])
  const [weeklyListOTTs, setWeeklyListOTTs] = useState([])
  const { userPrefsState } = useContext(UserPrefsContext);
  const [ottMoviesMapping, setOttMoviesMapping] = useState([])

  useEffect(() => {
    // Process sections and build fresh sinceYouLiked data
    let newSinceYouLikedData = [];
    
    sections?.forEach((value) => {
      if(value?.title === 'Weekly List'){
        setWeeklyListData(value?.data ?? [])
        setInitialWeeklyList(value?.data ?? [])
        setOTTData(value?.data)
      }
      else if(value?.title === 'Since you watched'){
        newSinceYouLikedData.push({title: value?.subTitle, data: value?.data});
      }
    })
    
    // Set the fresh data
    setSinceYouLikedData(newSinceYouLikedData);
  },[sections])

   // set ott data
   const setOTTData = async(data: any) => {
      const promises = data?.map((value) => {
        return getOTTInfoForMovie(value?.id || value?.movieid, countryCode, extendedLog, userPrefsState)
      })
      Promise.all(promises)
      .then((results) => {

        results = results?.filter(entry => entry !== undefined);

        if(results?.length > 0){
          // Create object with IDs and names
          const idNameMap = results?.reduce((acc, item) => {
            acc[item.id] = item?.data?.map((obj) => obj?.name);
            return acc;
          }, {});
          
          // Create a unique array of objects
          const uniqueObjects = [
            ...new Map(
              results?.flatMap((item) => item?.data).map((obj) => [obj?.id, obj])
            ).values(),
          ];

          setOttMoviesMapping(idNameMap)
          setWeeklyListOTTs(uniqueObjects?.slice())
        }
      })
      .catch((error) => {
        console.error('Error fetching all otts:', error);
      });
  }
  
  //get data for movie card for sections
  const getData = (sectionType, title, subTitle, data, filteredData) => {
    // If HomeTab provided filtered data for this section, use it (may be empty array which signals fall back in MoviesListRail handled via flags)
    if (Array.isArray(filteredData) && filteredData.length > 0) {
      return [...filteredData];
    }
    if (!data || data.length === 0) return [];

    if (sectionType === 'similar_recos') {
      // Find matching data from sinceYouLiked state
      const matchingData = sinceYouLiked?.find((value) => value?.title === subTitle);
      
      // Use cached data if available and not empty, otherwise use fresh data
      return matchingData?.data?.length > 0 ? [...matchingData.data] : [...data];
    }
    
    // For other section types, return fresh data
    return [...data];
  }

  const renderComponent = (
    title,
    subTitle,
    data,
    isTrending,
    rightLink,
    rightLinkData,
    card,
    isOTT,
    url,
    sectionType,
    filteredData,
    forceShowNoResultsMessage
  ) => {
    switch (card) {
      case 'Social':
        return <ReviewCarousel data={data} navigation={navigation} />;
        break;
      case 'Video':
        return <VideoCarousel data={data} navigation={navigation} />;
        break;
      case 'WeeklyList':
        return <WeeklyListCard isPremiumUser={isPremiumUser} onAddClick={onAddClick} onMovieClick={onMovieClick} onSeenClick={onSeenClick} data={weeklyListData} navigation={navigation} onListClick={onListClick} url={url} sectionType={sectionType} />
      case 'OTTRecos': 
        return <MarqueeComponent duration={0} wathingNowFlow={false}  data={data} navigation={navigation} onListClick={onListClick} url={url} sectionType={sectionType} />
      case 'LeadersHomeCard': 
        return (
          <LeadersHomeTabcard  
            data={data} 
            navigation={navigation} 
            onUserClick={onUserClick} 
            url={url} 
            sectionType={sectionType} 
            userRankDetails={filteredData}
            onRightClick={() => navigation.navigate('LeaderboardEntryScreen', {
              data: data,
              userRankDetails: filteredData
            })}
            rightLinkData={rightLinkData}
            isLoading={sections.find(s => s.sectionType === sectionType)?.isLoading || false}
          />
        )
      case 'DiscoverFriendsCard':
        return <DiscoverFriendsCard data={data} navigation={navigation} onListClick={onListClick} onUserClick={onUserClick} url={url} sectionType={sectionType} />
      case 'DiscoverFriendsCarousel':
        return <DiscoverFriendsCarousel data={data} navigation={navigation} onListClick={onListClick} onUserClick={onUserClick} url={url} sectionType={sectionType} />
      case 'WatchingCurrentlyCard': 
        return <WatchingCurrentlyCard isOTT={isOTT} onMovieClick={onMovieClick} data={data} navigation={navigation} onListClick={onListClick} onUserClick={onUserClick} url={url} sectionType={sectionType} />
      default:
        const dataToPass = getData(sectionType, title, subTitle, data, filteredData)
        return (
          <MoviesListRail 
            dataToPass={dataToPass} 
            data={data} 
            isTrending={isTrending} 
            card={card} 
            isOTT={isOTT}  
            url={url}
            sectionType={sectionType}
            title={title}
            subTitle={subTitle}
            ottData={ottData}
            selectedOttNames={selectedOttNames}
            hasGlobalOttFiltersApplied={hasGlobalOttFiltersApplied}
            forceShowNoResultsMessage={forceShowNoResultsMessage}
            isLoadingOttFilter={isLoadingOttFilter}
            onUserClick={onUserClick}
            onFollowClick={onFollowClick}
            onListClick={onListClick}
            onMovieClick={onMovieClick}
            onReelClick={onReelClick}
            releaseAdViewRef={releaseAdViewRef}
            onBannerAdClick={onBannerAdClick}
            onShareClick={onShareClick}
            onAddClick={onAddClick}
            onReviewClick={onReelClick}
            onSeenClick={onSeenClick}
            onDeleteClick={onDeleteClick}
            closeAds={closeAds}
          />
        );
    }
  };

  const iconSource = (iconName) => {
    switch (iconName) {
      case 'setting':
        return <Settings height={18} width={18} color='#E9C638' />;
    }
  };

  // on ott chip click
  const ottClicked = (name: string) => {
    mixpanel.track("HomeTab_OttClicked", {
      screen: "HomeTab",
      source: "Weekly List",
      purpose: "Clicked ott filter is " + name,
    });
    
    const updatedOTTs = weeklyListOTTs?.map((value) => ({
      ...value,
      selected: value?.name === name ? !value?.selected : value?.selected
    }));

    const selectedOTTs = updatedOTTs?.filter((value) => value?.selected);
    
    if(selectedOTTs?.length > 0){
      const selectedOTTNames = selectedOTTs?.map((value) => value?.name);
      const selectedWeeklyLists = initialWeeklyList?.filter((value) => 
        checkIfOttLinked(ottMoviesMapping, value?.id || value?.movieid, selectedOTTNames)
      );
      setWeeklyListData(selectedWeeklyLists);
    }
    else {
      setWeeklyListData(initialWeeklyList);
    }
    setWeeklyListOTTs(updatedOTTs);
  }


  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => 'section-key-' + index + '-' + item.id}
      stickySectionHeadersEnabled={false}
      initialNumToRender={3}
      maxToRenderPerBatch={10}
      renderItem={() => null}
      renderSectionHeader={({
        section: {
          title,
          subTitle,
          data,
          isTrending,
          rightLink,
          rightLinkData,
          rightIcon,
          card,
          isOTT,
          url,
          sectionType,
          filteredData,
          forceShowNoResultsMessage,
        },
      }) => (
        <View style={{ paddingLeft: 16, marginBottom: 36,}}>
          <View>
            {title != '' && title != null &&
              <View style={[{ flexDirection: 'row' }, sectionType == 'weekly_list' && {alignItems: 'center'}]}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.labelContainer,
                    sectionType == 'similar_recos' ? {width: SCREEN_WIDTH * 0.85} : sectionType != 'weekly_list' && {flex: 1},
                    {
                      color: themeColors.text,
                      
                      fontSize: 18,
                      fontFamily: 'DMSans-Bold',
                      marginBottom: sectionType == 'recobee_leaderboard' ? 0 : 16,
                    },
                  ]}
                >
                  {title} {sectionType == 'similar_recos' ? subTitle : ''}
                </Text>
                {/* {sectionType == 'weekly_list' && 
                  <View style={[CommonStyles.rowAlignCenter, styles.gap]}>
                    <Premium />
                    <View style={{marginLeft: 5}} />
                    <PremiumBadge />
                  </View>
                } */}
                {(rightLink || rightIcon) && (
                  <TouchableOpacity
                    style={[styles.ott]}
                    onPress={() => onRightClick(rightLinkData)}
                  >
                    {rightIcon ? (
                      iconSource(rightIcon)
                    ) : (
                      <Text
                        style={[
                          styles.labelContainer,
                          { color: themeColors.link, paddingRight: 12 },
                        ]}
                      >
                        {rightLink}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            }
            {/* {sectionType == 'recobee_leaderboard' && 
              <Text style={styles.leaderboardSubHeading}>{StringConstants.LEVEL_UP_TO_EARN_REWARDS}</Text>
            } */}
          </View>
          {
            //may be needed in future
            // (sectionType == 'weekly_list') && Array.isArray(weeklyListOTTs) &&
            // weeklyListOTTs?.length > 0 && 
            //   <View style={[CommonStyles.flexRowWrap, CommonStyles.paddingHorizontal16]}> 
            //     <OttCircle otts={weeklyListOTTs} ottClicked={ottClicked} showNames={false} />
            //   </View>
          }
          {renderComponent(
            title,
            subTitle,
            data,
            isTrending,
            rightLink,
            rightLinkData,
            card,
            isOTT,
            url,
            sectionType,
            filteredData,
            !!forceShowNoResultsMessage
          )}
        </View>
      )}
    ></SectionList>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
  },
  leaderboardSubHeading: {
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 14, 
    color: AppColors.GREY_VARIANT1, 
    marginBottom: 11
  },
  similarRecos: {
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 14, 
    color: AppColors.GREY_VARIANT4, 
    marginBottom: 10
  },
  ott: {
    width: Dimensions.get('window').width * 0.267,
    height: 25,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 8,
    paddingTop: 4,
    borderRadius: 12,
    flexDirection: 'row',
  },
  gap: {
    marginBottom: 16, 
    marginLeft: 10
  }
});

export default React.memo(HomeSectionList);
