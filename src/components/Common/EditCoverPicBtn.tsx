import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import StringConstants from 'utils/StringConstants';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';

export const EditCoverPicBtn: React.FC = ({onEditPress, bottomPosition = 6}) => {
  return (
    <View
        style={[styles.container, {bottom: bottomPosition}]}
    >
        <TouchableOpacity
            onPress={() => onEditPress()}
            style={styles.btn}
        >
        <Text
            style={[
            styles.txtBody,
            { fontSize: 10, color: AppColors.GREY_VARIANT4 },
            ]}
        >
            {StringConstants.EDIT_COVER}
        </Text>
        </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 21,
    },
    btn: {
        width: 100,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.GREY_VARIANT6,
        borderRadius: 14,
    },
    txtBody: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.WHITE
      },
})
