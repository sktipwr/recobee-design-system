import React from 'react';
import { View } from 'react-native';

export type CircleOptions = {
    size: number,
    color: string
  };
  
export const Circle: React.FC<CircleOptions> = ({ size, color }) => {

  return (
    <View style={{height: size, width: size, borderRadius: size, backgroundColor: color}}>

    </View>
  );
};
