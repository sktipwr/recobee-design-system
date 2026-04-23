

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import Search from "icons/Search";
import Back from "svg/back";

import { AppConsumer } from "context";
import AppColors from "../../utils/Colors";
import CommonStyles from "../../../Styles";
import { SCREEN_WIDTH } from "utils/Dimensions";

const SearchHeaderWithBack = ({ backClicked, onSearch, searchValue, placeHolder }) => {

  return (
    <AppConsumer>
      {(appConsumer) => {
        return (
            <View style={[styles.container]}>
            <View style={CommonStyles.flexDirRow}>
              <View
                style={[
                  styles.headerLeft,
                ]}
              >
                <TouchableOpacity
                  style={styles.back}
                  onPress={() => backClicked()}
                >
                  <Back width={24} height={24} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <View style={[styles.searchContainer]}>
                  <TextInput
                    style={[styles.inputStyle]}
                    onChangeText={(text) => onSearch(text)}
                    value={searchValue}
                    placeholder={placeHolder}
                    keyboardType="default"
                    keyboardAppearance="dark"
                    returnKeyType="search"
                    placeholderTextColor={AppColors.GREY_VARIANT1}
                  />
                  <View
                    style={styles.searchIcon}
                  >
                    <View
                      style={styles.back}
                    >
                      <Search width={18} height={18} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      }}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
    headerLeft: {
        height: 48,
        width: 48,
        borderRadius: 10,
        backgroundColor: AppColors.BLACK_VARIANT3,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
      },
      container: { 
        padding: 16, 
        marginTop: 4 
      },
      inputContainer: { 
        flexDirection: "row", 
        flex: 1 
      },
      searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: AppColors.GREY_VARIANT19,
        marginLeft: 0,
        marginRight: 8,
        paddingLeft: 32,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        width: SCREEN_WIDTH * 0.73,
        height: 48,
      },
      inputStyle: {
        height: 40,
        alignItems: "flex-start",
        justifyContent: "center",
        width: SCREEN_WIDTH * 0.55,
        color: AppColors.WHITE
      },
      back: {
        height: 24,
        width: 24,
        alignItems: "center",
        justifyContent: "center",
      },
      searchIcon: {
        height: 48,
        width: 48,
        alignItems: "center",
        justifyContent: "center",
      }
});

export default SearchHeaderWithBack;
