import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import IconBadge from "react-native-icon-badge";

import Notification from "svg/notification.svg";

import { AppConsumer } from "context";
import mixpanel from "mixpanel";
const NotificationButton = ({ count, navigation, notifications = [] }) => {
  const notificationClicked = () => {
    mixpanel.track("NotificationClicked", {
      screen: "NotificationButton",
      source: "iconNotification",
    });
    navigation.navigateDeprecated("NotificationsScreen", { fromScreen: "home" });
  };

  return (
    <AppConsumer>
      {(appConsumer) => {
        const themeColors = appConsumer.theme.colors;
        return (
          <View style={styles.notificationIconView}>
            <TouchableOpacity
              style={{ width: 35, height: 40, paddingTop: 7 }}
              onPress={() => notificationClicked()}
            >
              <IconBadge
                MainElement={
                  <View style={{ paddingLeft: 15, paddingTop: 2 }}>
                    <Notification width={18} height={18} />
                  </View>
                }
                BadgeElement={
                  <Text
                    style={{
                      color: "#212121",
                      fontFamily: "DMSans-Regular",
                      fontSize: 8,
                      paddingTop: Platform.OS == "ios" ? 0 : 1,
                    }}
                  >
                    {count}
                  </Text>
                }
                IconBadgeStyle={{
                  width: 20,
                  height: 16,
                  top: -5,
                  right: -8,
                  backgroundColor: "#FEEF68",
                }}
                Hidden={count == 0}
              />
            </TouchableOpacity>
          </View>
        );
      }}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  notificationIconView: {
    width: 32,
    height: 34,
    borderRadius: 4,
  },
});

export default NotificationButton;
