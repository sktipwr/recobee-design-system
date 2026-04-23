import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Eyeo(props) {
  return (
    <Svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G {...props}>
        <Path d="M20.0778 9.57842C20.6787 10.5127 21 11.394 21 12C21 14 17.5 19 12 19C11.569 19 11.1502 18.9693 10.7445 18.9117M17.2929 6.70713C15.8674 5.71248 14.0762 5 12 5C6.5 5 3 10 3 12C3 13.245 4.35633 15.6526 6.70713 17.2929M17.2929 6.70713L22 2M17.2929 6.70713L14.1213 9.87868M6.70713 17.2929L2 22M6.70713 17.2929L9.87868 14.1213M14.1213 9.87868C13.5784 9.33579 12.8284 9 12 9C10.3431 9 9 10.3431 9 12C9 12.8284 9.33579 13.5784 9.87868 14.1213M14.1213 9.87868L9.87868 14.1213" stroke={props.color || "white"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Svg>
  );
}
