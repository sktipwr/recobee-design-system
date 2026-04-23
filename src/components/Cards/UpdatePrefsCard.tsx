

import { SCREEN_WIDTH } from "utils/Dimensions";
import AppColors from "utils/Colors";

import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import Filter from "../../icons/Filter";
import Cross from "../../icons/Cross";
import { RoundedBtn } from "../Common/RoundedBtn";
import Arrow from "svg/right_arrow_yellow";

export type UpdatePrefProps = {
    newUser: boolean,
    description: string,
    prefsCompletionStatus: string,
    updatePrefs: Function,
    closePrefsPressed: Function
  };

  export const UpdatePrefsCard: FC<UpdatePrefProps> = ({
    newUser,
    description,
    prefsCompletionStatus,
    updatePrefs,
    closePrefsPressed
  }) => {

  return (
    <View style={styles.card}>
        <View style={CommonStyles.rowSpaceBetween}>
            <View style={[CommonStyles.rowAlignCenter]}>
                <View style={styles.prefsIcon}>
                    <Filter height={18} width={18} strokeWidth={"1.33"} color={AppColors.GREY_VARIANT10} />
                </View>
                <Text style={styles.title}>{StringConstants.UPDATE_PREFS}</Text>
            </View>
            <TouchableOpacity onPress={() => closePrefsPressed()}>
                <Cross height={20} width={20} strokeWidth="1.4" color={AppColors.GREY_VARIANT3} />
            </TouchableOpacity>
        </View>
        
        <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]}>
            <Text style={[styles.description, !newUser && styles.newUserUpdateText]}>{description}</Text>
            {!newUser && <Arrow height={20} width={20} />}
        </View>
        <Text style={styles.percent}>{StringConstants.PREFS_UPDATED}{prefsCompletionStatus} {StringConstants.ENTRIES}</Text>
        {/* TODO: not using this layout for now */}
        {/* {newUser && <>
            <View style={[CommonStyles.rowAlignCenter, {marginBottom: 12}]}>
                <Text style={styles.percent}>{'80%'}</Text>
                <Progress.Bar
                    progress={0.8}
                    height={7}
                    color={AppColors.GREY_VARIANT10}
                    borderRadius={80}
                    borderColor={AppColors.TRANSPARENT}
                    unfilledColor={AppColors.BLACK}
                    width={SCREEN_WIDTH * 0.74}
                />
            </View>
            <RoundedBtn
                    text={StringConstants.UPDATE_NOW} 
                    textColor={AppColors.BLACK}
                    onClick={() => {}} 
                    borderRadius={8} 
                    height={36}
                    width={'100%'}
                    borderColor={AppColors.LIGHT_YELLOW}
                    bgColor={AppColors.LIGHT_YELLOW}
                />
        </>
        } */}
        <RoundedBtn
            text={StringConstants.UPDATE_NOW} 
            textColor={AppColors.BLACK}
            onClick={() => updatePrefs()} 
            borderRadius={8} 
            height={36}
            width={'100%'}
            borderColor={AppColors.LIGHT_YELLOW}
            bgColor={AppColors.LIGHT_YELLOW}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: AppColors.WHITE,
        fontFamily: FontFamily.DMSansBold,
        marginLeft: 10
    },
    description: {
        fontSize: 14,
        color: AppColors.GREY_VARIANT4,
        fontFamily: FontFamily.DMSansRegular,
        marginTop: 8,
        marginBottom: 16
    },
    card: {
        backgroundColor: AppColors.THEME_BG_COLOR,
        borderRadius: 8,
        borderColor: AppColors.GREY,
        borderWidth: 1,
        padding: 14,
        marginHorizontal: 16,
        marginBottom: 16
    },
    prefsIcon: {
        backgroundColor: AppColors.GREY_VARIANT6,
        height: 32,
        width: 32,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    percent: {
        fontSize: 14,
        color: AppColors.GREY_VARIANT4,
        fontFamily: FontFamily.DMSansRegular,
        marginRight: 4,
        marginBottom: 12
    },
    newUserUpdateText: {width: SCREEN_WIDTH * 0.7, marginBottom: 0}
});
