import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function RecoOutline(props) {
  return (
    <Svg width={props.width || "26"} height={props.height || "26"} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G {...props}>
        <Path d="M15.6413 4C17.3942 5.2963 18.9685 6.81065 20.3254 8.50473C20.4418 8.65006 20.5 8.82503 20.5 9M20.5 9C20.5 9.17497 20.4418 9.34994 20.3254 9.49527C18.9685 11.1893 17.3942 12.7037 15.6413 14M20.5 9H12.5C9.69974 9 8.29961 9 7.23005 9.54497C6.28924 10.0243 5.52433 10.7892 5.04497 11.73C4.5 12.7996 4.5 14.1997 4.5 17V20" stroke={props.color || "white"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Svg>
  );
}
