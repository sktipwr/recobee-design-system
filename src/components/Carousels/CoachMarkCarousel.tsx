import React, { useState, useRef, useCallback, FC } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

import Config from 'react-native-config';
import { CLOUD_BASEURL } from 'utils/HelperFunctions';

export type CoachMarkCarouselProps = {
  data?: any;
};

const CoachMarkCarousel: FC<CoachMarkCarouselProps> = ({ data }) => {
  const [carouselActiveSlideIndex, setCarouselActiveSlideIndex] = useState(0);
  const snapToItem = (idx) => setCarouselActiveSlideIndex(idx);
  let _carousel = useRef();

  const renderCarouselItem = useCallback(({ item }) => {
    return (
      <View>
        <View>
          <FastImage
            //source={item.img}
            source={{ uri: CLOUD_BASEURL + item.imgName }}
            resizeMode='contain'
            style={styles.sliderImg}
          />
        </View>

        <View style={styles.pd15}>
          <Text style={styles.sliderText}>{item.title}</Text>
          <Text style={styles.sliderSubText}>{item.subTitle}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <View>
      <View style={styles.carouselIndicatorContainer}>
        {data.map((item, i) => (
          <View
            key={i}
            style={[
              styles.carouselIndicatorNode,
              carouselActiveSlideIndex === i &&
                styles.carouselIndicatorActiveNode,
            ]}
          />
        ))}
      </View>
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        data={data}
        loop={true}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get('window').width - 32}
        itemWidth={Dimensions.get('window').width - 32}
        autoplay={true}
        autoplayInterval={8000}
        onSnapToItem={snapToItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselIndicatorContainer: {
    height: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -4,
  },
  carouselIndicatorNode: {
    height: 3,
    width: Dimensions.get('window').width * 0.29,
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: '#999',
  },
  carouselIndicatorActiveNode: {
    backgroundColor: '#E9C638',
    height: 3,
    width: Dimensions.get('window').width * 0.29,
  },
  sliderImg: {
    height: Dimensions.get('window').width + 100,
    width: Dimensions.get('window').width - 35,
  },
  sliderText: {
    color: '#E9C638',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'DMSans-Bold',
    paddingBottom: 6,
  },
  sliderSubText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
    color: '#E0E0E0',
  },
  pd15: {
    width: Dimensions.get('window').width - 35,
    padding: 16,
  },
});

export default React.memo(CoachMarkCarousel);
