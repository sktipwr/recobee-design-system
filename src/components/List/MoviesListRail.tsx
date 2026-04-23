import React, { useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontFamily from 'utils/FontFamily';
import { SCREEN_WIDTH, scaledHeight, scaledWidth } from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import HomeMovieCard from '../Cards/HomeMovieCard';
import UserProfile from 'components/Cards/UserProfile';
import GroupCard from 'components/Cards/GroupCard';
import PreferredOTTsCard from '../Cards/PreferredOTTsCard';
import { HomeClipsCard } from '../Cards/HomeClipsCard';
import CommonStyles from '../../../Styles';
import searchAPI from 'api/searchAPI';
import homeScreenAPI from 'api/homeScreenAPI';
import {LOG} from 'config'
import MoviesListSkeleton from '../Skeletons/MoviesListSkeleton';
import { getOTTData } from 'utils/utilFunctions';
import { UserPrefsContext } from '../../stores/userPrefs/userPrefsContext';
import EmptyState from '../Common/EmptyState';
import { emptyStateRail } from 'utils/DataConstants';
import EncryptedStorage from 'react-native-encrypted-storage';
import StringConstants from 'utils/StringConstants';
var extendedLog = LOG.extend('TopRecoScreen');
import mixpanel from 'mixpanel';

export type MoviesListRailTypes = {
    dataToPass: any,
    data: any,
    isTrending: any,
    card: any,
    isOTT: any,
    url: any,
    sectionType: any,
    title: any,
    subTitle: any,
    ottData: any,
    selectedOttNames?: string[],
    hasGlobalOttFiltersApplied?: boolean,
    // When true, force show the no-results message (used when filtering is handled in HomeTab)
    forceShowNoResultsMessage?: boolean,
    isLoadingOttFilter?: boolean,
    onUserClick: Function,
    onFollowClick: Function,
    onListClick: Function,
    onMovieClick: Function,
    onReelClick: Function,
    releaseAdViewRef: any,
    onBannerAdClick: Function,
    onShareClick: Function,
    onAddClick: Function,
    onReviewClick: Function,
    onSeenClick: Function,
    onDeleteClick: Function,
    closeAds: Function
  };
  
export const MoviesListRail: React.FC<MoviesListRailTypes> = ({ 
    dataToPass,
    data,
    isTrending,
    card,
    isOTT,
    url,
    sectionType,
    title,
    subTitle,
    ottData,
    selectedOttNames = [],
    hasGlobalOttFiltersApplied = false,
    forceShowNoResultsMessage = false,
    isLoadingOttFilter = false,
    onUserClick,
    onFollowClick,
    onListClick,
    onMovieClick,
    onReelClick,
    releaseAdViewRef,
    onBannerAdClick,
    onShareClick,
    onAddClick,
    onReviewClick,
    onSeenClick,
    onDeleteClick,
    closeAds
}) => {
  
    const { userPrefsState } = useContext(UserPrefsContext);
    const [sinceYouLiked, setSinceYouLikedData] = useState([])
    const [recentReleases, setRecentReleases] = useState([])
    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [curatedPicks, setCuratedPicks] = useState([])
    const [loading, setLoading] = useState(false)
    const [showNoResultsMessage, setShowNoResultsMessage] = useState(false)

    const setInitialData = (dataValue: any) => {
        if(title == 'Upcoming Movies' || sectionType == 'upcoming_movies'){
            setUpcomingMovies(dataValue?.slice())
        }
        else if(title == 'Recent Releases' || sectionType == 'recent_releases'){
            setRecentReleases(dataValue?.slice())
        }
        else if(title == 'Since you watched' || sectionType == 'similar_recos'){
            setSinceYouLikedData(dataValue?.slice())
        }
        else if (sectionType == 'more_recos_for_you') {
            setCuratedPicks(dataValue?.slice())
        }
    }


         useEffect(() => {
         setInitialData(dataToPass)
     },[])

    // Build a stable, normalized key for OTT filters to avoid unnecessary refreshes
    const selectedOttKey = useMemo(() => {
        if (!selectedOttNames || selectedOttNames.length === 0) return '';
        const sorted = selectedOttNames.slice().sort();
        return sorted.join('|');
    }, [selectedOttNames]);

    const lastAppliedOttKeyRef = useRef<string>('');

    // Apply global OTT filters for specific rails only when the normalized values change
    useEffect(() => {
        // IMPORTANT: We now handle filtering for 'upcoming_movies' and 'more_recos_for_you' in HomeTab.
        // Keep only 'recent_releases' filtering here. Upcoming and Curated picks will skip in-rail filtering.
        const isFilterableRail = sectionType == 'recent_releases';
        if (!isFilterableRail) return;

        // If nothing changed, skip
        if (lastAppliedOttKeyRef.current === selectedOttKey) return;

        // Update ref now
        lastAppliedOttKeyRef.current = selectedOttKey;

        if (selectedOttKey) {
            // Use the original array to preserve order and exact values
            advancedSearchApi(selectedOttNames);
        } else {
            // No filters: reset to original data without triggering API
            setShowNoResultsMessage(false);
            setInitialData(dataToPass);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOttKey, sectionType]);


    // Removed rail-specific OTT selection UI and logic. Now using global selection passed via props.

    const advancedSearchApi = useCallback((otts: string[]) => {
        // For Recent Releases use advanced search within this component
        if(sectionType == 'recent_releases'){
          let body = { otts } as any;
          body.rail = "R";
          setLoading(true)
          searchAPI
            .getAdvancedSearchResults(body)
            .then((response) => {
              setLoading(false)
              if (response.data && response.data.length > 0) {
                  setShowNoResultsMessage(false)
                  setInitialData(response.data)
              } else {
                  setShowNoResultsMessage(true)
                  setInitialData(dataToPass)
              }
            })
            .catch((error) => {
              extendedLog.error(
                'Error executing recoGenerator.searchAPI.getAdvancedSearchResults with message:',
                error
              );
              setLoading(false);
              setShowNoResultsMessage(true)
              setInitialData(dataToPass)
            });
          return;
        }
        // For other rails (including upcoming and curated picks), filtering is handled in HomeTab now.
      }, [sectionType, dataToPass])

    const renderItem = (
        item,
        list,
        isTrending,
        card,
        isOTT,
        url,
        index,
        sectionType
      ) => {
        if (card == 'User') {
          return (
            <UserProfile
              item={item}
              removeClicked={onUserClick}
              followClicked={onFollowClick}
              index={index + 1}
              isTrending={isTrending}
              sectionType={sectionType}
              radius={60}
              type='home'
            />
          );
        } else if (sectionType == 'buzzing_ott') {
          return (
            <PreferredOTTsCard
              dataItem={item}
              onClick={onListClick}
              url={url}
              sectionType={sectionType}
            />
          );
        }
        else if (card == 'Group') {
          return (
            <GroupCard
              item={item}
              onClick={onListClick}
              url={url}
              sectionType={sectionType}
            />
          );
        }
        else if (card == 'ClipsCard') {
          return (
            <HomeClipsCard
              item={item}
              index={index}
              data={list}
              onMovieClick={onMovieClick}
              onReelClick={onReelClick}
              sectionType={sectionType}
            />
          );
        }
        else {
          return (
            <HomeMovieCard
              item={item}
              releaseAdViewRef={releaseAdViewRef}
              onBannerAdClick={onBannerAdClick}
              onAddClick={onAddClick}
              onShareClick={onShareClick}
              onMovieClick={onMovieClick}
              onDeleteClick={onDeleteClick}
              onSeenClick={onSeenClick}
              onReviewClick={onReviewClick}
              isTrending={isTrending}
              isOTT={isOTT}
              list={list}
              sectionType={sectionType}
              closeAds={closeAds}
            ></HomeMovieCard>
          );
        }
      };

    //get data for movie card for sections
    const getData = () => {
        // Prefer in-component state only for recent releases (since this rail still applies in-rail filtering)
        if (title == 'Recent Releases' || sectionType == 'recent_releases') {
          return (recentReleases?.length > 0 ? recentReleases?.slice() : dataToPass?.slice())
        }
        // For all other rails (including upcoming and curated picks), rely on dataToPass from parent
        return dataToPass?.slice();
    }

    const SectionListSkeleton = useCallback(() => {
      return (
          <MoviesListSkeleton height={230} innerCardHeight={215} rows='2' columns='6' />
      )
    }, [])

    const NoResultsMessage = useMemo(() => {
      const anyFiltersApplied = hasGlobalOttFiltersApplied || (selectedOttNames && selectedOttNames.length > 0);
      const shouldShow = (showNoResultsMessage || forceShowNoResultsMessage) && anyFiltersApplied && !isLoadingOttFilter;
      if (!shouldShow) return null;

      return (
        <Text style={styles.noResultsText}>
          {StringConstants.NO_RESULTS_FOR_FILTER}
        </Text>
      );
    }, [showNoResultsMessage, hasGlobalOttFiltersApplied, selectedOttNames, forceShowNoResultsMessage, isLoadingOttFilter]);

  return (
    <View>
        {/** Rail-specific OTT filter UI removed; using global OTT filters instead. */}
        
        {/* No results message when OTT filters are applied but no data found */}
        {NoResultsMessage}
        
        {/* Show skeleton when loading from parent (HomeTab OTT filter changes) or internal loading */}
        {(loading || isLoadingOttFilter)
            ? 
                SectionListSkeleton()
            :
                <FlatList
                  data={getData()}
                  horizontal
                      keyExtractor={(item, index) =>
                      'movie-card-' + index + '-' + item.id
                      }
                      showsHorizontalScrollIndicator={false}
                      initialNumToRender={3}
                      maxToRenderPerBatch={5}
                      ListEmptyComponent={() => (
                        <View style={styles.emptyState}>
                          <EmptyState item={emptyStateRail} msgColor={AppColors.GREY_VARIANT4} />
                        </View>
                      )}
                      renderItem={({ item, index }) =>
                      renderItem(
                          item,
                          data,
                          isTrending,
                          card,
                          isOTT,
                          url,
                          index,
                          sectionType
                      )
                      }
                />
        }
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    height: scaledHeight(110),
    width: SCREEN_WIDTH - 32, 
    alignItems: 'center',
  },
  noResultsText: {
    color: AppColors.GREY_VARIANT1,
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    textAlign: 'left',
    lineHeight: 16,
    marginTop: -16,
    marginBottom: 16,
    marginHorizontal: 2,
  }
})
