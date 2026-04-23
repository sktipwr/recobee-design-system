

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AppColors from 'utils/Colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledHeight, scaledWidth } from 'utils/Dimensions';
import FontFamily from 'utils/FontFamily';
import Maintenance from 'svg/leaderboard_maintenance'
import StringConstants from 'utils/StringConstants';
import { RoundedBtn } from './Common/RoundedBtn';

export const LeaderboardMaitenance: React.FC = ({exploreClicked}) => {
  return (
    <View style={styles.maintenanceContainer}>
        <Maintenance />
        <Text style={styles.maintenanceText}>
            {StringConstants.LEADERBOARD_UNDER_MAINTENANCE}
        </Text>
        <Text style={styles.fixingGlitch}>
            {StringConstants.FIXING_SOME_GLITCH}
        </Text>
        <Text style={styles.maintenanceMsg}>
            {StringConstants.MAINTENANCE_MESSAGE}
        </Text>
        <View style={styles.bottomSection}>
            <Text style={styles.maintenanceMsg}>
                {StringConstants.EXPLORE_MOVIES_UNTIL_MAINTENANCE_IS_DONE}
            </Text>
            <View style={styles.explore}>
                <RoundedBtn
                    text={StringConstants.EXPLORE} 
                    textColor={AppColors.BLACK}
                    onClick={() => exploreClicked()} 
                    borderRadius={8} 
                    width={scaledWidth(200)}
                    borderColor={AppColors.LIGHT_YELLOW}
                    bgColor={AppColors.LIGHT_YELLOW}
                />
            </View>
        </View>
  </View>
  );
};

const styles = StyleSheet.create({
    explore: {
        width: SCREEN_WIDTH, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 16
      },
      maintenanceContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
      },
      maintenanceText: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE_VARIANT3,
        marginTop: 12
      },
      fixingGlitch: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE_VARIANT3,
        marginTop: 33
      },
      bottomSection: {
        position: 'absolute',
        bottom: scaledHeight(53),
        left: 0,
        right: 0,
      },
      maintenanceMsg: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT4,
        marginTop: 9,
        textAlign: 'center',
        paddingHorizontal: 40
      },
})

