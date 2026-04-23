import React, { FC, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import { getCastImages, getTopNFromList } from "utils/utilFunctions";
import StringConstants from "utils/StringConstants";
import DefaultUser from 'svg/user';
import mixpanel from 'mixpanel';

export type MyCineHighlightsProps = {
  analyticsData: any,
  extendedLog: any,
  navigation: any
};

export const MyCineHighlights: FC<MyCineHighlightsProps> = ({
  analyticsData,
  extendedLog,
  navigation
}) => {

const castData = analyticsData?.castByMoviesSeen ?? [];

const [castImages, setCastImages] = useState([])
const [top3Items, setTop3Items] = useState([])
//iterate over all casts to make api calls for images
const retrieveImagesData = (data: any) => {
    
  if(data && data != null){
    if(data.length > 0){
      const promises = data?.map((value) => {
        return getCastImages(value?.cast, extendedLog)
      })
      Promise.all(promises)
      .then((results) => {
        setCastImages(results)
      })
      .catch((error) => {
        console.error('Error fetching all images:', error);
      });
    }
  }
}

  useEffect(() => {
    try {
      let topCast = getTopNFromList(castData)
      setTop3Items(topCast?.slice())
      retrieveImagesData(topCast)
    }
    catch(error) {
      console.log({error})
    }
  }, [analyticsData])
  
  //to to cast details
  const onCastClick = (castName: string) => {
    mixpanel.track('Nav_CastResult', {
      screen: 'AdvancedAnalytics',
      cast: castName,
    });
    navigation.navigateDeprecated('CastResult', {
      searchStr: castName,
    });
  }

  //cast ui
  const castInfo = (image, name, count, rank) => {
    return (
      <TouchableOpacity style={[styles.container, CommonStyles.rowAlignCenter, {height: scaledWidth(70), width: SCREEN_WIDTH * 0.445}]} onPress={() => onCastClick(name)}>
          <View style={[CommonStyles.flexDirRow]}>
              <View style={[Platform.OS == 'ios' && {zIndex: 2}]}>
                  <Text style={[styles.rankText, {fontSize: 24, marginLeft: 0}]}>{rank}</Text>
              </View>
          </View>
          {image
            ? 
              <Image source={{ uri: image }} style={[styles.castImage, {marginRight: 5}]} />
            :
              <DefaultUser height={scaledWidth(36)} width={scaledWidth(36)} />
          }
          <View>
            <Text numberOfLines={2} style={[styles.name, {fontSize: 12, maxWidth: scaledWidth(74)}]}>{name}</Text>
            <View style={[CommonStyles.rowAlignCenter]}>
              <Text style={[styles.count]}>{StringConstants.MOVIES_WATCHED + ': '}</Text>
              <Text style={[styles.count, styles.seenCount]}>{count}</Text>
            </View>
          </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      {castImages?.length > 0 && 
      <>
        <Text style={styles.title}>{StringConstants.MY_CINE_HIGHLIGHTS}</Text>
        <TouchableOpacity style={[styles.container, CommonStyles.flexDirRow, {marginBottom: 12}]} onPress={() => onCastClick(castImages[0]?.name)}>
            <View style={[CommonStyles.flexDirRow]}>
                <View style={[styles.minWidth, Platform.OS == 'ios' && {zIndex: 2}]}>
                    <Text style={styles.rankText}>{1}</Text>
                </View>
            </View>
            <View style={[CommonStyles.rowAlignCenter]}>
              {castImages[0]?.image 
                ? 
                  <Image source={{ uri: castImages[0]?.image }} style={styles.image} />
                :
                  <DefaultUser height={scaledWidth(64)} width={scaledWidth(64)} />
              }
              <View style={styles.gap6}>
                <Text numberOfLines={2} style={[styles.name, {width: SCREEN_WIDTH * 0.64}]}>{castImages[0]?.name}</Text>
                <View style={[CommonStyles.rowAlignCenter, styles.top8]}>
                  <Text style={[styles.count, ]}>{StringConstants.MOVIES_WATCHED + ': '}</Text>
                  <Text style={[styles.name, {fontSize: 12}]}>{top3Items[0]?.count}</Text>
                </View>
              </View>
            </View>
        </TouchableOpacity>
        <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]}> 
          {castImages[1] && castInfo(castImages[1]?.image, castImages[1]?.name, top3Items[1]?.count, 2)}
          <View style={{width: 10}} />
          {castImages[2] && castInfo(castImages[2]?.image, castImages[2]?.name, top3Items[2]?.count, 3)}
        </View>
        </>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 24
  },
  minWidth: { minWidth: 17 },
  rankText: {
    color: AppColors.GREY_VARIANT2,
    textShadowColor: AppColors.LIGHT_YELLOW,
    textShadowRadius: 5,
    fontFamily: 'DMSans',
    fontSize: 24,
    lineHeight: 24,
    marginLeft: 5,
    zIndex: 5,
  },
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: AppColors.THEME_BG_COLOR,
  },
  image: {
    width: scaledWidth(64),
    height: scaledWidth(64),
    borderRadius: scaledWidth(64),
  },
  name: {
    color: AppColors.WHITE_VARIANT3,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
  },
  count: {
    color: AppColors.WHITE_VARIANT3,
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 10,
  },
  top8: {
    marginTop: 8
  },
  castImage: {
    width: scaledWidth(36),
    height: scaledWidth(36),
    borderRadius: scaledWidth(36),
    marginRight: 8
  },
  gap6: {
    marginLeft: 8
  },
  seenCount: {
    fontSize: 12, 
    fontFamily: FontFamily.DMSansBold
  }
  
});