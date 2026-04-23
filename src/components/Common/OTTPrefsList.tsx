import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import CommonStyles from "styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import FastImage from "react-native-fast-image";
import StringConstants from "utils/StringConstants";
import { CLOUD_BASEURL } from "utils/HelperFunctions";


export const OTTPrefsList = ({ottData, ottClicked, spacingVertical = 8, spacingHorizontal = 8, headerSpacing = 0}) => {

  // ott items ui
  const renderOttItem = ({item, index}) => {
    return (
      <TouchableOpacity style={[styles.container, index % 2 == 0 && {marginRight: spacingHorizontal, marginBottom: spacingVertical}, item?.check && {borderColor: AppColors.LIGHT_YELLOW}]} onPress={() => ottClicked(item?.name)}>
          <Image
            source={{ uri: CLOUD_BASEURL + item.logoName}}
            fadeDuration={0}
            style={[styles.ottImage]}
          />
          <Text numberOfLines={2} style={styles.ottName}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.listContainer}
      data={ottData}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      numColumns={2}
      renderItem={renderOttItem}
      ListHeaderComponent={() => headerSpacing > 0 ? <View style={{height: headerSpacing}} /> : null}
    />
  );
};

const styles = StyleSheet.create({
  
  container: {
    height: scaledWidth(92),
    width: SCREEN_WIDTH * 0.405,
    backgroundColor: AppColors.BLACK,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 0.8,
    borderColor: AppColors.TRANSPARENT
  },
  ottName: {
    color: AppColors.GREY_VARIANT10,
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    paddingHorizontal: 6,
    textAlign: 'center'
  },
  ottImage: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginBottom: 6
  },
  listContainer: {
    marginBottom: 24
  },
})