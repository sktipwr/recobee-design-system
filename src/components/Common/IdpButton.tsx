import React from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppConsumer } from "context";
import Apple from "assets/apple";
import Google from "assets/google";
import AppColors from "utils/Colors";

const windowWidth = Dimensions.get("window").width;

export default function IdpButton({ item, onClick = (f) => f }) {
  const iconSource = (iconName) => {
    switch (iconName) {
      case "apple":
        return <Apple />;
      case "google":
        return <Google />;
    }
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View
          style={[
            styles.btn
          ]}
        >
          <TouchableOpacity
            style={[
              styles.actionButtonStyle,
              { backgroundColor: item.bgColor, paddingLeft: 12 },
            ]}
            onPress={() => onClick(item)}
          >
            {item.logo != null && (
              <View style={{ alignItems: "flex-start" }}>
                {iconSource(item.logo)}
              </View>
            )}
            <View style={{ flex: 1, alignItems: "center", paddingRight: 12 }}>
              <Text style={[styles.txtHeader, { color: item.labelColor }]}>
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
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
  txtHeader: {
    fontFamily: "DMSans-Bold",
    fontSize: 17,
  },
  image: {
    height: windowWidth * 0.233,
    width: windowWidth * 0.233,
  },
  actionButtonStyle: {
    height: 44,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    paddingVertical: 8,
    paddingBottom: 0,
    width: "100%",
    backgroundColor: AppColors.GREY_VARIANT8,
    justifyContent: "flex-end",
  },
});
