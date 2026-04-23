import React from 'react';
import { View } from 'react-native';

// Mock react-native-linear-gradient
const LinearGradient = ({ children, colors, start, end, style, ...props }: any) => {
  const gradientColors = colors || ['#FBEB41', '#FF9A3D'];
  const s = start || { x: 0, y: 0 };
  const e = end || { x: 1, y: 0 };
  const angle = Math.atan2(e.y - s.y, e.x - s.x) * (180 / Math.PI) + 90;

  return (
    <View
      style={[
        style,
        {
          // @ts-ignore - web-only property
          backgroundImage: `linear-gradient(${angle}deg, ${gradientColors.join(', ')})`,
        },
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default LinearGradient;
export { LinearGradient };
