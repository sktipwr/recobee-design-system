

import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";

import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import { RoundedBtn } from "../Common/RoundedBtn";
import LinearGradient from 'react-native-linear-gradient';

export type RecoGeneratorCardProps = {
    onCardPress: Function;
  };

  export const RecoGeneratorCard: FC<RecoGeneratorCardProps> = ({
    onCardPress
  }) => {

  return (
    
    <TouchableOpacity style={[styles.container]} onPress={() => onCardPress('RecoGeneratorScreen')}>
        <LinearGradient
            colors={[AppColors.GREY_VARIANT2, AppColors.GREY_VARIANT25]} // Specify the gradient colors
            style={styles.container} // Apply styles
        >
            <View style={[styles.title, CommonStyles.rowAlignCenter]}>
                <Text style={styles.presenting}>{StringConstants.PRESENTING} </Text>
                <Text style={[styles.presenting, {color: AppColors.LIGHT_YELLOW}]}>{StringConstants.RECO_GENERATOR_TITLE} 🎬</Text>
            </View>
            <Image source={require('../../../assets/reco_generator_images.png')} style={styles.staticImages} />
            <View style={styles.generatorInfo}>
                <Text style={styles.recoGenerator}>{StringConstants.STUCK_ON_WHAT_TO_WATCH}</Text>
                <View style={[CommonStyles.rowSpaceBetween, styles.gap]}>
                    <Text style={styles.generatorDescription}>
                        {StringConstants.GET_TAILORED_RECOS}
                    </Text>
                </View>
                <RoundedBtn
                    text={StringConstants.TRY_NOW}
                    textColor={AppColors.BLACK}
                    onClick={() => onCardPress()} 
                    borderRadius={8} 
                    width={'100%'}
                    height={scaledWidth(32)}
                    borderColor={AppColors.LIGHT_YELLOW}
                    bgColor={AppColors.LIGHT_YELLOW}
                />
            </View>
        </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 16,
        backgroundColor: AppColors.BLACK,
        overflow: 'hidden',
        borderColor: AppColors.GREY,
        borderWidth: 0.2,
    },
    bgPoster: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        borderRadius: 8
    },
    spaceBtw: {
        justifyContent: 'flex-end',
        flex: 1
    },
    generatorInfo: {
        width: '100%',
        zIndex: 1,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        paddingTop: 12,
        paddingHorizontal: 12,
        marginTop: scaledWidth(-36),
        paddingBottom: scaledWidth(16)
    },
    recoGenerator: {
        fontSize: 16,
        color: AppColors.WHITE,
        fontFamily: FontFamily.DMSansBold
    },
    generatorDescription: {
        fontSize: 14,
        color: AppColors.GREY_VARIANT4,
        fontFamily: FontFamily.DMSansRegular,
        width: SCREEN_WIDTH * 0.8
    },
    gap: {
        marginBottom: 12,
        marginTop: 6,
        alignItems: 'center'
    },
    staticImages: {
        height: scaledWidth(174),
        width: '100%',
        marginTop: 10,
    },
    title: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginTop: 5,
        paddingTop:7
    },
    presenting: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE
    }
    
});
