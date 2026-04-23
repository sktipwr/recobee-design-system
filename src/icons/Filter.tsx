import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Filter(props) {
  return (
    <Svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G {...props}>
        <Path d="M17 3V10M17 10C15.3431 10 14 11.3431 14 13V14C14 15.6569 15.3431 17 17 17C18.6569 17 20 15.6569 20 14V13C20 11.3431 18.6569 10 17 10ZM7 16V21M17 20V21M7 3V6M7 6C5.34315 6 4 7.34315 4 9V10C4 11.6569 5.34315 13 7 13C8.65685 13 10 11.6569 10 10V9C10 7.34315 8.65685 6 7 6Z" stroke={props.color || "#F8F8F9"} stroke-width={props.strokeWidth || "2"} stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Svg>
  );
}
