import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import { SCREEN_WIDTH } from 'utils/Dimensions';

interface VideoAsset {
  movie_id: string;
  type: string;
  label: string;
  youtube_key: string;
  release_date: string;
}

interface VideoAssetsRailProps {
  assets: VideoAsset[];
  excludeKey?: string;
}

export default function VideoAssetsRail({ assets, excludeKey }: VideoAssetsRailProps) {
  const filteredAssets = assets.filter(asset => asset.youtube_key !== excludeKey);

  if (filteredAssets.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{StringConstants.VIDEOS}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredAssets.map((asset, index) => (
          <View key={index} style={styles.videoCard}>
            <View style={styles.videoContainer}>
              <YoutubePlayer
                height={(SCREEN_WIDTH * 0.7) * 0.5625}
                play={false}
                forceAndroidAutoplay={false}
                videoId={asset.youtube_key}
                webViewProps={{
                  allowsInlineMediaPlayback: false,
                  playing: false,
                }}
                webViewStyle={{ opacity: 0.99 }}
              />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.label} numberOfLines={1}>{asset.label}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  videoCard: {
    marginRight: 12,
    width: SCREEN_WIDTH * 0.7,
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoContainer: {
    width: SCREEN_WIDTH * 0.7,
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    backgroundColor: AppColors.BLACK,
  },
  labelContainer: {
    backgroundColor: AppColors.BLACK_VARIANT7,
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
});
