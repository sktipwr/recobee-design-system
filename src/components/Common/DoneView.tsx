// ProgressBar.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Tick from "../../icons/Tick";

const DoneView = ({ bgColor, tickColor }) =>  {
  return (
    <View
        style={[styles.container, {backgroundColor: bgColor}]}
    >
        <Tick
            width={24}
            height={24}
            color={tickColor}
            strokeWidth={"2"}
        />
    </View>
)};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    width: 56,
    borderRadius: 50,
  }
});

export default DoneView;
