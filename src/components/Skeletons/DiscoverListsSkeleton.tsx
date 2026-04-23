import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { scaledWidth, scaledHeight } from 'utils/Dimensions';
import CommonStyles from '../../../Styles';

const DiscoverListsSkeleton = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder backgroundColor='#212121' speed={0}>
        <View>
          {/* Title */}
          <View style={styles.title} />
          
          {/* First row of 3 cards */}
          <View style={styles.row}>
            <View style={styles.card} />
            <View style={styles.card} />
            <View style={styles.card} />
          </View>
          
          {/* Second row of 3 cards */}
          <View style={styles.row}>
            <View style={styles.card} />
            <View style={styles.card} />
            <View style={styles.card} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default DiscoverListsSkeleton;

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.fullWidth,
    ...CommonStyles.paddingHorizontal16,
    marginBottom: 24,
  },
  title: {
    height: 20,
    width: 150,
    borderRadius: 4,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  card: {
    width: scaledWidth(106),
    height: 106,
    borderRadius: 4,
  },
});
