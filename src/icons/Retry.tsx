import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Retry(props:any) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={props.color || "none"} xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M8 3.8V0L3 4.75L8 9.5V5.7C11.31 5.7 14 8.2555 14 11.4C14 14.5445 11.31 17.1 8 17.1C4.69 17.1 2 14.5445 2 11.4H0C0 15.599 3.58 19 8 19C12.42 19 16 15.599 16 11.4C16 7.201 12.42 3.8 8 3.8Z" fill={props.color || "#616161"}/>
    </Svg>
  );
}
