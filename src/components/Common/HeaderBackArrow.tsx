
import CommonStyles from '../../../Styles';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { scaledWidth } from 'utils/Dimensions';
import Back from "svg/back.svg";
import AppColors from 'utils/Colors';

export const HeaderBackArrow = ({ onBackPress, bgColor = AppColors.GREY_VARIANT6, showTitle = false, title = '', showLogo = false}) =>  {
  return ( 
    <View style={[CommonStyles.rowAlignCenter]}>
      <TouchableOpacity
        style={[CommonStyles.headerBackStyle, {backgroundColor: bgColor}]}
        onPress={() => onBackPress()}
      >
        <Back width={24} height={24} />
      </TouchableOpacity>
      {showLogo && 
        <Image
          resizeMode='contain'
          source={require('../../../assets/Logo_For_Dark_Bg.png')}
          style={styles.logo}
        />
      }
      {showTitle && (
        <Text style={[CommonStyles.headerTitleStyle, styles.title]}>{title}</Text>
      )}
    </View>
)};

const styles = StyleSheet.create({
  logo: {
    width: scaledWidth(80),
    marginLeft: 12
  },
  title: {
    marginLeft: 16, 
    color: AppColors.WHITE
  }
})

