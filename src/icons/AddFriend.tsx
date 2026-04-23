import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function AddFriend(props) {
  return (
    <Svg width={props.width || 13} height={props.height || 12} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M8.1758 10.5H3C2.44771 10.5 2 10.0523 2 9.5C2 8.39545 2.89543 7.5 4 7.5H6M9.5 9V7.5M9.5 7.5V6M9.5 7.5H8M9.5 7.5H11M8 3.5C8 4.60457 7.10455 5.5 6 5.5C4.89543 5.5 4 4.60457 4 3.5C4 2.39543 4.89543 1.5 6 1.5C7.10455 1.5 8 2.39543 8 3.5Z" stroke={props?.color || "#121212"} stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}
