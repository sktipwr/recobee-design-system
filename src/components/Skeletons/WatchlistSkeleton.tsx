import React from 'react';
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const WatchlistSkeleton = ({ rows }) => {

    const range = (end, start = 1, step = 1) => {
        return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step);
    }

    return (range(rows).map((item) => {
        return (<View style={{ height: 170 }} key={item}>
            <SkeletonPlaceholder backgroundColor='#212121' speed={0}>
                <View style={{ flexDirection: "row", height: 300 }}>
                    <View style={{ flexDirection: "row", height: 140, width: 91, margin: 10, borderRadius: 10 }}>
                    </View>
                    <View>
                        <View style={{ height: 20, width: 150, margin: 10, marginBottom: 5, borderRadius: 10 }}></View>
                        <View style={{ height: 20, width: 150, margin: 10, marginTop: 0, marginBottom: 50,  borderRadius: 10 }}></View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: 32, width: 89, margin: 10, marginRight: 50, borderRadius: 10 }}></View>
                            <View style={{ height: 32, width: 89, margin: 10, borderRadius: 10 }}></View>
                        </View>
                    </View>
                </View>
            </SkeletonPlaceholder>
        </View>);
    }));

};
export default WatchlistSkeleton;