import React from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { AppConsumer } from "context";
import StarFilled from "svg/star-main";

export default function Chip({ item, state, onClick = (f) => f }) {
  let height = 28;
  if (item.height) {
    height = item.height;
  }
  let hasStar = false;
  let text = item.text;
  if (item.text?.indexOf("*") > 0) {
    text = item.text.replace("*", "");
    hasStar = true;
  }
  return (
    <AppConsumer>
      {(appConsumer) => (
        <TouchableOpacity
          style={[
            styles.chip,
            {
              backgroundColor:
                state == item.value
                  ? "rgba(245, 211, 28, 0.15)"
                  : appConsumer.theme.colors.grey9,
              borderRadius: state == item.value ? 8 : 7,
              height: height,
              width: item.width,
            },
          ]}
          onPress={() => onClick(item.value)}
        >
          <Text
            style={[
              styles.txtBody,
              {
                color:
                  state == item.value
                    ? appConsumer.theme.colors.clientPrimary
                    : appConsumer.theme.colors.white,
              },
            ]}
          >
            {text}
            {hasStar && <StarFilled height={10} width={10} />}
          </Text>
        </TouchableOpacity>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  chip: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginRight: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 4,
    paddingTop: 4,
  },
  txtBody: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    height: 20,
    color: "#FFFFFF",
  },
});
