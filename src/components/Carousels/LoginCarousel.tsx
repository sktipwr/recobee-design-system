import React, { useState, useRef, useCallback, FC } from "react";
import Carousel from "react-native-snap-carousel";
import LoginCarouselCard from "components/Cards/LoginCarouselCard";
import { View, Dimensions, StyleSheet, Text } from "react-native";

export type LoginCarouselProps = {
  data?: any;
};
const LoginCarousel: FC<LoginCarouselProps> = ({ data }) => {
  const renderCarouselItem = useCallback(({ item }) => {
    return <LoginCarouselCard item={item} />;
  }, []);
  const [carouselActiveSlideIndex, setCarouselActiveSlideIndex] = useState(0);
  const snapToItem = (idx) => setCarouselActiveSlideIndex(idx);
  let _carousel = useRef();

  return (
    <View style={{ marginBottom: 16, alignItems: "center" }}>
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        data={data}
        loop={true}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={300}
        autoplay={true}
        layoutCardOffset={0}
        onSnapToItem={snapToItem}
      />

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
    </View>
  );
};

const styles = StyleSheet.create({
  carouselIndicatorContainer: {
    height: 10,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselIndicatorNode: {
    height: 4,
    width: 4,
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: "#999",
  },
  carouselIndicatorActiveNode: {
    backgroundColor: "#F6CE3D",
    height: 6,
    width: 6,
  },
  txtBody: {
    fontFamily: "DMSans-Regular",
    fontSize: 17,
    color: "#FFFFFF",
    lineHeight: 20,
    paddingLeft: 16,
    paddingBottom: 12,
  },
});

export default React.memo(LoginCarousel);
