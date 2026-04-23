import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontFamily from 'utils/FontFamily';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import AppColors from 'utils/Colors';

export type RoundedBtnTypes = {
   
  };
  
export const RoundedBtn: React.FC<RoundedBtnTypes> = ({ 
  text, 
  width, 
  textColor, 
  onClick, 
  borderRadius, 
  bgColor, 
  borderColor, 
  height = 44, 
  fontSize = 14, 
  fontFamily = FontFamily.DMSansBold, 
  marginRight = 16,
  icon = null,
  borderWidth = 1
}) => {

  return (
    <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.container, 
            {
                height: height,
                borderRadius: borderRadius ?? 8, 
                backgroundColor: bgColor ?? AppColors.GREY_VARIANT6,
                borderColor: borderColor ?? AppColors.LIGHT_YELLOW,
                width: width ?? SCREEN_WIDTH / 3,
                borderWidth: borderWidth
            }]}
        onPress={() => {onClick()}}
    >
        {icon != null ? <View style={styles.gap4}>{icon}</View> : null}
        <Text style={[{color: textColor ?? AppColors.GREY_VARIANT2, fontSize: fontSize, fontFamily: fontFamily}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.GREY_VARIANT6,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row'
    },
    gap4: {
      marginRight: 4
    }
   
})
