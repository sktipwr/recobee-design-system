import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppConsumer } from 'context';
import { LOG } from 'config';

import EncryptedStorage from 'react-native-encrypted-storage';
import StarFilled from 'svg/star-main.svg';
import searchAPI from 'api/searchAPI';
import MoreOptionsModal from 'components/Modals/MoreOptionsModal';
import MoreVertical from 'icons/MoreVertical';
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';
var extendedLog = LOG.extend('Poster');
import { UserPrefsContext } from "../../stores/userPrefs/userPrefsContext";
import { CLOUD_BASEURL, MONTHS_FULLNAME, TMDB_BASEURL, checkIsSeries, fullMonthNameAndYear } from 'utils/HelperFunctions';
import Remove from 'svg/minus_circular'
import Reorder from 'svg/reorder'
import Dollar from '../../../assets/images/icon/dollar.svg';
import Trending from '../../../assets/images/icon/trending.svg';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleSheet,
  Image as RNImage,
} from 'react-native';
import { scaledHeight, SCREEN_WIDTH } from 'utils/Dimensions';
import CircularAddIcon from "icons/AddCircle";
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import Calendar from 'icons/Calendar';
import { Circle } from '../Common/Circle';
import FontFamily from 'utils/FontFamily';
import Tick from 'icons/Tick';
import { getMovieDuration, removeSSFromHHMMSS } from 'utils/DatetimeHelperFunctions';
import StringConstants from 'utils/StringConstants';
import { apiPosterImage, getMoviePoster, getOTTData } from 'utils/utilFunctions';
import { getRange } from 'utils/HelperFunctions';
import RatingModal from 'components/Modals/RatingModal';
import recommendationsAPI from 'api/recommendationsAPI';
import Toast from 'react-native-toast-message';

function ListCard({ item, actionArr, actionClicked, onMovieClick, addToList = false, isSelected = false, onSelect = () => {}, disableTouch = false, drag = () => {}, isReorderList = false, isUpcoming = false, hideAction = false, hideRightActions = false, useParentOptions = false, moreOptionsClicked, showSeenUnseen = false, isEventType = false, showGuestFlow = false, showLoginModal, isUpcomingTheatre = false, movieData = null}) {
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const [hasImage, setHasImage] = useState(true);
  const [hasOTTList, setHasOTTList] = useState(false);
  const [movieOTTList, setMovieOTTList] = useState([]);
  const { userPrefsState, dispatch } = useContext(UserPrefsContext);
  const [moreOptions, setMoreOptions] = useState(actionArr)
  const [duration, setDuration] = useState('')
  const [imageLoadError, setImageLoadError] = useState(false)
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [localRating, setLocalRating] = useState<number | null>(null);
  const ratingRef = useRef<number>(0);

  const onChangeRating = (val: number) => {
    setRating(val);
    ratingRef.current = val;
  };

  const renderChips = () => {
    if (!isUpcomingTheatre || !movieData) return null;
    
    const buzzScore = movieData.BuzzAnalysis?.CompositeBuzzScore;
    const prediction = movieData.Prediction;
    
    return (
      <View style={styles.chipsContainer}>
        <View style={styles.chip}>
          <Calendar width={12} height={12} color={AppColors.GREY_VARIANT4} strokeWidth="1" />
          <Text style={styles.chipText}>{releaseDate}</Text>
        </View>
        {buzzScore && (
          <View style={styles.chip}>
            <Trending width={12} height={12} color={AppColors.GREY_VARIANT4} strokeWidth="1" />
            <Text style={styles.chipText}>{buzzScore.split('(')[0].trim()}</Text>
          </View>
        )}
        {prediction && (
          <View style={styles.chip}>
            <Dollar width={12} height={12} color={AppColors.GREY_VARIANT4} strokeWidth="1" />
            <Text style={styles.chipText}>{getRange(prediction)} cr</Text>
          </View>
        )}
      </View>
    );
  };

  let releaseDate = ''
  if(isUpcoming && item?.releasedatetmdb){
    const date = new Date(item?.releasedatetmdb);
    const day = date.getDate();
    const month = MONTHS_FULLNAME[date.getMonth()];
    releaseDate = day + ' ' + month;
  }
  let uri = require('assets/defaultMovie.png');
  if (item?.posterimageurl && item?.posterimageurl != null) {
    uri = item.posterimageurl;
  } else if (item?.posterimage != null || item?.posterimage != '') {
    uri = TMDB_BASEURL + item.posterimage;
  } 
  else if (item?.movieimage != null || item?.movieimage != '') {
    uri = item.movieimage;
  }
  else {
    uri = TMDB_BASEURL + item.posterimage;
  }

  let title = item.title;
  if (item.title && item.title != '' && item.title.length > 42) {
    title = item.title.substring(0, 40) + '..';
  }

  let desc = '';
  if (item.releasedate && item.releasedate != null && !isUpcoming) {
    desc = desc + item.releasedate;
  }
  if (item.genre && item.genre != null && item.genre.length > 0) {
    if (Array.isArray(item.genre) && item?.genre?.length > 0) {
      if(isUpcoming){
        let genres = '';
        genres = item?.genre[0];
        desc = genres;
      }
      else {
        desc = desc + ' | ' + item.genre[0];
      }
    } else {
      if (item.genre.indexOf(', ') > 0) {
        desc =
          desc +
          ' | ' +
          item.genre
            .toString()
            .substring(0, item.genre.toString().indexOf(', '));
      } else {
        desc = desc + ' | ' + item.genre;
      }
    }
  }

  // set ott data
  const setOTTData = () => {
    const ottData = getOTTData(item?.otts, userPrefsState);
    if(ottData?.finalOTTItem?.length > 0){
      setMovieOTTList(ottData.finalOTTItem?.slice());
      setHasOTTList(true);
    }
  }

  useEffect(() => {
    if (
      (item.posterimage == null || item.posterimage == '') &&
      item.posterimageurl == null
    ) {
      if (
        item.movieimage == null ||
        item.movieimage == '' ||
        item.movieimage == 'N/A'
      ) {
        setHasImage(false);
      }
    }
    EncryptedStorage.getItem('user_country').then((country) => {
      setOTTData()
      //TODO: remove once confirmed
      // getOTTInfoForMovie(item?.movieid ?? item?.id, country);
    });
    
  }, []);

  useEffect(() => {
    if(showSeenUnseen){
      let actionArrCopy = moreOptions?.filter((value) => !(value.actionIcon == 'eyeo' || value.actionIcon == 'eye'))
      if(item.is_seen) {
        actionArrCopy.push({ actionName: 'Mark Unseen', actionIcon: 'eyeo' });
      } else {
        actionArrCopy.push({ actionName: 'Mark Seen', actionIcon: 'eye' });
      }
      setMoreOptions(actionArrCopy)
    }
    if(isEventType){
      let value = getMovieDuration(item)
      setDuration(value)
    }
    
    // Call setOTTData when item changes to update OTT icons
    setOTTData();
    // initialize local rating from item only when item has a meaningful rating
    try {
      if (item?.arrating != null && `${item?.arrating}`.length > 0) {
        const parsed = parseFloat(`${item.arrating}`);
        if (!isNaN(parsed) && parsed > 0) {
          setLocalRating(parsed);
        }
        // if parsed is 0 or NaN, keep previous localRating as-is
      }
      // if no arrating on item, preserve existing localRating
    } catch (e) {
      // ignore parse issues, preserve existing localRating
    }
  },[item])

  // fetch ottinfo
  const getOTTInfoForMovie = async (movieID, countryCode) => {
    searchAPI
      .getMovieOTTInfo(movieID, countryCode)
      .then((response) => { 
        if (response && response.data && response.data?.length > 0) {
          let prefsOTTs = userPrefsState?.prefsData.ott;
          let supportedOTTs = userPrefsState?.prefsData?.supportedOTTs;
          let finalSelectedOTTItems = null

          let supportedOTTsResponse = response.data.filter(value => supportedOTTs.includes(value));
         
          if(supportedOTTsResponse?.length > 0){
            finalSelectedOTTItems = prefsOTTs.filter(value => supportedOTTsResponse.includes(value.name));
            if(supportedOTTsResponse.includes('Amazon Prime')){
              let primeItem = prefsOTTs.filter(value => value.name ==  'Amazon Prime');
              finalSelectedOTTItems.push(primeItem)
            }
            if(finalSelectedOTTItems?.length > 0){
                setMovieOTTList(finalSelectedOTTItems);
                setHasOTTList(true);
            }
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

  const openRating = () => {
    if (showGuestFlow) {
      if (typeof showLoginModal === 'function') {
        showLoginModal();
      }
      return;
    }
    // prefill existing rating if any
    const existing = item?.arrating;
    if (existing != null && `${existing}`.length > 0) {
      const parsed = parseFloat(`${existing}`);
      const toSet = isNaN(parsed) ? 0 : parsed;
      setRating(toSet);
      ratingRef.current = toSet;
    } else if (localRating != null) {
      setRating(localRating);
      ratingRef.current = localRating;
    } else {
      setRating(0);
      ratingRef.current = 0;
    }
    setRatingModalVisible(true);
  };

  const submitRating = async () => {
    try {
      const movieId = item?.movieid || item?.id || item?.movieId;
      setRatingModalVisible(false);
      const finalRating = ratingRef.current ?? rating ?? 0;
      await recommendationsAPI.updateRatingForMovie(movieId, finalRating);
      setLocalRating(finalRating);
      Toast.show({
        text1: StringConstants.RATING_SUBMITTED,
        type: 'beeToast',
        visibilityTime: 2000,
        position: 'bottom',
        autoHide: true,
      });
    } catch (error) {
      extendedLog.error('Error updating rating for movie from ListCard:', error);
    }
  };

  const onMoreClick = () => {
    if(showGuestFlow){
      showLoginModal()
    }
    else {
      if(useParentOptions){
        moreOptionsClicked(item)
      }
      else {
        setMoreOptionsVisible(true);
      }
    }
  };

  const renderRatingModal = () => {
    if (!ratingModalVisible) return null;
    
    const ratingModalProps: any = {
      toggleModal: ratingModalVisible,
      cancelClicked: () => setRatingModalVisible(false),
      doneClicked: submitRating,
      title: item?.title,
      setRating: (value: number) => onChangeRating(value),
      initialRating: rating,
    };
    return <RatingModal {...ratingModalProps} />;
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={styles.container}>
          <TouchableOpacity
            disabled={disableTouch}
            onLongPress={drag}
            onPress={() => onMovieClick(item.movieid || item.id, item)}
            style={styles.subContainer}
          >
            {isReorderList && 
              <View style={styles.reorderIcon}>
                <Reorder />
              </View>
            }
            <View style={styles.imgContainer}>
              {!imageLoadError || apiPosterImage(item) != null ? (
                <FastImage
                  style={styles.imgStyle}
                  source={{ uri: !imageLoadError ? getMoviePoster(item?.movieid || item?.id || item?.movieId) : apiPosterImage(item) }}
                  resizeMode={FastImage.resizeMode.cover}
                  onError={() => setImageLoadError(true)}
                  defaultSource={require('assets/defaultMovie.png')}
                />
              ) : (
                <RNImage
                  style={styles.imgStyle}
                  source={require('assets/defaultMovie.png')}
                ></RNImage>
              )}
            </View>
            <View style={[styles.fRow, addToList ? {alignItems: 'center', width: isReorderList ?  SCREEN_WIDTH * 0.69 : SCREEN_WIDTH * 0.751} : {width: SCREEN_WIDTH * 0.784}]}>
              <View style={{ flex: 4}}>
                <View style={styles.fRow}>
                  <Text
                    style={[
                      styles.heading,
                      { color: appConsumer.theme.colors.text },
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {title}
                  </Text>
                </View>
                {!isEventType && desc.length > 0 &&
                  <View style={[styles.fRow, CommonStyles.alignCenter]}>
                    <Text
                      style={[
                        isUpcoming ? styles.upcomingTextStyle : styles.subHeading,
                        {
                          color: isUpcoming ? AppColors.GREY_VARIANT4 : appConsumer.theme.colors.grey5,
                          maxWidth: Dimensions.get('window').width * 0.65,
                        },
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {desc + ' '}
                    </Text>
                    {isUpcoming  &&  item?.runningtime != null && item?.runningtime != undefined && item?.runningtime != 0 &&
                    <View style={CommonStyles.rowAlignCenter}>
                      <Circle size={2} color={AppColors.GREY_VARIANT3} />
                      <Text
                      style={[
                        isUpcoming ? styles.upcomingTextStyle : styles.subHeading,
                        {
                          color: isUpcoming ? AppColors.GREY_VARIANT4 : appConsumer.theme.colors.grey5,
                        },
                      ]}
                    >
                      {' ' + `${item?.runningtime}` + ' mins '}
                    </Text>
                    </View>
                    }
                    {isUpcoming && isUpcomingTheatre && item?.language != null && Array.isArray(item.language) &&item?.language.length >0  &&
                    <View style={CommonStyles.rowAlignCenter}>
                      <Circle size={2} color={AppColors.GREY_VARIANT3} />
                      <Text
                      style={[
                        isUpcoming ? styles.upcomingTextStyle : styles.subHeading,
                        {
                          color: isUpcoming ? AppColors.GREY_VARIANT4 : appConsumer.theme.colors.grey5,
                        },
                      ]}
                    >
                      {' ' + `${item?.language[0]}` + " " + `${item?.language.length >1 ?  `,+${item?.language.length - 1}` : ''}`}
                    </Text>
                    </View>
                    }
                  </View>
                }
                {renderChips()}
                {!isEventType && 
                <View style={styles.fRow}>
                  {isUpcoming || isUpcomingTheatre ? null : 
                    <View style={styles.ratingContainer}>
                      <StarFilled width={16} height={16} />
                      {localRating != null ? (
                        <View >
                          <Text style={styles.rating}>{`${localRating}`}</Text>
                        </View>
                      ) : (
                        <TouchableOpacity onPress={openRating}>
                          <Text style={[styles.rating,{color:AppColors.LIGHT_YELLOW}]}>{StringConstants.RATE_IT}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  }
                  {isUpcoming && !isUpcomingTheatre && item?.releasedatetmdb && releaseDate != '' && 
                    <Text style={styles.upcomingTextStyle}>
                      {releaseDate}
                    </Text>
                  }
                  {movieOTTList.length == 0 ? null : (
                    <>
                    {movieOTTList.map(value => {
                      return (
                        <View style={[CommonStyles.ottImgContainer]}>
                          <RNImage
                            source={{ uri: CLOUD_BASEURL + value.logoName }}
                            fadeDuration={0}
                            style={CommonStyles.ottImg}
                          />
                        </View>
                      )
                    })}
                    </>
                  )}
                </View>
              }
              {isEventType && 
                <View style={[CommonStyles.rowAlignCenter]}>
                  <Text style={styles.upcomingTextStyle}>
                    {duration}{duration != "" ? " " : ""}
                  </Text>
                  {duration != "" && <Circle size={2} color={AppColors.GREY_VARIANT3} />}
                  <Text style={styles.upcomingTextStyle}>
                    {duration != "" ? ' ' : ''}{removeSSFromHHMMSS(`${item?.watchtime}`)}
                  </Text>
                </View>
              }
              </View>
              {!addToList && !hideAction ?
                <TouchableOpacity
                  style={[styles.removeOrAddContainer]}
                  onPress={() => onMoreClick()}
                >
                  <MoreVertical width={20} height={20} color='white' />
                </TouchableOpacity>
                : (
                  !hideAction && 
                  <TouchableOpacity
                    style={[styles.removeOrAddContainer]}
                    onPress={() => {
                      onSelect(item)}}
                  >
                    {isSelected ? <Remove height={24} width={24} /> : <CircularAddIcon height={24} width={24} color={AppColors.LIGHT_YELLOW} strokeWidth={"1.2"} />}
                  </TouchableOpacity>
                )
              }
              {hideAction && !hideRightActions  && !isUpcomingTheatre &&
                <View
                  style={[styles.removeOrAddContainer]}
                  >
                  <View style={[CommonStyles.radioCheck]}>
                    <Tick height={20} width={20} strokeWidth={"2"} />
                  </View>
                </View>
              }
            </View>
          </TouchableOpacity>
          {renderRatingModal()}
          {moreOptionsVisible ? (
            <MoreOptionsModal
              toggleModal={moreOptionsVisible}
              cancelClick={() => setMoreOptionsVisible(false)}
              actions={moreOptions}
              item={item}
              onClick={(item, a) => {
                setMoreOptionsVisible(false);
                actionClicked(item, a);
              }}
            />
          ) : null}
        </View>
      )}
    </AppConsumer>
  );
}

export default React.memo(ListCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
  },
  reorderIcon: {
    marginRight: 20
  },
  fRow: {
    flexDirection: 'row',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingTextStyle: {
    fontSize: 14,
    color: AppColors.GREY_VARIANT1,
    fontFamily: FontFamily.DMSansRegular
  },
  imgContainer: {
    paddingRight: 16,
  },
  imgStyle: {
    height: scaledHeight(64),
    width: scaledHeight(44),
    borderRadius: 5,
  },
  heading: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
  },
  subHeading: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    paddingVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    paddingTop: 2,
  },
  rating: {
    color: '#9E9E9E',
    marginLeft: 3,
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
  },
  actionButtonStyle: {
    borderRadius: 15,
    backgroundColor: '#9E9E9E',
  },
  moreIconCont: {
    flex: 1,
    paddingTop: 4,
    padding: 10,
  },
  removeOrAddContainer: {
    padding: 10
  },
  chipsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    borderColor: AppColors.GREY_VARIANT4,
    borderWidth: 1,
    marginRight: 6,
    marginBottom: 4,
  },
  chipText: {
    color: AppColors.GREY_VARIANT4,
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    marginLeft: 4,
  },
});
