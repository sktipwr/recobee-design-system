import React from "react";

import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { AppConsumer } from "context";
import { Dimensions } from "react-native";
import DefaultUser from "svg/user";
import CommonStyles from "styles";

export default function GroupImage({ item, height = 36, width = 36, fontSize = 14 }) {
    const leftCount = item.length - 3;
    const length = item.length > 3 ? 3 : item.length;
    let iconArr = [];
    for (var i = 0; i < length; i++) {
        iconArr.push(item[i].thumbnail ?? item[i].image);
    }

    // Calculate width based on number of items
    const getContainerWidth = () => {
        if (item.length === 1) return width;
        if (item.length === 2) return width * 1.6;
        if (item.length === 3) return width * 2.2;
        if (leftCount > 0) return width * 2.8;
        return width * 2.3;
    };


    return (
        <AppConsumer>
            {(appConsumer) => (
                <View style={[styles.container, { width: getContainerWidth(), height: height }]}>
                    {leftCount > 0 && (
                        <View style={[CommonStyles.dp, styles.countBadge, { 
                            height: height, 
                            width: width, 
                            backgroundColor: appConsumer.theme.colors.grey7, 
                            left: length * (width * 0.6)
                        }]}>
                            <Text style={[CommonStyles.txtBodyMedium, {fontSize: fontSize}]}>+{leftCount}</Text>
                        </View>
                    )}
                    {iconArr.map((img, index) => (
                        <View key={index} style={[CommonStyles.dp, styles.imageWrapper, { 
                            height: height, 
                            width: width,
                            left: index * (width * 0.6),
                            zIndex: 3 - index
                        }]}>
                            {(img != null && img != '') ?
                                <Image
                                    source={{ uri: img }}
                                    style={[CommonStyles.dp, {height: height, width: width}]}
                                /> :
                                <DefaultUser height={height} width={width} />}
                        </View>
                    ))}
                </View>
            )}
        </AppConsumer>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    countBadge: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 4
    },
    imageWrapper: {
        position: 'absolute',
        top: 0
    }
});
