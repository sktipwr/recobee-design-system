import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scaledWidth, scaledHeight, SCREEN_WIDTH } from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import CommonStyles from '../../../Styles';

interface DiscoverListItem {
  id: string;
  name: string;
  displayname?: string | null;
}

interface DiscoverListCategory {
  items: DiscoverListItem[];
  category: string;
  description: string;
}

interface DiscoverListsCardProps {
  data?: DiscoverListCategory[];
  onListPress: (listId: string, listTitle: string) => void;
  showTitle?: boolean;
}

const getCardColors = () => [
  AppColors.PURPLE_VARIANT,
  AppColors.TEAL_VARIANT,
  AppColors.LIME_VARIANT,
  AppColors.PINK_VARIANT,
  AppColors.PURPLE_VARIANT2,
  AppColors.ORANGE_VARIANT,
];

const getLastRowColors = () => [
  AppColors.LIME_VARIANT,
  AppColors.TEAL_VARIANT,
];

const getLastRowGradients = () => [
  [AppColors.LIME_VARIANT, AppColors.LIME_VARIANT2], // LIME gradient
  [AppColors.TEAL_VARIANT, AppColors.TEAL_VARIANT2], // TEAL gradient
];

export const DiscoverListsCard: React.FC<DiscoverListsCardProps> = ({ data, onListPress , showTitle = true}) => {

  const discoverData = data && data.length > 0 ? data : [];
  const cardColors = getCardColors();
  const lastRowColors = getLastRowColors();
  const lastRowGradients = getLastRowGradients();

  const renderCategorySection = (category: DiscoverListCategory, categoryIndex: number) => {
    const { items, description } = category;
    
    if (!items || items.length === 0) return null;

    // Calculate how many items to show in rows of 3 and how many in the last row
    const totalItems = items.length;
    const itemsInRowsOfThree = Math.floor(totalItems / 3) * 3;
    const remainingItems = totalItems - itemsInRowsOfThree;
    
    const rowsOfThreeItems = items.slice(0, itemsInRowsOfThree);
    const lastRowItems = items.slice(itemsInRowsOfThree);

    return (
      <View key={categoryIndex} >
       {showTitle && <Text style={styles.title}>{description}</Text>}
        
        {/* Rows of 3 items */}
        {rowsOfThreeItems.length > 0 && (
          <View style={styles.grid}>
            {rowsOfThreeItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, { backgroundColor: cardColors[index % cardColors.length] }]}
                onPress={() => onListPress(item.id, item.displayname || item.name)}
              >
                <Text style={styles.cardText}>
                  { item.name || item.displayname }
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {/* Last row - handle 1 or 2 remaining items */}
        {lastRowItems.length > 0 && (
          <View style={lastRowItems.length === 1 ? styles.singleItemRow : styles.lastRow}>
            {lastRowItems.map((item, index) => {
              const isLastRowSingle = lastRowItems.length === 1;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    isLastRowSingle ? styles.cardFull : styles.cardHalf,
                    { backgroundColor: lastRowColors[index % lastRowColors.length] }
                  ]}
                  onPress={() => onListPress(item.id, item.displayname || item.name)}
                >
                  <LinearGradient
                    colors={lastRowGradients[index % lastRowGradients.length]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    angle={76.85}
                    style={styles.quarterCircle}
                  />
                  <Text style={styles.cardText}>
                   { item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {discoverData.map((category, index) => renderCategorySection(category, index))}
    </View>
  );
};

const commonCardStyles = {
  justifyContent: 'center' as const,
  alignItems: 'flex-start' as const,
  paddingHorizontal: 14,
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.fullWidth,
    ...CommonStyles.paddingHorizontal16,
     marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: 8,
  },
  grid: {
    ...CommonStyles.flexRowWrap,
    justifyContent: 'space-between',
  },
  lastRow: {
    ...CommonStyles.rowSpaceBetween,
  },
  singleItemRow: {
    ...CommonStyles.rowJustifyCenter,
  },
  card: {
    ...commonCardStyles,
    width: scaledWidth(106),
    height: 106,
    borderRadius: 4,
    marginBottom: 6,
  },
  cardHalf: {
    ...commonCardStyles,
    width: scaledWidth(161),
    height: 106,
    borderRadius: 2,
    paddingVertical: 8,
  },
  cardFull: {
    ...commonCardStyles,
    width: scaledWidth(334),
    height: scaledHeight(86),
    borderRadius: 2,
    paddingVertical: 8,
  },
  cardText: {
    fontSize: 17,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    textAlign: 'left',
  },
  quarterCircle: {
    ...CommonStyles.absolute,
    top: 0,
    left: 0,
    width: scaledWidth(30),
    height: scaledHeight(30),
    borderTopLeftRadius: 2,
    borderBottomRightRadius: scaledWidth(40),
  },
});