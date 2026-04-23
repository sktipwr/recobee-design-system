import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { SCREEN_WIDTH } from "utils/Dimensions";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import { BarChart } from 'react-native-gifted-charts';

export type BarChartUIProps = {
  item: any,
  loading: boolean,
  barWidth: number,
  spacing: number,
  chartHeight: number,
  initialSpacing: number
};

export const BarChartUI: FC<BarChartUIProps> = ({
    item,
    loading,
    barWidth = 17.7,
    spacing = 6,
    chartHeight = 112,
    initialSpacing = 6
}) => {

  const getMaxValue = (data) => {
      let item = data?.find((value) => typeof value?.frontColor != 'undefined');
      if (item) 
          return item?.value;
      else return 0;
  };

  return (
    <BarChart
      barWidth={barWidth}
      height={chartHeight}
      xAxisColor={AppColors.GREY_VARIANT9}
      maxValue={getMaxValue(item?.data) < 20 ? (getMaxValue(item?.data) + 20) : (getMaxValue(item?.data) + 50)}
      renderTooltip={(item, index) => (
        <View style={styles.toolTip}>
          <Text numberOfLines={1} style={[CommonStyles.graphTopLabel]}>
            {item?.value ?? 0}
          </Text>
        </View>
      )}
      xAxisThickness={1}
      rulesColor={AppColors.GREY_VARIANT18}
      yAxisTextStyle={CommonStyles.graphTopLabel}
      xAxisLabelTextStyle={CommonStyles.graphTopLabel}
      width={SCREEN_WIDTH - 100}
      spacing={spacing}
      rulesThickness={1}
      dashWidth={7}
      barBorderBottomRightRadius={0}
      barBorderBottomLeftRadius={0}
      initialSpacing={initialSpacing}
      noOfSections={3}
      barBorderRadius={4}
      isAnimated={!loading ? true : false}
      frontColor={AppColors.GREY}
      data={item?.data}
      yAxisThickness={0}
    />
  );
};

const styles = StyleSheet.create({
  toolTip: {
    width: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});