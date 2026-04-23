import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { AppConsumer } from "context";
import CommonStyles from "../../Styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import { POSTER_IMAGE_BASEURL, monthShortDateYearFormat } from "utils/HelperFunctions";
import Arrow from "icons/Arrow";
import FastImage from "react-native-fast-image";
import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";

export const EpisodesInfo = ({ episodes, seasonName }) => {

  const [episodesData, setEpisodesData] = useState(episodes)
  
  const toggleView = (id) => {
    let episodesCopy = episodesData?.slice()
    episodesCopy = episodesCopy?.map((value) => {
      return {
        ...value,
        isExpanded: value?.episodeID == id ? !(value?.isExpanded) : value?.isExpanded
      }
    })

    setEpisodesData(episodesCopy?.slice())
  }

  useEffect(()=>{
    setEpisodesData(episodes)
  },[episodes])
  
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter, {marginBottom: item?.isExpanded ? 8 : (index + 1 == episodesData?.length) ? 12 : 16}]}
          onPress={()=> toggleView(item?.episodeID)}
        >
          <View style={[CommonStyles.rowAlignCenter]}>
          {item?.posterImage != null && item?.posterImage != ''
              ? 
                  <FastImage             
                    defaultSource={require('assets/defaultMovie.png')}
                    source={{uri: POSTER_IMAGE_BASEURL + item?.posterImage}} 
                    style={styles.posterImage} 
                  />
              :
              <View style={[styles.posterImage]}>
                  <Image
                      source={require('assets/BlackBee.png')}
                      fadeDuration={0}
                      style={styles.posterImage}
                  />
              </View>
            }
            <View>
              <View style={[CommonStyles.rowAlignCenter]}>
                <Text style={styles.episodeNumber}>{seasonName} E{index + 1}</Text>
                  {item?.airingDate && <Text style={styles.name}> | {monthShortDateYearFormat(item?.airingDate)}</Text>}
              </View>
              <Text numberOfLines={2} style={[styles.episodeTitle]}>{item?.episodeName}</Text>
            </View>
          </View>
          <View style={item?.isExpanded && styles.arrowExpanded}>
            <Arrow height={28} width={28} color={AppColors.WHITE} />
          </View>
        </TouchableOpacity>
        {item?.isExpanded && 
          <View>
            <Text style={[styles.name, {marginBottom: (index + 1 == episodesData?.length) ? 12 : 16}]}>{item?.episodeOverview}</Text>
          </View>}
      </View>
    )
  }

  return (
    <AppConsumer>
      {(appConsumer) => {
        return (
          <View>
            <Text style={styles.seasonsCount}>{episodesData?.length} Episodes</Text>
            <FlatList
              data={episodesData}
              keyExtractor={(item, index) => "key-" + index}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
        );
      }}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  seasonsCount: {
    fontSize: 16,
    marginBottom: 12,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE
  },
  episodeNumber: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE_VARIANT3
  },
  episodeTitle: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREY_VARIANT4,
    width: SCREEN_WIDTH * 0.6
  },
  name: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4
  },
  arrowExpanded:{
    transform: [{ rotate: '180deg'}]
  },
  posterImage: {
    width: scaledWidth(44),
    height: scaledWidth(64),
    borderRadius: 4,
    marginRight: 12
  },
});