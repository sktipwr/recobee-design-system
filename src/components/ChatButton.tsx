import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import IconBadge from "react-native-icon-badge";
import ChatIcon from "../icons/ChatIcon";
import { AppConsumer } from "context";
import mixpanel from "mixpanel";
import AppColors from "utils/Colors";
import { scaledHeight } from "utils/Dimensions";

interface ChatButtonProps {
  hasUnreadMessages: boolean;
  navigation: any;
  color?: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ hasUnreadMessages, navigation, color }) => {
  const handleChatPress = () => {
    mixpanel.track("ChatTypingClicked", {
      screen: "ChatButton",
      source: "iconChatTyping",
    });
    navigation.navigateDeprecated("InboxFlowStack");
  };

  return (
    <AppConsumer>
      {(appConsumer) => {
        return (
          <View>
            <View>
              <IconBadge
                MainElement={
                  <View style={styles.iconWrapper}>
                    <ChatIcon width={24} height={scaledHeight(24)} color={color} />
                  </View>
                }
                BadgeElement={<View style={styles.badgeStyle} />}
                IconBadgeStyle={styles.iconBadgeStyle}
                Hidden={!hasUnreadMessages}
              />
            </View>
          </View>
        );
      }}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
  },
  badgeStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: AppColors.LIGHT_YELLOW_VARIANT3,
  },
  iconBadgeStyle: {
    width: 16,
    height: 16,
    top: -1,
    left: 8,
    backgroundColor: "transparent",
  },
});

export default ChatButton;
