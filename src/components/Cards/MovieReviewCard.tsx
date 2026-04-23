import React, { useState, useEffect, useCallback, useContext } from "react";
import { AppConsumer } from "context";
import { Rating } from "react-native-ratings";
import Like from "icons/Like";
import LikeFilled from 'icons/LikeFilled'
import Dislike from "icons/Dislike";
import DislikeFill from "icons/DislikeFilled";
import Comment from "svg/comment";
import MoreVertical from 'icons/MoreVertical';
import PinIcon from "icons/Pin";
import FastImage from "react-native-fast-image";
import {
  View,
  Text,
  Image as RNImage,
  Pressable,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import CommonStyles from "../../../Styles";
import AppColors from "utils/Colors";
import { ReviewShareCard } from "./ReviewShareCard";
import mixpanel from "mixpanel";
import { CommonAppContext } from "../../stores/common/commonAppContext";
import { MaxPinnedReviewsModalBody } from "components/MaxPinnedReviewsModalBody";
import { UpgradeToPinReviewsModalBody } from "components/UpgradeToPinReviewsModalBody";
import { GenericModal } from "components/Modals/GenericModal";
import StringConstants from "utils/StringConstants";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "utils/Dimensions";
import { ContentSharingModal } from "../Modals/ContentSharingModal";
import MoreOptionsModal from "../Modals/MoreOptionsModal";
import { copyLinkClicked, shareClicked, shareToInstaChats } from "utils/SocialShareUtils";
import { apiPosterImage, getMoviePoster } from "utils/utilFunctions";

export default function MovieReviewCard({
  key,
  item,
  onMovieClick = (f) => f,
  onLikeClick = (f) => f,
  onCommentClick = (f) => f,
  moreOptionsClicked = (f) => f,
  isPinned = false,
  userID,
  navigation,
  pinnedReviews,
  pinReview,
  parentScreen,
  hideMoreOptions = false
}) {
  const windowWidth = Dimensions.get("window").width;
  const [isLiked, setIsLiked] = useState(item.islike);
  const [likes, setLikes] = useState(parseInt(item.likes));
  const [dislikes, setDislikes] = useState(parseInt(item.dislikes));
  const [comments, setComments] = useState(parseInt(item.comments));
  const [hasImage, setHasImage] = useState(true);
  const [noOfLines, setNoOfLines] = useState(0)
  const [showUpgradeModalForPin, setShowUpgradeModalForPin] = useState(false)
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [moreOptions, setMoreOptions] = useState(
    userID == 0 
      ? 
        [
          { actionName: "Edit review", actionIcon: "edit" },
          { actionName: 'Share review', actionIcon: 'share' },
        ]
      :
      [
        { actionName: 'Share review', actionIcon: 'share' },
      ]
  )
  const [sharingModalVisible, setSharingModalVisibility] = useState(false);
  const [showMaxPinInfoModal, setShowMaxPinInfoModal] = useState(false)
  const { commonAppState, commonDispatch } = useContext(CommonAppContext);
  const [imageLoadError, setImageLoadError] = useState(false)

  let Headers = {};
  let title = "";

  title = item.title;


  if (item.releasedate && item.releasedate != "") {
    item.releasedate = item.releasedate.substring(0, 4);
  }

  var options = { year: "numeric", month: "short", day: "numeric" };
  var reviewDate = new Date(item.datetime);
  reviewDate = reviewDate.toLocaleDateString("en-US", options);

  let uri = require("assets/defaultMovie.png");

  if (item.posterimageurl && item.posterimageurl != null) {
    uri = item.posterimageurl;
  } else if (item.posterimage == null || item.posterimage == "") {
    uri = item.movieimage;
  } else {
    uri = "https://image.tmdb.org/t/p/w780/" + item.posterimage;
  }

  useEffect(() => {
    setSelectedRow(item);
    if (
      item.posterimage == null ||
      item.posterimage == "" ||
      item.posterimageurl == null
    ) {
      if (
        item.movieimage == null ||
        item.movieimage == "" ||
        item.movieimage == "N/A"
      ) {
        setHasImage(false);
      }
    }
    if(userID == 0){
      let options = moreOptions?.slice()
      if(isPinned)
        options.push({ actionName: "Unpin review", actionIcon: "unpin" })
      else 
        options.push({ actionName: "Pin review", actionIcon: "pin" })
      setMoreOptions(options?.slice())
    }
    
  }, []);

  function processComment(comment) {
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
      processedComment.push(<Text>{first}</Text>);
      processedComment.push(
        <Text
          style={{ fontFamily: "DMSans-Bold", fontSize: 13, color: "#E9C638" }}
          onPress={() => onUserClick(el.id)}
        >
          {el.name}
        </Text>
      );
      comment = cArr.join(el.match);
    });
    processedComment.push(<Text>{comment}</Text>);
    return processedComment;
  }

  const handleTextLayout = useCallback((event) => {
    const { lines } = event.nativeEvent;
    if(noOfLines != lines?.length && lines?.length > 3)
    setNoOfLines(lines?.length)
  }, []);

  let TRUNCATE_WIDTH = windowWidth * 0.2;
  if(noOfLines > 3){
    TRUNCATE_WIDTH = windowWidth * 0.1 
  }


  const sharingContentBody = (
    <ReviewShareCard
      movieDetails={selectedRow}
      item={selectedRow}
      showGuestFlow={commonAppState.showGuestFlow}
    />
  );

  // go to premium screen
  const upgradeToPremium = () => {
    setShowUpgradeModalForPin(false)
    navigation.navigateDeprecated('RecoBeePremiumScreen', {
      params: { fromScreen: "SettingsScreen" },
    })
  }

  // on selection of bottomsheet options
  const actionClicked = async (item: any, action: any) => {
    setMoreOptionsVisible(false);
    switch (action.actionIcon) {
      case 'edit': 
        navigation.navigateDeprecated("PostReview", {
          movieID: item?.id ?? item?.movieid,
          reviewObj: [item],
          lastEvaluatedKey: undefined,
          fromScreen: "ReviewMain",
          parentScreen: parentScreen,
          userName: item?.username,
          movieName: item?.moviename,
          userID: item?.userid,
          item: item,
        });
      break;
      case 'reco':
        //TODO: yet to add
        //shareClickedCB(item?.movieid || item?.id, item?.title)
        return;

      case 'share': 
        setSharingModalVisibility(true)
        break;
      case 'pin':
        if(commonAppState.userRole == 'prof' || (commonAppState?.isPremiumFlowEnabled && commonAppState?.isPremiumUser)){
          if(pinnedReviews?.length >= 3){
            setShowMaxPinInfoModal(true);
          }
          else {
            pinReview(item, 'true')
          }
        }
        else {
          setShowUpgradeModalForPin(true)
        }
                  
        break;
      case 'unpin':
        pinReview(item, 'false')
        break;
        }
    };

  // upgrade to premium modal body
  const premiumModalBodyForPin = () => {
    return (
      <UpgradeToPinReviewsModalBody planInfo={StringConstants.MONTH_PRICE} goToPremiumScreen={upgradeToPremium} />
    )
  }

  // max pinned reviews limit reached modal
  const maxPinnedInfoModal = () => {
    return (
      <MaxPinnedReviewsModalBody />
    )
  }

  // on click of more options
  const moreClicked = () => {
    setMoreOptionsVisible(true)
  }

  // share movie card
  const shareMovieClicked = () => {
    mixpanel.track('ShareClicked', {
      screen: 'ReviewComment',
      purpose: 'Share Movie Review',
      movieID: selectedRow?.id,
    });
    shareClicked(selectedRow)
  }

  // share review to insta chats or whatsapp
  const shareToInstaChatsCb = (isWhatsApp: any) => {
    mixpanel.track(isWhatsApp ? 'ShareToWhatsApp' : 'ShareToInstaChatsClicked', {
      screen: 'ReviewComment',
      purpose: 'Share Movie Review',
      movieID: selectedRow?.id,
    });
    shareToInstaChats(selectedRow,isWhatsApp)
  }

  // copy link to clipboard
  const copyLinkClickedCb = () => {
    copyLinkClicked(selectedRow)
  }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <Pressable
          onPress={() => onCommentClick(item, false)}
        >
          <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter, {marginBottom: 8}]}>
            <View style={CommonStyles.rowAlignCenter}>
              {isPinned && 
                <View style={styles.pin}>
                  <PinIcon height={20} width={20} strokeWidth="1.6" />
                </View>
              }
                <Pressable onPress={() => onMovieClick(item)}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.commentHeader,
                      {
                        maxWidth: Dimensions.get("window").width * 0.8,
                        color: appConsumer.theme.colors.text,
                        paddingLeft: isPinned ? 12 : 0
                      },
                    ]}
                  >
                    {item?.moviename ? item?.moviename  + " (" + item.releasedate + ")": item?.itle + " (" + item.releasedate + ")"}
                  </Text>
                </Pressable>
              </View>
              {!hideMoreOptions &&
                <Pressable style={{ padding: 5 }} onPress={() => moreClicked()}>
                    <MoreVertical />
                </Pressable>
              }
          </View>
          <View style={CommonStyles.flexDirRow}>
          <Pressable
            onPress={() => onMovieClick(item)}
            style={styles.imageContainer}
          >
            {!imageLoadError || apiPosterImage(item) != null ? (
              <FastImage
                style={styles.movieLogo}
                source={{ uri: !imageLoadError ? getMoviePoster(item?.id || item?.movieid || item?.movieId) : apiPosterImage(item) }}
                resizeMode={FastImage.resizeMode.cover}
                onError={() => setImageLoadError(true)}
                defaultSource={require('assets/defaultMovie.png')}
              />
            ) : (
              <RNImage
                style={styles.movieLogo}
                source={require("assets/defaultMovie.png")}
              ></RNImage>
            )}
          </Pressable>
          <View
            style={[
              {
                flex: 1,
                minHeight: (item?.reviewtitle && item?.reviewtitle != "" && item?.reviewcomment?.length > windowWidth * 0.2) ? SCREEN_WIDTH * 0.42 :
                SCREEN_WIDTH * 0.389
              },
            ]}
          >
            <View>
              <View style={CommonStyles.rowSpaceBetween}>
                
                {item.reviewrating && item.reviewrating != "0" ? (
                  <View
                    style={{
                      padding: 5,
                      paddingLeft: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <Rating
                      ratingCount={5}
                      imageSize={12}
                      fractions={1}
                      startingValue={parseFloat(item.reviewrating)}
                      jumpValue={0.5}
                      ratingColor="#e9c46a"
                      tintColor={appConsumer.theme.colors.primary}
                      readonly={true}
                    />
                  </View>
                ) : <View />}
                <Text
                      style={[
                        styles.txtBody,
                        {paddingRight: 5, paddingTop: 5, color: AppColors.GREY_VARIANT4,  fontSize: 10,},
                      ]}
                    >
                      {reviewDate}
                    </Text>
              </View>
            </View>
            {/* Only render comment container if there's actual content to display */}
            {((item?.reviewtitle && item?.reviewtitle != "") || 
              (item?.reviewcomment && item?.reviewcomment.trim() != "")) && (
              <View
                style={[
                  styles.commentContainer,
                  {
                    borderBottomColor: appConsumer.theme.colors.homeCard,
                    // flex: 1,
                  },
                ]}
              >
                {item?.reviewtitle && item?.reviewtitle != "" && (
                  <Text style={[styles.txtHeader, { marginBottom: 8 }]}>
                    {item?.reviewtitle}
                  </Text>
                )}
                {item?.reviewcomment?.length > TRUNCATE_WIDTH ? (
                  <View>
                    <Text
                      onTextLayout={(e)=> handleTextLayout(e)}
                      style={[
                        styles.txtBody,
                        { color: appConsumer.theme.colors.text },
                      ]}
                    >
                      {item?.reviewcomment ? processComment(
                        item?.reviewcomment?.substring(0, TRUNCATE_WIDTH).trim()
                      )
                      : ''
                    }
                      ...
                      <Pressable
                        style={{ marginBottom: -3 }}
                        onPress={() => onCommentClick(item, false)}
                      >
                        <Text
                          style={[
                            styles.txtBody,
                            {
                              color: appConsumer.theme.colors.text,
                              opacity: 0.6,
                            },
                          ]}
                        >
                          {" "}
                          more
                        </Text>
                      </Pressable>
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.txtBody,
                      { color: appConsumer.theme.colors.text },
                    ]}
                  >
                    {processComment(item?.reviewcomment ?? '')}
                  </Text>
                )}
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                paddingLeft: 8,
              }}
            >
              <Pressable
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-end",
                  padding: 5,
                  paddingBottom: 0,
                }}
                onPress={() => {
                  setLikes(
                    isLiked == "null" || isLiked == "false" || typeof isLiked == 'undefined'
                      ? parseInt(likes) + 1
                      : parseInt(likes) - 1
                  );
                  setDislikes(
                    isLiked == "false"
                      ? parseInt(dislikes) - 1
                      : parseInt(dislikes)
                  );
                  setIsLiked(
                    isLiked == "null" || isLiked == "false" || typeof isLiked == 'undefined' ? "true" : "null"
                  );
                  onLikeClick(item, true);
                }}
              >
                {isLiked == "true" ? <LikeFilled /> : <Like />}
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
                      },
                    ]}
                  >
                    {likes}
                  </Text>
                ) : null}
              </Pressable>
              <Pressable
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-end",
                  padding: 5,
                  paddingBottom: 0,
                }}
                onPress={() => {
                  setLikes(
                    isLiked == "true" ? parseInt(likes) - 1 : parseInt(likes)
                  );
                  setDislikes(
                    isLiked == "null" || isLiked == "true" || typeof isLiked == 'undefined'
                      ? parseInt(dislikes) + 1
                      : parseInt(dislikes) - 1
                  );
                  setIsLiked(
                    isLiked == "null" || isLiked == "true" || typeof isLiked == 'undefined' ? "false" : "null"
                  );
                  onLikeClick(item, false);
                }}
              >
                {isLiked == "null" || typeof isLiked == 'undefined' ? (
                  <Dislike />
                ) : isLiked == "true" ? (
                  <Dislike />
                ) : (
                  <DislikeFill />
                )}
                {dislikes > 0 ? (
                  <Text
                    style={[
                      styles.txtBody,
                      {
                        color: appConsumer.theme.colors.text,
                        opacity: 0.6,
                        fontSize: 10,
                        paddingLeft: 5,
                      },
                    ]}
                  >
                    {dislikes}
                  </Text>
                ) : null}
              </Pressable>
              {item.type == "COM" ? null : (
                <Pressable
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "flex-end",
                    padding: 5,
                    paddingBottom: 0,
                  }}
                  onPress={() => onCommentClick(item)}
                >
                  <Comment height={14} width={14} />
                  {comments > 0 ? (
                    <Text
                      style={[
                        styles.txtBody,
                        {
                          color: appConsumer.theme.colors.text,
                          opacity: 0.6,
                          fontSize: 10,
                          paddingLeft: 5,
                        },
                      ]}
                    >
                      {comments}
                    </Text>
                  ) : null}
                </Pressable>
              )}
            </View>
          </View>
          </View>
          {moreOptionsVisible ? (
            <MoreOptionsModal
              toggleModal={moreOptionsVisible}
              cancelClick={() => setMoreOptionsVisible(false)}
              actions={moreOptions}
              item={selectedRow}
              onClick={actionClicked}
            />
          ) : null}
          {sharingModalVisible && (
            <ContentSharingModal
              isModalVisible={sharingModalVisible}
              modalHeight={SCREEN_HEIGHT * 0.94}
              source={'ReviewComment'}
              id={selectedRow?.movieid ?? selectedRow?.id ?? null}
              headerTitle={'Share this review'}
              modalBody={sharingContentBody}
              cancelModal={() => {
                setSharingModalVisibility(false);
              }}
              isMoreClicked={shareMovieClicked}
              isCopyLinkClicked={copyLinkClickedCb}
              shareToInstaChatsClicked={() => shareToInstaChatsCb(false)}
              shareToWhatsappClicked={() => shareToInstaChatsCb(true)}
            />
          )}
          {showUpgradeModalForPin ?
              <GenericModal
                borderRadius={48}
                isModalVisible={showUpgradeModalForPin}
                cancelModal={() =>  setShowUpgradeModalForPin(false)}
                modalHeight={SCREEN_HEIGHT * 0.27}
                modalTitle={''}
                modalBody={
                  premiumModalBodyForPin()
                }
              />
              :
              null
            }
            {showMaxPinInfoModal ?
              <GenericModal
                borderRadius={48}
                isModalVisible={showMaxPinInfoModal}
                cancelModal={() =>  setShowMaxPinInfoModal(false)}
                modalHeight={SCREEN_HEIGHT * 0.23}
                modalTitle={''}
                modalBody={
                  maxPinnedInfoModal()
                }
              />
              :
              null
            }
        </Pressable>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {},
  commentHeader: {
    fontSize: 15,
    fontFamily: "DMSans-Bold",
    paddingLeft: 12,
  },
  commentContainer: {
    paddingTop: 0,
    paddingLeft: 12,
    minHeight: 0.2 * SCREEN_WIDTH,
    maxHeight: SCREEN_WIDTH * 0.26,
  },
  txtBody: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    opacity: 0.8,
    color: "#E0E0E0",
  },
  txtHeader: {
    fontSize: 14,
    fontFamily: "DMSans-Bold",
    opacity: 0.8,
    color: "#F5F5F5",
  },
  imageContainer: {
    flexDirection: "row",
    paddingTop: 1,
    height: 0.389 * Dimensions.get("window").width,
    width: 0.25 * Dimensions.get("window").width,
  },
  movieLogo: {
    flex: 1,
    width: 0.222 * Dimensions.get("window").width,
    height: 0.3167 * Dimensions.get("window").width,
    borderRadius: 10,
  },
  pin: {
    height: 28,
    width: 28,
    borderRadius: 28,
    backgroundColor: AppColors.GREY_VARIANT8,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
