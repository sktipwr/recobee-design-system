import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Edit(props) {
    return (
        <Svg width={props.width || 16} height={props.height || 16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.6321 5.43592L5.30677 14.7612L1.00278 14.7612L1 10.4545L10.3253 1.12915L14.6321 5.43592Z" stroke={props.color || "#121212"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}
