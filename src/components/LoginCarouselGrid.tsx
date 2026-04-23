import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';

const numColumns = 3;
const windowWidth = SCREEN_WIDTH - 32;
const itemWidth = windowWidth / numColumns;

export const LandingImagesGrid = ({images}) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if(images?.length > 0)
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true }); // Scroll to the 5th index
    }, 1000); // Add some delay if necessary
  },[images])

  const renderItem = ({ item, index }) => (
    <View style={[index % 3 != 2 && styles.itemContainer ]}>
      <Image source={{ uri: item }} style={[styles.image, {width: index % 3 === 1 ? windowWidth * 0.2 : windowWidth * 0.4 }]} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Gradient */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.9)', 'transparent']}
        style={styles.topGradient}
      />
        {/* Grid of Images */}
        <FlatList
          data={images}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          renderItem={renderItem}
          keyExtractor={(item, index) => index?.toString()}
          numColumns={numColumns}
        />
      {/* Bottom Gradient */}
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
        style={styles.bottomGradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaledWidth(300),
  },
  itemContainer: {
    marginRight: 0.5, 
    marginBottom: 0.5
  },
  image: {
    width: itemWidth - 10, // Adjust for padding
    height: itemWidth + 30, // Keep the images square
    borderRadius: 1,
    resizeMode: 'stretch'
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140, // Adjust this value based on how much blur you want
    zIndex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140, // Adjust this value based on how much blur you want
    zIndex: 1,
  },
});
