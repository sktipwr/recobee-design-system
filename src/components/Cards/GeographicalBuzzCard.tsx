import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';

interface GeoData {
  location: string;
  value: string;
}

interface GeographicalBuzzCardProps {
  geoData: GeoData[];
}

export default function GeographicalBuzzCard({ geoData }: GeographicalBuzzCardProps) {
  const topLocations = geoData.slice(0, 4);
  const maxValue = Math.max(...topLocations.map(item => parseInt(item.value)));

  const getLabel = (value: number) => {
    const percent = (value / maxValue) * 100;
    if (percent >= 75) return 'High';
    if (percent >= 50) return 'Medium';
    return 'Low';
  };

  const getBarColor = (label: string) => {
    if (label === 'High') return AppColors.GREEN_VARIANT1;
    if (label === 'Medium') return AppColors.YELLOW_VARIANT1;
    return AppColors.RED_VARIANT;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geographical Buzz</Text>
      <View style={styles.content}>
        {topLocations.map((item, index) => {
          const value = parseInt(item.value);
          const widthPercent = (value / maxValue) * 100;
          const label = getLabel(value);

          return (
            <View key={index} style={styles.row}>
              <Text style={styles.index}>{String(index + 1).padStart(2, '0')}</Text>
              <View style={styles.barSection}>
                <View style={styles.locationRow}>
                  <Text style={styles.locationText}>{item.location}</Text>
                  <Text style={[styles.label, { color: getBarColor(label) }]}>{label}</Text>
                </View>
                <View style={styles.barContainer}>
                  <View style={[styles.barFill, { width: `${widthPercent}%`, backgroundColor: getBarColor(label) }]} />
                </View>
              </View>
            </View>
          );
        })}
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
    paddingBottom:-8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  index: {
    fontSize: 20,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREY_VARIANT6,
    width: 40,
  },
  barSection: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: 8,
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
  veryHighLabel: {
    color: AppColors.LIGHT_YELLOW4,
  },
});
