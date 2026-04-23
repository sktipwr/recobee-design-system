import React from 'react';
import { View, StyleSheet, Platform } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledHeight, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";

const ShortsSkeleton = ({ item }) => {

    return (<View style={{ height: SCREEN_HEIGHT }} key={item}>
        <SkeletonPlaceholder backgroundColor={AppColors.GREY_VARIANT6} speed={0}>
            <View style={[Platform.OS == 'ios' ? styles.paddingIOS : styles.padding]}>
                <View style={CommonStyles.rowSpaceBetween}>
                    <View style={styles.ottView} />
                    <View style={styles.ottView} />
                </View>
                <View style={styles.image} />
                <View style={[CommonStyles.rowSpaceBetween]}>
                    <View>
                        <View style={styles.leftSection} />
                        <View style={styles.title} />
                    </View>
                    <View style={styles.leftSection}>
                        <View style={styles.actioBtn} />
                    </View>
                </View>
            </View>
        </SkeletonPlaceholder>
    </View>);

};
export default ShortsSkeleton;

const styles = StyleSheet.create({
    padding: { padding: 16 },
    paddingIOS: {
        paddingHorizontal: 16,
        paddingTop: 52, 
        paddingBottom: 16
    },
    moreOptions: { transform: [{ rotate: '90deg' }], marginTop: 20 },
    ottView: {
        height: scaledWidth(40),
        width: scaledWidth(40),
        borderRadius: scaledWidth(40)
    },
    flexEnd: {justifyContent: 'flex-end'},
    image: {
        width: SCREEN_WIDTH - 32,
        height: SCREEN_HEIGHT * 0.55,
        marginTop: 5,
        
    },
    leftSection: {
        width: scaledWidth(270),
        height: SCREEN_WIDTH * 0.2,
        marginBottom: scaledHeight(8),
    },
    actioBtn: {
        width: 50,
        height: scaledWidth(150),
        marginLeft: 10,
        marginBottom: scaledHeight(8),
        marginTop: scaledHeight(7),
    },
    ottBtn: {
        width: 50,
        height: scaledWidth(50),
        marginBottom: scaledHeight(7),
        marginLeft: 10,
    },
    title: {
        width: scaledWidth(270),
        height: scaledWidth(75),
        marginBottom: scaledHeight(8),
    },

});
