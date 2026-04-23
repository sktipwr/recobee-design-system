import Svg, {
    LinearGradient,
    Text,
    Defs,
    Stop,
    TSpan
  } from 'react-native-svg';
  <Svg viewBox="0 0 300 300" height="300"
               width="300">
            <Defs>
              <LinearGradient id="rainbow" x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse" >
                <Stop stopColor="#FF5B99" offset="0%" />
                <Stop stopColor="#FF5447" offset="20%" />
                <Stop stopColor="#FF7B21" offset="40%" />
                <Stop stopColor="#EAFC37" offset="60%" />
                <Stop stopColor="#4FCB6B" offset="80%" />
                <Stop stopColor="#51F7FE" offset="100%" />
              </LinearGradient>
            </Defs>
            <Text fill="url(#rainbow)">
              <TSpan
                fonSize="72"
                x="0"
                y="72"
              >
                gradient
              </TSpan>
              <TSpan fonSize="72" x="0" dy="72">text</TSpan>
              <TSpan fonSize="72" x="0" dy="72">all up in here</TSpan>
            </Text>
          </Svg>