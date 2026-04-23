export const colors = {
  // Primary
  primary: '#121212',
  clientPrimary: '#E9C638',
  themeBg: '#1E1E1E',

  // Text
  textPrimary: '#F8F8F9',
  textSecondary: '#9E9E9E',
  textLink: '#e9c46a',
  white: '#FFFFFF',

  // Black variants
  black: '#000000',
  blackOpacity80: '#000000CC',
  black1: '#242424',
  black2: '#7F7F7F',
  black3: '#212121',
  black4: '#0E0E0E',
  black5: '#141414',
  black6: '#211F26',
  black7: '#1F1F1F',

  // Grey palette
  grey1: '#9E9E9E',
  grey2: '#F5F5F5',
  grey3: '#EEEEEE',
  grey4: '#E0E0E0',
  grey5: '#BDBDBD',
  grey6: '#9E9E9E',
  grey7: '#757575',
  grey8: '#272727',
  grey9: '#424242',
  grey10: '#121212',
  grey11: '#616161',
  grey12: '#2E2E2E',
  grey14: '#eeeeee',
  grey15: '#D9D9D9',
  grey16: '#09121F',
  grey17: '#3e3e3e',
  grey19: '#2B2930',
  grey20: '#999999',
  grey21: '#1A1A1A',
  grey22: '#696969',
  grey23: '#8A8A8A',
  grey24: '#CACACA',
  grey25: '#1D1D1D',
  grey26: '#2b2b2b',
  grey27: '#252525',
  grey28: '#333333',
  greyD4: '#D4D4D4',
  greyD4Opacity: '#d4d4d466',

  // Yellow / Gold accent
  yellow: '#E9C638',
  yellow2: '#FDE90F',
  yellow3: '#FBEB41',
  yellow4: '#FCD604',
  yellowVariant: '#DEBF19',
  yellowVariant2: '#FEF494',
  yellowVariant3: '#FEEF68',
  yellowVariant4: '#F5D31C',
  yellowVariant5: '#f5dd4b',
  yellowVariant6: '#FFF8BF',
  yellowVariant7: '#F6CE3D',
  yellowVariant8: '#353014',
  yellowVariant9: '#292100',
  yellowVariant10: '#e9c46a',
  yellowCDCD: '#CDCD0C',

  // Gradients
  yellowGradientLight: '#F9FE11',
  yellowGradientMedium: '#FACC15',
  yellowGradientDark: '#FF9A3D',

  // Transparent variants
  transparentYellow: 'rgba(245, 211, 28, 0.15)',
  greyTransparent: 'rgba(14, 14, 14, 0.5)',
  greyTransparent2: 'rgba(66, 66, 66, 0.2)',
  greyTransparent3: 'rgba(66, 66, 66, 0.4)',
  greyTransparent4: 'rgba(117, 117, 117, 0.4)',
  whiteOpacity60: 'rgba(255,255,255,0.6)',
  transparent: 'transparent',

  // Status
  error: '#E53935',
  errorAlt: '#FC5555',
  success: '#388E3C',
  successAlt: '#29CC6A',

  // Rank badges
  gold: '#CCA106',
  gold2: '#FED604',
  silver: '#8CA7BC',
  bronze: '#D18530',
  bronze2: '#F8BE8E',
  blue: '#8EA5BC',
  blue2: '#D9E3ED',

  // Discover list card accents
  purple: '#8C66AC',
  teal: '#036450',
  lime: '#5F8109',
  pink: '#DB1588',
  purple2: '#8E66AC',
  orange: '#F59A25',
  lime2: '#4D6905',
  teal2: '#05856A',

  // UI surfaces
  homeCard: '#424242',
  searchBackground: '#272727',
  bottomsheet: '#272727',
  buttonSecondaryPressed: '#353014',
} as const;

export type ColorToken = keyof typeof colors;
