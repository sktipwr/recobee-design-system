import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AppColors from 'utils/Colors';
import { SCREEN_WIDTH } from 'utils/Dimensions';

// Define the props for SectionNavigation
interface TopSectionNavigationProps {
  sectionCount: number;          // Number of sections to display
  currentSection: number;        // Current active section
  onNext: () => void;            // Callback for Next button
  onBack: () => void;            // Callback for Back button
}

const TopSectionNavigation: React.FC<TopSectionNavigationProps> = ({ sectionCount, currentSection, onNext, onBack }) => {
  // Generate sections dynamically based on sectionCount
  const sections = Array.from({ length: sectionCount }, (_, index) => `${index + 1}`);

  return (
    <View style={styles.container}>
      {/* Dynamic horizontal bar */}
      <FlatList
        data={sections}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[
            styles.sectionItem,
            {
              backgroundColor: index <= currentSection ? AppColors.LIGHT_YELLOW : AppColors.GREY_VARIANT10, // Yellow for navigated, lightgray for others
              width: (SCREEN_WIDTH - 32 - (sectionCount - 1) * 4) / sectionCount,
              marginRight: (index + 1) <= sectionCount ? 4 : 0
            },
          ]}></View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  sectionItem: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: AppColors.WHITE
  },
});

export default TopSectionNavigation;
