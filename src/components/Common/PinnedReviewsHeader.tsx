import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import PinIcon from "icons/Pin";
import StringConstants from "utils/StringConstants";
import FastImage from 'react-native-fast-image';
import { moviePostersList } from 'utils/MovieInfoUtils';
export type PinnedReviewsHeaderParams = {
    pinnedReviews: any,
    marginTop: any,
    scrollToTop: any
  };
  
export const PinnedReviewsHeader: React.FC<PinnedReviewsHeaderParams> = ({ 
    pinnedReviews,
    marginTop = 0,
    scrollToTop
}) => {

const [pinnedReviewImages, setPinnedReviewImages] = useState([])

useEffect(() => {
    if(pinnedReviews?.length > 0){
        let posterImages = [];
        let reviews = pinnedReviews?.length > 3 ? pinnedReviews.slice(0, 3) : pinnedReviews;
        reviews.map((value) => {
        let image = moviePostersList(value);
        posterImages.push(image)
        })
        setPinnedReviewImages(posterImages?.slice())
    }
},[pinnedReviews])

// background color for pinned movie cards on header
const getBgColor = (index) => {
    let bgColor = 'rgba(0, 0, 0, 1)';
    if(index == 0){
        bgColor = 'rgba(0, 0, 0, 0.6)'
    }
    else if(index == 1){
        bgColor = 'rgba(0, 0, 0, 0.8)'
    }
    return bgColor;
  }

  return (
    <TouchableOpacity style={[styles.fixedHeader, {marginTop: marginTop}, CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]} onPress={() => scrollToTop()}>
        <View style={CommonStyles.rowAlignCenter}>
        <View style={styles.pin}>
            <PinIcon height={20} width={20} strokeWidth="1.6" />
        </View>
        <Text style={styles.pinnedReviews}>
            {StringConstants.PINNED_REVIEWS}
        </Text>
        </View>
        {pinnedReviewImages?.length > 0 && 
            <View style={[CommonStyles.rowAlignCenter]}>
                {pinnedReviewImages?.map((value, index) => {
                return (
                    <View style={[{backgroundColor: getBgColor(index), right: index * 10}, styles.pinnedImages]}>
                    <FastImage
                        style={styles.pinImage}
                        source={{ uri: value }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    </View>
                )
                })}
            </View>
        }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    fixedHeader: {
        backgroundColor: AppColors.THEME_BG_COLOR, 
        width: '100%', 
        height: 56, 
        justifyContent: 'center', 
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: AppColors.GREY,
        paddingHorizontal: 16
      },
      pin: {
        height: 28,
        width: 28,
        borderRadius: 28,
        backgroundColor: AppColors.GREY_VARIANT8,
        justifyContent: 'center',
        alignItems: 'center'
      },
    
      pinnedReviews: {
        fontSize: 14,
        color: AppColors.GREY_VARIANT14,
        fontFamily: FontFamily.DMSansBold,
        marginLeft: 8
      },
      pinnedImages: {
        zIndex: 5, 
        height: 44, 
        width: 31, 
        position: 'absolute'
      },
      pinImage: {
        height: 44, 
        width: 31
      }
})
