

import CommonStyles from '../../../Styles';
import React from 'react';
import {Text, StyleSheet, Switch, View} from 'react-native';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import { formatName, getFilterLabelIcon } from 'utils/HelperFunctions';
import ChipWrapper from './ChipWrapper';
import Eyeo from "icons/Eyeo";
import StringConstants from 'utils/StringConstants';

export const AdvanceFiltersView: React.FC = ({filterValues, chipClicked, showUnseen, toggleSeen, showSeenToggle = true}) => {
  return (
    <View>
        {filterValues?.map((item, idx) => {
          return (
            <View key={`${item.label}_base`}>
              <View style={CommonStyles.rowAlignCenter}>
                {getFilterLabelIcon(item.label)}
                <Text
                  style={styles.label}
                >
                  {item.label}
                </Text>
                
              </View>
              <View
                style={[
                  CommonStyles.flexRowWrap,
                  {marginBottom: 24}]}
              >
                {item.items.map((el, index) => (
                  <ChipWrapper
                    key={`${item.label}_base_${index}_core`}
                    style={{
                      marginTop: 8,
                      marginRight: 8,
                    }}
                    chipKey={index}
                    value={`${formatName(el.name)}${item.label == 'Ratings' ? '+' : ''}`}
                    sel={el.selected}
                    category={item.category}
                    chipPressed={() => chipClicked(
                      el.name,
                      item.category
                    )}
                  />
                ))}
              </View>
            </View>
          );
        })}
      {showSeenToggle && 
        <View style={CommonStyles.rowAlignCenter}>
            <Eyeo height={24} width={24} />
            <Text style={[styles.label, {marginRight: 30}]}>
              {StringConstants.SHOW_ONLY_UNSEEN}
            </Text>
            <Switch
              trackColor={{ false: AppColors.GREY_VARIANT6, true: AppColors.GREY_VARIANT6 }}
              thumbColor={
                showUnseen ? AppColors.LIGHT_YELLOW_VARIANT5 : AppColors.WHITE
              }
              style={{
                transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
              }}
              ios_backgroundColor={AppColors.GREY_VARIANT17}
              onValueChange={(value) => {
                toggleSeen(value);
              }}
              value={showUnseen}
            />
        </View>
      }
      </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
    color: AppColors.WHITE,
    padding: 4,
  },
})
