import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import DefaultUser from "svg/user";
import Like from "icons/Like";
import LikeFilled from 'icons/LikeFilled';
import Comment from "svg/comment";
import StarFilled from "icons/StarFilled";
import PremiumBadge from 'svg/premium_badge_icon';
import Green from "svg/green-ellipsis";
import Red from "svg/red-ellipsis";
import AppColors from "utils/Colors";
import StringConstants from "utils/StringConstants";
import { CommonAppContext } from "../../stores/common/commonAppContext";
import { checkBadge, getUserBadgeIcon } from "utils/HelperFunctions";
import { SCREEN_WIDTH } from "utils/Dimensions";
import FontFamily from "utils/FontFamily";
import { getSafeSubstring } from "utils/utilFunctions";

interface NewReviewCardProps {
  item: any;
  userID: string;
  showGuestFlow?: boolean;
  onUserClick: (userId: string) => void;
  onCommentClick: (postId: string, collapsed: boolean) => void;
  onLikeClick: (item: any, value: boolean) => void;
}

export default function NewReviewCard({
  item,
  userID,
  showGuestFlow = false,
  onUserClick,
  onCommentClick,
  onLikeClick,
}: NewReviewCardProps) {
  const { commonAppState } = React.useContext(CommonAppContext);
  const [isLiked, setIsLiked] = useState(item.islike);
  const [likes, setLikes] = useState(parseInt(item.likes || 0));

  // Calculate time difference
  let createdDate = new Date(item.datetime);
  let today = new Date();
  let diffString = "";
  let diffFound = false;
  let diffInSeconds = (today.getTime() - createdDate.getTime()) / 1000;
  let timeDifference = Math.abs(Math.round(diffInSeconds / 60));

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

  const handleLikeClick = async () => {
    const newLikeStatus = isLiked === "true" ? "null" : "true";
    setIsLiked(newLikeStatus);
    
    if (newLikeStatus === "true") {
      setLikes(likes + 1);
    } else if (isLiked === "true") {
      setLikes(likes - 1);
    }
    
    await onLikeClick(item, newLikeStatus === "true");
  };

  const processComment = (comment: string) => {
    if (!comment) return "";
    if (comment.indexOf(`@[`) === -1) {
      return comment;
    }
    let users = comment
      .split(`@[`)
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
    users.forEach((el) => {
      let [first, ...cArr] = comment.split(el.match);
      processedComment.push(<Text key={`text-${el.id}`} style={styles.reviewText}>{first}</Text>);
      processedComment.push(
        <Text
          key={`mention-${el.id}`}
          style={styles.mentionText}
          onPress={() => onUserClick(el.id)}
        >
          {el.name}
        </Text>
      );
      comment = cArr.join(el.match);
    });
    processedComment.push(<Text key="final" style={styles.reviewText}>{comment}</Text>);
    return processedComment;
  };

  const renderComment = () => {
    const truncatedText = getSafeSubstring(item.reviewcomment, SCREEN_WIDTH * 0.25);
    const needsTruncation = item.reviewcomment.length > SCREEN_WIDTH * 0.25;
    
    if (item.reviewcomment.indexOf(`@[`) === -1) {
      return (
        <Text style={styles.reviewText}>
          {truncatedText}
          {needsTruncation && "... "}
          {needsTruncation && (
            <Text onPress={() => onCommentClick(item.postid, false)} style={styles.readMoreText}>
              {StringConstants.READ_MORE}
            </Text>
          )}
        </Text>
      );
    }

    return (
      <View style={styles.commentWrapper}>
        {processComment(truncatedText)}
        {needsTruncation && (
          <Text style={styles.reviewText}>
            {"... "}
            <Text onPress={() => onCommentClick(item.postid, false)} style={styles.readMoreText}>
              {StringConstants.READ_MORE}
            </Text>
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onUserClick(item.userid)} style={styles.userInfo}>
          {item.userimage ? (
            <Image source={{ uri: item.userimage }} style={styles.userImage} />
          ) : (
            <DefaultUser height={32} width={32} />
          )}
          {item.ispremium && (
            <View style={styles.premiumBadge}>
              <PremiumBadge height={12} width={12} />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.userDetails}>
          <View style={styles.nameRow}>
            <TouchableOpacity onPress={() => onUserClick(item.userid)} style={styles.nameContainer}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.userName}>
                {item.username}
              </Text>
              {checkBadge(item.userrole) && (
                <View style={styles.badge}>
                  {getUserBadgeIcon(item.userrole, 14)}
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.timeText}>{diffString}</Text>
            {item.familyfriendly === "true" && (
              <View style={styles.tagContainer}>
                <Green />
                <Text style={styles.familyFriendlyText}>
                  {StringConstants.FAMILY_FRIENDLY}
                </Text>
              </View>
            )}
            {item.hasspoilers === "true" && (
              <View style={styles.tagContainer}>
                <Red />
                <Text style={styles.spoilerText}>
                  {StringConstants.HAS_SPOILERS}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <StarFilled
            width={20}
            height={20}
            color={
              item.reviewrating && item.reviewrating != "0"
                ? AppColors.LIGHT_YELLOW
                : AppColors.GREY_VARIANT4
            }
          />
          <Text style={styles.ratingText}>
            {item.reviewrating && item.reviewrating != "0" ? item.reviewrating : "0.0"}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        {item.reviewtitle && item.reviewtitle !== "" && (
          <Text style={styles.reviewTitle}>
            {item.reviewtitle}
          </Text>
        )}

        {item.reviewcomment && item.reviewcomment.trim() !== "" && (
          <View style={styles.reviewContent}>
            {renderComment()}
          </View>
        )}

        {item.translatedcontent && (
          <TouchableOpacity style={styles.translationButton}>
            <Text style={styles.translationText}>{StringConstants.SEE_TRANSLATION}</Text>
          </TouchableOpacity>
        )}
      </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLikeClick}>
          {isLiked === "true" ? (
            <LikeFilled height={20} width={20} color={AppColors.LIGHT_YELLOW} />
          ) : (
            <Like height={20} width={20} color={AppColors.WHITE} />
          )}
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onCommentClick(item.postid, true)}
        >
          <Comment height={20} width={20} />
          <Text style={styles.actionText}>{item.comments || 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: SCREEN_WIDTH * 0.75,
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  userInfo: {
    position: "relative",
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  premiumBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
  },
  userDetails: {
    flex: 1,
    marginLeft: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginRight: 4,
  },
  badge: {
    marginLeft: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  timeText: {
    fontSize: 10,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE,
    opacity: 0.6,
    marginRight: 8,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  familyFriendlyText: {
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREEN,
    paddingLeft: 4,
    fontSize: 9,
  },
  spoilerText: {
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.ERROR_RED,
    paddingLeft: 4,
    fontSize: 9,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  reviewTitle: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: 6,
  },
  reviewContent: {
    flex: 1,
  },
  reviewText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT10,
    lineHeight: 16,
  },
  readMoreText: {
    color: AppColors.GREY_VARIANT9,
    fontFamily: FontFamily.DMSansRegular,
  },
  translationButton: {
    marginTop: 4,
  },
  translationText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.LIGHT_YELLOW,
  },
  footer: {
    marginTop:12,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionText: {
    fontSize: 12,
    fontFamily: FontFamily.REGULAR,
    color: AppColors.WHITE,
    marginLeft: 6,
  },
  mentionText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.LIGHT_YELLOW,
    lineHeight: 16,
  },
  commentWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
