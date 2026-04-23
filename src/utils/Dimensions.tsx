import { Dimensions, PixelRatio } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width
export const SCREEN_HEIGHT = Dimensions.get("window").height

const FigmaDeviceHeight = 640;
const FigmaDeviceWidth = 360;

export const scaledHeight = (value: number) => {
    // Get the screen height of the device
  const screenHeight = Dimensions.get('window').height;

  // Calculate the scaling factor based on the Figma device height
  const scale = screenHeight / FigmaDeviceHeight;

  // Scale height based on device's pixel density and Figma device height
  const scaledHeightValue = value * scale ;
  return scaledHeightValue;

}

export const scaledWidth = (value: number) => {
    // Get the screen width of the device
  const screenWidth = Dimensions.get('window').width;

  // Calculate the scaling factor based on the Figma device width
  const scale = screenWidth / FigmaDeviceWidth;

  // Scale height based on device's pixel density and Figma device height
  const scaledWidthValue = value * scale;
  return scaledWidthValue;

}