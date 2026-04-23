import React from "react";
import Svg, { Path, G } from "react-native-svg";

export default function Communities(props) {
  return (
    <Svg width={props.width || "27"} height={props.height || "28"} viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
       <G {...props}>
        <Path d="M7.09178 12.5161C5.84575 11.8385 5 10.5179 5 8.99978C5 7.48163 5.84576 6.16101 7.09182 5.4834M5.02937 17.4169C3.82391 18.0405 3 19.2989 3 20.7498C3 21.7863 3.70087 22.6591 4.65456 22.9201M23.3454 22.9201C24.2991 22.6591 25 21.7863 25 20.7498C25 19.2989 24.1761 18.0406 22.9706 17.417M20.9082 12.5161C22.1543 11.8385 23 10.5179 23 8.99978C23 7.48162 22.1542 6.16101 20.9082 5.4834M18 9C18 11.2091 16.2091 13 14 13C11.7909 13 10 11.2091 10 9C10 6.79086 11.7909 5 14 5C16.2091 5 18 6.79086 18 9ZM10.25 23H17.75C18.9926 23 20 21.9926 20 20.75C20 18.6789 18.3211 17 16.25 17H11.75C9.67893 17 8 18.6789 8 20.75C8 21.9926 9.00736 23 10.25 23Z" stroke={props.color || "#E9C638"} stroke-width={props.strokeWidth || "2"} stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Svg>
  );
}
