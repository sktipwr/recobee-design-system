

import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import StringConstants from 'utils/StringConstants';
import Add from "icons/Add";
import AppColors from 'utils/Colors';
import { scaledWidth } from 'utils/Dimensions';
import FontFamily from 'utils/FontFamily';

interface AddedItemParams {
  addItems: () => any,
  title: string
}

export const AddItemsButton: React.FC<AddedItemParams> = ({addItems, title = StringConstants.ADD_MOVIES_OR_SHOWS}) => {
  return (
    <TouchableOpacity style={styles.addItems} onPress={()=> addItems()}>
        <View style={styles.addBtn}>
          <Add width={18} height={18} color={AppColors.GREY_VARIANT4} />
        </View>
        <Text style={styles.addItemsText}>
        {title}
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    addItemsText: {
        color: AppColors.WHITE, 
        fontFamily: FontFamily.DMSansBold, 
        fontSize: 16,
        marginLeft: 16
      },
      addBtn: {
        height: scaledWidth(42),
        width: scaledWidth(42),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaledWidth(42),
        backgroundColor: AppColors.GREY_VARIANT8
      },
      addItems: {
        borderRadius: 8,
        marginBottom: 5,
        borderColor: AppColors.GREY_VARIANT6,
        borderWidth: 1,
        backgroundColor: AppColors.THEME_BG_COLOR,
        paddingHorizontal: 8,
        paddingVertical: 7,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 16
      },
})

