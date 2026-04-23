import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image as RNImage,
} from "react-native";
import { AppConsumer } from "context";
import DefaultUser from "svg/user";
import MoreVertical from "icons/MoreVertical";

import FastImage from "react-native-fast-image";
import AppColors from "../../utils/Colors";
export default function NotificationItem({
  item,
  blockedUsers,
  topUsers,
  onMessageClick = (f) => f,
  onConfirmClick = (f) => f,
  onCancelClick = (f) => f,
  onFollowBackClick = (f) => f,
  onMoreClick = (f) => f,
}) {
  let Headers = {};
  let createdDate = new Date(item.createdat);
  let today = new Date();
  var diffString = "";
  var diffFound = false;
  var diffInSeconds = (today.getTime() - createdDate.getTime()) / 1000;
  var timeDifference = Math.abs(Math.round(diffInSeconds / 60));

  var image = item.image;
  let uri = item.image;

  if (timeDifference > 60) {
    timeDifference = Math.abs(Math.round(timeDifference / 60));
  } else {
    diffFound = true;
    if (timeDifference == 1) {
      diffString = timeDifference + " min ago";
    } else {
      diffString = timeDifference + " mins ago";
    }
  }

  if (!diffFound) {
    if (timeDifference > 24) {
      timeDifference = Math.abs(Math.round(timeDifference / 24));
    } else {
      diffFound = true;
      if (timeDifference == 1) {
        diffString = timeDifference + " hour ago";
      } else {
        diffString = timeDifference + " hours ago";
      }
    }
  }

  if (!diffFound) {
    if (timeDifference > 30) {
      timeDifference = Math.abs(Math.round(timeDifference / 30));
    } else {
      diffFound = true;
      if (timeDifference == 1) {
        diffString = timeDifference + " day ago";
      } else {
        diffString = timeDifference + " days ago";
      }
    }
  }

  if (!diffFound) {
    if (timeDifference > 12) {
      timeDifference = Math.abs(Math.round(timeDifference / 12));
      diffFound = true;
      if (timeDifference == 1) {
        diffString = timeDifference + " year ago";
      } else {
        diffString = timeDifference + " years ago";
      }
    } else {
      diffFound = true;
      if (timeDifference == 1) {
        diffString = timeDifference + " month ago";
      } else {
        diffString = timeDifference + " months ago";
      }
    }
  }

  let addFriend = false;
  let addFollower = true;
  let topReco = true;
  let blockReco = true;
  let isSystemNotification = false;


  if (item.type == "AddFriend") {
    if (item.notifications.split("|")[1] == "true") {
      addFriend = true;
    }
  }

  if (item.type == "AddFollower") {
    if (item.notifications.split("|")[1] == "true") {
      addFollower = true;
    }
  }
 
  let friendID = "";
  if (item.type == "AddFriend" || item.type == "AddFollower") {
    friendID = item.itemid;
  } else {
    if (item.notifications.split("|")[2])
      friendID = item.notifications.split("|")[2];
    if (friendID == "-1") {
      isSystemNotification = true;
    }
  }

  if (blockedUsers.length > 0 && blockedUsers.indexOf(friendID) > -1) {
    blockReco = false;
  }
  if (topUsers.length > 0 && topUsers.indexOf(friendID) > -1) {
    topReco = false;
  }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View
          style={[
            styles.container,
            { backgroundColor: appConsumer.theme.colors.primary },
          ]}
        >
          <View
            style={[
               styles.innerContainer,
              {
                backgroundColor: item.checked
                ? appConsumer.theme.colors.primary
                : AppColors.LIGHT_YELLOW_VARIANT9,
              },
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1, flexDirection: "row" }}
              onPress={() => onMessageClick(item)}
            >
              {item.type == "MovieReco" ||
                item.type == "MovieReview" ||
                item.type == "CMTY-POST" ? (
                <>
                  {image && image != null ? (
                    <FastImage
                      style={styles.movieLogo}
                      source={{ uri: uri }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  ) : (
                    <RNImage
                      style={styles.movieLogo}
                      source={require("assets/defaultMovie.png")}
                    ></RNImage>
                  )}
                </>
              ) : null}
              {item.type == "AddFriend" ||
                item.type == "Watchlist" ||
                item.type == "AddFollower" ||
                item.type == "Like" ||
                item.type == "Comment" ? (
                <>
                  {image && image != null ? (
                    <RNImage
                      style={styles.dp}
                      source={{ uri: image }}
                    ></RNImage>
                  ) : (
                    <View style={{ marginRight: 8 }}>
                      <DefaultUser height={50} width={50} />
                    </View>
                  )}
                </>
              ) : null}
              <View style={{ flex: 1 }}>
                <View style={{ paddingTop: 0 }}>
                  <Text
                    style={[
                      styles.itemTitle,
                      
                      { color: appConsumer.theme.colors.white,
                        paddingRight: item?.frontTitle != "" && item?.frontTitle != null ? 5 : 0
                       },
                    ]}
                  >
                    {(item?.frontTitle != "" && item?.frontTitle != null) 
                      ?
                        item?.frontTitle
                      : 
                        ""
                    }
                    <Text
                      style={[
                        styles.txtBody,
                        { color: appConsumer.theme.colors.white,
                          paddingRight: item?.message != "" && item?.message != null ? 5 : 0
                         },
                      ]}
                    >
                      {
                        (item?.message != "" && item?.message != null) 
                        ?
                          item?.message
                        : 
                          ""
                      }
                    </Text>
                    <Text
                      style={[
                        styles.itemTitle,
                        { color: appConsumer.theme.colors.white,
                          paddingRight: item?.backTitle != "" && item?.backTitle != null ? 5 : 0
                         },
                      ]}
                    >
                      {(item?.backTitle != "" && item?.backTitle != null) 
                        ?
                          item?.backTitle
                        : 
                          ""
                      }
                    </Text>
                  </Text>
                </View>
                <View style={{ paddingTop: 5 }}>
                  <Text
                    style={[
                      styles.txtBody,
                      { color: appConsumer.theme.colors.grey6 },
                    ]}
                  >
                    {diffString}
                  </Text>
                </View>
                {item.type == "AddFriend" && addFriend && (
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => onConfirmClick(item)}
                      style={[
                        styles.btnProfile,
                        {
                          marginRight: 30
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.txtHeader,
                          { fontSize: 12, color: appConsumer.theme.colors.clientPrimary },
                        ]}
                      >
                        Confirm
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => onCancelClick(item)}
                      style={[
                        styles.btnProfile
                      ]}
                    >
                      <Text
                        style={[
                          styles.txtHeader,
                          { fontSize: 12, color: "#BDBDBD" },
                        ]}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {item.type == "AddFollower" && addFollower && (
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => onFollowBackClick(item)}
                      style={[
                        styles.btnProfile,
                        {
                          marginRight: 30
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.txtHeader,
                          { fontSize: 12, color: appConsumer.theme.colors.clientPrimary },
                        ]}
                      >
                        Follow Back
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => onCancelClick(item)}
                      style={[
                        styles.btnProfile
                      ]}
                    >
                      <Text
                        style={[
                          styles.txtHeader,
                          { fontSize: 12, color: "#BDBDBD" },
                        ]}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View>
                <TouchableOpacity
                  style={{ alignItems: "flex-end", marginBottom: 5 }}
                  onPress={() => onMoreClick(item)}
                >
                  <MoreVertical height={15} width={15} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  timeTag: {
    fontSize: 10,
 },
  container: {
    flex: 1,
    marginBottom: 4,
  },
  txtBody: {
    fontFamily: "DMSans-Regular",
    fontSize: 14,
    paddingRight: 5,
  },
  txtHeader: {
    fontFamily: "DMSans-Bold",
    fontSize: 14
  },
  btnProfile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14
  },
  itemTitle: {
    fontFamily: "DMSans-Bold",
    fontSize: 14,
    paddingRight: 5,
  },
  innerContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 8,
    paddingLeft: 12,
  },
  innerCheckedContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 8,
    paddingLeft: 12,
    opacity: 0.5
  },
  movieLogo: {
    height: 75,
    width: 50,
    marginRight: 8,
    borderRadius: 8,
  },
  movieLogoLarge: {
    height: 68,
    width: 48,
    marginRight: 8,
    borderRadius: 8,
  },
  dp: {
    height: 50,
    width: 50,
    marginRight: 8,
    borderRadius: 30,
  },
});
