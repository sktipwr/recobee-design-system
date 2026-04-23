import React, { useState, useEffect, useContext } from 'react';
import { AppConsumer } from 'context';
import MoreVertical from 'icons/MoreVertical';
import StarFilled from 'svg/star-main';
//import * as SecureStore from "expo-secure-store";
import EncryptedStorage from 'react-native-encrypted-storage';
//import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import MoreOptionsModal from 'components/Modals/MoreOptionsModal';
import recommendationsAPI from 'api/recommendationsAPI';
import { TouchableOpacity } from 'react-native';
import Tick from 'icons/Tick';
import FastImage from 'react-native-fast-image';
import searchAPI from 'api/searchAPI';
import { LOG } from 'config';
import mixpanel from '../../../MixPanel';
import Theatre from 'svg/theatreNew.svg'
//import { CF_DOMAIN } from "env";
import Config from 'react-native-config';
import { UserPrefsContext } from "../../stores/userPrefs/userPrefsContext";
import AddCircle from "icons/AddCircle";
import Toast from "react-native-toast-message";
import CircularAddIcon from "icons/AddCircle";
import Remove from 'svg/minus_circular'
import Bell from 'svg/bell.svg';
import { canRequestReview } from 'utils/HelperFunctions';

var extendedLog = LOG.extend('HomeMovieCard');

import {
  View,
  Text,
  Dimensions,
  Platform,
  Linking,
  StyleSheet,
  Image as RNImage,
} from 'react-native';
import { AdPosition, CLOUD_BASEURL, fullMonthNameAndYear, getOTTLinkingUrl, lowestMatchingIndexInFirstArray, openLinkingUrl, storeNotifyOnReleaseIds } from 'utils/HelperFunctions';
import { AdmobBannerSize } from '../Common/AdmobBannerSize';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import CommonStyles from '../../../Styles';
import StringConstants from 'utils/StringConstants';
import userProfileAPI from 'api/userProfileAPI';
import { apiPosterImage, getMoviePoster, getOTTData } from 'utils/utilFunctions';
import { GradientNumbers } from '../GradientNumbers';
import { TopBottomPosterGradient } from '../TopBottomGradientPoster.tsx';
import Eye from '../../icons/Eyes';
import Eyeo from 'icons/Eyeo';
import { scaledWidth } from '../../utils/Dimensions.tsx';
import LeftLeaf from '../../icons/LeftLeaf.tsx';
import RightLeaf from 'src/icons/RightLeaf.tsx';

function HomeMovieCard({
  item,
  isOTT,
  onMovieClick,
  onAddClick,
  onShareClick,
  onDeleteClick,
  onSeenClick,
  onReviewClick,
  onRateItClick,
  closeAds,
  isTrending,
  list,
  isUpcoming = false,
  index,
  width = 0.355 * Dimensions.get('window').width,
  height = 0.5 * Dimensions.get('window').width,
  isWatchlist = false,
  isListItem = false,
  isMySeen = false,
  sectionType,
  releaseAdViewRef,
  onBannerAdClick,
  disableTouch = false,
  isGuestFlow = false,
  showButtons=true,
  toggleLoginModal,
  hideRating = false,
  hideGenre = false,
  hideTitle = false,
  showBanner = false
}) {
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [movieOTTList, setMovieOTTList] = useState(null);
  const [selectedOTTItem, setSelectedOTTItem] = useState(null);
  const [isSeen, setIsSeen] = useState(false);
  const [rating, setRating] = useState(null);
  const [actionArr, setActionArr] = useState([]);
  const [inTheatres, setInTheatres] = useState(false)
  const [hasOTTList, setHasOTTList] = useState(false);
  const { userPrefsState, dispatch } = useContext(UserPrefsContext);
  const [genreList, setGenreList] = useState('')


  let isWS = isWatchlist || isMySeen;
 
  let title = item.title;
  let date = '';
  if (isWatchlist && item.createdat) {
    let releaseDate = new Date(item.createdat);
    date =
      releaseDate.getDate() +
      ' ' +
      releaseDate.toLocaleString('default', { month: 'short' });
  }
  if(isUpcoming){
    if(item?.releasedatetmdb){
      date = fullMonthNameAndYear(item?.releasedatetmdb)
    }
  }
  if (isTrending && item.additiondate) {
    let releaseDate = new Date(item.additiondate);
    let releaseDatepart = releaseDate.getDate();
    let todayDate = new Date();
    let todayDatePart = todayDate.getDate();
    let diffTime = releaseDate - todayDate;
    let absDiffTime = Math.abs(diffTime);
    let diffDays = Math.ceil(absDiffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 1 && releaseDatepart == todayDatePart) {
      date = 'Releasing Today';
    } else if (diffDays > 1 && diffDays < 7 && releaseDate > todayDate) {
      date = 'Coming in ' + diffDays + ' days';
    } else if (diffDays == 1 && releaseDate > todayDate) {
      date = 'Coming tomorrow';
    } else {
      date =
        releaseDate.getDate() +
        ' ' +
        releaseDate.toLocaleString('default', { month: 'short' });
    }
  }
  const [hasImage, setHasImage] = useState(true);
  if (item.title && item.title != '' && item.title.length > 16) {
    title = item.title.substring(0, 15) + '..';
  }

  let uri = require('assets/defaultMovie.png');

  if (item.posterimageurl && item.posterimageurl != null) {
    uri = item.posterimageurl;
  } else if (item.posterimage == null || item.posterimage == '') {
    uri = item.movieimage;
  } else {
    uri = 'https://image.tmdb.org/t/p/w780/' + item.posterimage;
  }

  // set ott data
  const setOTTData = () => {
    const ottData = getOTTData(item?.otts, userPrefsState);
    
    if(ottData?.inTheatres){
      setInTheatres(true)
    }
    
    if(ottData?.finalOTTItem?.length > 0){
      setSelectedOTTItem(ottData.finalOTTItem[0]);
      setHasOTTList(true);
      if (isWatchlist) {
        setActionArr([
          { actionName: 'Write Review', actionIcon: 'review' },
          { actionName: 'Recommend Movie', actionIcon: 'reco' },
          { actionName: 'Remove from Watchlist', actionIcon: 'delete' },
          { actionName: 'Mark Seen', actionIcon: 'eye' },
        ]);
      }
    }
  }

  useEffect(() => {
   
    if (isOTT || isTrending || isWatchlist || isMySeen || isListItem || isUpcoming || sectionType === 'recent_releases' || sectionType === 'upcoming_movies' || sectionType === 'more_recos_for_you') {
      getMovieInfo();
    }
    if (isOTT || isWatchlist || isOTT || isTrending || isUpcoming || sectionType === 'recent_releases' || sectionType === 'upcoming_movies' || sectionType === 'more_recos_for_you') {
      EncryptedStorage.getItem('user_country').then((country) => {
        if((item?.movieid || item?.movieId || item?.id) && country){
          if(item?.otts?.length > 0)
            setOTTData()
          else if(sectionType === 'recent_releases' || sectionType === 'upcoming_movies' || sectionType === 'more_recos_for_you')
            getOTTInfoForMovie(item?.movieid || item?.movieId || item?.id, country);
        }
      });
    }
    if (isOTT) {
      setActionArr([
        { actionName: 'Write Review', actionIcon: 'review' },
        { actionName: 'Recommend Movie', actionIcon: 'reco' },
      ]);
    } 
    else if(isUpcoming){
      setActionArr([
        { actionName: 'Watch trailer', actionIcon: 'reco' },
        { actionName: 'Notify me', actionIcon: 'bell' },

      ])
    }
    else if (isWatchlist) {
      setActionArr([
        { actionName: 'Write Review', actionIcon: 'review' },
        { actionName: 'Recommend Movie', actionIcon: 'reco' },
        { actionName: 'Remove from Watchlist', actionIcon: 'delete' },
      ]);
    } else if (isMySeen) {
      setActionArr([
        { actionName: 'Recommend Movie', actionIcon: 'reco' },
        { actionName: 'Mark Unseen', actionIcon: 'eyeo' },
      ]);
    } else if (isListItem) {
      setActionArr([
        { actionName: 'Write Review', actionIcon: 'review' },
        { actionName: 'Recommend Movie', actionIcon: 'reco' },
      ]);
    } else if (!isTrending) {
      setActionArr([
        { actionName: 'Write Review', actionIcon: 'review' },
        { actionName: 'Recommend Movie', actionIcon: 'reco' },
        { actionName: 'Mark Seen', actionIcon: 'eye' },
        { actionName: 'Not my taste', actionIcon: 'delete' },
      ]);
    } else {
      if (isWatchlisted) {
        setActionArr([
          { actionName: 'Recommend Movie', actionIcon: 'reco' },
          { actionName: 'Write Review', actionIcon: 'review' },
        ]);
      } else {
        setActionArr([
          { actionName: 'Recommend Movie', actionIcon: 'reco' },
          { actionName: 'Write Review', actionIcon: 'review' },
        ]);
      }
    }
  }, []);

  const moreOptionsClicked = (item) => {
    setSelectedRow(item);
    setMoreOptionsVisible(true);
  };

  const getMovieInfo = async () => {
    let response = await recommendationsAPI.getMovieStateForUser(
      item.movieid || item.id
    );
    if (response && response.data) {
      setIsWatchlisted(response.data.is_in_watchlist);
      setIsSeen(response.data.is_seen);
      setRating(response.data.rating);
      if (isOTT || isTrending || isListItem) {
        let newActionArr = [
          { actionName: 'Write Review', actionIcon: 'review' },
          { actionName: 'Recommend Movie', actionIcon: 'reco' },
        ];
        if (response.data.is_seen) {
          newActionArr.push({ actionName: 'Mark Unseen', actionIcon: 'eyeo' });
        } else {
          newActionArr.push({ actionName: 'Mark Seen', actionIcon: 'eye' });
        }
        if (response.data.is_in_watchlist) {
          if (isTrending || isListItem) {
            newActionArr.push({
              actionName: 'Remove from Watchlist',
              actionIcon: 'minussquareo',
            });
          }
        } else {
          if (isTrending) {
            newActionArr.push({
              actionName: 'Add to Watchlist',
              actionIcon: 'plusbox',
            });
          }
        }
        setActionArr(newActionArr);
      }
    }
  };

  // fetch ottinfo
  const getOTTInfoForMovie = async (movieID, countryCode) => {
    searchAPI
      .getOTTDetailForMovie(movieID, countryCode)
      .then((response) => {
        if (response && response.data) {
          let ottList = response.data.map((value) => value.networkprovider);
            //new logic
            let prefsOTTs = userPrefsState?.prefsData?.ott;
            let supportedOTTs = userPrefsState?.prefsData?.supportedOTTs;
            let finalSelectedOTTItem = null

            let supportedOTTsResponse = ottList.filter(value => supportedOTTs.includes(value));
            if(supportedOTTsResponse?.length > 0){
              //


              if(supportedOTTsResponse.includes('Theatre') && ottList?.includes('Theatre')){
                setInTheatres(true)
              }
              else {
                let ottPrefsApiData = userPrefsState.userPrefsApiData?.otts;
                if(ottPrefsApiData?.length > 0){
                  const apiOTTPrefNames = ottPrefsApiData.map(obj => obj.name);
                  
                    let matchingOTTs = supportedOTTsResponse.filter(value => apiOTTPrefNames.includes(value));
                    if(matchingOTTs?.length > 0){
                      if(supportedOTTs?.length > 0){
                        
                          let lowestIndex = lowestMatchingIndexInFirstArray(supportedOTTs, matchingOTTs);
                          if(lowestIndex != -1){
                            finalSelectedOTTItem = prefsOTTs.filter(value => value.name == supportedOTTs[lowestIndex]);
                            setSelectedOTTItem(finalSelectedOTTItem[0]);
                          }
                        
                      }
                    
                  }
                }
              }
              //
              if(finalSelectedOTTItem == null){

                let lowestIndex = lowestMatchingIndexInFirstArray(supportedOTTs, supportedOTTsResponse);
                if(lowestIndex != -1){
                  finalSelectedOTTItem = prefsOTTs.filter(value => value.name == supportedOTTs[lowestIndex]);
                  setSelectedOTTItem(finalSelectedOTTItem[0]);
                }
              }
              if (isWatchlist) {
                setActionArr([
                  { actionName: 'Write Review', actionIcon: 'review' },
                  { actionName: 'Recommend Movie', actionIcon: 'reco' },
                  { actionName: 'Remove from Watchlist', actionIcon: 'delete' },
                  { actionName: 'Mark Seen', actionIcon: 'eye' },
                ]);
              }
              setHasOTTList(true);
            }
        
        }
      })
      .catch((error) => {
        extendedLog.error(
          'Error executing searchAPI.getOTTInfoForMovie with message:',
          error
        );
      });
  };

  const openOTT = (movieID) => {
    let ottID, networkProvider;
    ottID = movieOTTList.ottitemid;
    networkProvider = movieOTTList.networkprovider;
    // Log which ott was clicked
    mixpanel.track('OTTClicked', {
      ottName: networkProvider,
      movieID: movieID,
      screen: 'MovieDetailsTab',
    });
    let appUrl = '';

    appUrl = getOTTLinkingUrl(networkProvider, userPrefsState?.prefsData?.ott, ottID, title, true);
    
    openLinkingUrl(appUrl);
  };

  const actionClicked = (item, action) => {
    setMoreOptionsVisible(false);
    switch (action.actionIcon) {
      case 'reco':
        if(isUpcoming){
          onMovieClick(
            item.movieid || item.id,
            item,
            list,
            false,
            sectionType,
            'homeMovieCard'
          )
        }
        else {
          onShareClick(item.movieid || item.id, item.title, sectionType,item);
        }
        return;
      case 'delete':
        onDeleteClick(item.movieid || item.id, item.title, sectionType);
        return;
      case 'bell':
        if(isUpcoming){
          //TODO api call for notify me to be applied
        }
        return;
      case 'review':
        onReviewClick(item.movieid || item.id, item.title, item, sectionType);
        return;
      case 'eye':
        setIsSeen(!isSeen);
        recommendationsAPI.getMovieStateForUser(item.id).then((res) => {
          let updRating = res && res.data && res.data.rating;
          onSeenClick(
            item.movieid || item.id,
            item.title,
            true,
            updRating,
            sectionType
          );
        });
        let newArr = actionArr.filter(function (obj) {
          return obj.actionIcon !== 'eye';
        });
        newArr.push({ actionName: 'Mark Unseen', actionIcon: 'eyeo' });
        setActionArr(newArr);
        return;
      case 'eyeo':
        setIsSeen(!isSeen);
        onSeenClick(
          item.movieid || item.id,
          item.title,
          false,
          rating,
          sectionType
        );
        let newArr2 = actionArr.filter(function (obj) {
          return obj.actionIcon !== 'eyeo';
        });
        newArr2.push({ actionName: 'Mark Seen', actionIcon: 'eye' });
        setActionArr(newArr2);
        return;
      case 'minussquareo':
        onAddClick(item.id, true, 'HomeMovieCard', sectionType);
        setIsWatchlisted(!isWatchlisted);
        let newArr3 = actionArr.filter(function (obj) {
          return obj.actionIcon !== 'minussquareo';
        });
        newArr3.push({ actionName: 'Add to Watchlist', actionIcon: 'plusbox' });
        setActionArr(newArr3);
        return;
      case 'plusbox':
        onAddClick(item.id, false, 'HomeMovieCard', sectionType);
        setIsWatchlisted(!isWatchlisted);
        let newArr4 = actionArr.filter(function (obj) {
          return obj.actionIcon !== 'plusbox';
        });
        newArr4.push({
          actionName: 'Remove from Watchlist',
          actionIcon: 'minussquareo',
        });
        setActionArr(newArr4);
        return;
    }
  };

  //on add click
  const watchlistClicked = () => {
    onAddClick(item?.movieid || item?.id, isWatchlisted, 'HomeMovieCard', sectionType);
    if(!isGuestFlow) {
      setIsWatchlisted(!isWatchlisted);
      
      if (!isWatchlisted) {
        setTimeout(() => {
          canRequestReview();
        }, 1000);
      }
    }
  }
  

  // api call for notify me
  const notifyApiCall = async () => {
    userProfileAPI
          .notifyOnMovieRelease(item?.movieid || item?.id)
          .then((res) => {
            if (res.status == 200) {
              Toast.show({
                type: 'beeToast',
                text1:
                StringConstants.NOTIFY_REQUEST_SAVED,
                visibilityTime: 2000,
                position: 'bottom',
                autoHide: true,
              });
              storeNotifyOnReleaseIds(item?.movieid || item?.id)
              mixpanel.track('NotifyOnRelease', {
                screen: 'NotifyOnRelease',
                purpose: 'Notify On Release Api success',
              });
            }
          })
          .catch((error) => {
            if (
              error &&
              error.response &&
              error.response.data &&
              error.response.data?.code 
            ) {
              Toast.show({
                type: 'infoToast',
                text1: StringConstants.REQUEST_ALREADY_RECEIVED,
                visibilityTime: 2000,
                position: 'bottom',
                autoHide: true,
              });
            } else {
              extendedLog.error(
                'Error executing  userProfileAPI.notifyOnMovieRelease with message:',
                error
              );
            }
          });
  }
  

  const primaryCTADoneUI = (label: string) => {
    return (
        <View
              style={[
                styles.mainButtonStyle,
                { backgroundColor: '#424242', width: 0.389 * height },
              ]}
            >
              <Tick color='#BDBDBD' height={14} width={14} strokeWidth={"2"} />
              <Text style={[styles.txtImageBody, { color: '#BDBDBD' }]}>
                {label}
              </Text>
            </View>
    )
  }

  //handle api call for notify flow
  const notifyMeClicked = async() => {
    mixpanel.track('NotifyOnRelease', {
      screen: 'HomeMovieCard',
      purpose: 'Bell icon clicked',
      source: isGuestFlow ? 'GuestUser' : sectionType ?? 'HomeMovieCard'
    });
    if(isGuestFlow && toggleLoginModal){
      toggleLoginModal()
    }
    else {
      try {
        // Retrieve IDs already stored in local storage
        let storedIdsJson = await EncryptedStorage.getItem('notify_release_ids');
        const storedIds = storedIdsJson ? JSON.parse(storedIdsJson) : [];
        // Check if the ID is already stored
        const isIdStored = storedIds.includes(`${item.movieid || item.id}`);
        if(isIdStored){
          Toast.show({
            type: 'infoToast',
            text1: StringConstants.REQUEST_ALREADY_RECEIVED,
            visibilityTime: 2000,
            position: 'bottom',
            autoHide: true,
          });
        }
        else{
          notifyApiCall()
        }
      }
      catch(e){
        console.log({e})
      }
    }
  }

  const renderPrimaryButton = () => {
   
    if(sectionType == 'upcoming_movies' || isUpcoming){
      return (
        <TouchableOpacity
          style={[styles.mainButtonStyle, { width: 0.389 * height }]}
          onPress={() => notifyMeClicked()}
        >
          <Text style={[styles.txtImageBody, { color: '#121212' }]}>
            Notify Me
          </Text>
        </TouchableOpacity>
      )
    }
    else if (isTrending) {
      return (
        <TouchableOpacity
          style={[styles.mainButtonStyle, { width: 0.389 * height }]}
          onPress={() => onMovieClick(item.id, item, list, true, sectionType)}
        >
          <Text style={[styles.txtImageBody, { color: '#121212' }]}>
            View Trailer
          </Text>
        </TouchableOpacity>
      );
    } else if (isWatchlist) {
      return (
        <>
          {movieOTTList != null ? (
            <TouchableOpacity
              style={[
                styles.mainButtonStyle,
                { width: 0.2583 * Dimensions.get('window').width, height: 24 },
              ]}
              onPress={() => {
                openOTT(item.movieid || item.id);
              }}
            >
              <Text style={[styles.txtImageBody, { color: '#121212' }]}>
                Watch Now
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.mainButtonStyle,
                { width: 0.2583 * Dimensions.get('window').width, height: 24 },
              ]}
              onPress={() => {
                onSeenClick(
                  item.movieid || item.id,
                  item.title,
                  !isSeen,
                  rating,
                  sectionType
                );
                setIsSeen(!isSeen);
              }}
            >
              <Text style={[styles.txtImageBody, { color: '#121212' }]}>
                {isSeen ? 'Mark Unseen' : 'Mark Seen'}
              </Text>
            </TouchableOpacity>
          )}
        </>
      );
    } else if (isMySeen) {
      return (
        <TouchableOpacity
          style={[
            styles.mainButtonStyle,
            { width: 0.2583 * Dimensions.get('window').width, height: 24 },
          ]}
          onPress={() => {
            onReviewClick(item.id, item.title, item, sectionType);
          }}
        >
          <Text style={[styles.txtImageBody, { color: '#121212' }]}>
            Write Review
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <>
          {isWatchlisted ? (
            primaryCTADoneUI('Added')
          ) : (
            <TouchableOpacity
              style={[styles.mainButtonStyle, { width: 0.389 * height }]}
              onPress={() => {
                setIsWatchlisted(!isWatchlisted);
                onAddClick(
                  item.id,
                  isWatchlisted,
                  'HomeMovieCard',
                  sectionType
                );
              }}
            >
              <View style={CommonStyles.rowAlignCenter}>
                <AddCircle width={12} height={12} color={AppColors.GREY_VARIANT2} strokeWidth={"1.2"} />
              <Text style={[styles.txtImageBody, styles.watchlistText]}>
                Watchlist
              </Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      );
    }
  };

  useEffect(() => {
    let genreArray = [];
    let displayGenre = '';
    if (
      item?.genre &&
      item?.genre != null &&
      item?.genre != "" &&
      item?.genre?.length > 0
    ) {
      if (Array.isArray(item?.genre)) {
        item.genre = item.genre.splice(0, 2);
        genreArray = item.genre;
      } else {
        item.genre = item?.genre?.split(", ");
        item.genre = item?.genre?.splice(0, 2);
        genreArray = item?.genre;
      }
    }
  
    genreArray.forEach((element) => {
      displayGenre = displayGenre + "   " + element;
    });
    
    setGenreList(displayGenre)
  },[item])

  let cardWidth = isOTT ? (index == 10 ? width + 100 : width + 50) : width;

  //on image failure to load
  const imageLoadError = () => {
    setHasImage(false)
  }

  //rating UI
  const ratingContainer = () => {
    return (
      <View style={styles.ratingPill}>
        {!item.arrating ? null : (
          <StarFilled width={15} height={15} />
        )}
        {!item.arrating ? null : (
          <Text style={styles.ratingText}>{item.arrating}</Text>
        )}
      </View>
    )
  }
 //dont count ad impression for guest user 
  const  onAdClicked = () =>{
    if(!isGuestFlow){
        onBannerAdClick(StringConstants.RECENT_RELEASES_BANNER_AD)
      }
  }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View
          style={[
            styles.container,
            {
              width: cardWidth,
              height: height
            },
          ]}
          ref={sectionType == 'recent_releases' && item == 'SHOW_AD' ? releaseAdViewRef : null}
        >
          {
          (sectionType == 'recent_releases' && item == 'SHOW_AD') || ( isGuestFlow && item == 'SHOW_AD') ? 
            <TouchableOpacity onPressIn={() => onAdClicked()} style={styles.marginTop27}>
              <AdmobBannerSize closeAds={closeAds} screenName="HomeTab" adPosition={AdPosition.RECENT_RELEASES} adHeight={Math.floor(height)} adWidth={Math.floor(width)} isGuestFlow={isGuestFlow}/>
            </TouchableOpacity>
          :
            <View style={styles.imageContainer}>
              
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  if(!disableTouch)
                    onMovieClick(
                      item.movieid || item.id,
                      item,
                      list,
                      false,
                      sectionType
                    )
                  }
                }
              >
              {isOTT && (
                <GradientNumbers value={index}/>
              )}
              {hasImage || (apiPosterImage(item) != null) ? (
                <>
                  <View>
                    {/* <TopBottomPosterGradient 
                      movieId={(item?.movieid || item?.id || item?.movieId)}
                      imageLoadError={imageLoadError}
                      height={height} 
                      hasImage={hasImage}
                      width={width} 
                      uri={uri} 
                      item={item}
                    /> */}
                        <FastImage
                          style={[styles.movieLogo, { height: height, width: width }]}
                          source={{ uri: hasImage ? getMoviePoster((item?.movieid || item?.id || item?.movieId)) : apiPosterImage(item) }}
                          onError={() => imageLoadError()}
                          resizeMode={FastImage.resizeMode.cover}
                          defaultSource={require('assets/defaultMovie.png')}
                        />
                    {inTheatres && 
                    <View
                        style={styles.ottPositioned}
                      >
                        <View style={[CommonStyles.rowAlignCenter, styles.theatreWrapper]}>
                          <Theatre height={14} width={14} />
                          <Text style={styles.theatre}>{StringConstants.IN_THEATRES}</Text>
                        </View>
                      </View>
                    }
                    {/* Moved rating/bell overlay inside image wrapper so it anchors to the poster */}
                    <View
                      style={[
                        styles.ratingContainer,
                      ]}
                    >
                      {(sectionType == 'upcoming_movies' || isUpcoming) ?
                        <TouchableOpacity style={styles.seenContainer} onPress={() => notifyMeClicked()}>
                          <Bell height={15} width={15} strokeWidth={2} />
                        </TouchableOpacity> : (!hideRating && item?.arrating) ? (
                          ratingContainer()
                        ) : null}
                      {!isOTT && isMySeen && !inTheatres ? (
                        <View
                          style={CommonStyles.flexDirRow}
                        >
                          {rating == null ? (
                            <TouchableOpacity
                              style={styles.rateIt}
                              onPress={() =>
                                onRateItClick(
                                  item.movieid || item.id,
                                  item.title,
                                  null
                                )
                              }
                            >
                              <Text
                                style={[
                                  styles.txtBody,
                                  { color: appConsumer.theme.colors.clientPrimary },
                                ]}
                              >
                                Rate it
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={styles.youRated}
                              onPress={() =>
                                onRateItClick(
                                  item.movieid || item.id,
                                  item.title,
                                  rating
                                )
                              }
                            >
                              <Text
                                style={[
                                  {
                                    color: appConsumer.theme.colors.grey3,
                                  },
                                  styles.youRatedText
                                ]}
                              >
                                You rated {rating}
                              </Text>
                              <StarFilled width={15} height={15} />
                            </TouchableOpacity>
                          )}
                        </View>
                      ) : (
                        null
                      )}
                      <View style={styles.removeButtonStyle}></View>
                 {/*  removed seen and notify me button from home movie card 
               { showButtons && ((sectionType == 'upcoming_movies' || isUpcoming) ?
                  <TouchableOpacity style={styles.seenContainer} onPress={() => notifyMeClicked()}>
                    <Bell height={15} width={15} strokeWidth={2} />
                  </TouchableOpacity>
                :
                  <TouchableOpacity style={styles.seenContainer} onPress={() => {
                    onSeenClick(
                      item.movieid || item.id,
                      item.title,
                      !isSeen,
                      rating,
                      sectionType
                    );
                    if(!isGuestFlow)
                      setIsSeen(!isSeen);
                  }}>
                    {isSeen ? <Eyeo height={12} width={12} strokeWidth={2} /> : <Eye height={12} width={12} strokeWidth={2} />}
                  </TouchableOpacity>
                )} */}
                    </View>
                  </View>
                  
                  {/* {!isOTT && (
                    <LinearGradient
                      colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)', '#030303']}
                      locations={[0.01, 0.73, 1]}
                      style={[styles.background, { height: height * 1.11 }]}
                    />
                  )} */}
                  {hasOTTList && !inTheatres && selectedOTTItem && (
                    <View style={styles.ottPositioned}>
                        <View style={[styles.ott]}>
                          <FastImage
                            source={{ uri: CLOUD_BASEURL + selectedOTTItem.logoName }}
                            style={styles.ottIcon}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                    </View>
                  )}
                </>
              ) : (
                <View
                  style={[
                    styles.noImage,
                    {
                      height: height,
                      width: width,
                    },
                  ]}
                >
                  <Text style={styles.txtImage}>{title}</Text>
                </View>
              )}
              {/* rating container moved inside image wrapper */}
              {//removed tag in home movie card
              /* {item?.tag && <View style={styles.tagContainer}>
                  <View style={[styles.tagInnerContainer, {maxWidth: cardWidth - 15}]}>
                      <Text numberOfLines={1} style={[styles.tagText, {maxWidth: cardWidth - 22 }]}>{item?.tag}</Text>
                  </View>
              </View>
              } */}
            </TouchableOpacity>
              <View style={[
                styles.imageTextContainer, 
                { width: width },
                !hasImage && {left: isOTT ? (index == 10 ? 76 : 65) : 0},
                isOTT && {left: isOTT ? (index == 10 ? 76 : 45) : 0}
              ]}>
                <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]}>
                  <View style={{width: hasImage ? width * 0.71 : width * 0.67}}>
                      {item?.details && showBanner ? (
                        <View style={styles.dateOverlay}>
                         <LeftLeaf width={8} height={12} />
                          <Text style={styles.dateText}>{item.details}</Text>
                          <RightLeaf width={8} height={12} />
                        </View>
                      ) :(
                        <>
                    {!hideGenre && genreList && genreList != '' && 
                      <Text numberOfLines={1} style={[styles.genreText, {width: hasImage ? width * 0.71 : width * 0.67}]}>
                        {genreList?.trimStart()}
                      </Text>
                    }
                    {!hideTitle && title && title != '' && sectionType == 'trending_releases' && <Text
                      style={[styles.movieTitle, {width: hasImage ? width * 0.71 : width * 0.67}]}
                      numberOfLines={1}
                    >
                      {title}
                    </Text>
                    }
                    </>)}
                  </View>
                 {showButtons && <TouchableOpacity
                      style={[styles.watchlistBtn]}
                      onPress={() => {
                        watchlistClicked()
                      }}
                    >
                      {isWatchlisted ? <Remove height={25} width={25} color={AppColors.WHITE} /> : <CircularAddIcon height={25} width={25} color={AppColors.WHITE} strokeWidth={"1.4"} />}
                    </TouchableOpacity>}
                </View>
                <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]}>
                  {date != '' ? (
                    <View style={styles.dateSpacing}>
                      <Text style={[styles.genreText]}>{date}</Text>
                    </View>
                  ): <View />}
                  {/* rating moved to top-left overlay */}
                </View>
              </View>
            {/* {!isOTT && (
              <View style={[styles.imageTextContainer, { width: width }]}>
                <View style={{ flex: 1, marginRight: 30 }}>
                  {renderPrimaryButton(item)}
                </View>
                <View
                  style={{
                    height: isWS ? 24 : 20,
                    width: isWS ? 24 : 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => moreOptionsClicked(item)}
                    style={[styles.actionButtonStyle]}
                  >
                    <View
                      style={{
                        height: isWS ? 24 : 18,
                        width: isWS ? 24 : 18,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MoreVertical
                        width={isWS ? 16 : 12}
                        height={isWS ? 16 : 12}
                        color='#121212'
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )} */}
          </View>}
          {moreOptionsVisible ? (
            <MoreOptionsModal
              toggleModal={moreOptionsVisible}
              cancelClick={() => setMoreOptionsVisible(false)}
              actions={actionArr}
              item={selectedRow}
              onClick={(item, a) => actionClicked(item, a)}
            />
          ) : null}
        </View>
      )}
    </AppConsumer>
  );
}

export default React.memo(HomeMovieCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 16,
  },
  theatreContainer: {
    width: '100%',
    position: 'absolute',
    top: 4,
    left: 0,
    right: 0,
    marginLeft:16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  theatreWrapper: {
    backgroundColor: AppColors.GREY_TRANSPARENT,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  releaseDate: {
    fontSize: 12,
    color: AppColors.GREY_VARIANT4,
    fontFamily: FontFamily.DMSansRegular
  },
  theatre: {
    fontSize: 10,
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansRegular
  },
  tagInnerContainer: {
    height: 12, 
    borderTopLeftRadius: 5, 
    borderTopRightRadius: 5, 
    backgroundColor: AppColors.LIGHT_YELLOW, 
    paddingHorizontal: 10
  },
   dateOverlay: {
      position: 'absolute',
      bottom: scaledWidth(-26),
      left: scaledWidth(25),
      alignItems: 'center',
      backgroundColor: AppColors.LIGHT_YELLOW,
      paddingVertical: scaledWidth(2),
      paddingHorizontal: scaledWidth(6),
      borderRadius: 6,
      flexDirection: 'row',
    },
    dateText: {
      fontSize: 9,
      fontWeight: '600',
      color: AppColors.BLACK,
    },
  tagContainer: {
    position: 'absolute', 
    bottom: 32, 
    left: 0, 
    right: 0, 
    alignSelf: 'center', 
    height: 20, 
    width: '100%', 
    backgroundColor: AppColors.TRANSPARENT, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  tagText: {
    fontSize: 8.5,
    color: AppColors.GREY_VARIANT2,
    fontFamily: FontFamily.DMSansRegular
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    borderRadius: 4,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 4,
  },
  movieLogo: {
    borderRadius: 8,
  },
  noImage:{
    borderRadius: 8,
    backgroundColor: AppColors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6
  },
  txtImage: {
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'DMSans-Bold',
    color: '#FFFFFF',
  },
  imageTextContainer: {
    paddingLeft: 6,
    paddingTop: 6,
    paddingRight: 6,
    paddingBottom: 6,
    position: 'absolute',
    bottom: 6,
    left: 0
  },
  ratingContainer: {
    position: 'absolute',
    zIndex:10,
    top: 4,
    left: 4,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    flex: 1, 
    position: "absolute",
    top: 0,
    left: 4,
    zIndex: 10,
  },
  ratingText: {
    color: AppColors.WHITE,
    fontSize: 12,
    fontFamily: FontFamily.DMSansBold,
    marginLeft: 4,
  },
  ott: {
    borderRadius: 5,
  },
  ottPositioned: {
    flexDirection: "row", 
    flex: 1, 
    position: "absolute",
    top: 4,
    right: 4,
    zIndex: 10,
  },
  ottIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  mainButtonStyle: {
    height: 20,
    backgroundColor: '#E9C638',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    flexDirection: 'row',
  },
  secButtonStyle: {
    width: 61,
    height: 20,
    backgroundColor: '#424242',
    alignItems: 'center',
    paddingLeft: 6,
    borderRadius: 12,
    flexDirection: 'row',
  },
  removeButtonStyle: {
    flexDirection: 'row',
    flex: 1,
    opacity: 0.7,
  },
  actionButtonStyle: {
    borderRadius: 15,
    backgroundColor: '#9E9E9E',
  },
  trendingText: {
    color: '#121212',
    textAlign: 'center',
    textShadowColor: '#E9C638',
    textShadowRadius: 5,
    fontFamily: 'DMSans',
    lineHeight: 90,
    fontSize: 90,
  },
  txtImageBody: {
    fontSize: 10,
    fontFamily: 'DMSans-Regular',
  },
  greyButtonTextStyle: {
    color: '#FFF',
  },
  txtBody: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#9E9E9E',
  },
  watchlistText: { color: AppColors.GREY_VARIANT2, marginLeft: 1 },
  marginTop27: {marginTop: 27},
  seenContainer: {
    width: 24,
    height: 24, 
    borderRadius: 24, 
    borderWidth: 0.5, 
    borderColor: 'rgba(255, 255, 255, 0.2)', 
    backgroundColor: 'rgba(68, 64, 60, 0.45)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  movieTitle: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 12,
    color: AppColors.WHITE,
    marginTop: 4
  },
  genreText: { 
    fontSize: 12, 
    color: AppColors.WHITE, 
    marginRight: 8, 
    fontFamily: FontFamily.DMSansBold,
  },
  watchlistBtn: {
    paddingLeft: 1,
    paddingTop: 1,
    paddingBottom: 1
  },
  dateSpacing: {},
  rateIt: { 
    paddingVertical: 5,  
    paddingRight: 4,  
  },
  youRated: {
    flexDirection: 'row',
    paddingVertical: 5,                          
    paddingRight: 4,
  },
  youRatedText: {
    marginLeft: 2,
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular
  },
  rating: {
    color: AppColors.WHITE_VARIANT3,
    marginLeft: 2,
    fontSize: 12,
    fontFamily: FontFamily.DMSansBold
  },
});
