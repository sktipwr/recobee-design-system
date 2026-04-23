

import AppColors from "utils/Colors";

import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import FontFamily from "utils/FontFamily";
import { Dropdown } from 'react-native-element-dropdown';

export type DropdownComponentProps = {
    data: any,
    value: any,
    isFocus: boolean,
    setFocus: (value: boolean) => void,
    onDropdownChange: Function,
    placeholder: string,
    dropdownStyle: any
  };

  export const DropdownComponent: FC<DropdownComponentProps> = ({
    data,
    isFocus,
    value,
    setFocus,
    onDropdownChange,
    placeholder,
    dropdownStyle
  }) => {

  return (
        <Dropdown
            style={[dropdownStyle]}
            placeholderStyle={styles.itemStyle}
            selectedTextStyle={styles.itemStyle}
            containerStyle={styles.containerStyle}
            itemContainerStyle={styles.itemContainerStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={styles.itemTextStyle}
            data={data}
            iconColor={AppColors.GREY_VARIANT10}
            activeColor={AppColors.GREY_VARIANT6}
            maxHeight={300}
            labelField="label"
            valueField="value"
            // placeholder={!isFocus ? placeholder : '...'}
            placeholder={placeholder}
            value={value}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={onDropdownChange}
            
        />
  );
}

const styles = StyleSheet.create({
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
      
      icon: {
        marginRight: 5,
      },
      itemStyle: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT4,
        textAlign: 'center'
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      itemTextStyle: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT4
      },
});
