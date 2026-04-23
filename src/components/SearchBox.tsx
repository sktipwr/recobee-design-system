import React, { FC } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import { SCREEN_WIDTH } from "utils/Dimensions";
import Search from 'svg/search1';
import StringConstants from "utils/StringConstants";

export type SearchBoxProps = {
  searchClicked: any,
  width: any,
  alignCenter: any
};

export const SearchBox: FC<SearchBoxProps> = ({
  searchClicked,
  width = SCREEN_WIDTH - 200,
  alignCenter = true
}) => {

  return (
    <>
    <Pressable
        style={[styles.searchContainer, {width: width}, alignCenter && {justifyContent: 'center'}]}
        onPress={() => searchClicked()}
      >
        <View style={styles.search}>
          <Search />
        </View>
        <View>
          <Text
            style={styles.placeholder}
          >
            {
              StringConstants.SEARCH_MOVIES
            }
          </Text>
        </View>
      </Pressable>
  </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: AppColors.BLACK_VARIANT,
    marginLeft: 0,
    marginRight: 4,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    height: 48,
  },
  search: {
    padding: 5
  },
  placeholder: {
    color: AppColors.GREY_VARIANT1,
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 14,
  }
});