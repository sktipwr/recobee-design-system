

import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import { CLOUD_BASEURL } from "utils/HelperFunctions";

import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from "react-native-fast-image";

export const OTTRecosCard: React.FC = ({ data, navigation, onListClick, url, sectionType }) => {

  const scrollX = useRef(new Animated.Value(0)).current;
  const imageWidth = scaledWidth(110); // Change this based on your image width
  const duration = 9000; // Duration for the animation to complete
  const totalWidth = imageWidth * data?.length;

  useEffect(() => {
    const animate = () => {
      scrollX.setValue(0);
      Animated.timing(scrollX, {
        toValue: -totalWidth,
        duration: duration * data.length,
        useNativeDriver: true,
      }).start(() => animate()); // Continuously repeat the animation
    };
    animate();
  }, [scrollX, data, totalWidth, duration]);

  const translateX = scrollX.interpolate({
    inputRange: [-totalWidth, 0],
    outputRange: [-totalWidth, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { transform: [{ translateX: translateX }] }]}>
        {data.concat(data).map((item, index) => (
          <TouchableOpacity style={[styles.card, styles.borderStyle]} onPress={()=> {onListClick(item, null, null, url, sectionType)}}>
            <FastImage source={{uri: CLOUD_BASEURL + (item == 'Amazon Prime Video' ? 'Amazon Prime' : item) + '-Home' + '.png'}} resizeMode='cover' style={[styles.image]} />
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
//};
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: scaledWidth(75), // Adjust based on your image height
    width: SCREEN_WIDTH,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  card: {
    width: scaledWidth(103),
    height: scaledWidth(75),
    borderRadius: 3, 
    marginRight: scaledWidth(7),
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 3,
    overflow: 'hidden'
  },
  borderStyle: {
    borderColor: AppColors.GREY,
  }
});
