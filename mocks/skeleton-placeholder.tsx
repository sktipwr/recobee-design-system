import React from 'react';
import { View, StyleSheet } from 'react-native';

// Mock react-native-skeleton-placeholder
const SkeletonPlaceholder = ({ children, backgroundColor, highlightColor, speed }: any) => {
  return <View>{children}</View>;
};

SkeletonPlaceholder.Item = ({ children, style, ...props }: any) => {
  return (
    <View
      style={[
        {
          backgroundColor: '#333',
          borderRadius: 4,
          overflow: 'hidden',
        },
        style,
      ]}
      {...props}
    >
      <View style={styles.shimmer} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
});

export default SkeletonPlaceholder;
