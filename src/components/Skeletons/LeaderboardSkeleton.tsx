import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { scaledWidth, scaledHeight } from 'utils/Dimensions';

const LeaderboardSkeleton = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder backgroundColor='#212121' speed={0}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitle} />
            <View style={styles.arrow} />
          </View>
          
          {/* Leaders row */}
          <View style={styles.leadersRow}>
            {/* Leader 1 */}
            <View style={styles.leaderItem}>
              <View style={styles.avatar} />
              <View style={styles.badge} />
              <View style={styles.name} />
            </View>
            
            {/* Leader 2 */}
            <View style={styles.leaderItem}>
              <View style={styles.avatar} />
              <View style={styles.badge} />
              <View style={styles.name} />
            </View>
            
            {/* Leader 3 */}
            <View style={styles.leaderItem}>
              <View style={styles.avatar} />
              <View style={styles.badge} />
              <View style={styles.name} />
            </View>
            
            {/* Separator */}
            <View style={styles.separator} />
            
            {/* Current User */}
            <View style={styles.leaderItem}>
              <View style={styles.avatar} />
              <View style={styles.badge} />
              <View style={styles.name} />
            </View>
          </View>
          
          {/* Tagline */}
          <View style={styles.tagline} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default LeaderboardSkeleton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    width: scaledWidth(332),
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerTitle: {
    height: 18,
    width: 160,
    borderRadius: 4,
  },
  arrow: {
    height: 20,
    width: 20,
    borderRadius: 4,
  },
  leadersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  leaderItem: {
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: scaledWidth(56),
    height: scaledWidth(56),
    borderRadius: scaledWidth(28),
  },
  badge: {
    height: 18,
    width: 28,
    borderRadius: 10,
    marginTop: scaledHeight(-6),
  },
  name: {
    height: 12,
    width: 50,
    borderRadius: 4,
    marginTop: scaledHeight(4),
  },
  separator: {
    width: 20,
    height: 1,
    marginHorizontal: scaledWidth(8),
  },
  tagline: {
    height: 28,
    width: 240,
    borderRadius: 4,
    alignSelf: 'center',
  },
});
