import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import { getOTTLinkingUrl, openLinkingUrl } from 'utils/HelperFunctions';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import AddCircle from 'icons/AddCircle';
import MinusCircle from 'icons/MinusCircle';
import { UserPrefsContext } from '../../stores/userPrefs/userPrefsContext';
import searchAPI from 'api/searchAPI';
import recommendationsAPI from 'api/recommendationsAPI';
import Toast from 'react-native-toast-message';
import mixpanel from 'mixpanel';
import { CLOUD_BASEURL } from 'utils/HelperFunctions';
import Theatre from 'svg/theatreNew.svg';
import StarFilled from 'icons/StarFilled';
import MoreOptionsModal from '../Modals/MoreOptionsModal';
import MoreVertical from 'icons/MoreVertical';
import RatingModal from '../Modals/RatingModal';
import StringConstants from '../../utils/StringConstants';
import  Add from '../../icons/Add';
import Tick from '../../icons/Tick';
import LeftLeaf from '../../icons/LeftLeaf';
import RightLeaf from '../../icons/RightLeaf';

type OTTProvider = {
  networkprovider: string;
  logoName?: string;
  ottitemid?: string;
  code?: string;
  name?: string;
  defaultUrl?: string;
  id?: string;
  searchUrl?: string;
  watchUrl?: string;
};

type CarouselImageCardProps = {
  item: any;
  onMovieClick: (movieID: any, item: any, autoPlay: any) => void;
  countryCode: any;
  onAddClick?: (id: any, isWatchlisted: any, source: string) => void;
  commonAppState: any;
  onReviewClick?: Function;
  preferredOttNames?: string[];
  onRemoveCard?: (movieId: string) => void;
  hideActions?: boolean;
};

export const CarouselImageCard: React.FC<CarouselImageCardProps> = ({ item, onMovieClick, countryCode, onAddClick, preferredOttNames, onReviewClick, commonAppState, onRemoveCard, hideActions = false }) => {

  const movieId = item?.id || item?.movieid || item?.movieId;
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [selectedOTTProvider, setSelectedOTTProvider] = useState<OTTProvider | null>(null);
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [isSeen, setIsSeen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const { userPrefsState } = useContext(UserPrefsContext);

  let genreArr = [];
  let displayGenre = '';

  if (item?.genre && item?.genre != null && item?.genre != '' && item?.genre?.length > 0) {
    if (Array.isArray(item?.genre)) {
      genreArr = item.genre.slice(0, 3);
    } else {
      genreArr = item?.genre?.split(', ').slice(0, 3);
    }
  }
  if (genreArr.length > 0) {
    displayGenre = genreArr.join(' | ');
  }

  // Fetch OTT info and Watchlist status on component mount/item change
  useEffect(() => {
    if (item?.otts?.length > 0) {
      setOTTData();
    } else if (countryCode) {
      getOTTInfoForMovie(movieId, countryCode);
    }
    getMovieInfo();
  }, [item, countryCode]);

  // set ott data from item.otts array
  const setOTTData = () => {
    if (item?.otts && item.otts.length > 0) {
      // Prefer an OTT that matches preferredOttNames (global selected), else fallback to first
      let chosenOTT = item.otts[0];
      try {
        const prefs = Array.isArray(preferredOttNames) ? preferredOttNames.map((n) => String(n || '').toLowerCase()) : [];
        if (prefs.length > 0) {
          const match = item.otts.find((o: any) => {
            const np = String(o?.networkprovider || '').toLowerCase();
            // Special-case Prime naming variants
            if (prefs.includes('prime')) {
              if (np === 'amazon prime video' || np === 'amazon video') return true;
            }
            return prefs.includes(np);
          });
          if (match) chosenOTT = match;
        }
      } catch {}
      const prefsOTTs = (userPrefsState as any)?.prefsData?.ott;
      const supportedOTTs = (userPrefsState as any)?.prefsData?.supportedOTTs;
      
      if (supportedOTTs?.includes(chosenOTT?.networkprovider)) {
        const ottInfo = prefsOTTs?.find((pref: any) => pref?.name === chosenOTT?.networkprovider);
        if (ottInfo) {
          const processedOTT = {
            ...chosenOTT,
            code: ottInfo?.code,
            defaultUrl: ottInfo?.defaultUrl,
            id: ottInfo?.id,
            logoName: ottInfo?.logoName,
            name: ottInfo?.name,
            searchUrl: ottInfo?.searchUrl,
            watchUrl: ottInfo?.watchUrl,
          };
          setSelectedOTTProvider(processedOTT);
        }
      }
    }
  };

  // fetch ottinfo for movie
  const getOTTInfoForMovie = async (movieID: string, countryCode: string) => {
    searchAPI
      .getMovieOTTInfo(movieID, countryCode)
      .then((response) => {
        if (response && response.data && response.data.length > 0) {
          // Prefer a provider matching preferredOttNames if provided; else first
          let providerName = response.data[0];
          try {
            const prefs = Array.isArray(preferredOttNames) ? preferredOttNames.map((n) => String(n || '').toLowerCase()) : [];
            if (prefs.length > 0) {
              const primeWanted = prefs.includes('prime');
              const match = response.data.find((p: string) => {
                const pn = String(p || '').toLowerCase();
                if (primeWanted && (pn === 'amazon prime video' || pn === 'amazon video')) return true;
                return prefs.includes(pn);
              });
              if (match) providerName = match;
            }
          } catch {}
          const prefsOTTs = (userPrefsState as any)?.prefsData?.ott;
          const supportedOTTs = (userPrefsState as any)?.prefsData?.supportedOTTs;
          
          if (supportedOTTs?.includes(providerName)) {
            const ottInfo = prefsOTTs?.find((pref: any) => pref?.name === providerName);
            if (ottInfo) {
              const processedOTT = {
                networkprovider: providerName,
                code: ottInfo?.code,
                defaultUrl: ottInfo?.defaultUrl,
                id: ottInfo?.id,
                logoName: ottInfo?.logoName,
                name: ottInfo?.name,
                searchUrl: ottInfo?.searchUrl,
                watchUrl: ottInfo?.watchUrl,
              };
              setSelectedOTTProvider(processedOTT);
            }
          }
        }
      })
      .catch((error) => {
        console.error('Error executing searchAPI.getOTTInfoForMovie with message:', error);
      });
  };

  const getMovieInfo = async () => {
    let response = await recommendationsAPI.getMovieStateForUser(movieId);
    if (response && response.data) {
      setIsWatchlisted(response.data.is_in_watchlist);
      setIsSeen(response.data.is_seen || false);
      setIsLiked(response.data.is_liked || false);
      setIsDisliked(response.data.is_disliked || false);
      if (response.data.rating) {
        setRating(response.data.rating);
      }
    }
  };

  const onOTTPress = (appLink: string, ottName: string) => {
    mixpanel.track('OTTClicked', {
      screen: 'CarouselImageCard',
      ott: appLink,
      movieID: movieId,
      ottName: ottName,
    });
    
    // If theatre booking, open Cinepolis directly
    if (String(appLink || '').toLowerCase() === 'theatre') {
      Linking.openURL('https://cinepolisindia.com');
      return;
    }

    // Try to resolve ottID similar to MovieDetailsTab logic
    let ottID: any = undefined;
    try {
      const itemOtts = Array.isArray(item?.otts) ? item?.otts : [];
      let matched: any[] = [];
      if (ottName?.toLowerCase() === 'prime') {
        matched = itemOtts.filter(
          (o: any) => (o?.networkprovider || '').toLowerCase() === 'amazon video' || (o?.networkprovider || '').toLowerCase() === 'amazon prime video'
        );
      } else {
        matched = itemOtts.filter((o: any) => (o?.networkprovider || '').toLowerCase() === String(ottName || '').toLowerCase());
      }
      if (matched && matched.length > 0) {
        ottID = matched[0]?.ottitemid;
      } else if (item?.ottitemid) {
        ottID = item?.ottitemid;
      }
    } catch (e) {}

    const appUrl = getOTTLinkingUrl(appLink, (userPrefsState as any)?.prefsData?.ott, ottID, item?.title, false);
    openLinkingUrl(appUrl);
  };

  const onAddRemoveWatchlist = () => {
    if (onAddClick) {
      onAddClick(movieId, isWatchlisted, 'DailyPick');
      setIsWatchlisted(!isWatchlisted);
      Toast.show({
        text1: isWatchlisted ? StringConstants.REMOVED_FROM_WATCHLIST : StringConstants.ADDED_TO_WATCHLIST,
        type: 'beeToast',
        visibilityTime: 2000,
        position: 'bottom',
        autoHide: true,
      });
    }
  };
  const bottomsheetActions = [
    { actionName: 'Rate It', actionIcon: 'rating' },
    { actionName: isSeen ? 'Mark Unseen' : 'Mark as Seen', actionIcon: isSeen ? 'eyeo' : 'eye' },
    { actionName: isLiked ? 'Dislike' : 'Like', actionIcon: isLiked ? 'like_filled' : 'like' },
    { actionName: 'Not My Taste', actionIcon: 'not_taste' },
  ];

  const actionClicked = (actionItem: any, action: any) => {
    setMoreOptionsVisible(false);
    switch (action.actionIcon) {
      case 'like':
      case 'like_filled':
        const newLikeStatus = !isLiked;
        recommendationsAPI.updateIsLikeFlag(movieId, newLikeStatus ? 'true' : 'false').then(() => {
          setIsLiked(newLikeStatus);
          if (newLikeStatus) {
            setIsDisliked(false); // Clear dislike when liking
          }
          Toast.show({
            text1: newLikeStatus ? 'Added to liked movies' : 'Removed from liked movies',
            type: 'beeToast',
            visibilityTime: 2000,
            position: 'bottom',
            autoHide: true,
          });
        });
        break;
      case 'rating':
        setRating(item?.rating || 0);
        setRatingModalVisible(true);
        break;
      case 'review':
        if (onReviewClick) {
          onReviewClick(movieId, item.title, item);
        }
        break;
      case 'reco':
        break;
      case 'eye':
        recommendationsAPI.updateSeenFlag(movieId, 'true').then(() => {
          setIsSeen(true);
          Toast.show({
            text1: 'Marked as seen',
            type: 'beeToast',
            visibilityTime: 2000,
            position: 'bottom',
            autoHide: true,
          });
          // Remove card from UI after marking as seen
          if (onRemoveCard) {
            setTimeout(() => onRemoveCard(movieId), 1000);
          }
        });
        break;
      case 'eyeo':
        recommendationsAPI.updateSeenFlag(movieId, 'false').then(() => {
          setIsSeen(false);
          Toast.show({
            text1: 'Marked as unseen',
            type: 'beeToast',
            visibilityTime: 2000,
            position: 'bottom',
            autoHide: true,
          });
        });
        break;
      case 'not_taste':
        recommendationsAPI.updateIsLikeFlag(movieId, false).then(() => {
          setIsDisliked(true);
          setIsLiked(false);
          Toast.show({
            text1: 'Marked as not my taste',
            type: 'beeToast',
            visibilityTime: 2000,
            position: 'bottom',
            autoHide: true,
          });
          // Remove card from UI after marking as not my taste
          if (onRemoveCard) {
            setTimeout(() => onRemoveCard(movieId), 1000);
          }
        });
        break;
    }
  };

  const submitRating = () => {
    mixpanel.track('Movie_Rated', {
      screen: 'CarouselImageCard',
      source: 'DailyPick',
      movieID: movieId,
    });
    setRatingModalVisible(false);
    recommendationsAPI.updateRatingForMovie(movieId, rating).then(() => {
      Toast.show({
        text1: 'Rating submitted',
        type: 'beeToast',
        visibilityTime: 2000,
        position: 'bottom',
        autoHide: true,
      });
    });
  };

  useEffect(() => {
    if (commonAppState?.setCarouselPaused) {
      commonAppState.setCarouselPaused(moreOptionsVisible || ratingModalVisible);
    }
  }, [moreOptionsVisible, ratingModalVisible]);

  return (
    <>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onMovieClick(movieId, item, false)} style={styles.container}>
        <FastImage
          style={styles.image}
          source={item.posterimageurl ? { uri: item.posterimageurl } : require('assets/defaultMovie.png')}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={require('assets/defaultMovie.png')}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.85)']}
            locations={[0, 0.3, 1]}
            style={styles.gradientOverlay}
          >
            {item?.details && (
              <View style={styles.detailChip}>
                <LeftLeaf width={8} height={12} />
                <Text style={styles.detailText}>{item.details}</Text>
                <RightLeaf width={8} height={12} />
              </View>
            )}
            
            {item.arrating ? (
              <View style={styles.ratingContainer}>
                <StarFilled width={16} height={16} />
                <Text style={styles.ratingText}>{item.arrating}</Text>
              </View>
            ) : null}

            {selectedOTTProvider && (
              <TouchableOpacity
                style={styles.ottIconButton}
                onPress={() => onOTTPress(selectedOTTProvider.code || '', selectedOTTProvider.name || '')}
                activeOpacity={0.8}
              >
                {selectedOTTProvider.code !== 'theatre' && selectedOTTProvider.logoName ? (
                  <Image
                    source={{ uri: CLOUD_BASEURL + (selectedOTTProvider.logoName || '') }}
                    style={styles.ottIconImage}
                  />
                ) : (
                  <Theatre height={28} width={28} />
                )}
              </TouchableOpacity>
            )}

            <View style={styles.bottomLeftContainer}>
              <Text style={styles.movieTitle} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
              {displayGenre ? (
                <Text style={styles.genreText} numberOfLines={1}>{displayGenre}</Text>
              ) : null}
            </View>

            {!hideActions && (
              <View style={styles.bottomRightActions}>
                <TouchableOpacity
                  style={styles.circleButton}
                  onPress={onAddRemoveWatchlist}
                  activeOpacity={0.8}
                >
                  {isWatchlisted ? (
                    <Tick width={36} height={36} color={AppColors.WHITE}  />
                  ) : (
                    <Add width={36} height={36} color={AppColors.WHITE} strokeWidth={'1.5'} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.circleButton}
                  onPress={() => setMoreOptionsVisible(true)}
                  activeOpacity={0.8}
                >
                  <MoreVertical width={36} height={36} color={AppColors.WHITE} />
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>
        </FastImage>
      </TouchableOpacity>
      {moreOptionsVisible && (
        <MoreOptionsModal
          toggleModal={moreOptionsVisible}
          cancelClick={() => setMoreOptionsVisible(false)}
          actions={bottomsheetActions}
          item={item}
          onClick={actionClicked}
        />
      )}
      {ratingModalVisible && (
        <RatingModal
          toggleModal={ratingModalVisible}
          cancelClicked={() => setRatingModalVisible(false)}
          doneClicked={submitRating}
          title={item.title}
          setRating={(value) => setRating(value)}
          initialRating={rating}
        />
      )}

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 60,
    height: (SCREEN_WIDTH - 60) * 1.35,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: AppColors.GREY_VARIANT6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
  },
  ratingContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: AppColors.WHITE,
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
  },
  detailChip: {
    position: 'absolute',
    top: -8,
    alignSelf: 'center',
    backgroundColor: AppColors.LIGHT_YELLOW,
    paddingTop:8,
    paddingVertical:2,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexDirection: 'row',
  },
  detailText: {
    fontSize: 10,
    fontWeight: '600',
    color: AppColors.BLACK,
    fontFamily: FontFamily.DMSansBold,
    paddingHorizontal:2,
  },
  ottIconButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ottIconImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  bottomLeftContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 120,
  },
  movieTitle: {
    color: AppColors.WHITE,
    fontSize: 18,
    fontFamily: FontFamily.DMSansBold,
    lineHeight: 22,
    marginBottom: 4,
  },
  genreText: {
    color: AppColors.GREY_VARIANT4,
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    lineHeight: 16,
  },
  bottomRightActions: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
   borderWidth: 1,          
   borderColor: AppColors.GREY , 
  },
});

export default CarouselImageCard;


