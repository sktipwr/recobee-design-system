import React from "react";

import {
    View,
    StyleSheet
} from "react-native";

export default function LoginCarouselCard({
    key,
    item
}) {
    let movieimage = item.movieimage;

    return (
        <View style={styles.container} key={key}>
            <View style={[styles.actionButtonStyle]}>
                <View>{movieimage}</View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 8,
    },
    actionButtonStyle: {
        flex: 1,
        flexDirection: 'row'
    }
});
