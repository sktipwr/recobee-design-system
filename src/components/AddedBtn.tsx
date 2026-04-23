import CommonStyles from '../../Styles';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Tick from 'icons/Tick';
import AppColors from 'utils/Colors';
import StringConstants from 'utils/StringConstants';
import FontFamily from 'utils/FontFamily';

  export const AddedBtn: React.FC = ({width = '100%', height = 36, label = StringConstants.ADDED}) => 
  {
    return (
      <View style={[CommonStyles.ottContainer, styles.addedBtn, {width: width, height: height}]}>
        <Tick color={AppColors.GREY_VARIANT4} height={14} width={14} strokeWidth={"2"} />
        <Text style={[styles.txtImageBody, { color: AppColors.GREY_VARIANT4 }]}>
          {label}
        </Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  addedBtn: {
    backgroundColor: AppColors.GREY_VARIANT6, 
    borderRadius: 8, 
    height: 36,
    alignSelf: 'center'
  },
  txtImageBody: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    marginLeft: 4
  },
});
