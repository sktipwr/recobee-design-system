import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Tick(props) {
  return (
    <Svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G {...props}>
        <Path d="M5.5 12.5L10.0168 17.7247L10.4177 17.0238C12.5668 13.2658 15.541 10.0448 19.1161 7.60354L20 7" stroke={props.color || "#121212"} stroke-width={props.strokeWidth || '3'} stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Svg>
  );
}
