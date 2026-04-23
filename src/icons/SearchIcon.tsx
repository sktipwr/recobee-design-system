import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function SearchIcon(props) {
  return (
    <Svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M21.5 21L15.4497 14.9497M15.4497 14.9497C16.7165 13.683 17.5 11.933 17.5 10C17.5 6.13401 14.366 3 10.5 3C6.63401 3 3.5 6.13401 3.5 10C3.5 13.866 6.63401 17 10.5 17C12.433 17 14.183 16.2165 15.4497 14.9497Z" stroke={props.color || "#CAC4D0"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}
