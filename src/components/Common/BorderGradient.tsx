import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Sparkle from 'svg/sparkle'
import UpgradeToPremiumText from 'svg/upgrade_to_premium'
import PremiumUser from 'svg/a_premium_user';
import AppColors from 'utils/Colors';

const BorderGradient = ({height, width, radius, isPremiumUser}) => {
  return (
    <>
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
          {
            isPremiumUser 
            ? 
              <PremiumUser /> 
              :
              <UpgradeToPremiumText />
          }
          <View style={{width: 6}} />
          <Sparkle />
        </View>
      </LinearGradient>
    </>
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
    marginRight:1,
    marginBottom:1,
    backgroundColor: AppColors.GREY_VARIANT2,
    justifyContent: 'center',
  },
});

export default BorderGradient;