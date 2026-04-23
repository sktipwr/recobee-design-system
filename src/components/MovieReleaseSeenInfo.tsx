import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { AppConsumer } from "context";
import CommonStyles from "../../Styles";
import Eye from "../icons/Eyes";
import AppColors from "utils/Colors";
import Bell from 'svg/bell.svg';
import FontFamily from "utils/FontFamily";
import CircularAddIcon from "icons/AddCircle";
import StringConstants from "utils/StringConstants";
import { MONTHS_SHORTNAME, abbreviateNumber, getDateTense, getNumericValue, getSuffixForNumber } from "utils/HelperFunctions";
import { scaledWidth } from "utils/Dimensions";

export const MovieReleaseAndSeenInfo = ({ seenCount, releaseDate, watchlistedCount, notifyClicked }) => {
  const formattedDate = () => {
    try {
        let date = new Date(releaseDate);
        let day = date.getDate();

        date = `${day}${getSuffixForNumber(day)} ${MONTHS_SHORTNAME[date.getMonth()]} ${date.getFullYear()}`
        
        return date;
    }
    catch(e){
        console.log({e})
        return releaseDate;
    }
  }

  let seenCountVisible = seenCount && seenCount != "0";
  let watchlistedCountVisible = watchlistedCount && watchlistedCount != "0";

  return (
    <AppConsumer>
      {(appConsumer) => {
        return (
          <View>
            {/* {(seenCountVisible || watchlistedCountVisible) && 
              <View style={[CommonStyles.rowAlignCenter, {marginBottom: 16}]}>
                {seenCountVisible && <Eye height={16} width={16} color={AppColors.GREY_VARIANT4} />}
                {seenCountVisible && <Text style={[styles.stats, {marginRight: 24}]}>{getNumericValue(seenCount)} {StringConstants.SEEN}</Text>}
                {watchlistedCountVisible && <CircularAddIcon height={16} width={16} color={AppColors.GREY_VARIANT4} strokeWidth={"1.2"} />}
                {watchlistedCountVisible && <Text style={styles.stats}>{getNumericValue(watchlistedCount)} {StringConstants.ADDED_TO_WATCHLIST}</Text>}
              </View>
            } */}
            {releaseDate && (
              <View style={CommonStyles.rowSpaceBetween}>
                <View
                  style={[CommonStyles.rowAlignCenter, { marginBottom: 8 }]}
                >
                  <View style={styles.verticalBar} />
                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                      },
                    ]}
                  >
                    <Text style={[styles.releasedOn, { fontSize: 14}]}>
                      {getDateTense(releaseDate)}
                    </Text>
                    <Text
                      style={[styles.stats, { marginLeft: 0, fontSize: 12 }]}
                    >
                      {formattedDate()}
                    </Text>
                  </View>
                </View>
                {getDateTense(releaseDate) == StringConstants.COMING_SOON && (
                  <TouchableOpacity
                    style={[
                      styles.notifyMeContainer,
                      CommonStyles.rowAlignCenter,
                    ]}
                    onPress={() => notifyClicked()}
                  >
                    <Bell height={16} width={16} />
                    <Text style={styles.notify}>
                      {StringConstants.NOTIFY_ME}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        );
      }}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
    stats: {
        fontSize: 14,
        color: AppColors.GREY_VARIANT4,
        fontFamily: FontFamily.DMSansRegular,
        marginLeft: 4
    },
    releasedOn: {
        fontSize: 14,
        color: AppColors.WHITE_VARIANT3,
        fontFamily: FontFamily.DMSansBold,
    },
    verticalBar: {
        height: 36,
        width: 2,
        backgroundColor: AppColors.LIGHT_YELLOW,
        marginRight: 8
    },
    notifyMeContainer: {
      height: 40,
      width: scaledWidth(95),
      borderRadius: 8,
      backgroundColor: AppColors.GREY_VARIANT6,
      justifyContent: 'center',
      alignItems: 'center'
    },
    notify: {
      fontSize: 12,
      color: AppColors.LIGHT_YELLOW,
      fontFamily: FontFamily.DMSansBold,
      marginLeft: 6
    }
});