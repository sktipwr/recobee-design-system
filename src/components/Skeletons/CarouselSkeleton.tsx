import React from 'react';
import { View, Dimensions } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const CarouselSkeleton = ({ }) => {

    return (<View style={{ padding: 16, paddingTop: 0 }}>
        <SkeletonPlaceholder backgroundColor='#212121' speed={0} >
            <View>
                <View style={{ flexDirection: 'row', margin: 0, marginBottom: 16 }}>
                    <View style={{ height: 20, width: 0.5 * Dimensions.get("window").width, borderRadius: 10, marginRight: 66 }}></View>
                    <View style={{ height: 20, width: Dimensions.get("window").width * 0.22, borderRadius: 10 }}></View>
                </View>
                <View style={{
                    height: Dimensions.get('window').width * 0.4861 + 52,
                    width: Dimensions.get('window').width - 32,
                    borderRadius: 8,
                    marginBottom: 8
                }}>

                </View>
                <View style={{ flexDirection: 'row', margin: 0, marginBottom: 16, justifyContent: 'space-around', width: Dimensions.get('window').width - 32 }}>
                    <View style={{ height: 20, width: Dimensions.get("window").width * 0.22, borderRadius: 10 }}></View>
                    <View style={{ height: 20, width: Dimensions.get("window").width * 0.22, borderRadius: 10 }}></View>
                    <View style={{ height: 20, width: Dimensions.get("window").width * 0.22, borderRadius: 10 }}></View>
                </View>
            </View>
        </SkeletonPlaceholder>
    </View>);

};
export default CarouselSkeleton;