import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { AppConsumer } from "context";
import Back from "svg/back";
import Settings from "icons/Settings";
import Filter from "../../icons/Filter";
import Close from "../../icons/Cross";
import MoreVertical1 from "icons/MoreVertical";
import StarFilled from 'icons/Rate';
import Star from "svg/star-main";
import { getShareIcon } from "utils/HelperFunctions";
import StringConstants from "utils/StringConstants";
import AppColors from "utils/Colors";

export default function Header({
  item,
  onLeftClick = (f) => f,
  onRightClick = (f) => f,
  children,
  headerBgColor = AppColors.BLACK_VARIANT3
}) {
  const iconSource = (iconName) => {
    switch (iconName) {
      case "left":
        return <Back width={24} height={24} />;
      case "filter":
        return <Filter width={24} height={24} />;
      case "filterFill":
        return <Filter width={24} height={24} color="#e9c46a" />;
      case "star":
        return <StarFilled stroke={AppColors.LIGHT_YELLOW} color={AppColors.LIGHT_YELLOW} width={20} height={20} />;
      case "starfill":
        return <StarFilled width={20} height={20} />
      case "close":
        return <Close width={24} height={24} color="white" />;
      case "setting":
        return <Settings height={20} width={20} />;
      case "more-vertical":
        return <MoreVertical1 height={20} width={20} />;
      case "share":
        return getShareIcon(20);
    }
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: headerBgColor,
            },
          ]}
        >
          {item.leftIconName ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 16,
              }}
            >
              <TouchableOpacity
                style={[styles.newGrpContainer]}
                onPress={() => onLeftClick()}
              >
                {iconSource(item.leftIconName)}
              </TouchableOpacity>
            </View>
          ) : null}
          {!children ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.txtHeader,
                  { color: appConsumer.theme.colors.text },
                ]}
              >
                {item.title}
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                width: Dimensions.get("window").width - 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {children}
            </View>
          )}
          {item.rightIconName ? (
            <View
              style={{
                alignItems: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                paddingRight: 16,
                paddingLeft: 16,
              }}
            >
              <TouchableOpacity
                style={[styles.newGrpContainer]}
                onPress={() => onRightClick(item.rightIconName)}
              >
                {iconSource(item.rightIconName)}
              </TouchableOpacity>
            </View>
          ) : item?.title == StringConstants.WEEKLY_LIST ? <View style={styles.emptyView} /> :  null}
          {item.rightLinkName ? (
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity
                style={{ paddingRight: 16, paddingTop: 16, paddingBottom: 16 }}
                disabled={item.disabled}
                onPress={() => onRightClick()}
              >
                <Text
                  style={[
                    styles.txtHeader,
                    {
                      color: item.disabled ? "#BDBDBD" : "#E9C638",
                      lineHeight: 24,
                      fontSize: item.rightLinkFontSize || 16,
                    },
                  ]}
                >
                  {item.rightLinkName}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    width: Dimensions.get("window").width,
    height: 56,
    left: 0,
    top: Platform.OS == "ios" ? Dimensions.get("window").width * 0.115 : 0,
  },
  emptyView: {
    width: 24, 
    marginRight: 16
  },
  txtHeader: {
    fontSize: 16,
    fontFamily: "DMSans-Bold",
  },
  newGrpContainer: {
    borderWidth: 0,
    borderRadius: 4,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
