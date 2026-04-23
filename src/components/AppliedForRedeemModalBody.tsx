import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import Tick from "../icons/Tick";

  export const AppliedForRedeemModalBody: React.FC = ({}) => 
    {
      return (
        <View style={styles.container}>
            <Text style={[styles.submissionSuccess]}>
                {StringConstants.SUBMISSION_SUCCESSFUL}
            </Text>
            <View
                style={styles.tick}
              >
                <Tick
                  width={24}
                  strokeWidth={"2"}
                  height={24}
                />
              </View>
            <Text style={styles.willReach}>
                {StringConstants.WILL_REACH_OUT_FOR_VOUCHER}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    alignItems: 'center',
    flex: 1
  },
  willReach: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    paddingHorizontal: 35,
    marginTop: 10,
    textAlign: 'center'
  },
  tick: {
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    width: 56,
    backgroundColor: AppColors.LIGHT_YELLOW,
    borderRadius: 50,
  },
  submissionSuccess: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREEN,
    marginBottom: 10,
    marginTop: 10
  },
  
});
