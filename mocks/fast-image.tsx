import React from 'react';
import { Image, ImageProps } from 'react-native';

// Mock react-native-fast-image with regular Image
const FastImage = (props: any) => {
  const { source, style, resizeMode, ...rest } = props;
  const src = typeof source === 'object' ? source.uri : source;
  return <Image source={{ uri: src }} style={style} resizeMode={resizeMode} {...rest} />;
};

FastImage.resizeMode = {
  contain: 'contain' as const,
  cover: 'cover' as const,
  stretch: 'stretch' as const,
  center: 'center' as const,
};

FastImage.priority = {
  low: 'low',
  normal: 'normal',
  high: 'high',
};

FastImage.preload = () => {};
FastImage.clearMemoryCache = async () => {};
FastImage.clearDiskCache = async () => {};

export default FastImage;
