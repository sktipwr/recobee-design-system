

import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";

import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";
import Arrow from "svg/gradient_right_arrow";
import Cinepolis from "svg/cinepolis";
import StringConstants from "utils/StringConstants";
import mixpanel from 'mixpanel';
import CineLogo from 'svg/cinepolis_logo';
import Horn from 'svg/horn'
import LinearGradient from "react-native-linear-gradient";

export type CinepolisCardProps = {
  fromB2B?: boolean;
};

export const CinepolisCard: FC<CinepolisCardProps> = ({ fromB2B = false }) => {

  //on card press navigate to cinepolis site
  const onCardPress = () => {
    mixpanel.track('CinepolisCardClicked', {
        screen: 'MovieDetailsScreen',
        purpose: 'CardClicked'
    });
    try {
        Linking.openURL('https://cinepolisindia.com')   
    }
    catch (err){
        console.log(err)
    }
  }

  return (
    <TouchableOpacity style={[CommonStyles.streakCardContainer, styles.container]} 
        onPress={() => onCardPress()}
    >
        <View style={[styles.negatives, {zIndex: 4}]}>
            {fromB2B ? (
                <Image 
                    source={require('assets/images/png/movieTicket.png')} 
                    style={{ height: scaledWidth(152), width: scaledWidth(145) }}
                    resizeMode="contain"
                />
            ) : (
                <Cinepolis height={scaledWidth(152)} width={scaledWidth(114)} />
            )}
        </View>
        <View style={styles.spaceBtw}>
            <LinearGradient
                colors={[AppColors.LIGHT_YELLOW_GRADIENT, AppColors.DARK_YELLOW_GRADIENT]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.linearGradient, CommonStyles.rowAlignCenter
                ]}
            >
                <Horn />
                <Text style={styles.code}>{StringConstants.DISCOUNT_CODE + 'Cinepolis25'}</Text>
            </LinearGradient>
            <View style={[CommonStyles.rowSpaceBetween]}>
                <Text style={[styles.title]}>
                    {StringConstants.BOOK_YOUR_TICKETS}
                </Text>
            </View>
            <Text style={styles.info}>
                {StringConstants.EXPERIENCE_BIG_SCREEN_THRIL}
            </Text>
            { 
                <View style={[CommonStyles.rowAlignCenter, {marginTop: 8}]}>
                    <Text style={styles.bookNow}>
                        {StringConstants.BOOK_NOW_AT}{' '}
                    </Text>
                   <CineLogo />
                </View>
            }
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    negatives: {
        position: 'absolute',
        right: 0,
        opacity: 1,
        borderRadius: 7
    },
    title: {
        fontSize: 20,
        color: AppColors.WHITE,
        fontFamily: FontFamily.DMSansBold
    },
    info: {
        fontSize: 10,
        color: AppColors.GREY_VARIANT4,
        fontFamily: FontFamily.DMSansRegular,
        width: SCREEN_WIDTH * 0.5,
        marginTop: 8
    },
    bookNow: {
        fontSize: 14,
        color: AppColors.LIGHT_YELLOW,
        fontFamily: FontFamily.DMSansRegular,
    },
    spaceBtw: {
        justifyContent: 'space-between',
        flex: 1,
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        height: scaledWidth(152),
        backgroundColor: AppColors.THEME_BG_COLOR,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: AppColors.GREY,
        marginTop: 0,
    },
    linearGradient: {
        padding: 0.5,
        justifyContent: 'center',
        // height: 35,
      //  paddingVertical: 6,
        width: SCREEN_WIDTH * 0.494,
        borderRadius: 4,
        marginBottom: 8,
      },
    code: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.BLACK,
        marginLeft: 4,
        paddingVertical:6,
    },
});
