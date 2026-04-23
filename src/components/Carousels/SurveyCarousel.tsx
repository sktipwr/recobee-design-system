import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import TrailerReactionCard from 'components/Cards/TrailerReactionCard';
import PredictionMeterCard from 'components/Cards/PredictionMeterCard';

interface SurveyCarouselProps {
  data: any[];
  onReactionPress?: (reactionType: string, points: number) => void;
  onPredictionPress?: (predictionType: string, points: number) => void;
  onSharePress?: (predictionType: string, points: number) => void;
  indicatorMarginTop?: number;
}

const SurveyCarousel: React.FC<SurveyCarouselProps> = ({
  data,
  onReactionPress,
  onPredictionPress,
  onSharePress,
  indicatorMarginTop = 16
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderCarouselItem = useCallback(({ item, index }: { item: any; index: number }) => {
    switch (item.type) {
      case 'trailer_reaction':
        return (
          <TrailerReactionCard
            exploreCardsData={[item]}
            onReactionPress={onReactionPress}
          />
        );
      
      case 'prediction_meter':
        return (
          <PredictionMeterCard
            exploreCardsData={[item]}
            onPredictionPress={onPredictionPress}
          />
        );
      
      case 'movie_reaction':
        return (
          <PredictionMeterCard
            exploreCardsData={[item]}
            onPredictionPress={onSharePress}
            headerText="Share your experience"
          />
        );
      
      default:
        return null;
    }
  }, [onReactionPress, onPredictionPress, onSharePress]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel
        width={SCREEN_WIDTH}
        height={350}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={setActiveIndex}
        renderItem={renderCarouselItem}
        snapEnabled={data.length > 1}
        enabled={data.length > 1}
        loop={data.length > 1}
      />
      
      {data.length > 1 && (
        <View style={[styles.indicatorContainer, { marginTop: indicatorMarginTop }]}>
          {data.map((_, i) => (
            <View
              key={i}
              style={[
                styles.indicatorDot,
                activeIndex === i && styles.activeIndicatorDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorDot: {
    height: 8,
    width: 8,
    marginHorizontal: 4,
    borderRadius: 4,
    backgroundColor: AppColors.GREY_VARIANT20,
  },
  activeIndicatorDot: {
    backgroundColor: AppColors.LIGHT_YELLOW_VARIANT7,
  },
});

export default SurveyCarousel;