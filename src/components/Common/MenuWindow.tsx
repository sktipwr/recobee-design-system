import CommonStyles from '../../../Styles';
import React, { useState } from 'react';
import { View, Modal, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';

export type MenuOptionTypes = {
    isVisible: boolean,
    closeMenu: () => {},
    buttonLabel: string,
    menuItems: any,
    selectedView: string,
    positionTop: number,
    positionLeft: number

  };
  
export const CustomMenu: React.FC<MenuOptionTypes> = ({ positionTop, positionLeft, isVisible, closeMenu, onSelect, menuItems, selectedView }) => {

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeMenu}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.menu, {top: positionTop, left: positionLeft}]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity style={[CommonStyles.rowAlignCenter, index != 2 && {marginBottom: 20}]} onPress={
                ()=> {
                    onSelect(item?.title)
                    closeMenu()
                }
            }>
                {item.icon}
                <Text style={[styles.listView, item.title == selectedView && {color: AppColors.LIGHT_YELLOW}, styles.itemStyle]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    backgroundColor: AppColors.GREY_VARIANT8,
    borderWidth: 1,
    borderColor: AppColors.GREY_VARIANT4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 5,
    position: 'absolute',
  },
  itemStyle: {
    marginLeft: 8,
},
  listView: {
    color: AppColors.GREY_VARIANT4, // Font color for leader name
    fontSize: 12,
    fontFamily: FontFamily.DMSansBold,
  }
});