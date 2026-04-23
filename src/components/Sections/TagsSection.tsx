import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import { removeInitialSpaces } from 'utils/DataFormattingHelperFunction';
import Chip from 'components/Common/Chip';

export type TagsSectionProps = {
  data: any;
  onGenreClick: Function;
  onTagsClick: Function;
};

export const TagsSection: FC<TagsSectionProps> = ({
  data,
  onTagsClick,
  onGenreClick,
}) => {
  const allItems = [];
  
  if (data?.tags?.length > 0) {
    data.tags.split(',').forEach((tag) => {
      allItems.push({ value: removeInitialSpaces(tag), type: 'tag' });
    });
  }
  
  if (data?.nanogenres?.length > 0) {
    data.nanogenres.split(',').forEach((genre) => {
      allItems.push({ value: removeInitialSpaces(genre), type: 'genre' });
    });
  }

  return (
    <View style={styles.container}>
      <View style={[CommonStyles.flexRowWrap, styles.chipsContainer]}>
        {allItems.map((item, index) => (
          <Chip
            key={index}
            item={{ text: item.value, value: item.value }}
            state={null}
            onClick={() =>
              item.type === 'tag'
                ? onTagsClick(item.value)
                : onGenreClick(item.value, 'MICRO_GENRES')
            }
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 8,
    padding: 16,
  },
  chipsContainer: {
    rowGap: 8,
  },
});
