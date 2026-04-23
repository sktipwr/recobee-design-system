import React, { useState, useRef, useCallback, FC } from "react";
import Carousel from "react-native-snap-carousel";
import VideoReviewCard from "components/Cards/VideoReviewCard";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export type VideoCarouselProps = {
  data?: any;
  navigation?: Function;
  onMovieClick?: Function;
  onAddClick?: Function;
  onMoreClick?: Function;
};
const VideoCarousel: FC<VideoCarouselProps> = ({ data, navigation }) => {
  const renderCarouselItem = useCallback(({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <VideoReviewCard item={item} />
      </View>
    );
  }, []);
  const [carouselActiveSlideIndex, setCarouselActiveSlideIndex] = useState(0);
  const snapToItem = (idx) => setCarouselActiveSlideIndex(idx);
  let _carousel = useRef();

  return (
    <View style={{ marginTop: 0 }}>
      <Carousel
        ref={(c) => {
          _carousel = c;
        }}
        data={data}
        loop={true}
        renderItem={renderCarouselItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={Dimensions.get("window").width}
        autoplay={false}
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
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  carouselIndicatorNode: {
    height: 4,
    width: 15,
    marginRight: 4,
    borderRadius: 10,
    backgroundColor: "#999",
  },
  carouselIndicatorActiveNode: {
    backgroundColor: "#F6CE3D",
    height: 6,
    width: 20,
  },
});

export default React.memo(VideoCarousel);
