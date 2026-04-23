//Returns a flat list of Clickable items passed in an array

import React from "react";
import { AppConsumer } from "context";

import {
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Close from "../../icons/Cross";
import DefaultUser from "svg/user.svg";
import CommonStyles from "styles";

export default function UserContact({
  item,
  hideRemove,
  height = 42,
  width = 42,
  radius = 30,
  right = 0,
  bottom = 0,
  removeClicked,
}) {
  return (
    <AppConsumer>
      {(appConsumer) => (
        <View
          style={[
            styles.container,
            {
              marginRight: right,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => removeClicked(item)}
            disabled={hideRemove}
            style={{
              alignItems: "center",
              //width: 60
            }}
          >
            <View
              style={[
                styles.newGrpContainer,
                { height: height, width: width, marginBottom: bottom },
              ]}
            >
              {item.image != null && item.image != "" ? (
                <Image
                  source={{ uri: item.image }}
                  style={[
                    { height: height, width: width, borderRadius: radius },
                  ]}
                />
              ) : (
                <DefaultUser height={height} width={width} />
              )}
              {!hideRemove && item.check ? (
                <View style={styles.closeContainer}>
                  <Close width={15} height={15} color="#121212" />
                </View>
              ) : null}
            </View>
            <View>
              <Text style={CommonStyles.txtBodyMedium}>
                {item.fname || item.name}
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
    flexDirection: "row",
    flex: 1,
    paddingTop: 4,
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 5,
  },
  newGrpContainer: {
    alignItems: "center",
    backgroundColor: "#121212",
  },
  closeContainer: {
    position: "absolute",
    bottom: 5,
    right: -2,
    height: 14,
    width: 14,
    borderRadius: 15,
    backgroundColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },
});
