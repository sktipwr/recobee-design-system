import React from 'react';
import { View } from 'react-native';
import PointsRewardsEntryCard from 'components/Cards/PointsRewardsEntryCard';

interface ExploreSectionListProps {
  onPointsRewardsPress: () => void;
}

const ExploreSectionList: React.FC<ExploreSectionListProps> = ({
  onPointsRewardsPress
}) => {
  return (
    <View>
      <PointsRewardsEntryCard onPress={onPointsRewardsPress} />
    </View>
  );
};

export default ExploreSectionList;