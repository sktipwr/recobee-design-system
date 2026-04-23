import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export default function MovieDiary(props) {
  return (
    <Svg width={props.width || "25"} height={props.height || "24"} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G {...props}>
        <Path d="M8.5 3.04797V20.952M16.5 3.04797V20.952M21.5 12H3.5M21.452 8H16.5M8.5 8H3.54797M21.452 16H16.5M8.5 16H3.54797M11.5 21H13.5C16.3003 21 17.7004 21 18.77 20.455C19.7108 19.9757 20.4757 19.2108 20.955 18.27C21.5 17.2004 21.5 15.8003 21.5 13V11C21.5 8.19974 21.5 6.79961 20.955 5.73005C20.4757 4.78924 19.7108 4.02433 18.77 3.54497C17.7004 3 16.3003 3 13.5 3H11.5C8.69974 3 7.29961 3 6.23005 3.54497C5.28924 4.02433 4.52433 4.78924 4.04497 5.73005C3.5 6.79961 3.5 8.19974 3.5 11V13C3.5 15.8003 3.5 17.2004 4.04497 18.27C4.52433 19.2108 5.28924 19.9757 6.23005 20.455C7.29961 21 8.69974 21 11.5 21Z" stroke={props.color || "#E9C638"} stroke-width={props.strokeWidth || "2"} stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Svg>
  );
}
