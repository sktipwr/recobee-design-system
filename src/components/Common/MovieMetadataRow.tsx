import React, { FC, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image as RNImage,
} from "react-native";
import { AppConsumer } from "context";
import { SCREEN_WIDTH } from "utils/Dimensions";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import { Circle } from "./Circle";
import Star from "svg/star-main";
import { CLOUD_BASEURL, MONTHS_FULLNAME } from "utils/HelperFunctions";
import EncryptedStorage from 'react-native-encrypted-storage';
import { LOG } from "config";
import searchAPI from "api/searchAPI";
import { UserPrefsContext } from "../../stores/userPrefs/userPrefsContext";
import Theatre from 'svg/theatreNew.svg'
import StringConstants from "utils/StringConstants";
import Calendar from "icons/Calendar";
import { ddMMYYYY_userReadable } from "utils/DatetimeHelperFunctions";

export type MetaDataProps = {
  item?: any;
  isReview: boolean,
  isUpcoming: boolean,
  isMySeen: boolean,
  isWatchlist: boolean
};
var extendedLog = LOG.extend("MovieMetadataRow");

export const MovieMetadataRow: FC<MetaDataProps> = ({
    item,
    isReview = false,
    isUpcoming = false,
    isMySeen = false,
    isWatchlist = false
}) => {

    const [title, setTitle] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [description, setDescription] = useState('')
    const { userPrefsState, dispatch } = useContext(UserPrefsContext);
    const [hasOTTList, setHasOTTList] = useState(false);
    const [movieOTTList, setMovieOTTList] = useState([]);

    const setInitialData = () => {
      let titleValue = "";
      titleValue = item.title;
      let releaseDateValue = '';
      let desc = '';

      if(isUpcoming && item?.releasedatetmdb){
        const date = new Date(item?.releasedatetmdb);
        const day = date.getDate();
        const month = MONTHS_FULLNAME[date.getMonth()];
        releaseDateValue = day + ' ' + month;
      }
      if (item.genre && item.genre != null && item.genre.length > 0) {
          if (Array.isArray(item.genre) && item?.genre?.length > 0) {
            if(isUpcoming){
              let genres = '';
              item?.genre?.map((val, index) => {
                genres = genres + val
                genres = genres + (index != (item?.genre?.length - 1) ? '/' : '')
              })
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
        setTitle(titleValue)
        setReleaseDate(releaseDateValue)
        setDescription(desc)
    }

    useEffect(() => {
      setInitialData()
      if(!isReview)
        EncryptedStorage.getItem('user_country').then((country) => {
          getOTTInfoForMovie(item?.movieid ?? item?.id, country);
        });
    },[item])

    
    const getYear = (date : string) => {
        let year = '';
        try {
            const dateTime = new Date(date);
            year = dateTime?.getFullYear();
        }
        catch(e){
            console.log({e})
        }
        return year?.toString();
    }

    const getGenre = (genre) => {
        let genreValue = genre;
        if(genreValue?.includes(',')){
            const genresArray = genre?.split(', ');
            genreValue = genresArray?.join('/'); 
        }
        return genreValue;
    }

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
            if(supportedOTTsResponse.includes('Theatre')){
              let primeItem = prefsOTTs.filter(value => value.name ==  'Theatre');
              finalSelectedOTTItems = primeItem
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

  //show schedule date
  const showScheduleInfo = () => {
    return (
      <View style={[CommonStyles.rowAlignCenter, {paddingVertical: 5}]}>
        <Calendar color={AppColors.WHITE} height={17} width={17} />
        <Text style={styles.time}>{ddMMYYYY_userReadable(item?.watchdate)}</Text>
      </View>              
    )
  }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View>
                <View>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.commentHeader,
                            {
                            width: SCREEN_WIDTH * 0.665,
                            color: appConsumer.theme.colors.text,
                            },
                        ]}
                        >
                        {isMySeen || isUpcoming ? title : (title + (item?.releasedate != '' && item?.releasedate ? " (" + item.releasedate + ")" : ''))}
                    </Text>
                    {
                        isReview ?
                        <View>
                            <View style={[CommonStyles.rowAlignCenter]}>
                                <Star />
                                <Text style={styles.rating}>
                                    {parseFloat(item.reviewrating)}
                                </Text>
                            </View>
                            <Text style={[styles.movieInfo, {maxWidth: SCREEN_WIDTH * 0.66,  marginTop: 1}]}>
                                {item?.reviewtitle ? ` ${item?.reviewtitle}` : ''}
                            </Text>
                        </View>
                        :
                    <View>
                        <View style={[CommonStyles.rowAlignCenter, styles.infoContainer]}>
                            <Text style={[styles.movieInfo, ]}>
                                {item?.releasedate != '' && item?.releasedate ? item?.releasedate : ''}{' '}
                              
                            </Text>
                            <Circle size={2} color={AppColors.GREY_VARIANT3} />
                            <Text numberOfLines={1} style={[styles.movieInfo, {maxWidth: SCREEN_WIDTH * 0.45}]}>
                                {isUpcoming ? ` ${description }` : item?.genre?.length > 0 && item?.genre && item?.genre != '' ? ` ${getGenre(item?.genre)} ` : ''}{' '}
                            </Text>
                           { item?.runningtime && item?.runningtime > 0 && 
                           <>
                           <Circle size={2} color={AppColors.GREY_VARIANT3} />
                            <Text style={styles.movieInfo}>
                                {` ${item?.runningtime}` + ' mins'}
                            </Text>
                            </>
                            }
                        </View>
                        {isWatchlist && item?.watchdate != null && typeof item?.watchdate != 'undefined' && showScheduleInfo()}
                        {(item?.arrating || movieOTTList.length > 0) && (
                            <View style={[CommonStyles.rowAlignCenter, {marginTop: 4}]}>
                                {item?.arrating && (
                                    <>
                                        <Star width={15} height={15} />
                                        <Text style={styles.rating}>{item.arrating}</Text>
                                    </>
                                )}
                                {movieOTTList.map((value, index) => {
                                    return (
                                        <>
                                        {
                                            value?.code == 'theatre' 
                                                ? 
                                                <View style={[CommonStyles.rowAlignCenter, styles.theatreWrapper, {marginLeft: item?.arrating ? 8 : 0}]}>
                                                    <Theatre height={14} width={14} />
                                                    <Text style={styles.theatre}>{StringConstants.IN_THEATRES}</Text>
                                                </View>
                                                :
                                                <View style={[CommonStyles.ottImgContainer, {marginLeft: item?.arrating && index == 0 ? 8 : (index == 0 ? 0 : 4)}, {marginTop: 0}]}>
                                                    <RNImage
                                                        source={{ uri: CLOUD_BASEURL + value.logoName }}
                                                        fadeDuration={0}
                                                        style={CommonStyles.ottImg}
                                                    />
                                                </View>
                                        }
                                        </>
                                    )
                                })}
                            </View>
                        )}
                        
                    </View>
                    }
                </View>
            
        </View>
      )}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
    commentHeader: {
        fontSize: 15,
        fontFamily: FontFamily.DMSansBold,
    },
    movieInfo: {
        color: AppColors.GREY_VARIANT3,
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular
    },
    infoContainer: {
        maxWidth: SCREEN_WIDTH * 0.66, 
        marginTop: 3,
    },
    rating: {
        color: AppColors.GREY_VARIANT4,
        fontSize: 14,
        marginLeft: 4,
        fontFamily: FontFamily.DMSansBold
    },
    theatreWrapper: {
      backgroundColor: 'rgba(39, 39, 39, 0.5)',
      paddingHorizontal: 8,
      paddingVertical: 3.5,
      borderRadius: 10,
      marginTop: 4
    },
    theatre: {
      fontSize: 12,
      color: AppColors.GREY_VARIANT4,
      fontFamily: FontFamily.DMSansRegular,
      marginLeft: 4
    },
    time: {
      fontSize: 13,
      color: AppColors.GREY_VARIANT3,
      fontFamily: FontFamily.DMSansRegular,
      marginLeft: 4
    }
});