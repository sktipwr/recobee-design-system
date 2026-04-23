import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from 'utils/Colors';

const CustomProgressBar = ({ current, total, width, height }) => {
  const progressValue = current / total;

  return (
    <View>
      <Progress.Bar
        progress={progressValue}
        width={width}
        height={height}
        borderWidth={0}
        unfilledColor={AppColors.GREY}
        useNativeDriver={true}
        color='transparent'
      />
      <LinearGradient
        colors={[
          AppColors.LIGHT_YELLOW_GRADIENT,
          AppColors.DARK_YELLOW_GRADIENT,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.gradientOverlay,
          { height: height, width: progressValue * width },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 5,
  },
});

export default CustomProgressBar;
