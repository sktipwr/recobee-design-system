import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Clock(props) {
  return (
    <Svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
       <G {...props}>
        <Path d="M9.99991 6.66658V10.6802C9.99991 10.8227 10.0727 10.9553 10.1929 11.0318L12.4999 12.4999M17.625 10C17.625 14.2112 14.2112 17.625 9.99999 17.625C5.78882 17.625 2.375 14.2112 2.375 10C2.375 5.78882 5.78882 2.375 9.99999 2.375C14.2112 2.375 17.625 5.78882 17.625 10Z" stroke={props.color || "#121212"} stroke-width={props.strokeWidth || "2"} stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Svg>
  );
}



