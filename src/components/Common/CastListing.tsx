import React, { FC, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SCREEN_WIDTH } from "utils/Dimensions";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import { LOG } from "config";
import DefaultUser from 'svg/user';
import { AnalyticsFilters } from "./AnalyticsFilters";
import StringConstants from "utils/StringConstants";
import { getCastImages } from "utils/utilFunctions";

const extendedLog = LOG.extend('MyMovieTime');

export type CastListingProps = {
  movieAnalyticsData: any,
  onCastClick: Function
};

export const CastListing: FC<CastListingProps> = ({
    onCastClick,
    movieAnalyticsData
}) => {

    const seenOrRatedChips = [
      { text: 'By Movies Seen', value: 'seen' },
      { text: 'By Movies Rated', value: 'rated'},
    ];
    const [castForMoviesRated, setCastForMoviesRated] = useState([])
    const [castForMoviesSeen, setCastForMoviesSeen] = useState([])
    const [castFilterValue, setCastFilterValue] = useState('seen')
  
    useEffect(() => {
      retrieveImagesData('seen', movieAnalyticsData?.castByMoviesSeen)
      retrieveImagesData('rated', movieAnalyticsData?.castByMoviesRated)
    },[movieAnalyticsData])
  
    
  //iterate over all casts to make api calls for images
  const retrieveImagesData = (type: string, data: any) => {
    
    if(data && data != null){
      if(data.length > 0){
        const promises = data?.map((value) => {
          return getCastImages(value?.cast, extendedLog)
        })
        Promise.all(promises)
        .then((results) => {
          if(type == 'seen'){
            setCastForMoviesSeen(results)
          }
          else {
            setCastForMoviesRated(results)
          }
        })
        .catch((error) => {
          console.error('Error fetching all images:', error);
        });
      }
    }
  }

  const renderItem = ({ item }) => {
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onCastClick(item?.name)}>
            {item?.image 
              ? 
                <Image source={{ uri: item?.image }} style={styles.image} />
              :
                <DefaultUser height={48} width={48} />
            }
            <Text numberOfLines={2} style={styles.name}>{item?.name}</Text>
        </TouchableOpacity>
    )
  };

  return (
    <>
    {
      (castFilterValue == 'seen' && castForMoviesSeen?.length > 0) || (castFilterValue == 'rated' && castForMoviesRated?.length > 0) 
        ?
          <View style={styles.castContainer}>
            <View>
              <Text style={styles.favoriteCast}>{StringConstants.FAVORITE_CAST}</Text>
              <AnalyticsFilters alignCenter={true} verticalGap={16} filterChips={seenOrRatedChips} onFilterSelect={setCastFilterValue} selectedItem={castFilterValue} />
            </View>
            {
              (castFilterValue == 'seen' && castForMoviesSeen?.length > 0) || (castFilterValue == 'rated' && castForMoviesRated?.length > 0) ? 
                <FlatList
                    data={castFilterValue == 'seen' ? castForMoviesSeen : castForMoviesRated}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index?.toString()}
                    numColumns={3} // 3 columns
                    contentContainerStyle={styles.flatListContainer}
                />
                :
                <View style={styles.emptyView}>
                  <Text style={styles.noData}>{castFilterValue == 'seen' && castForMoviesSeen?.length == 0 ? StringConstants.NO_CAST_FOR_SEEN_MOVIES : StringConstants.NO_CAST_FOR_RATED_MOVIES}</Text>
                </View>
            }
          </View>
        : 
          <View />
    }
    </>
  );
};

const styles = StyleSheet.create({
    flatListContainer: {
      marginTop: 5
    },
    itemContainer: {
      flex: 1,
      width: SCREEN_WIDTH * 0.2,
      alignItems: 'center',
      marginBottom: 20,
    },
    image: {
      width: 48,
      height: 48,
      borderRadius: 48, // Circular image
    },
    name: {
      marginTop: 8,
      textAlign: 'center',
      fontFamily: FontFamily.DMSansRegular,
      color: AppColors.WHITE_VARIANT2,
      fontSize: 12
    },
    favoriteCast: {
      fontSize: 16,
      fontFamily: FontFamily.DMSansBold,
      color: AppColors.WHITE,
      textAlign: 'center'
    },
    castContainer: {
      marginTop: 35, 
      minHeight: 150
    },
    emptyView: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center'
    },
    noData: {
      fontSize: 14,
      fontFamily: FontFamily.DMSansRegular,
      color: AppColors.GREY_VARIANT4,
      textAlign: 'center'
    }
});