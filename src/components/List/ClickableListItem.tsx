//Returns a flat list of Clickable items passed in an array

import React from "react";
import { AppConsumer } from "context";

import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import DefaultUser from "svg/user.svg";
import Group from "svg/group.svg";
import Tick from "icons/Tick";
import CommonStyles from "styles";

export default function ClickableListItem({ item, onItemCheck = (f) => f }) {
  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={[styles.container]}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderRadius: 60,
            }}
            onPress={() => onItemCheck(item)}
          >
            <View
              style={{
                alignItems: "flex-start",
                flexDirection: "row",
              }}
            >
              {item.type ? (
                <View style={styles.iconContainer}>
                  {item.type == "Group" || item.type == "Friendlist" ? (
                    <View
                      style={[
                        CommonStyles.dp,
                        CommonStyles.alignCentre,
                        { backgroundColor: "#616161" },
                      ]}
                    >
                      <Group height={18} width={18} />
                    </View>
                  ) : (
                    <>
                      {item.image != null && item.image != "" ? (
                        <Image
                          source={{ uri: item.image }}
                          style={CommonStyles.dp}
                        />
                      ) : (
                        <DefaultUser height={36} width={36} />
                      )}
                    </>
                  )}
                </View>
              ) : null}
              <View style={styles.txtContainer}>
                <Text style={[styles.txtBody]}>{item.name}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              {item.check ? (
                <View style={[styles.radioCheck]}>
                  <Tick height={20} width={20} strokeWidth={"2"} />
                </View>
              ) : (
                <View
                  style={[
                    styles.radio,
                    {
                      backgroundColor: appConsumer.theme.colors.grey9,
                      borderWidth: 1,
                      borderColor: appConsumer.theme.colors.grey6,
                    },
                  ]}
                ></View>
              )}
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
    marginTop: 2,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.144,
    alignItems: "center",
    backgroundColor: "#212121",
  },
  iconContainer: {
    flexDirection: "row",
    margin: 8,
    marginLeft: 16,
    marginRight: 12,
    alignItems: "flex-start",
  },
  txtBody: {
    fontSize: 14,
    lineHeight: 20,
    width: Dimensions.get("window").width * 0.75,
    color: "#FFFFFF",
    fontFamily: "DMSans-Regular",
  },
  radio: {
    height: 18,
    width: 18,
    borderRadius: 15,
    marginRight: 17,
  },
  radioCheck: {
    height: 20,
    width: 20,
    borderRadius: 15,
    marginRight: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9C638",
  },
  icon: {
    paddingTop: Platform.OS === "ios" ? 3 : 6,
  },
  txtContainer: {
    padding: 16,
    paddingLeft: 0,
  },
});
