import { Image, StyleSheet } from "react-native";
import { CLOUD_BASEURL } from "utils/HelperFunctions";

export const OTTIcon: React.FC = ({iconName, style}) => {
    switch (iconName) {
      case "Prime":
        return (
          <Image
            source={{ uri: CLOUD_BASEURL + "Amazon Prime Video.png" }}
            fadeDuration={0}
            style={(style && style.ottImage) || styles.ottImage}
          />
        );
      default:
        return (
          <Image
            source={{ uri: CLOUD_BASEURL + iconName + ".png" }}
            fadeDuration={0}
            style={(style && style.ottImage) || styles.ottImage}
          />
        );
    }
  };

const styles = StyleSheet.create({
    ottImage: {
        width: 24,
        height: 24,
        borderRadius: 0,
      },
})
