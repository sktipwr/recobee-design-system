import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Next(props) {
  return (
    <Svg width={props.width || "22"} height={props.height || "22"} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M15.6696 6C17.773 7.55556 19.6622 9.37278 21.2905 11.4057C21.4302 11.5801 21.5 11.79 21.5 12M21.5 12C21.5 12.21 21.4302 12.4199 21.2905 12.5943C19.6622 14.6272 17.773 16.4444 15.6696 18M21.5 12H3.5" stroke={props.color || "#121212"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}
