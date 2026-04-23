// ProgressBar.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from "react-native-progress";
import AppColors from 'utils/Colors';
import { SCREEN_WIDTH } from 'utils/Dimensions';

const HorizontalProgressBar = ({ progress }) =>  {
  return ( 
  <View style={styles.progressBar}>
    <Progress.Bar 
        progress={progress} 
        animated={false}
        width={SCREEN_WIDTH * 0.15} 
        height={3}
        unfilledColor={AppColors.GREY_VARIANT2}
        borderRadius={0}
        borderWidth = {0}
        color={AppColors.LIGHT_YELLOW} 
    />
  </View>
)};

const styles = StyleSheet.create({
  progressBar: {
    marginTop: 0,
    height: 3,
    width: SCREEN_WIDTH * 0.16,
    alignItems: 'center',
  },
});

export default HorizontalProgressBar;
