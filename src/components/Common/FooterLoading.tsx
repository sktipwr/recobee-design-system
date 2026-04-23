import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SCREEN_WIDTH } from "utils/Dimensions";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import FastImage from "react-native-fast-image";
import StringConstants from "utils/StringConstants";


export const FooterLoading = ({loadMore = false}) => {
  return (
    <View style={[CommonStyles.footerLoaderContainer, {marginBottom: 15}]}>
        <ActivityIndicator animating={loadMore} color={AppColors.WHITE_VARIANT} size='small' />
        <Text style={CommonStyles.loaderText}>{StringConstants.LOADING}</Text>
      </View>
  );
};
