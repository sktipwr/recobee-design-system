import CommonStyles from '../../../Styles';
import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View} from 'react-native';
import StringConstants from 'utils/StringConstants';
import LongRightArrow from "svg/long_right_arrow.svg";
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import RightArrow from '../../icons/RightArrow';

export const BottomPositionedBtn: React.FC = ({
  title, 
  onPress, 
  bgColor, 
  showArrow = true, 
  bottomGap = 0, 
  isDisabled = false,
  buttonHeight = 40,
  buttonBgColor = AppColors.LIGHT_YELLOW_VARIANT,
  textColor = AppColors.GREY_VARIANT2,
  borderColor= AppColors.TRANSPARENT,
  isAbsolute = true,
  bottomEmptySpace = 0,
  horizontalGap = 12,
  innerWidth = SCREEN_WIDTH * 0.911,
  btnWidth = SCREEN_WIDTH,
  borderRadius = 8

}) => {
  return (
    <View style={[isAbsolute && (styles.position, {bottom: bottomGap}),]}>
      <View style={[styles.btnContainer, bgColor && {backgroundColor: bgColor}, {height: 70 + bottomEmptySpace, width: btnWidth}]}>
          <TouchableOpacity style={[styles.button, {borderRadius: borderRadius, marginBottom: bottomEmptySpace, paddingHorizontal: horizontalGap, width: innerWidth} , {backgroundColor: buttonBgColor, borderColor: borderColor, height: buttonHeight, borderWidth: 1}]}
              onPress={() => {
                if(!isDisabled)
                onPress()
              }}
          >
          <View style={{width: 20}} />
              <Text
                  style={[
                      styles.txtTitle,
                      {color :textColor}
                  ]}
              >
                  {title}
              </Text>
             {showArrow ? <RightArrow color={isDisabled ? AppColors.GREY_VARIANT4 : AppColors.GREY_VARIANT2} strokeWidth="1.6" /> : <View style={{width: 20}} />}
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  position: {
    position: 'absolute', 
  },
  txtTitle: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    lineHeight: 20,
  },
  btnContainer: { 
    alignItems: 'center', 
    height: 70, 
    justifyContent:'center'
  },

})
