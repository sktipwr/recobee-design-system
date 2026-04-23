import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

  interface AnimatedProgressCircleParams {
    totalCount: any,
    filledRingColor: string,
    ringColor: string
    percent: any,
    title: any,
    progressCount: any,
    data: any,
    onChartPress: any,
    showCountOnly: any,
    viewOnly: any,
    label: any,
    size: any,
    padding: any,
    horizontalGap: any,
    outerWidth: any,
    innerText: any

  }

  export const AnimatedProgressCircle: React.FC<AnimatedProgressCircleParams> = ({
    filledRingColor,
    ringColor,
    percent,
    totalCount,
    progressCount,
    title,
    data,
    onChartPress,
    showCountOnly = false,
    viewOnly = false,
    label = '',
    size = Platform.OS == 'ios' ? 165 : 150,
    padding = 8,
    horizontalGap = Platform.OS == 'ios' ? 55 : 58,
    outerWidth = 4.5,
    innerText = ''

  }) => 
    {

    
    return (
      <TouchableOpacity onPress={() => {if(!viewOnly)onChartPress(data)}}>
        <AnimatedCircularProgress
          size={size}
          width={outerWidth}
          fill={percent}
          padding={padding}
          tintColor={filledRingColor}
          rotation={0}
          backgroundWidth={3}
          backgroundColor={AppColors.GREY}>
          {
            (fill) => (
              <View style={{width: (size - (horizontalGap))}}>
                { 
                  showCountOnly ? 
                    <Text style={[styles.progressCount, styles.percentBold]}>{innerText}</Text>
                  :
                  <>
                    <Text numberOfLines={3} style={[styles.title, { maxWidth: (size - 45)}]}>{title}</Text>
                    <Text style={styles.percent}>{percent}%</Text>
                    <Text style={styles.progressCount}>{progressCount + ' out of ' + totalCount}</Text>
                  </>
                }
              </View>
            )
          }
          </AnimatedCircularProgress>
          {label != '' && <Text style={[styles.progressCount, {marginTop: 0}]}>{label}</Text>}
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14, 
    fontFamily: FontFamily.DMSansBold, 
    textAlign: 'center', 
    color: AppColors.WHITE_VARIANT3
  },
  percent: {
    fontSize: 16, 
    fontFamily: FontFamily.DMSansBold, 
    textAlign: 'center', 
    color: AppColors.LIGHT_YELLOW3, 
    marginTop: 8
  },
  progressCount: {
    fontSize: 12, 
    fontFamily: FontFamily.DMSansRegular, 
    textAlign: 'center', 
    color: AppColors.GREY_VARIANT4, 
    marginTop: 4
  },
  percentBold: {
    marginTop: 0, 
    fontFamily: FontFamily.DMSansBold,
    fontSize: 16
  }

});
