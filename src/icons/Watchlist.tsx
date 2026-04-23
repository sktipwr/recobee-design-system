import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Watchlist(props) {
  return (
    <Svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
       <G {...props}>
        <Path d="M4 12.6328H10M4 18.6328H10M4 6.63281H20M13.5 15.6111L15.8412 17.9498C16.9672 15.9809 18.5256 14.2932 20.3987 13.0141" stroke={props.color || "#121212"} stroke-width={props.strokeWidth || "2"} stroke-linecap="round" stroke-linejoin="round" />
      </G>
    </Svg>
  );
}



