import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Insta(props) {
  return (
    <Svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M16.1096 2H11.0993H8.82192L7 11.6638H11.0993L8.82192 21.3276L17.1724 7.99822H12.4658L16.1096 2Z" fill={props.color || "#FFFFFF"} />
    </Svg>
  );
}
