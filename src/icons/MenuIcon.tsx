import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function MenuIcon(props) {
  return (
    <Svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 2V0H18V2H0ZM0 7H18V5H0V7ZM0 12H18V10H0V12Z" fill={props.color || "#CAC4D0"} stroke-width="2" />
    </Svg>
  );
}
