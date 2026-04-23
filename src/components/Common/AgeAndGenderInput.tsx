

import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";

import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import { GENDER_DROPDOWN_DATA } from "utils/DataConstants";
import { DropdownComponent } from "./DropdownComponent";
import { ddMMYYYY, getDateFromDDMMYYYY } from "utils/DatetimeHelperFunctions";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { ErrorText } from "./ErrorText";

export type AgeAndGenderInputProps = {
    dob: string,
    setGender: Function,
    setDOB: Function,
    isFocus: boolean,
    setIsFocus: Function,
    gender: string,
    labelFontSize: number,
    hasError: boolean
  };

  export const AgeAndGenderInput: FC<AgeAndGenderInputProps> = ({
    dob,
    setGender,
    setDOB,
    isFocus,
    setIsFocus,
    gender,
    labelFontSize = 16,
    hasError = false
  }) => {

  const [showModal, setShowModal] = useState(true)
  
  // handle dropdown selected value
  const onDropdownChange = (item: any) => 
    {
      setGender(item.value);
    }

  // input field label ui
  const fieldLabel = (label: string) => {
    return (
      <View style={styles.subSectionStyle}>
        <Text
          style={[
            styles.labelTxtStyle,
            { color: AppColors.WHITE, fontSize: labelFontSize },
          ]}
        >
          {label == StringConstants.GENDER ? label + '*' : label}
        </Text>
      </View>
    )
  }

  // on date change
  const onChange = (event: any, selectedDate: any) => {
    try {
      if(Platform.OS == 'ios'){
        setShowModal(false)
        setTimeout(() => {
          setShowModal(true)
        }, 100);
      }
      setDOB(ddMMYYYY(selectedDate))
    }
    catch(e){
      console.log({e})
    }
  };

  //time selection modal
  const showDatePicker = () => {
    let currentMode = 'date';
    if(Platform.OS == 'ios'){
      setShowModal(true)
      setTimeout(() => {
        setShowModal(true)
      }, 100);
    }
    if(Platform.OS == 'android'){
        DateTimePickerAndroid.open({
        value: dob == null || dob == '' ? new Date() : getDateFromDDMMYYYY(dob),
        onChange,
        mode: currentMode,
        });
    }
  };


  return (
    <View style={[CommonStyles.rowSpaceBetween]}>
              <View>
                {fieldLabel(StringConstants.GENDER)}
                <View>
                  {GENDER_DROPDOWN_DATA?.length > 0 && 
                    <DropdownComponent dropdownStyle={[styles.dropdown, hasError && {borderColor: AppColors.ERROR_RED, borderWidth: 1}]} data={GENDER_DROPDOWN_DATA} placeholder={StringConstants.SELECT_GENDER} isFocus={isFocus} setFocus={setIsFocus} onDropdownChange={onDropdownChange} value={gender}  />
                  }
                  {hasError && <ErrorText msg={StringConstants.PLEASE_SELECT_GENDER} />}
                </View>
              </View>
              <View>
                {
                  fieldLabel(StringConstants.BIRTHDAY)}
                  {Platform.OS == 'ios' && showModal ?
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dob == null || dob == '' ? new Date() : getDateFromDDMMYYYY(dob)}
                      mode={'date'}
                      maximumDate={new Date()}
                      themeVariant="light"
                      textColor='white'
                      style={[styles.datePicker]}
                      display="default"
                      onChange={onChange}
                    />
                  : null}
                  <TouchableOpacity style={[styles.dropdown]} onPress={() => showDatePicker()}>
                    <Text style={styles.dob}>{dob == '' ? 'mm/dd/yyyy' : dob}</Text>
                  </TouchableOpacity>
                </View>
            </View>
  );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        width: SCREEN_WIDTH * 0.4,
        borderRadius: 10,
        paddingHorizontal: 8,
        backgroundColor: AppColors.BLACK_VARIANT3,
        justifyContent: 'center',
      },
      datePicker: {
        height: 40, 
        width: SCREEN_WIDTH * 0.4,
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        backgroundColor: AppColors.BLACK,
        borderRadius: 10,
        opacity: 0.1,
      },
      date: {
    
      },
      dob: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT3,
       
      },
      subSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: 4,
        paddingTop: 12,
      },
      labelTxtStyle: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold
      },
});
