

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { AppConsumer } from "context";
import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import { checkBadge, getUserBadgeIcon } from "utils/HelperFunctions";
import { AddFriendButton } from "../Common/AddFriendButton";
import friendlistAPI from "api/friendlistAPI";
import { LOG } from "config";
import EncryptedStorage from "react-native-encrypted-storage";
import DefaultUser from 'svg/user';
import GroupImage from "../List/GroupImage";

var extendedLog = LOG.extend("DiscoverFriendsCard");

export const DiscoverFriendsCard: React.FC = ({ data, navigation, onUserClick, url, sectionType, onListClick }) => {
  const firstThreeItems = data?.length > 0 ? data.slice(0, 3) : data;
  const [friend, setFriend] = useState(false);
  const [userDP, setUserDP] = useState();
  const [userName, setUserName] = useState('');

  const topMatchedUser = firstThreeItems?.length > 0 ? firstThreeItems[0] : [];

  useEffect(()=>{
    try {
        EncryptedStorage.getItem('user_dp').then((storedUserDP) => {
            setUserDP(storedUserDP);
        });
        EncryptedStorage.getItem('user_fname').then((val) => {
          setUserName(val);
        });
    }
    catch(e){
        console.error('Error in fetching user dp'+ e)
    }

  },[])

  // add friends based on ids
  const addFriend = async (userID) => {
    let friendIDs = [];
    friendIDs.push(userID);
    let response = await getFriendlistID(friendIDs, userName);
    setFriend(true);
  };

  //api call for adding new friends with user ids
  const getFriendlistID = async (friendIDs, userName) => {
    return await friendlistAPI
      .getFriendlist()
      .then((response) => {
         if (response.data && response.data.length > 0) {
          friendlistAPI
            .addNewFriends(userName, response.data[0].id, friendIDs)
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              extendedLog.error(
                "Error executing friendlistAPI.addNewFriends with message:",
                error
              );
            });
        } else {
          friendlistAPI
            .createFriendlist("All Friends", friendIDs, userName)
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              extendedLog.error(
                "Error executing friendlistAPI.createFriendlist with message:",
                error
              );
            });
        }
      })
      .catch((error) => {
        extendedLog.error(
          "Error executing friendlistAPI.getFriendlist with message:",
          error
        );
      });
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={styles.container}>
            <View style={[CommonStyles.rowAlignCenter]}>
                <View style={styles.imageAndMatchContainer}>
                    <View style={CommonStyles.rowAlignCenter}>
                        {userDP == null || userDP == '' ? (
                            <DefaultUser height={scaledWidth(48)} width={scaledWidth(48)} />
                        ) : (
                            <Image source={{ uri: userDP }} style={styles.userDP} />
                        )}
                        <TouchableOpacity onPress={() => onUserClick(topMatchedUser, sectionType)}>
                            {topMatchedUser?.image != null && topMatchedUser?.image != "" ? (
                                <Image source={{ uri: topMatchedUser.image }} style={[styles.matchedUserDP]} />
                            ) : 
                            topMatchedUser?.thumbnail != null && topMatchedUser?.thumbnail != "" ? (
                                <Image source={{ uri: topMatchedUser.thumbnail }} style={[styles.matchedUserDP]} />
                            ) :
                            (
                            <View style={[styles.matchedUserDP, {backgroundColor: AppColors.THEME_BG_COLOR}]}>
                                <DefaultUser height={scaledWidth(49)} width={scaledWidth(49)} />
                            </View>
                            )}
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles.matchPercentageContainer}>
                        {/* /TODO:/ */}
                        <Text style={styles.percentageValue}>{'50%'}</Text>
                    </View>
                </View>
                <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter, styles.userInfo]}>
                    <TouchableOpacity onPress={() => onUserClick(topMatchedUser, sectionType)}>
                        <View style={CommonStyles.flexDirRow}>
                            <Text style={CommonStyles.txtHeaderLarge}>{topMatchedUser?.name ?? topMatchedUser?.fname ?? ''}</Text>
                            {
                            (checkBadge(topMatchedUser?.userrole)) && (
                                <View style={CommonStyles.userBadge}>
                                {getUserBadgeIcon(topMatchedUser?.userrole)}
                                </View>
                                )
                            }
                        </View>
                        <Text
                            style={[styles.tag]}
                        >
                            {topMatchedUser?.usertag}
                        </Text>
                    </TouchableOpacity>
                    <AddFriendButton friend={friend} addFriend={addFriend} userId={topMatchedUser?.id} />
                </View>
            </View>
            {firstThreeItems?.length > 0 && 
                <TouchableOpacity style={[CommonStyles.rowAlignCenter, {marginTop: 16}]} onPress={() => onListClick(null, data, null, url, sectionType)}>
                     <GroupImage
                      item={firstThreeItems}
                      height={24}
                      width={24}
                      fontSize={12}
                    />
                    <Text style={styles.findMoreSimilar}>{StringConstants.FIND_MORE_WITH_SIMILAR_INTERESTS}</Text>
                </TouchableOpacity>
            }
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  tag: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 12,
    color: AppColors.GREY_VARIANT4
  },
  imageAndMatchContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  findMoreSimilar: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 12,
    color: AppColors.LIGHT_YELLOW
  },
  container: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 4,
    padding: 12, 
    width: SCREEN_WIDTH - 32
  },
  percentageValue: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT8
  },
  matchPercentageContainer: {
    paddingHorizontal: 11,
    paddingVertical: 2,
    borderRadius: 15,
    backgroundColor: AppColors.WHITE_VARIANT3,
    marginTop: -scaledWidth(13)
  },
  userDP: {
    height: scaledWidth(48),
    width: scaledWidth(48),
    borderRadius: scaledWidth(48)
  },
  matchedUserDP: {
    height: scaledWidth(58),
    width: scaledWidth(58),
    borderRadius: scaledWidth(58),
    marginLeft: -scaledWidth(12),
    borderWidth: scaledWidth(6),
    borderColor: AppColors.THEME_BG_COLOR
  },
  userInfo: {
    marginLeft: 16, 
    flex: 1
  }
  
});
