import React from 'react';
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const InboxSkeleton = ({ rows }) => {

    const range = (end, start = 1, step = 1) => {
        return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step);
    }

    return (range(rows).map((item) => {
        return (<View style={{flex: 1, marginBottom: 50}} key={item}>
            <SkeletonPlaceholder backgroundColor='#212121' speed={0}>
                <View style={{ flexDirection: "row"}}>
                    <View style={{ flexDirection: "row", height: 28, marginTop: 5, width: 28, borderRadius: 30, margin: 10 }}></View>
                    <View style={{ height: 28, width: 170,  marginTop: 5, margin: 10, marginRight: 50, marginBottom: 5, borderRadius: 10 }}></View>
                    <View style={{ height: 17, width: 50, margin: 10, marginTop: 5,  borderRadius: 10 }}></View>
                </View>
            </SkeletonPlaceholder>
        </View>);
    }));

};
export default InboxSkeleton;