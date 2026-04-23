import { Dimensions, Platform, StatusBar } from 'react-native';
import {useState} from 'react';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');


export const StatusBarHeight = Platform.select({
    ios: 44,
    android: StatusBar.currentHeight,
    default: 0
})
