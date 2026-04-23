import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import AppColors from "utils/Colors";
import { SCREEN_WIDTH } from "utils/Dimensions";
import FontFamily from "utils/FontFamily";
import { AppConsumer } from "context";
import { isReferralRewardActive } from "utils/HelperFunctions";

export const CustomProgressBar = ({ showPercentSymbol = false, progress, maxValue, valueBgColor = AppColors.THEME_BG_COLOR, sliderPositionWidth, sliderWidth, fillColor = AppColors.WHITE_VARIANT3, valueTextColor = AppColors.WHITE_VARIANT3 }) => {
    const [progressWidth, setProgressWidth] = useState(0);
  
    useEffect(() => {
      if (progress <= maxValue) {
        const width = (progress / maxValue) * 100;
        setProgressWidth(width);
      }
      else if(progress > maxValue){
        setProgressWidth(100);
      }
    }, [progress, maxValue]);
  
    let position  = progressWidth * 0.01 * sliderPositionWidth

    let isActive = isReferralRewardActive(progress, maxValue)
  
    return (
      <AppConsumer>
      {(appConsumer) => (
      <>
        <View style={[styles.progressBar, {width: sliderWidth}]}>
          <View
            style={[
              styles.progress,
              {backgroundColor: isActive ? AppColors.LIGHT_YELLOW : fillColor},
              { width: `${progressWidth}%`, ...Platform.select({ android: { borderRadius: progressWidth > 5 ? 10 : 0 } }) },
            ]}
          >
          </View>

        </View>
        <View style={[styles.progressValueContainer, 
          {
            left: position, backgroundColor: valueBgColor,
            borderColor: isActive ? AppColors.LIGHT_YELLOW : fillColor,
            width: showPercentSymbol ? 34 : 25
          }
          ]}>
          <Text style={[styles.progressValue, {color: valueTextColor}]}>{progress >= maxValue ? maxValue : progress}{showPercentSymbol ? '%' : ''}</Text>
        </View>
  
      </>
      )
        }
        </AppConsumer>
    );
  };

  const styles = StyleSheet.create({
    progressBar: {
        height: 3,
        backgroundColor: AppColors.GREY_VARIANT6,
        borderRadius: 4,
      },
      progressValueContainer: {
        position: 'absolute', 
        alignItems: 'center', 
        justifyContent: 'center', 
        top: -7, 
        height: 19, 
        width: 25, 
        borderRadius: 10, 
        borderWidth: 1,
        backgroundColor: AppColors.LIGHT_YELLOW
      },
      progressValue: {
        color: AppColors.WHITE_VARIANT3, 
        fontFamily: FontFamily.DMSansRegular, 
        fontSize: 12,
      },
      progress: {
        height: 5,
        backgroundColor: AppColors.LIGHT_YELLOW,
        borderRadius: 0, // Will be adjusted dynamically for Android
      },
  })