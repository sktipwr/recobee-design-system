import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function AddIcon(props) {
  return (
    <Svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M12 19V12M12 12V5M12 12H5M12 12H19" stroke={props?.color || "#EEEEEE"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}
