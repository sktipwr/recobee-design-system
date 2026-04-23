import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SCREEN_WIDTH } from 'utils/Dimensions';

/*
  This skeleton mirrors the new CarouselImageCard layout/dimensions used by HomeCarousel:
  - Card size: width = SCREEN_WIDTH - 60, height = (SCREEN_WIDTH - 60) * 1.35
  - Top-left small rating pill
  - Centered genre text line
  - Bottom row with primary OTT button and watchlist button
*/
const CARD_WIDTH = SCREEN_WIDTH - 60;
const CARD_HEIGHT = (SCREEN_WIDTH - 60) * 1.35;

const CarouselImageSkeleton: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <SkeletonPlaceholder backgroundColor="#212121" highlightColor="#2A2A2A">
        <View style={styles.card}>
          {/* Image area */}
          <View style={styles.image}>
            {/* Rating pill top-left */}
            <View style={styles.ratingPill} />

            {/* Genre line near bottom center */}
            <View style={styles.genreLine} />

            {/* Bottom buttons row */}
            <View style={styles.buttonsRow}>
              <View style={styles.primaryBtn} />
              <View style={styles.watchlistBtn} />
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  ratingPill: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: 24,
    width: 64,
    borderRadius: 12,
  },
  genreLine: {
    position: 'absolute',
    bottom: 72,
    alignSelf: 'center',
    height: 16,
    width: CARD_WIDTH * 0.5,
    borderRadius: 8,
  },
  buttonsRow: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    height: 36,
    width: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  watchlistBtn: {
    height: 36,
    width: 130,
    borderRadius: 8,
  },
});

export default CarouselImageSkeleton;
