import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scaledWidth, scaledHeight } from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import CommonStyles from '../../../Styles';
import Arrow from 'svg/right_arrow_yellow';
import StringConstants from '../../utils/StringConstants';

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

interface ExploreListEntryCardProps {
  data?: DiscoverListCategory;
  onPress: () => void;
}

const CARD_COLORS = [
  AppColors.PURPLE_VARIANT,
  AppColors.TEAL_VARIANT,
  AppColors.LIME_VARIANT,
  AppColors.PINK_VARIANT,
  AppColors.PURPLE_VARIANT2,
  AppColors.ORANGE_VARIANT,
];

const LAST_ROW_COLORS = [
  AppColors.LIME_VARIANT,
  AppColors.TEAL_VARIANT,
];

const LAST_ROW_GRADIENTS = [
  [AppColors.LIME_VARIANT, AppColors.LIME_VARIANT2],
  [AppColors.TEAL_VARIANT, AppColors.TEAL_VARIANT2],
];

export const ExploreListEntryCard: React.FC<ExploreListEntryCardProps> = ({ data, onPress }) => {
  if (!data?.items?.length) return null;

  const { items } = data;
  const itemsInRowsOfThree = Math.floor(items.length / 3) * 3;
  const rowsOfThreeItems = items.slice(0, itemsInRowsOfThree);
  const lastRowItems = items.slice(itemsInRowsOfThree);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{StringConstants.MOVIE_LIST}</Text>
          <Text style={styles.subtitle}>{StringConstants.EXPLORE_MOVIE_LIST}</Text>
        </View>
        <Arrow height={20} width={20} />
      </View>
      
      <View style={styles.content}>
        {/* Rows of 3 items */}
        {rowsOfThreeItems.length > 0 && (
          <View style={styles.grid}>
            {rowsOfThreeItems.map((item, index) => (
              <View
                key={item.id}
                style={[styles.card, { backgroundColor: CARD_COLORS[index % CARD_COLORS.length] }]}
              >
                <Text style={styles.cardText}>
                  {item.name || item.displayname}
                </Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Last row - handle 1 or 2 remaining items */}
        {lastRowItems.length > 0 && (
          <View style={lastRowItems.length === 1 ? styles.singleItemRow : styles.lastRow}>
            {lastRowItems.map((item, index) => {
              const isLastRowSingle = lastRowItems.length === 1;
              return (
                <View
                  key={item.id}
                  style={[
                    isLastRowSingle ? styles.cardFull : styles.cardHalf,
                    { backgroundColor: LAST_ROW_COLORS[index % LAST_ROW_COLORS.length] }
                  ]}
                >
                  <LinearGradient
                    colors={LAST_ROW_GRADIENTS[index % LAST_ROW_GRADIENTS.length]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    angle={76.85}
                    style={styles.quarterCircle}
                  />
                  <Text style={styles.cardText}>
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const commonCardStyles = {
  justifyContent: 'center' as const,
  alignItems: 'flex-start' as const,
  paddingHorizontal: 14,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  header: {
    ...CommonStyles.rowSpaceBetween,
    ...CommonStyles.alignCenter,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
  },
  content: {
    flex: 1,
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
    width: scaledWidth(103),
    height: 106,
    borderRadius: 4,
    marginBottom: 6,
  },
  cardHalf: {
    ...commonCardStyles,
    width: scaledWidth(157),
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