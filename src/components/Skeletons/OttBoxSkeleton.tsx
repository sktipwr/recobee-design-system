import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AppColors from '../../utils/Colors';

const OttBoxSkeleton = () => {
  return (
    <SkeletonPlaceholder speed={3600} backgroundColor={AppColors.BLACK_VARIANT3}>
      <View style={styles.container}>
        <View style={styles.chip} />
        <View style={styles.chip} />
      </View>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 4,
  },
  chip: {
    width: 100,
    height: 44,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default OttBoxSkeleton;
