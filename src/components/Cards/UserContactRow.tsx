//Returns a flat list of Clickable items passed in an array

import React, { useContext, useState } from "react";
import { AppConsumer } from "context";

import {
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import userProfileAPI from "api/userProfileAPI";
import DefaultUser from "svg/user";
import EncryptedStorage from "react-native-encrypted-storage";
import Critic from "svg/critic";
import friendlistAPI from "api/friendlistAPI";
import { LOG } from "config";
import CommonStyles from "styles";
import MoreVertical from 'icons/MoreVertical';
import AddUser from "svg/add_user";
import PremiumBadge from 'svg/premium_badge_icon';
import { checkBadge, getUserBadgeIcon } from "utils/HelperFunctions";
import Tick from "icons/Tick";
import AppColors from "utils/Colors";
import { SCREEN_WIDTH } from "utils/Dimensions";
import { CommonAppContext } from "../../stores/common/commonAppContext";
import { CustomProgressBar } from "../Common/CustomProgress";
import StringConstants from "utils/StringConstants";
import FontFamily from "utils/FontFamily";
import { AddFriendButton } from "../Common/AddFriendButton";

var extendedLog = LOG.extend("UserContactRow");

export default function UserRow({ 
  item, 
  isFriend, 
  onUserClick, 
  onSelect = (id) => {}, 
  isSelectionList = false, 
  isSelected = false, 
  mutualFriend = true,
  bgColor= AppColors.GREY_VARIANT8,
  showCheckBox, 
  showMoreOptions, 
  onMoreOptionsClick,
  rowSpacing = 4,
  horizontalGap = 16,
  borderRadius = 0,
  removeBottomRadius = false,
  matchPercentage = null,
  userMatch = false,
  source = ''
}) {
  const [following, setFollowing] = useState(item?.following);
  const [friend, setFriend] = useState(false);
  const { commonAppState, commonDispatch } = useContext(CommonAppContext);

  let myUserName = "";
  EncryptedStorage.getItem("user_fname").then((val) => {
    myUserName = val;
  });

  const followClicked = (userID, isRemove) => {
    userProfileAPI
      .followUser(userID, isRemove, myUserName)
      .then((response) => {
        if (response && response.status == 200) {
          setFollowing(!isRemove);
        }
      })
      .catch((error) => {
        //extendedLog.error('Error in retreiving follow user API with message: ', error);
      });
  };

  const addFriend = async (userID) => {
    let friendIDs = userID;
    let response = await getFriendlistID(friendIDs, myUserName);
    setFriend(true);
  };
  const getFriendlistID = async (friendID, userName) => {
       return await  friendlistAPI
            .addFriend(userName,friendID)
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              extendedLog.error(
                "Error executing friendlistAPI.addFriends with message:",
                error
              );
            }); 
      }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={[
            styles.outerContainer,
            {height: matchPercentage != null ? SCREEN_WIDTH * 0.23 : SCREEN_WIDTH / 6},
            {marginHorizontal: horizontalGap},
            mutualFriend ? {marginBottom: rowSpacing, marginTop: 0} : {marginTop: rowSpacing}, 
            {borderTopRightRadius : borderRadius}, 
            {borderTopLeftRadius : borderRadius}, 
            {borderBottomRightRadius : removeBottomRadius ? 0 : borderRadius}, 
            {borderBottomLeftRadius : removeBottomRadius ? 0 : borderRadius}, 
            isSelectionList ? {backgroundColor: AppColors.TRANSPARENT} : {backgroundColor: bgColor}, 
            {paddingLeft: showCheckBox || isSelectionList ? 0 : 16  }, 
            (isSelectionList && showCheckBox || showMoreOptions) && {width: SCREEN_WIDTH * 0.875}
        ]}>
            <View style={[
                 styles.container,
                
            ]}>
              <TouchableOpacity
                style={[CommonStyles.flexRow]}
                onPress={() => isSelectionList && showCheckBox ? onSelect(item?.id || item?.userid || item?.userId) : onUserClick(userMatch ? item?.userid : item.id, source)}
              >
                <View style={{ marginRight: 12 }}>
                  {item?.image != null && item?.image != "" ? (
                    <Image source={{ uri: item.image }} style={CommonStyles.dp} />
                  ) : 
                  item?.thumbnail != null && item?.thumbnail != "" ? (
                    <Image source={{ uri: item.thumbnail }} style={CommonStyles.dp} />
                  ) :
                  (
                    <DefaultUser height={33} width={36} />
                  )}
                  {item?.ispremium && commonAppState.isPremiumFlowEnabled &&
                    <View style={styles.premium}>
                      <PremiumBadge height={13} width={13} />
                    </View>
                  }
                </View>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text numberOfLines={1} style={[CommonStyles.txtHeaderLarge, {maxWidth: SCREEN_WIDTH * 0.52}]}>{item?.name ?? item?.fname ?? ''}</Text>
                    {
                      (checkBadge(item?.userrole)) && (
                        <View style={CommonStyles.userBadge}>
                          {getUserBadgeIcon(item?.userrole)}
                        </View>
                        )
                    }
                  </View>
                  <Text
                    style={[styles.txtBody, { fontSize: 10, color: "#9E9E9E" }]}
                  >
                    {item?.usertag}
                  </Text>
                </View>
              </TouchableOpacity>
              {!mutualFriend && isFriend && !isSelectionList && (
                <>
                  <AddFriendButton friend={friend} addFriend={addFriend} userId={item?.id || item?.userid || item?.userId} />
                </>
              )}
              {!mutualFriend && !isFriend && !isSelectionList && (
                <>
                  {following ? (
                    <View
                      style={[
                        styles.followBtn,
                        CommonStyles.alignCentre,
                        CommonStyles.grey9BG,
                        styles.width1,
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => followClicked(item.id, true)}
                      >
                        <Text style={CommonStyles.txtHeaderMedium}>Following</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={[
                        styles.followBtn,
                        CommonStyles.alignCentre,
                        styles.width2,
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => followClicked(item.id, false)}
                      >
                        <Text style={CommonStyles.txtHeaderMediumLink}>Follow</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
              {
                isSelectionList && showCheckBox && (
                  isSelected 
                    ? 
                    (
                      <TouchableOpacity style={[CommonStyles.radioCheck]} onPress={() => onSelect(item?.id || item?.userid || item?.userId)}>
                          <Tick height={20} width={20} strokeWidth={"2"} />
                      </TouchableOpacity>
                    ) : 
                    (
                        <TouchableOpacity onPress={() => onSelect(item?.id || item?.userid || item?.userId)} >
                          <AddUser height={24} width={24} />
                        </TouchableOpacity>
                    )
                
                )
                
              }
              {
                showMoreOptions && (
                  <TouchableOpacity style={[CommonStyles.radioCheck, {backgroundColor: AppColors.TRANSPARENT}]} onPress={() => onMoreOptionsClick(item?.id || item?.userid || item?.userId)}>
                          <MoreVertical height={20} width={20} />
                      </TouchableOpacity>
                  )
              }
            </View>
            {matchPercentage != null && 
              <View style={[styles.matchContainer, CommonStyles.rowAlignCenter]}>
                  <Text style={styles.match}>{StringConstants.MATCH}</Text>
                  <View>
                    <CustomProgressBar showPercentSymbol={true} valueBgColor={AppColors.GREY_VARIANT10} valueTextColor={AppColors.GREY_VARIANT2} fillColor={AppColors.GREY_VARIANT1} sliderPositionWidth={SCREEN_WIDTH * 0.68 - 13} sliderWidth={SCREEN_WIDTH * 0.68} progress={matchPercentage} maxValue={100} />
                  </View>
              </View>
            }
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  match: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE_VARIANT3,
    marginRight: 5
  },
  outerContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
  },
  matchContainer: {
    marginTop: 12, 
    marginBottom: 19,
  },
  premium: {
    position: 'absolute', 
    right: -2.5, 
    bottom: 3
  },
  txtBody: {
    fontSize: 12,
    fontFamily: "DMSans-Regular",
  },
  followBtn: {
    height: 28,
    backgroundColor: "#424242",
    borderRadius: 60,
    display: "flex",
  },
  width1: { width: Dimensions.get("window").width / 5 },
  width2: { width: Dimensions.get("window").width / 6 },
});
