import React from 'react';
import { View, Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const InboxCardSkeleton = ({ rows }) => {

    const range = (end, start = 1, step = 1) => {
        return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step);
    }

    return (range(rows).map((item, index) => {
        return (<View style={{ flex: 1, height: Dimensions.get('window').width * 0.35, width: Dimensions.get('window').width * 0.9 - 8 }} key={item}>
            <SkeletonPlaceholder backgroundColor='#212121' speed={0}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row", height: Dimensions.get('window').width * 0.35, width: Dimensions.get('window').width * 0.9 - 8, 
                    margin: 10, borderRadius: 10, marginLeft: (index % 2 == 0 ? 10 : 70)  }}>
                    </View>
                </View>
            </SkeletonPlaceholder>
        </View>);
    }));

};
export default InboxCardSkeleton;