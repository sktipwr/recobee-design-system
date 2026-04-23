import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { getUserBadgeName } from 'utils/HelperFunctions';
import StringConstants from 'utils/StringConstants';
import Tick from "../icons/Tick";

export const BadgeAppliedModalBody: React.FC = ({userRole}) => 
    {
    return (
        <View style={styles.container}>
            <Text style={[styles.appliedFor]}>
                {StringConstants.APPLIED_FOR}
            </Text>
            <Text style={[styles.appliedFor,styles.badgeInfo]}>
                {getUserBadgeName(userRole) + StringConstants.CRITIC + ' ' + StringConstants.BADGE}
            </Text>
            <View
                style={styles.tick}
              >
                <Tick
                  width={24}
                  height={24}
                  strokeWidth={"2"}
                />
              </View>
            <Text style={styles.willNotifyText}>
                {StringConstants.WILL_NOTIFY_FOR_BADGE_UPDATE}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent:'center',
    flex: 1
  },
  badgeInfo: {
    color: AppColors.LIGHT_YELLOW, 
    marginTop: 4
  },
  willNotifyText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    paddingHorizontal: 30,
    marginTop: 12,
    textAlign: 'center'
  },
  tick: {
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    width: 56,
    backgroundColor: AppColors.LIGHT_YELLOW,
    borderRadius: 50,
    marginTop: 13
  },
  appliedFor: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  
});
