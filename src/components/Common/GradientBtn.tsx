import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import DarkSparkle from 'svg/dark_sparkle'
import UpgradeToPremiumText from 'svg/upgrade_to_premium'
const GradientBtn = ({height, width, radius, text, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <LinearGradient
        colors={[AppColors.LIGHT_YELLOW_GRADIENT, AppColors.DARK_YELLOW_GRADIENT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.linearGradient, {
            height: height ?? 100,
            width: width ?? 200,
            borderRadius: radius ?? 20,
        }]}
      >
        <View style={[styles.innerContainer]}>
          <Text style={styles.buttonText}>{text}</Text>
          <View style={{width: 6}} />
          <DarkSparkle />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    padding: 0.5,
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
    margin: 0.5,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREY_VARIANT2,
  },
});

export default GradientBtn;