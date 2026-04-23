import React from 'react';
import { View } from 'react-native';

// Universal SVG mock - returns an empty placeholder for any missing SVG asset
const SvgMock = (props: any) => {
  const { width = 24, height = 24, color, fill, style, ...rest } = props;
  return (
    <View
      style={[
        {
          width: Number(width) || 24,
          height: Number(height) || 24,
          backgroundColor: 'rgba(233, 198, 56, 0.1)',
          borderRadius: 4,
          borderWidth: 1,
          borderColor: 'rgba(233, 198, 56, 0.2)',
          // @ts-ignore
          borderStyle: 'dashed',
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default SvgMock;
export { SvgMock };
