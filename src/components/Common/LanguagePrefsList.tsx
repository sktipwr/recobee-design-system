import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";


export const LanguagePrefsList = ({userLanguages, languageClicked, spacingVertical = 8, spacingHorizontal = 8, headerSpacing = 0, isGenre = false}) => {

  // language items ui
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={[styles.container, index % 2 == 0 && {marginRight: spacingHorizontal, marginBottom: spacingVertical}, item?.check && {borderColor: AppColors.LIGHT_YELLOW}]} onPress={() => languageClicked(item?.name)}>
          <Text style={[styles.bold16White3, item?.check && {color: AppColors.LIGHT_YELLOW}]}>{item?.name}</Text>
          {!isGenre && <Text style={[styles.lang, item?.check && {color: AppColors.LIGHT_YELLOW}]}>{item?.original_name}</Text>}
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.listContainer}
            data={userLanguages}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            numColumns={2}
            renderItem={renderItem}
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
  bold16White3: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE_VARIANT3,
  },
  lang: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
  },
  listContainer: {
    marginBottom: 24
  },
})