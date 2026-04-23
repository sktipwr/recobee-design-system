import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function MinusCircle(props) {
  return (
    <Svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G {...props}>
        <Path d="M9.00158 12H15.0016M21.1516 12.0001C21.1516 17.0535 17.055 21.1501 12.0016 21.1501C6.94815 21.1501 2.85156 17.0535 2.85156 12.0001C2.85156 6.94669 6.94815 2.8501 12.0016 2.8501C17.055 2.8501 21.1516 6.94669 21.1516 12.0001Z" stroke={props.color || "#FFFFFF"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Svg>
  );
}
