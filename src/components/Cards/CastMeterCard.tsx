import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import { getCastImageById } from 'utils/utilFunctions';
import guestAPI from 'api/guestAPI';
import User from 'svg/user.svg';
import mixpanel from 'mixpanel';

interface CastMeterData {
  castName: string;
  score: number;
  category: string;
}

interface CastMeterCardProps {
  castData: CastMeterData[];
  movieId: string;
  navigation?: any;
}

export default function CastMeterCard({ castData, movieId, navigation }: CastMeterCardProps) {
  const [castImages, setCastImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadCastImages();
  }, [castData]);

  const castClicked = (castName: string) => {
    mixpanel.track('Nav_CastResult', {
      screen: 'B2BStatsMovieDetails',
      cast: castName,
    });
    navigation?.navigateDeprecated('CastResult', { searchStr: castName })
  }

  const loadCastImages = async () => {
    try {
      const response = await guestAPI.getMovieCastDataNew(movieId);
      if (response?.data?.cast) {
        const imageMap: { [key: string]: string } = {};
        response.data.cast.forEach((cast: any) => {
          const castName = cast.name || cast.castname;
          if (castName && cast.id) {
            imageMap[castName] = getCastImageById(cast.id);
          }
        });
        setCastImages(imageMap);
      }
    } catch (error) {
      console.error('Error loading cast images:', error);
    }
  };
  const getLabel = (score: number) => {
    if (score >= 80) return 'Very High';
    if (score >= 65) return 'High';
    if (score >= 50) return 'Medium';
    return 'Low';
  };

  const getBarColor = (label: string) => {
    if (label === 'Very High' || label === 'High') return AppColors.GREEN_VARIANT1;
    if (label === 'Medium') return AppColors.YELLOW_VARIANT1;
    return AppColors.RED_VARIANT;
  };

  const renderCastItem = ({ item: cast, index }: { item: CastMeterData; index: number }) => {
    const label = getLabel(cast.score);
    const barColor = getBarColor(label);
    const widthPercent = Math.min(cast.score, 100);

    return (
      <TouchableOpacity 
        style={styles.row}
        onPress={() => castClicked(cast.castName)}
        activeOpacity={0.7}
      >
        {castImages[cast.castName] ? (
          <FastImage
            style={styles.castImage}
            source={{ uri: castImages[cast.castName] }}
            resizeMode={FastImage.resizeMode.cover}
            onError={() => {}}
          />
        ) : (
          <View style={styles.castImage}>
            <User width={48} height={48} />
          </View>
        )}
        <View style={styles.barSection}>
          <View style={styles.castRow}>
            <Text style={styles.castName}>{cast.castName}</Text>
            <Text style={[styles.label, { color: barColor }]}>{label}</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={[styles.barFill, { width: `${widthPercent}%`, backgroundColor: barColor }]} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{StringConstants.CAST_METER}</Text>
      <View style={styles.content}>
        <FlatList
          data={castData}
          renderItem={renderCastItem}
          keyExtractor={(item, index) => `${item.castName}-${index}`}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: 8,
  },
  content: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 12,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  castImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barSection: {
    flex: 1,
  },
  castRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  castName: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  barContainer: {
    height: 8,
    backgroundColor: AppColors.GREY_VARIANT6,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
  },
});
