import React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

export default function CircularCrossIcon(props) {
  return (
    <Svg
      width={props.width || 24}
      height={props.height || 24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <G clipPath='url(#clip0_16222_24335)'>
        <Path
          d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z'
          fill='#BDBDBD'
        />
      </G>
      <Defs>
        <ClipPath id='clip0_16222_24335'>
          <Path fill='#fff' d='M0 0H24V24H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
