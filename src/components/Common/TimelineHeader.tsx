import React, {  } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";
import { Circle } from "../Common/Circle";
import { TimelineMovieCard } from "../Cards/TimelineMovieCard";
import ArrowDown from "svg/down_arrow_grey";
import { SCREEN_WIDTH } from "utils/Dimensions";

export const TimelineHeader: React.FC = ({
    toggleSection,
    collapsedItems,
    title,
    isActivityCard = false,
    isExpanded = false,
    bgColor = null
}) => {

  // check header expanded mode
  const checkExpanded = () => {
    if(isActivityCard){
        return isExpanded;
    }
    else
        return collapsedItems?.includes(title);
  }

  // toggle header collapse mode
  const toggleView = () => {
    toggleSection(title)
  }

  return (
    <View style={[CommonStyles.rowAlignCenter, bgColor && {backgroundColor: bgColor}]}>
        <TouchableOpacity onPress={() => toggleView()} style={[CommonStyles.rowAlignCenter, styles.padding]}>
            {checkExpanded() ? 
                <View style={styles.arrowExpanded}>
                    <ArrowDown height={20} width={20} />
                </View>
            :
                    <ArrowDown height={20} width={20} />
            }
            <Text style={[CommonStyles.timelineMonth, {marginLeft: 8}]}>{title}</Text>
        </TouchableOpacity>
        <View style={styles.bar}/>
    </View>
  );
}

const styles = StyleSheet.create({
    bar: {
        backgroundColor: AppColors.GREY_VARIANT11, 
        flex: 1, 
        height: 0.5, 
        marginRight: 16
    },
    padding: {
        paddingHorizontal: 10, 
        paddingVertical: 5
    },
    arrowExpanded : {
        transform: [{ rotate: '270deg'}]
    }
})