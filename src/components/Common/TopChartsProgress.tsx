import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import { LOG } from "config";
import StringConstants from "utils/StringConstants";
import Info from 'svg/grey_info';
import { AnimatedProgressCircle } from "../AnimatedProgressCircle";

const extendedLog = LOG.extend('MyMovieTime');

export type TopChartsProgressProps = {
  chartsData: any,
  navigation: any
};

export const TopChartsProgress: FC<TopChartsProgressProps> = ({
  chartsData,
  navigation
}) => {

//go to list details
const onChartPress = (item) => {
  navigation.navigateDeprecated("ListItemDetails", {
    listID: item?.listid,
    fromScreen: "MyMovieTime",
    parentScreen: "MyProfileScreen",
  });
}

 const renderItem = ({item, index}) => {
  return (
    <View style={[index % 2 == 1 && {marginLeft: 15}, {marginBottom: 15}]}>
      <AnimatedProgressCircle
        totalCount={item?.movieCount}
        filledRingColor={AppColors.LIGHT_YELLOW3}
        ringColor={AppColors.GREY_VARIANT2}
        percent={item?.movieCount == 0 ? 0 : Math.round((item?.seenCount / item?.movieCount) * 100)}
        progressCount={item?.seenCount}
        title={item?.listname}
        data={item}
        onChartPress={onChartPress}

      />
    </View>
  )
 } 

return (
    <View style={styles.container}>        
        <Text style={styles.title}>{StringConstants.TOP_CHART_PROGRESS}</Text>
        <View style={[CommonStyles.flexDirRow, styles.chartInfoGap]}>
          <Info height={16} width={16} />
          <Text style={styles.info}>{StringConstants.TOP_CHART_PROGRESS_INFO}</Text>
        </View>
        <View style={[CommonStyles.alignCenter]}>
        <FlatList
            data={chartsData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index?.toString()}
            numColumns={2}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    title: {
      fontSize: 16,
      fontFamily: FontFamily.DMSansBold,
      color: AppColors.WHITE,
      textAlign: 'center'
    },
    container: {
      marginTop: 17, 
    },
    info: {
      fontSize: 12,
      fontFamily: FontFamily.DMSansRegular,
      color: AppColors.GREY_VARIANT4,
      marginLeft: 4
    },
    chartInfoGap: {
      marginTop: 4, 
      marginBottom: 24
    }
      
});