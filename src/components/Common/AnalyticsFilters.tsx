import React, { FC } from "react";
import {
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import CommonStyles from "styles";
import Chip from 'components/Common/Chip';

export type AnalyticsFiltersProps = {
  filterChips: any,
  selectedItem: any,
  onFilterSelect: Function,
  verticalGap: number,
  alignCenter: any
};

export const AnalyticsFilters: FC<AnalyticsFiltersProps> = ({
  filterChips,
  onFilterSelect,
  selectedItem,
  verticalGap,
  alignCenter = false
}) => {

  return (
    <View style={[CommonStyles.flexDirRow, styles.filtersSpacing, {marginVertical: verticalGap}, alignCenter && styles.alignCenter]}>
      <FlatList
        horizontal
        data={filterChips}
        contentContainerStyle={[alignCenter && styles.flatlist]}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.value.toString()}
        renderItem={({ item }) => {
          return (
            <Chip
              item={item}
              onClick={onFilterSelect}
              state={selectedItem}
            ></Chip>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filtersSpacing: {
    marginVertical: 21,
    marginHorizontal: 16,
  },
  alignCenter: {
    alignItems: 'center', 
    flex: 1, 
    justifyContent: 'center' 
  },
  flatlist: {
    width: '100%', 
    justifyContent: 'center'
  }
});