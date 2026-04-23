import React, { FC } from "react";
import {
  StyleSheet,
  Text,
} from "react-native";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";

export type ViewMoreProps = {
  onClickViewMore: Function
};

export const ViewMore: FC<ViewMoreProps> = ({
  onClickViewMore
}) => {

  return (
    <>
      <Text onPress={() => onClickViewMore()} style={styles.viewMore}>{StringConstants.VIEW_MORE}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  
  viewMore: {
    color: AppColors.LIGHT_YELLOW,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: FontFamily.DMSansRegular
  }
});