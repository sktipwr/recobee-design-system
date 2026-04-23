import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Switch  } from "react-native";
import { AppConsumer } from "context";
import FindContact from "svg/Find-Contact.svg";
import CustomReco from "svg/customise-reco.svg";
import ManageFriend from "svg/Manage-friend.svg";
import Filter from "../../icons/Filter";
import Notification from 'svg/notification';
import Autoplay from 'svg/auto-play';
import Settings from 'icons/Settings';
import Invite from 'svg/envelope-plus';
import Account from 'svg/account';
import Bin from 'svg/bin';
import WlSetting from 'svg/wlsetting';
import SeenSetting from 'svg/seensetting';
import List from 'svg/list';
import CommunityIcon from 'svg/community';
import Community from 'icons/Communities'
import Review from "svg/review.svg";
import AppColors from "utils/Colors";
import ChatTyping from 'svg/chat_typing.svg';
import Badge from 'svg/badge_icon';
import LinearGradient from "react-native-linear-gradient";
import MovieDiary from 'icons/MovieDiary';

export default function MenuItem({ item, onArrowClick = (f) => f, toggle = (f) => f , bgColor = null}) {

  const iconSource = (icon) => {
    switch (icon) {
      case 'Filter':
        return <Filter height={18} width={18} strokeWidth={'1.33'} />;
      case 'ManageFriend':
        return <ManageFriend height={18} width={18} />;
      case 'FindContact':
        return <FindContact height={18} width={18} />;
      case 'CustomReco':
        return <CustomReco height={18} width={18} />;
      case 'Settings':
      default:
        return <Settings height={18} width={18} />;
      case 'Notification':
        return <Notification height={18} width={18} />;
      case 'Autoplay':
        return <Autoplay height={18} width={18} />;
      case 'Invite':
        return <Invite height={18} width={18} />;
      case 'Badge':
        return <Badge height={18} width={18} />;
      case 'Account':
        return <Account height={18} width={18} />;
      case 'Bin':
        return <Bin height={18} width={18} />;
      case 'WlSetting':
        return <WlSetting height={18} width={18} />;
      case 'SeenSetting':
        return <SeenSetting height={18} width={18} />;
      case 'List':
        return <List height={18} width={18} />;
      case 'Community':
        return <CommunityIcon height={18} width={18} />;
      case 'CommunityIcon':
        return (
          <Community
            strokeWidth='2'
            color={AppColors.GREY_VARIANT10}
            height={18}
            width={18}
          />
        );
      case 'Review':
        return <Review height={18} width={18} />;
      case 'ChatTyping':
        return <ChatTyping height={18} width={18} />;
      case 'MovieDiary':
        return <MovieDiary height={18} width={18} color={AppColors.GREY_VARIANT10} />;
    }
  };

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'menu':
      default:
        return <TouchableOpacity
          style={{ alignItems: "center", flexDirection: "row", flex: 1 }}
          onPress={() => onArrowClick(item.icon, item.screen)}
        >
          <Text
            style={[
              styles.txtBody,
              { color: '#FFFFFF' },
            ]}
          >
            {item.text}
          </Text>
        </TouchableOpacity>;
      case 'drawer':
        return <TouchableOpacity
        style={{alignItems: "center", flexDirection: "row", flex: 1}}
        onPress={() => onArrowClick(item.icon, item.screen, item.baseScreen)}
      >
        <Text style={[
              styles.txtBody,
              { color: '#E0E0E0' },
            ]}>{item.text}</Text>
      </TouchableOpacity>;
      case 'switch':
        return <><Text
          style={[
            styles.txtBody,
            {
              flex: 4,
              color: '#FFFFFF',
              fontSize: 14,
              paddingTop: 12
            },
          ]}
        >
          {item.text}
        </Text><View style={{ padding: 6 }}>
            <Switch
              trackColor={{ false: "#424242", true: "#424242" }}
              thumbColor={item.enabled ? "#f5dd4b" : "#ffffff"}
              style={{ transform: [{ scaleX: .75 }, { scaleY: .75 }] }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={value => {
                toggle(item.icon, value);
              }}
              value={item.enabled}
            />
          </View></>;
    }
  }

  return (
   
    <AppConsumer>
      {(appConsumer) => (
        <>
        {item?.type == 'drawer' && item?.text != 'Settings' ?
        <LinearGradient
            colors={['#1e1e1e70', '#1e1e1e00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.container,
             {marginRight: 12},
            ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingRight: 16, padding: item.type == 'drawer' ? 9.3 : 10, paddingLeft: item.type == 'drawer' ? 12 : 10 }}>{iconSource(item.icon)}</View>
            {renderItem({ item })}
          </View>
        </LinearGradient>
      :

        <View
          style={[
            item?.text == 'Settings' && item?.type == 'drawer' && styles.settings,
            styles.container,
            item?.type == 'drawer' && {marginRight: 12},
            {
              backgroundColor: bgColor ?? appConsumer.theme.colors.primary,
              borderBottomColor: appConsumer.theme.colors.placeholder,
            },
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingRight: 16, padding: item.type == 'drawer' ? 9.3 : 10, paddingLeft: item.type == 'drawer' ? 12 : 10 }}>{iconSource(item.icon)}</View>
            {renderItem({ item })}
          </View>
        </View>
        }
      </>)}
    </AppConsumer>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 12,
    flex: 1,
  },
  icon: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  settings: {
    paddingHorizontal: 10,
    borderColor: AppColors.GREY,
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderWidth: 0.4,
    borderRadius: 4,
    marginRight: 12
  },
  txtBody: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
  },
});
