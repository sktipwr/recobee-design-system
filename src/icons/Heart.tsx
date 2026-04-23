import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Heart(props) {
  return (
    <Svg width={props.width || "24"} height={props.height || "24"} viewBox="0 0 24 24" fill={props.color || "none"} xmlns="http://www.w3.org/2000/svg">
      <G {...props}>
        <Path d="M12 21C13 21 22 15.9768 22 8.94427C22 3.50672 15.1625 0.66165 12 5.4274C8.83207 0.653479 2 3.5018 2 8.94427C2 15.9768 11 21 12 21Z" stroke={props.stroke || "#EEEEEE"} stroke-width={props.strokeWidth ||"2"} stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Svg>
  );
}
