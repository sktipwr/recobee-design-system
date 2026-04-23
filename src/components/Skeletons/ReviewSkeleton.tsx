import React from 'react';
import { View, Dimensions} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AppColors from '../../utils/Colors';


const ReviewSkeleton = ({ rows }) => {

    const range = (end, start = 1, step = 1) => {
        return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), x => start + x * step);
    }

    const width = Dimensions.get('window').width;

    return (range(rows).map((item) => {
        return (<View style={{ height: width * 0.45 }} key={item}>
            <SkeletonPlaceholder backgroundColor={AppColors.BLACK_VARIANT3} speed={1200} highlightColor={AppColors.WHITE_VARIANT4}>
                <View style={{ flexDirection: "row", height: width * 0.6 }}>
                    <View style={{ flexDirection: "row", height: width * 0.3, width: width * 0.25, margin: 10, marginLeft: 0, borderRadius: 10 }}>
                    </View>
                    <View>
                        <View style={{ height: width * 0.278, width: width * 0.6, margin: 10, marginBottom: 5, borderRadius: 10 }}></View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: 24, width: width * 0.6, margin: 10, borderRadius: 10 }}></View>
                        </View>
                    </View>
                </View>
            </SkeletonPlaceholder>
        </View>);
    }));

};
export default ReviewSkeleton;