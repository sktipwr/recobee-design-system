import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function CurvePointer(props) {
  return (

    <Svg width={props.width||"11"} height={props.height || "11"} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M6.72605 2.30469C7.42721 2.82321 8.05693 3.42895 8.59969 4.10658C8.64625 4.16471 8.66953 4.2347 8.66953 4.30469M8.66953 4.30469C8.66953 4.37468 8.64625 4.44466 8.59969 4.5028C8.05693 5.18041 7.42721 5.78617 6.72605 6.30469M8.66953 4.30469H5.46953C4.34943 4.30469 3.78938 4.30469 3.36155 4.52268C2.98523 4.71441 2.67926 5.02037 2.48752 5.39669C2.26953 5.82453 2.26953 6.38457 2.26953 7.50469V8.70469" stroke={ props.color || "#E9C638" }stroke-linecap="round" stroke-linejoin="round"/>
</Svg>


  );
}
