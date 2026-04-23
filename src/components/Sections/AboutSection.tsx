import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import Arrow from 'svg/right_arrow_yellow';
import { formattedDate } from '../../utils/HelperFunctions';

export type AboutSectionProps = {
  releaseDate?: string;
  language: string;
  seasons?: any[];
  onSeasonsPress?: Function;
  directors?: string[];
  onDirectorClick: Function;
};

export const AboutSection: FC<AboutSectionProps> = ({
  releaseDate,
  language,
  seasons,
  onSeasonsPress,
  directors,
  onDirectorClick,
}) => {
  const hasSeasons = seasons && seasons.length > 0;
  const hasDirectors = directors && directors.length > 0 && directors[0] !== '';
  const hasReleaseDate = releaseDate && releaseDate !== '';
  const hasLanguage = language && language !== '';
  const isReleaseDateInFuture = hasReleaseDate && new Date(releaseDate) > new Date();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {hasReleaseDate && (
          <View style={styles.card}>
            <>
              <Text style={styles.label}>{isReleaseDateInFuture ? StringConstants.RELEASING_ON : StringConstants.RELEASED_ON}</Text>
              <Text style={styles.value}>{formattedDate(releaseDate)}</Text>
            </>
          </View>)}
        {hasLanguage && (
          <View style={styles.card}>
            <>
              <Text style={styles.label}>{StringConstants.LANGUAGES}</Text>
              <Text style={styles.value}>{language}</Text>
            </>
          </View>)}
      </View>

      <View style={styles.row}>
        {hasSeasons && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onSeasonsPress && onSeasonsPress(seasons[0])}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.label}>{StringConstants.SEASONS}</Text>
              <Arrow height={20} width={20} />
            </View>
            <Text style={styles.value}>
              {seasons.length} {StringConstants.SEASONS}
            </Text>
          </TouchableOpacity>
        )}
        {hasDirectors && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => onDirectorClick(directors[0], 'director')}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.label}>{StringConstants.DIRECTOR}</Text>
              <Arrow height={20} width={20} />
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {directors[0]}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  card: {
    flex: 1,
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 8,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 14,
    color: AppColors.GREY_VARIANT4,
    fontFamily: FontFamily.DMSansBold,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansRegular,
  },
});
