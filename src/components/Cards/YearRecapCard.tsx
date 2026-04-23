

import AppColors from "utils/Colors";

import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import YearWrapCardButton from "../Common/YearWrapCardButton";
import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import MovieRoll from 'svg/negatives_roll.svg'

export type YearRecapCardProps = {
    item?: any;
    onCardPress: Function;
  };

  export const YearRecapCard: FC<YearRecapCardProps> = ({
    item,
    onCardPress,
  }) => {
  
  return (
    <TouchableOpacity style={styles.card} onPress={() => onCardPress('YearRecapStory')}>
          <View style={styles.cardInnerContainer}>
            <View style={styles.textRow}>
              <Text style={styles.recobee}>{'2024'}</Text>
              <Text style={styles.recap}>{' ' + StringConstants.RECAP}</Text>
            </View>
            <YearWrapCardButton description={item.description} buttonText={StringConstants.PLAY_NOW} onPress={() => onCardPress(item.name)} />
          </View>
          <View style={styles.negatives}>
              <MovieRoll height={scaledWidth(148)} width={SCREEN_WIDTH + scaledWidth(20)} />
          </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardInnerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: scaledWidth(40)},
  card: {
    backgroundColor: AppColors.GREY_VARIANT8,
    borderRadius: 6,
    width: '100%',
    borderWidth: 1,
    borderColor: AppColors.GREY,
    height: scaledWidth(128)
  },
  recobee: {
    color: AppColors.LIGHT_YELLOW,
    fontSize: 20,
    fontFamily: FontFamily.DMSansBold
  },
  recap: {
    color: AppColors.WHITE,
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold
  },
  negatives: {
    position: 'absolute',
    right: 0,
    opacity: 0.3,
    borderRadius: 7
},
});
