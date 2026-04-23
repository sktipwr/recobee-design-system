import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { scaledWidth, SCREEN_WIDTH } from 'utils/Dimensions';
import Arrow from 'svg/right_arrow_yellow';
import MovieRoll from 'svg/negatives_roll.svg';
import StringConstants from '../../utils/StringConstants';
import CommonRewardCard from './CommonRewardCard';

interface PointsRewardsEntryCardProps {
  onPress: () => void;
}

const PointsRewardsEntryCard: React.FC<PointsRewardsEntryCardProps> = ({ onPress }) => {
  return (
    <CommonRewardCard
      onPress={onPress}
      title={StringConstants.BUZZ_UP_LEADERBOARD}
      subtitle={StringConstants.BUZZ_UP_SUBHEADING}
      categories={StringConstants.BUZZ_UP_CATEGORY}
      rightIcon={<Arrow height={20} width={20} />}
      backgroundDecoration={
        <View style={styles.negatives}>
          <MovieRoll height={scaledWidth(125)} width={SCREEN_WIDTH + scaledWidth(20)} />
        </View>
      }
      rightImage={
        <Image 
          source={require('assets/images/png/Trophy_Star.png')} 
          style={styles.trophyImage}
        />
      }
      containerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  negatives: {
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0.3,
    borderRadius: 12,
    overflow: 'hidden'
  },
  trophyImage: {
    width: scaledWidth(63),
    height: scaledWidth(63),
  },
  container: {
    marginHorizontal: scaledWidth(16),
  },
});

export default PointsRewardsEntryCard;