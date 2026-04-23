
import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export default function Users(props) {
  return (

    <Svg width={props.width || "16"} height={props.height || "16"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M13.599 14.0001H13.6693C14.4057 14.0001 15.0026 13.4031 15.0026 12.6667C15.0026 11.4888 14.2388 10.4892 13.1795 10.1363M10.9386 2.32097C11.7709 2.77225 12.3359 3.6535 12.3359 4.66675C12.3359 5.67999 11.7709 6.56125 10.9386 7.01253M9.0026 4.66667C9.0026 6.13943 7.80867 7.33333 6.33594 7.33333C4.86318 7.33333 3.66927 6.13943 3.66927 4.66667C3.66927 3.19391 4.86318 2 6.33594 2C7.80867 2 9.0026 3.19391 9.0026 4.66667ZM4.0026 10H8.66927C10.142 10 11.3359 11.1939 11.3359 12.6667C11.3359 13.4031 10.739 14 10.0026 14H2.66927C1.93289 14 1.33594 13.4031 1.33594 12.6667C1.33594 11.1939 2.52984 10 4.0026 10Z" stroke={props.color || "#E9C638"} stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M14.3359 2.66406V1.66406M14.3359 1.66406V0.664062M14.3359 1.66406H13.3359M14.3359 1.66406H15.3359" stroke={props.color || "#E9C638"} stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>


  );
}
