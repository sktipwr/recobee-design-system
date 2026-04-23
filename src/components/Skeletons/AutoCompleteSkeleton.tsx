import React from 'react';
import { View, Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AppColors from '../../utils/Colors';

const AutoCompleteSkeleton = ({ rows }) => {

    const range = (end, start = 1, step = 1) => {
        return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step);
    }

    return (range(rows).map((item) => {
        return (<View style={{height: 70}} key={item}>
        <SkeletonPlaceholder backgroundColor={AppColors.BLACK_VARIANT3} speed={1200} highlightColor={AppColors.WHITE_VARIANT4} >
            <View style={{ flexDirection: "column", height: 60, marginBottom: 10 }}>
               
            </View>
        </SkeletonPlaceholder>
    </View>);
    }));

};
export default AutoCompleteSkeleton;