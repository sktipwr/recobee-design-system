import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Eyes(props) {
  return (
  <Svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M10.5 6C10.5 7 8.75 9.5 6 9.5C3.25 9.5 1.5 7 1.5 6C1.5 5 3.25 2.5 6 2.5C8.75 2.5 10.5 5 10.5 6Z" stroke={props.color || "white"} stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M7.5 6C7.5 6.82845 6.82845 7.5 6 7.5C5.17155 7.5 4.5 6.82845 4.5 6C4.5 5.17155 5.17155 4.5 6 4.5C6.82845 4.5 7.5 5.17155 7.5 6Z" stroke={props.color || "white"} stroke-linecap="round" stroke-linejoin="round"/>
  </Svg>
  );
}



