import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AppConsumer } from "context";
import mixpanel from "mixpanel";
import CommonStyles from "../../../Styles";
import DefaultUser from 'svg/user';
import FontFamily from "utils/FontFamily";
import AppColors from "utils/Colors";
import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import { LOG } from "config";
import searchAPI from "api/searchAPI";
import { TMDB_BASEURL } from "utils/HelperFunctions";
import FastImage from "react-native-fast-image";
import StringConstants from "utils/StringConstants";
import { getCastImageById } from "../../utils/utilFunctions";
var extendedLog = LOG.extend('MovieDetailCasts');

interface MovieCastDetailsParams {
  castDetails: any,
  onCastClicked: Function
}


export const MovieDetailCastsRow: React.FC<MovieCastDetailsParams> = ({ castDetails, onCastClicked }) => {
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = (castId: number) => {
    setFailedImages(prev => new Set(prev).add(castId));
  };

  return (
    <AppConsumer>
      {(appConsumer) => {
        return (
          <View style={styles.bottomGap}>
            <Text
              style={[
                styles.txtHeader,
                { color: appConsumer.theme.colors.text},
              ]}
            >
              {StringConstants.CAST}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {castDetails.map((cast, index) => {
                const fallbackCastImage = cast?.id ? getCastImageById(cast.id) : null;
                const hasValidTmdbPath = cast?.tmdbprofilepath && cast.tmdbprofilepath.trim() !== '';
                const imageHasFailed = failedImages.has(cast?.id);
                
                return (
                  <View
                    key={index}
                    style={[CommonStyles.rowAlignCenter, styles.castContainer]}
                  >
                    <TouchableOpacity
                      style={[CommonStyles.alignCenter]}
                      onPress={() => onCastClicked(cast?.name, 'moviecast')}
                    >
                      {!imageHasFailed && hasValidTmdbPath ? (
                        <FastImage
                          style={styles.castImage}
                          source={{ uri: TMDB_BASEURL + cast.tmdbprofilepath }}
                          resizeMode={FastImage.resizeMode.cover}
                          onError={() => handleImageError(cast?.id)}
                        />
                      ) : !imageHasFailed && fallbackCastImage ? (
                        <FastImage
                          style={styles.castImage}
                          source={{ uri: fallbackCastImage }}
                          resizeMode={FastImage.resizeMode.cover}
                          onError={() => handleImageError(cast?.id)}
                        />
                      ) : (
                        <DefaultUser
                          height={scaledWidth(48)}
                          width={scaledWidth(48)}
                        />
                      )}
                      <Text numberOfLines={1} style={[styles.castName]}>
                        {cast?.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        );
      
      }}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
    castName: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.WHITE_VARIANT2,
        marginTop: 5,
    },
    bottomGap: { marginVertical: 8  },
    castImage: {
        width: scaledWidth(48),
        height: scaledWidth(48),
        borderRadius: scaledWidth(48),
    },
    txtHeader: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold,
    },
  castContainer: {
    padding: 16,
    backgroundColor: AppColors.THEME_BG_COLOR,
    paddingBottom: 8,
    borderRadius: 8,
    width: SCREEN_WIDTH * 0.27,
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 8
  },
    txtBody: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular,
    },
});