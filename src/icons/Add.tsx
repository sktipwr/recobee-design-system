import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Add(props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M12 19V12M12 12V5M12 12H5M12 12H19" stroke={props.color || "white"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}
