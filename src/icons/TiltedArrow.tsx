import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function TiltedArrow(props) {
  return (
    <Svg width={props.width || "25"} height={props.height || "25"} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G {...props}>
        <Path d="M10.4984 6.4164C13.0856 6.02902 15.7064 5.97815 18.2953 6.26424C18.5174 6.28878 18.7152 6.38786 18.8637 6.53633M18.8637 6.53633C19.0122 6.68479 19.1113 6.88265 19.1358 7.10473C19.4219 9.6936 19.371 12.3144 18.9836 14.9017M18.8637 6.53633L6.13574 19.2643" stroke={props.color || "#BDBDBD"} stroke-width={props.strokeWidth || '2'} stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Svg>
  );
}
