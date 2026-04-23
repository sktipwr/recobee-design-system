import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { SCREEN_WIDTH } from 'utils/Dimensions';

interface VideoModalProps {
  visible: boolean;
  videoId: string;
  onClose: () => void;
  playerRef?: React.RefObject<any>;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  visible,
  videoId,
  onClose,
  playerRef,
}) => {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.videoModal}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        {videoId && visible && (
          <YoutubePlayer
            ref={playerRef}
            height={SCREEN_WIDTH * 0.58}
            videoId={videoId}
            play={false}
            forceAndroidAutoplay
            onReady={() => {
              playerRef?.current?.seekTo(0, true);
            }}
            initialPlayerParams={{
              controls: true,
              modestbranding: true,
            }}
            webViewProps={{
              allowsInlineMediaPlayback: true,
              mediaPlaybackRequiresUserAction: false,
            }}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  videoModal: {
    flex: 1,
    backgroundColor: AppColors.BLACK,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: AppColors.WHITE,
    fontSize: 24,
    fontFamily: FontFamily.DMSansBold,
  },
});
