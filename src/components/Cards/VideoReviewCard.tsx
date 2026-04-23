import React, { useState, useEffect } from "react";
var extendedLog = LOG.extend("TopRecoScreen");
import { LOG } from "config";
import YoutubePlayer from "react-native-youtube-iframe";
import { TouchableOpacity } from "react-native-gesture-handler";

import { View, Dimensions, Text, StyleSheet, Platform } from "react-native";
import CommonStyles from "styles";

export default function VideoReviewCard({ key, item }) {
  return (
    <View style={styles.container} key={key}>
      <View>
        <YoutubePlayer
          height={Dimensions.get("window").width * 0.51389}
          play={false}
          forceAndroidAutoplay={false}
          videoId={item.videoid}
          webViewStyle={{ opacity: 0.99, borderRadius: 4 }}
          webViewProps={{
            allowsInlineMediaPlayback: false,
            playing: true,
            startInLoadingState: Platform.OS == "android" ? true : false,
          }}
        />
        <TouchableOpacity
          // TouchableOpacity to "steal" taps
          // absolutely positioned to the top
          // height must be adjusted to
          // just cover the top 3 dots
          style={CommonStyles.videoPlayer}
        />
        <View style={CommonStyles.paddingMedium}>
          <Text style={styles.txtBody}>{item.desc}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 24,
    borderRadius: 4,
  },
  txtBody: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    color: "#EEEEEE",
  },
});
