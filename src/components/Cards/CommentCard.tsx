import React, { useState } from "react";
import { AppConsumer } from "context";
import DefaultUser from "svg/user";
import Like from "icons/Like";
import LikeFilled from 'icons/LikeFilled'
import MoreVertical from "icons/MoreVertical";
import Tick from "icons/Tick";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import { CommentReplyView } from "../Atoms/CommentReplyView";
import { SCREEN_WIDTH } from "utils/Dimensions";
import AppColors from "utils/Colors";
import StringConstants from "../../utils/StringConstants";

export default function CommentCard({
  key,
  item,
  userID,
  isChildComment,
  onUserClick = (f) => f,
  onLikeClick = (f) => f,
  onMoreClick = (f) => f,
  onReplyPress,
  isCommentModal,
  onUpdateComment,
  showGuestFlow
}) {
  const windowWidth = Dimensions.get("window").width;
  const [isLiked, setIsLiked] = useState(item.islike);
  const [likes, setLikes] = useState(parseInt(item.likes));
  const [dislikes, setDislikes] = useState(parseInt(item.dislikes));
  const [comment, setComment] = useState(item.reviewcomment);
  const [readMore, setReadMore] = useState(
    item.reviewcomment?.length > windowWidth * 0.3733
  );

  let createdDate = new Date(item.datetime);
  let today = new Date();
  var diffString = "";
  var diffFound = false;
  var diffInSeconds = (today.getTime() - createdDate.getTime()) / 1000;
  var timeDifference = Math.abs(Math.round(diffInSeconds / 60));

  if (timeDifference > 60) {
    timeDifference = Math.abs(Math.round(timeDifference / 60));
  } else {
    diffFound = true;
    diffString = timeDifference + "m ago";
  }

  if (!diffFound) {
    if (timeDifference > 24) {
      timeDifference = Math.abs(Math.round(timeDifference / 24));
    } else {
      diffFound = true;
      diffString = timeDifference + "h ago";
    }
  }

  if (!diffFound) {
    if (timeDifference > 7) {
      timeDifference = Math.abs(Math.round(timeDifference / 7));
    } else {
      diffFound = true;
      diffString = timeDifference + "d ago";
    }
  }

  if (!diffFound) {
    if (timeDifference > 4) {
      timeDifference = Math.abs(Math.round(timeDifference / 4));
    } else {
      diffFound = true;
      diffString = timeDifference + "w ago";
    }
  }

  if (!diffFound) {
    if (timeDifference > 12) {
      timeDifference = Math.abs(Math.round(timeDifference / 12));
      diffFound = true;
      diffString = timeDifference + "y ago";
    } else {
      diffFound = true;
      diffString = timeDifference + "mo ago";
    }
  }

  function processComment(commentValue) {
    if (commentValue?.indexOf(`@[`) === -1) {
      return commentValue;
    }
    let users = commentValue?.split(`@[`)
      .map((el) => {
        let match = el.substring(0, el.indexOf(")"));
        return match
          ? {
              name: match.substring(0, match.indexOf("]")),
              id: match.substring(match.indexOf("(") + 1),
              match: `@[${match})`,
            }
          : undefined;
      })
      .filter((el) => el);

    let processedComment = [];
    users?.forEach((el) => {
      let [first, ...cArr] = commentValue.split(el.match);
      processedComment.push(<Text>{first}</Text>);
      processedComment.push(
        <Text
          style={{ fontFamily: "DMSans-Bold", fontSize: 13, color: "#E9C638" }}
          onPress={() => onUserClick(el.id)}
        >
          {el.name}
        </Text>
      );
      commentValue = cArr.join(el.match);
    });
    processedComment.push(<Text>{commentValue}</Text>);
    return processedComment;
  }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View>
          <View
            style={[
              {
                color: appConsumer.theme.colors.text,
                flexDirection: "row",
              },
              { paddingTop: 5 },
            ]}
          >
            <View style={{ paddingRight: 12 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignContent: "flex-start",
                  flexDirection: "row",
                }}
                onPress={() => onUserClick(item.userid)}
              >
                {item.userimage ? (
                  <Image
                    source={{ uri: item.userimage }}
                    style={styles.thumbnail}
                  />
                ) : (
                  <DefaultUser height={36} width={36} />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                // borderBottomColor: appConsumer.theme.colors.homeCard,
                // borderBottomWidth: 1,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => onUserClick(item.userid)}
                  style={{ paddingRight: 9, paddingTop: 2 }}
                >
                  <Text
                    style={[
                      styles.commentHeader,
                      { color: appConsumer.theme.colors.text },
                    ]}
                  >
                    {item.username}
                  </Text>
                </TouchableOpacity>
                <View style={{height: 5, width: 5, borderRadius: 5, marginRight: 9, backgroundColor: AppColors.GREY_VARIANT1}} />
                <Text
                  style={[
                    styles.txtBody,
                    {
                      color: AppColors.WHITE,
                      fontSize: 14,
                      //opacity: 0.6,
                      //paddingTop: 8,
                      //flex: 1,
                    },
                  ]}
                >
                  {diffString}
                </Text>
              </View>
              <View>
                <View
                  style={[
                    styles.commentContainer,
                    { borderBottomColor: appConsumer.theme.colors.homeCard },
                  ]}
                >
                  {item.isEdit ? (
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 8,
                        marginBottom: 5,
                      }}
                    >
                      <TextInput
                        style={[
                          styles.inputStyle,
                          {
                            color: appConsumer.theme.colors.text,
                            backgroundColor: appConsumer.theme.colors.grey9alt,
                            width: isChildComment == true ? SCREEN_WIDTH * 0.48 : SCREEN_WIDTH * 0.55
                          },
                        ]}
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                        autoCapitalize="none"
                        multiline={true}
                        maxLength={1000}
                        textAlignVertical="top"
                        keyboardAppearance="dark"
                        placeholder="Write a comment"
                        underlineColorAndroid="transparent"
                        placeholderTextColor={
                          appConsumer.theme.colors.placeholder
                        }
                      />
                      <View style={{ justifyContent: "flex-end" }}>
                        <TouchableOpacity
                          onPress={() =>
                            onUpdateComment(item.pk, item.sk, comment)
                          }
                          style={{
                            height: 30,
                            width: 30,
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 0,
                            backgroundColor: appConsumer.theme.colors.grey9alt,
                            borderRadius: 8,
                          }}
                        >
                          <Tick
                            width={20}
                            height={20}
                            strokeWidth={"2"}
                            color={appConsumer.theme.colors.text}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <>
                      {readMore ? (
                        <View>
                          <Text
                            style={[
                              styles.txtBody,
                              { color: appConsumer.theme.colors.text },
                            ]}
                          >
                            {processComment(
                              comment.substring(0, windowWidth * 0.3733).trim()
                            )}
                            ...
                            <TouchableOpacity
                              style={{ position: "relative" }}
                              onPress={() => setReadMore(false)}
                            >
                              <Text
                                style={[
                                  styles.txtBody,
                                  {
                                    top: 3,
                                    position: "relative",
                                    color: appConsumer.theme.colors.text,
                                    opacity: 0.6,
                                  },
                                ]}
                              >
                                {" "}
                                {StringConstants.READ_MORE}
                              </Text>
                            </TouchableOpacity>
                          </Text>
                        </View>
                      ) : (
                        <View style={{ marginBottom: 12 }}>
                          <Text
                            style={[
                              styles.txtBody,
                              { color: appConsumer.theme.colors.text },
                            ]}
                          >
                            {processComment(comment?.trim())}
                            {comment?.length > windowWidth * 0.3733 ? (
                              <TouchableOpacity
                                style={{ position: "relative" }}
                                onPress={() => setReadMore(true)}
                              >
                                <Text
                                  style={[
                                    styles.txtBody,
                                    {
                                      top: 3,
                                      position: "relative",
                                      color: appConsumer.theme.colors.text,
                                      opacity: 0.6,
                                    },
                                  ]}
                                >
                                  {" "}
                                  {StringConstants.READ_LESS}
                                </Text>
                              </TouchableOpacity>
                            ) : null}
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 17,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      padding: 5,
                      marginRight: 25,
                      paddingBottom: 0,
                    }}
                    onPress={() => {
                      if(showGuestFlow){
                        onLikeClick(item, true, true);
                      }
                      else {
                        setLikes(
                          isLiked == "null" || isLiked == "false"
                            ? parseInt(likes) + 1
                            : parseInt(likes) - 1
                        );
                        setDislikes(
                          isLiked == "false"
                            ? parseInt(dislikes) - 1
                            : parseInt(dislikes)
                        );
                        setIsLiked(
                          isLiked == "null" || isLiked == "false"
                            ? "true"
                            : "null"
                        );
                        onLikeClick(item, true, true);
                      }
                    }}
                  >
                    {isLiked == "true" ? <LikeFilled /> : <Like />}
                    <Text
                        style={[
                          styles.txtBody,
                          {
                            color: AppColors.WHITE,
                            // opacity: 0.6,
                            fontSize: 14,
                            paddingLeft: 8,
                            //paddingTop: 1,
                          },
                        ]}
                      >
                        {'Like'}
                      </Text>
                    {likes > 0 ? (
                      <Text
                        style={[
                          styles.txtBody,
                          {
                            color: appConsumer.theme.colors.text,
                            opacity: 0.6,
                            fontSize: 10,
                            paddingLeft: 5,
                            paddingTop: 1,
                            marginBottom: 1
                          },
                        ]}
                      >
                        {likes}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                  <CommentReplyView comments={item?.reply?.length ?? 0} onReplyPress={() => {onReplyPress()}} textColor={appConsumer.theme.colors.text} />
                </View>
              </View>
            </View>
            {isCommentModal != true &&
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 13,
                right: 10,
                width: 20,
                height: 20,
              }}
              onPress={() => onMoreClick(item)}
            >
              <MoreVertical height={15} width={15} />
            </TouchableOpacity>
            }
          </View>
          
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {},
  commentHeader: {
    fontSize: 16,
    fontFamily: "DMSans-Bold",
  },
  commentContainer: {
    //minHeight: Dimensions.get('window').width * 0.133,
    maxWidth: Dimensions.get("window").width * 0.733,
    paddingTop: 8,
    paddingBottom: 4,
    paddingRight: 8,
  },
  txtHeader: {
    fontSize: 16,
    fontFamily: "DMSans-Bold",
    color: "#FFF",
  },
  thumbnail: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  txtBody: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    opacity: 0.8,
    color: "#FFF",
  },
  inputStyle: {
    height: Dimensions.get("window").width * 0.123,
    borderRadius: 8,
    marginRight: 7,
    marginLeft: 0,
    paddingLeft: 8,
    fontFamily: "DMSans-Regular",
    fontSize: 12,
  },
});
