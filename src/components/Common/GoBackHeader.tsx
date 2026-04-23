
import CommonStyles from '../../../Styles';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import Back from "svg/back.svg";

export const GoBackHeader = ({ title, goBack, width = SCREEN_WIDTH * 0.6 } : {title: string, goBack: () => {}, width : any}) =>  {
  return ( 
    <View style={[CommonStyles.flexDirRow,styles.container, {width: width}]}>
        <TouchableOpacity
            style={[CommonStyles.headerBackStyle]}
            onPress={() => goBack()}
        >
            <Back width={24} height={24} />
        </TouchableOpacity>
        <Text style={CommonStyles.screenHeading}>
            {title}
        </Text>
  </View>
)};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
    }
})
