import { DefaultTheme } from "react-native-paper";
import { Platform } from "react-native";

export const Dark = {
  ...DefaultTheme,

  name: "dark",

  colors: {
    ...DefaultTheme.colors,
    primary: "#121212", //'#1A222D'
    text: "#F8F8F9", //grey is selected , '#F6CE3D' gold
    homeCard: "#424242", // "#322e39", // "#2a2a2a",
    statusbar: "light-content",
    placeholder: "#9E9E9E", // "grey",
    placeholderDark: "#343A30",
    link: "#e9c46a",
    scroll: "white",
    searchBackground: "#272727",
    contrastText: "#FFF",
    bottomsheet: "#272727",
    grey2: "#F5F5F5",
    grey7: "#757575",
    grey4: "#E0E0E0",
    grey9: "#424242",
    grey9alt: "#212121",
    grey5: "#BDBDBD",
    grey3: "#EEEEEE",
    grey6: "#9E9E9E",
    grey10: "#121212",
    primary5: "#FBEB41",
    clientPrimary: "#E9C638",
    white: "#FFFFFF",
    buttonSecondaryPressed: "#353014",
  },

  borderWidth: {
    ...DefaultTheme.colors,
    customBorderWidth: 0, //SearchItem.js
  },
  opacities: {
    subHeadingOpacity: 0.6,
  },
  logoBee: {
    logoBeeImage: require("./assets/Logo_For_Dark_Bg.png"),
  },
  defaultMovie:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg==",

  //borderWidth: (THEME == "Dark") ? 0:1,
};

export const Light = {
  ...DefaultTheme,

  name: "light",

  colors: {
    ...DefaultTheme.colors,
    primary: "#121212", //'#1A222D'
    text: "#F8F8F9", //grey is selected , '#F6CE3D' gold
    homeCard: "#424242", // "#322e39", // "#2a2a2a",
    statusbar: "light-content",
    placeholder: "#9E9E9E", // "grey",
    placeholderDark: "#343A30",
    link: "#e9c46a",
    scroll: "white",
    searchBackground: "#272727",
    contrastText: "#FFF",
    bottomsheet: "#272727",
    grey2: "#F5F5F5",
    grey7: "#757575",
    grey4: "#E0E0E0",
    grey9: "#424242",
    grey9alt: "#212121",
    grey5: "#BDBDBD",
    grey3: "#EEEEEE",
    grey6: "#9E9E9E",
    grey10: "#121212",
    primary5: "#FBEB41",
    clientPrimary: "#E9C638",
    white: "#FFFFFF",
    buttonSecondaryPressed: "#353014",
  },

  borderWidth: {
    ...DefaultTheme.colors,
    customBorderWidth: 0, //SearchItem.js
  },
  opacities: {
    subHeadingOpacity: 0.6,
  },
  logoBee: {
    logoBeeImage: require("./assets/Logo_For_Dark_Bg.png"),
  },
  defaultMovie:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg==",
};
