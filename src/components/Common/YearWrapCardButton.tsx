import React from "react";
import { Text, TouchableOpacity,View, StyleSheet, Dimensions } from "react-native";
import { AppConsumer } from "context";
import RightArrow from "svg/right_arrow.svg";
import StringConstants from "utils/StringConstants";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import CommonStyles from "../../../Styles";
import { SCREEN_WIDTH } from "utils/Dimensions";

export default function YearWrapCardButton({ buttonText, onPress, description }) {
 
  return (
    <View style={styles.playNowRow}>
        <Text style={styles.rollingCredits}>{description}</Text>
        <TouchableOpacity
        style={[
            styles.roundedButton,
        ]}
        onPress={() => {onPress()}}
        >
        <View style={CommonStyles.flexRowAlignCenter}>
            <Text
            style={styles.playNow}
            >
            {buttonText}
            </Text>
            <RightArrow width={13} height={13} strokeWidth="2"  />
        </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  playNowRow: {flexDirection: 'row', alignItems:'flex-end', marginRight:2, justifyContent: 'space-between'},
  textRow: {flexDirection: 'row', alignItems:'baseline'},
 
  playNow: {color: AppColors.DARK_GREY, fontSize: 10, fontFamily: FontFamily.DMSansRegular },
  rollingCredits: {
    color: AppColors.WHITE,
    fontSize: 12,
    width: SCREEN_WIDTH * 0.64,
    fontFamily: FontFamily.DMSansRegular
  },
  roundedButton: {
    backgroundColor: AppColors.LIGHT_YELLOW_VARIANT,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 12, 
    width: 66,
    height: 20,
  },
});
