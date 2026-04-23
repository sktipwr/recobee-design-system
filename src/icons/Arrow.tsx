import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Arrow(props) {
  return (
  <Svg width={props.width || 16} height={props.height || 16} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M8.5 10.1392C9.56206 11.601 10.8071 12.9104 12.2021 14.0334C12.3774 14.1744 12.6226 14.1744 12.7979 14.0334C14.1929 12.9104 15.4379 11.601 16.5 10.1392" stroke={props?.color || "#E0E0E0"} stroke-width={props?.stroke || "2"} stroke-linecap="round" stroke-linejoin="round"/>
  </Svg>

  );
}
