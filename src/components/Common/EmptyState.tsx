import React from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { AppConsumer } from "context";
import Sad from "assets/images/beemoji/BnWface/sad";
import Thinking from "assets/images/beemoji/BnWface/thinking";
import OO from "assets/images/beemoji/BnWface/oo";
import Crying from "assets/images/beemoji/BnWface/crying";
import Smile from "assets/images/beemoji/BnWface/smile";
import YellowOO from 'svg/yellow-oo';
import Happy from "assets/images/beemoji/BnWface/happy"
import AppColors from "utils/Colors";

const windowWidth = Dimensions.get("window").width;

export default function EmptyState({ item, onBtnClick = (f) => f }, height = null, msgColor = AppColors.GREY_VARIANT10) {
  const iconSource = (iconName) => {
    switch (iconName) {
      case "sad":
        return <Sad width={item.width} height={item.height} />;
      case "thinking":
        return <Thinking width={item.width} height={item.height} />;
      case "oo":
        return <OO width={item.width} height={item.height} />;
      case "crying":
        return <Crying width={item.width} height={item.height} />;
      case "smile":
        return <Smile width={item.width} height={item.height} />;
      case "yellow-oo":
        return <YellowOO width={item.width} height={item.height} />;
      case "Happy":
        return <Happy width={item.width} height={item.height} />;
    }
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={[styles.container, height && {height: height}]}>
          {item.icon && item.icon != null && (
            <View style={{ alignItems: "center", paddingBottom: item.title ? 30 : 20 }}>
              {iconSource(item.icon)}
            </View>
          )}
          {item.title && (
            <View style={{ alignItems: "center", paddingBottom: 13 }}>
              <Text
                style={[
                  styles.txtHeader,
                  {
                    color: '#FFFFFF',
                    fontSize: item.icon != null ? 20 : 16,
                  },
                ]}
              >
                {item.title}
              </Text>
            </View>
          )}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: windowWidth * 0.778,
            }}
          >
            <Text
              style={[
                styles.txtBody,
                { color: msgColor, textAlign: "center" },
              ]}
            >
              {item.message}
            </Text>
          </View>
          {item.hasButton && (
            <View style={{ alignItems: "center", padding: 15 }}>
              <TouchableOpacity
                onPress={() => onBtnClick()}
                style={styles.actionButton}
              >
                <Text style={[styles.txtBody, { fontFamily: "DMSans-Bold" }]}>
                  {item.buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  txtBody: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    //height: 60,
    opacity: 0.7,
  },
  actionButton: {
    backgroundColor: "#E9C638",
    height: 36,
    width: 125,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  txtHeader: {
    fontFamily: "DMSans-Bold",
    height: 24,
    opacity: 0.8,
  },
  image: {
    height: windowWidth * 0.233,
    width: windowWidth * 0.233,
  },
});
