import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppConsumer } from "context";
import CommonStyles from "../../Styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import { POSTER_IMAGE_BASEURL, formatDateMonthAndYear } from "utils/HelperFunctions";
import { scaledWidth } from "utils/Dimensions";
import { Dropdown } from 'react-native-element-dropdown';
import FastImage from "react-native-fast-image";
import Arrow from "icons/Arrow";

export const MovieDetailsSeasonMenu = ({ seasons, onSeasonsPress = () => {}, disableTouch = false, onSeasonSelect = (item) => {}, initialValue, onlyDropdown = false }) => {

  const [value, setValue] = useState(initialValue?.seasonID ?? null);
  const [selectedItem, setSelectedItem] = useState(initialValue)
  const [isFocus, setIsFocus] = useState(false);

  return (
    
    <AppConsumer>
      {(appConsumer) => {
        return (
          <View>
            {!onlyDropdown && 
              <Text style={styles.seasonsCount}>{seasons?.length} {StringConstants.SEASONS}</Text>
            }
            {seasons?.length > 0 && 
            <View style={styles.container}>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.itemStyle}
                selectedTextStyle={styles.itemStyle}
                containerStyle={styles.containerStyle}
                itemContainerStyle={styles.itemContainerStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                data={seasons}
                iconColor={AppColors.WHITE}
                activeColor={AppColors.GREY_VARIANT6}
                maxHeight={300}
                labelField="seasonName"
                valueField="seasonID"
                placeholder={!isFocus ? StringConstants.SELECT_SEASON : '...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.seasonID);
                  setSelectedItem(item)
                  onSeasonSelect(item)
                  setIsFocus(false);
                }}
                
              />
              {!onlyDropdown && 
                <TouchableOpacity disabled={disableTouch} style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]} onPress={() => onSeasonsPress(selectedItem?.seasonID)}>
                  <View style={[CommonStyles.rowAlignCenter, styles.marginTop10]}>
                    {selectedItem?.posterImage != null && selectedItem?.posterImage != ''
                      ? 
                          <FastImage 
                            source={{uri: POSTER_IMAGE_BASEURL + selectedItem?.posterImage}} 
                            style={styles.posterImage} 
                            defaultSource={require('assets/defaultMovie.png')}
                          />
                      :
                      <View style={[styles.posterImage]}>
                      <Image
                          source={require('assets/BlackBee.png')}
                          fadeDuration={0}
                          style={styles.posterImage}
                          />
                      </View>
                    }
                    <View style={styles.marginLeft8}>
                      <Text style={styles.seasonInfo}>{StringConstants.EPISODES} {selectedItem?.numberofEpisodes}</Text>
                      {selectedItem?.airingDate && <Text style={[styles.seasonInfo, {fontFamily: FontFamily.DMSansRegular}]}>{formatDateMonthAndYear(selectedItem?.airingDate)}</Text>}
                    </View>
                  </View>
                  {!disableTouch && 
                    <View style={styles.rightArrow}>
                      <Arrow height={24} width={24} color={AppColors.WHITE} />
                    </View>
                  }
                </TouchableOpacity>
              }
            </View>
            }
          </View>
        );
      }}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  marginLeft8: {
    marginLeft: 8
  },
  rightArrow: {
    transform: [{ rotate: '270deg'}]
  },
  posterImage: {
    width: scaledWidth(44),
    height: scaledWidth(64),
    borderRadius: 4
  },
  marginTop10: {
    marginTop: 10
  },
  itemTextStyle: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4
  },
  seasonInfo: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREY_VARIANT4
  },
  containerStyle: {
    paddingVertical: 4,
    backgroundColor: AppColors.GREY_VARIANT6,
    borderRadius: 8,
    borderWidth: 0,
    marginVertical: 2
  },
  
  itemContainerStyle: {
    backgroundColor: AppColors.GREY_VARIANT6,
    borderRadius: 8,
  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: AppColors.BLACK_VARIANT4
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  itemStyle: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    marginHorizontal: 16
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  seasonsCount: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE
  }
});