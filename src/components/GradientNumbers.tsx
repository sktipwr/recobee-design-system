import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Svg, { Defs, LinearGradient as LG, Stop, Text as Txt } from "react-native-svg";

  interface GradientNumbersParams {
    value: any,
    fontSize: any,
    fontWidth: any
  }

  export const GradientNumbers: React.FC<GradientNumbersParams> = ({
    value,
    fontSize = "75",
    fontWidth = "50"
  }) => 
    {
    
    const viewBoxValue = value == 10 ? "0 0 80 90" : "0 0 50 90"
    return (
      <View style={styles.container}>
        <Svg height="90" width={value == 10 ? "80" : fontWidth} viewBox={viewBoxValue}>
          <Defs>
            <LG id="gradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FF9A3D" stopOpacity="1" />
              <Stop offset="100%" stopColor="#F9FE11" stopOpacity="1" />
            </LG>
          </Defs>
          <Txt
            x="50%"
            y="50%"
            fontSize={fontSize}
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="url(#gradient)"
            fontWeight="bold"
          >
            {value}
          </Txt>
        </Svg>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    marginRight: -5
  }
});
