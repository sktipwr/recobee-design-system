import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppColors from '../../utils/Colors';

const ChatCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.nameSkeleton} />
        <View style={styles.previewSkeleton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    padding: 10,
    margin: 16,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.GREY_VARIANT6,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  nameSkeleton: {
    height: 16,
    width: '60%',
    backgroundColor: AppColors.GREY_VARIANT6,
    borderRadius: 4,
    marginBottom: 8,
  },
  previewSkeleton: {
    height: 12,
    width: '80%',
    backgroundColor: AppColors.GREY_VARIANT6,
    borderRadius: 4,
  },
});

export default ChatCardSkeleton;
