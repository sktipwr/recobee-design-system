import React from 'react';
import Svg, { ClipPath, Defs, Path, Rect, G } from 'react-native-svg';

export default function ArrowFilled(props) {
  return (
    <Svg width={props.width || "24"} height={props.height || '14'} viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_16912_26758)">
        <Path d="M13.9477 11.9328C13.1472 12.9232 11.6374 12.9232 10.8369 11.9328L4.63279 4.25724C3.57564 2.94935 4.50652 1 6.18822 1H18.5964C20.2781 1 21.209 2.94936 20.1518 4.25724L13.9477 11.9328Z" fill={props?.color || "#D32F2F"}/>
      </G>
      <Defs>
        <ClipPath id="clip0_16912_26758">
          <Rect width="24" height="13.7143" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
}
