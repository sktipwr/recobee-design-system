import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function RateFilled(props) {
  return (
    <Svg width={props.width || "16"} height={props.height || "16"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M7.88537 0L9.65574 5.52786H15.3848L10.7499 8.94427L12.5203 14.4721L7.88537 11.0557L3.25046 14.4721L5.02084 8.94427L0.385937 5.52786H6.11499L7.88537 0Z" fill={props.color || "white"} stroke-width="2"/>
    </Svg>
  );
}
