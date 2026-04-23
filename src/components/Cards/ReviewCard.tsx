import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { AppConsumer } from "context";
import { Rating } from "react-native-ratings";
import CommentCard from "./CommentCard";
import DefaultUser from "svg/user";
import Like from "icons/Like";
import LikeFilled from 'icons/LikeFilled'
import Dislike from "icons/Dislike";
import DislikeFill from "icons/DislikeFilled";
import Comment from "svg/comment";
import MoreVertical from "icons/MoreVertical";
import Send from "svg/send";
import StarRating from "svg/star-main";
import Green from "svg/green-ellipsis";
import Red from "svg/red-ellipsis";
import { MentionInput } from "react-native-controlled-mentions";
import friendlistAPI from "api/friendlistAPI";
import Critic from "svg/critic";
import CircularProgress from "components/Common/ProgressCircle";
import FastImage from "react-native-fast-image";
import AutoCompSearchCard from "components/Cards/AutoCompSearchCard";
import debounce from 'lodash.debounce';
import searchAPI from 'api/searchAPI';
import { LOG } from 'config';
import mixpanel from 'mixpanel';
import MoreOptionsModal from 'components/Modals/MoreOptionsModal';
import ConfirmModal from 'components/Modals/ConfirmModal';
import PremiumBadge from 'svg/premium_badge_icon';

var extendedLog = LOG.extend('ReviewMain');

import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  Keyboard,
  Image as RNImage,
  Linking
} from "react-native";
import CommonStyles from "../../../Styles";
import { POSTER_IMAGE_BASEURL, checkBadge, getUserBadgeIcon, indexOfLatestDateTime } from "utils/HelperFunctions";
import AppColors from "utils/Colors";
import recommendationsAPI from "api/recommendationsAPI";
import { ActivityIndicator } from "react-native-paper";
import StringConstants from "utils/StringConstants";
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledHeight, scaledWidth } from "utils/Dimensions";
import userProfileAPI from "api/userProfileAPI";
import Toast from "react-native-toast-message";
import FontFamily from "utils/FontFamily";
import { CommonAppContext } from "../../stores/common/commonAppContext";
import { setReviewImpressionApi } from "utils/CommonApiCalls";
import { AnimatedProgressCircle } from "../AnimatedProgressCircle";
import { httpRegex } from "utils/DataConstants";
import { apiPosterImage, getMoviePoster, getSafeSubstring } from "utils/utilFunctions";

export default function ReviewCard({
  key,
  item,
  userName='',
  commentModalItem=null,
  movieID=null,
  initialLoading,
  navigationParams,
  navigation,
  comUserArray=[],
  reviewObj=null,
  postID=null,
  headerTitle='',
  userID,
  fontSize,
  collapsed = true,
  showComments,
  isCommentModal=false,
  showRatingDetails = false,
  onUserClick = (f) => f,
  onLikeClick = (f) => f,
  onMoreClick = (f) => f,
  onCommentClick = (f) => f,
  postComment = (replyOnChild, parentSK, comment, taggedIDs) => f,
  onUpdateComment = (f) => f,
  showGuestFlow = false,
  showLoginModal,
  showTop3 = false
}) {
  
  const { commonAppState, commonDispatch } = useContext(CommonAppContext);
  const [passedItem, setPassedItem] = useState(item)
  const mentionInputRef = useRef();
  if(!passedItem.reviewcomment) {
    passedItem.reviewcomment = "";
  }
  const [reviewText, setReviewText] = useState(passedItem.reviewcomment);
  const [showTranslatedContent, setShowTranslatedContent] = useState(false);
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [msgDelete, setMsgDelete] = useState(
    StringConstants.WANT_TO_DELETE_REVIEW
  );
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [actionArr, setActionArr] = useState([]);

  const [passedComUserArray, setComUserArr] = useState(comUserArray?.slice());

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const [isLiked, setIsLiked] = useState(passedItem.islike);
  const [likes, setLikes] = useState(parseInt(passedItem.likes));
  
  const [isFirstReply, setFirstReply] = useState(parseInt(true));
  const [dislikes, setDislikes] = useState(parseInt(passedItem.dislikes));
  const [comments, setComments] = useState(parseInt(passedItem.comments));
  const [newlyAddedReplies, setNewlyAddedReplies] = useState([])
  const [replyingTo, setReplyingTo] = useState('');
  const [repliesData, setRepliesData] = useState([]);
  const [moreRepliesLoading, setMoreRepliesLoading] = useState(false);
  const [replyOnChild, setReplyOnChild] = useState(false);
  const [parentSK, setParentSK] = useState(null);
  const [repliesLastEvaluatedKey, setRepliesLastEvaluatedKey] = useState(null);
  const [editedItems, setEditedItems] = useState([])
  const [selectedEditItem, setSelectedEditItem] = useState(null)
  const [deletedItems, setDeletedItems] = useState([])
  const [readMore, setReadMore] = useState(
    showTop3 ? false : passedItem.reviewcomment.length > windowWidth * 0.3733 && collapsed
  );
  const [comment, setComment] = useState("");
  const [suggestionsListVisible, isSuggestionsListVisible] = useState(false);
  const [keywordTyped, setKeyboardTyped] = useState('');

  const [disableSend, setDisableSend] = useState(comment.trim().length == 0);
  const [listKey, setListKey] = useState(0);
  const [loadAll, setLoadAll] = useState(false);
  const [loadText, setLoadText] = useState("View more comments");
  const [friendsArr, setFriendsArr] = useState([]);
  const repliesDataRef = useRef(repliesData)
  const [childCommentEditedOrDeleted, setChildCommentEditedOrDeleted] = useState(false)
  const [watchingNowDetails, setWatchingNowDetails] = useState(null)
  const [movieImage, setMovieImage] = useState(null)
  const [imageLoadError, setImageLoadError] = useState(false)

  const progressWidth = Dimensions.get("window").width * 0.0667;
  let hasDiversifiedRating = passedItem.ratingstory && passedItem.ratingdirection && passedItem.ratingacting && passedItem.ratingvisuals && passedItem.ratingmusic &&
  passedItem.ratingstory != "0" && passedItem.ratingdirection != "0" && passedItem.ratingacting != "0" && passedItem.ratingvisuals != "0" && passedItem.ratingmusic != "0";

  const calculatePercentage = (value) => {
    if (value) {
      return (value / 5) * 100;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    repliesDataRef.current = repliesData
  },[repliesData])

  useEffect(() => {
    getFriends();
    if(item?.subtype == 'WATCHING' && item?.movieid){
      getMovieDetails()
    }
  }, []);

  // get movie details by calling api for subtype WATCHING
  const getMovieDetails = () => {
    try {
      recommendationsAPI
        .getMovieDetails(item?.movieid).then((response) => {
          if(response.data) {
            setWatchingNowDetails(response?.data)
            let responseData = response.data;
            let uri = null;
            if (responseData?.backdropimage != null && responseData?.backdropimage != '' && responseData?.backdropimage) {
              uri = POSTER_IMAGE_BASEURL + responseData.backdropimage;
            } else if(responseData?.movieimage != null && responseData?.movieimage != '' && responseData?.movieimage) {
              uri = responseData.movieimage;
            }
            setMovieImage(uri)
          }
          else {
            setWatchingNowDetails(null)
          }
        }
        );
      }
      catch(e){
        setWatchingNowDetails(null)
      }
  }
  useEffect(()=>{
    if(isCommentModal == true){
      setPassedItem(item)
    }
  },[item?.commentArr?.length])

  const getCommentReplies = async (sk) => {
    setMoreRepliesLoading(true)

    let getCommentRepliesResponse = await recommendationsAPI.getCommentReplies(
      passedItem?.postid,
      sk,
      repliesLastEvaluatedKey == null ? undefined : repliesLastEvaluatedKey
    );
    setMoreRepliesLoading(false)
   
    if(getCommentRepliesResponse?.data?.reply?.length > 0){
      
      setRepliesLastEvaluatedKey(getCommentRepliesResponse?.data?.sk);
      let replies = [...repliesDataRef.current, ...getCommentRepliesResponse?.data?.reply]
      const uniqueReplies = replies.filter((obj, index, self) => {
        return index === self.findIndex((o) => o.sk === obj.sk);
      });
      setRepliesData(uniqueReplies.slice());
    }
    setRepliesLastEvaluatedKey(getCommentRepliesResponse?.data?.reply?.lastevaluatedkey ?? null)
  };

  useEffect(()=>{

  },[])

  let newCommentsArr = [];
  if (passedItem.slicedCommentArr && !loadAll) {
    newCommentsArr = passedItem.slicedCommentArr;
  } else {
    newCommentsArr = passedItem.commentArr;
  }

  let createdDate = new Date(passedItem.datetime);
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

    const postReplyComment = (taggedIDs) => {
      mixpanel.track('Comment_Posted', {
        screen: 'ReviewComment',
        movieID: movieID,
      });
      let commentObj = {};
      commentObj.postid = postID;
      let postType = isCommentModal == true ? commentModalItem?.posttype : reviewObj[0]?.posttype;
      let pkPassed = isCommentModal == true ? commentModalItem?.pk : reviewObj[0]?.pk;
      let skPassed = isCommentModal == true ? commentModalItem?.sk : reviewObj[0]?.sk;
      let rpkPassed = isCommentModal == true ? commentModalItem?.rpk : reviewObj[0]?.rpk;
      let rskPassed = isCommentModal == true ? commentModalItem?.rsk : reviewObj[0]?.rsk;
      if (postType == "POST" ||
        postType == "WLIST") {
        commentObj.movieid = "0";
      } else {
        commentObj.movieid = movieID;
      }
      commentObj.comment = comment;
      if (postType == "POST" ||
      postType == "WLIST") {
        commentObj.pk = pkPassed;
        commentObj.sk = skPassed;
      } else {
        commentObj.pk = rpkPassed;
        commentObj.sk = rskPassed;
      }
      commentObj.postuserid = isCommentModal == true ? commentModalItem?.userid : reviewObj[0]?.userid;
      commentObj.touserids = passedComUserArray;
      if (postType == "POST" ||
      postType == "WLIST") {
        commentObj.moviename = "";
      } else {
        commentObj.moviename = isCommentModal == true ? commentModalItem?.title : reviewObj[0].moviename;
      }
      commentObj.taggedids = taggedIDs;
      commentObj.username = userName;
  
      commentObj.isreply = "true",
      commentObj.parentcommentid = parentSK
  
      recommendationsAPI
        .postComment(commentObj)
        .then((response) => {
          
          setChildCommentEditedOrDeleted(true)
          setRepliesData([])
          getCommentReplies(parentSK)
        })
        .catch((error) => {
          extendedLog.error(
            'Error in retreiving reviews for movie with movieID: ' +
            movieID +
            ' with message: ',
            error
          );
        });
    };
  

  const loadMoreClicked = (value) => {
    setLoadAll(!value);
    if (value) {
      newCommentsArr = passedItem.slicedCommentArr;
      setLoadText("View more comments");
    } else {
      newCommentsArr = passedItem.commentArr;
      setLoadText("View less comments");
    }
    
    setListKey(newCommentsArr.length);
  };

  const getFriends = async () => {
    let response = await friendlistAPI.getFriendListNew();
    let finalArr = [];
    if (response && response.data) {
      var allFrnds = response.data;
      if (allFrnds.length > 0) {
        allFrnds.forEach((element) => {
          let friend = {};
          friend.id = element.id;
          friend.name = element.fname;
          friend.image = element.thumbnail;
          finalArr.push(friend);
        });
        setFriendsArr(finalArr);
      }
    }
  };

  function processComment(comment) {
    if (comment.indexOf(`@[`) === -1) {
      if(showTop3){
        return <Text onPress={() => goToCommentDetails()} numberOfLines={passedItem.reviewtitle && passedItem.reviewtitle != "" && item?.subtype != 'WATCHING' ? 1 : 2} style={[styles.txtBody, { fontSize: fontSize || 14,}]}>
          {comment}
        </Text>;
      }
      else {
      return <Text style={[styles.txtBody, { fontSize: fontSize || 14,}]}>
        {comment}
      </Text>;
      }
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
          onPress={() => onUserClick(el.id, passedItem.posttype)}
        >
          {el.name}
        </Text>
      );
      comment = cArr.join(el.match);
    });
    processedComment.push(<Text style={[styles.txtBody, { fontSize: fontSize || 14 }]}>{comment}</Text>);
    return processedComment;
  }

  const fetchData = async (searchStr) => {

    const response = await searchAPI.getAutoCompleteAll(searchStr.trim(), 'P');
    if (response.data && response.data.length > 0) {
      let finalData = [];
      response.data.forEach((el) => {
        if (
          el.items &&
          el.items?.length > 0 &&
          (el.type == 'Movie' || el.type == 'Friend')
        ) {
          el.items?.forEach((itm) => {
            if (el.type == 'Movie') {
              itm.type = el.type;
              itm.id = 'M' + itm.id;
              itm.name = itm.title;
              finalData.push(itm);
            }
            else {
              let userItem = {};
              userItem.id = 'U' + itm.frienduserid;
              userItem.fname = itm.fname;
              userItem.name = itm.fname;
              userItem.thumbnail = itm.thumbnail;
              userItem.type = el.type;
              finalData.push(userItem);
            }
          });
        }
      });
      if (finalData.length > 0) {
        setFriendsArr(finalData);
      } else {
        setFriendsArr([]);
      }
    } else {
      setFriendsArr([]);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const moreClicked = (item, parentSk) => {
    let optionsArr = [];
    if (item.userid == userID) {
      optionsArr.push({ actionName: 'Delete', actionIcon: 'delete' });
      optionsArr.push({ actionName: 'Edit', actionIcon: 'edit' });
    } else {
      optionsArr.push({ actionName: 'Flag', actionIcon: 'flag' });
    }
    if(parentSK != parentSk){
      if(childCommentEditedOrDeleted){
        getComments();
      }
      setRepliesData([])
    }
    setParentSK(parentSk)
    setActionArr(optionsArr);
    //setting edit item
    setSelectedRow(item);
    setMoreOptionsVisible(true);
  };

  const doneClicked = async () => {
    setConfirmModalVisible(false);
    if (selectedRow.type == 'COM') {
      let commentObj = {};
      commentObj.pk = selectedRow.pk;
      commentObj.sk = selectedRow.sk;
      commentObj.rpk = reviewObj[0].rpk;
      commentObj.rsk = reviewObj[0].rsk;
      let response = await recommendationsAPI.deleteComment(commentObj);

      if (response.status == 200) {
        getCommentReplies(parentSK)
        let deletedComments = deletedItems.slice();
        if(deletedComments?.length == 0){
          deletedComments[0] = {sk: selectedRow?.sk}
        }
        else if(deletedComments?.length > 0){
        let isItemPresent = deletedComments.some(item => item?.sk === selectedRow?.sk);
        if(!isItemPresent){
          deletedComments.push({sk: selectedRow?.sk})
        }
        }
        
        if(deletedComments?.length > 0)
        setDeletedItems(deletedComments.slice())
        setChildCommentEditedOrDeleted(true)

      }
    } else {
      //TODO:
      let reviewObject = {};
      reviewObject.pk = selectedRow.pk;
      reviewObject.sk = selectedRow.sk;
      reviewObject.postid = selectedRow.postid;
      let delReviewResponse = await recommendationsAPI.deleteReview(
        reviewObject
      );
      if (delReviewResponse.status == 200) {
        if (navigationParams && navigationParams.fromScreen) {
          navigation.navigateDeprecated(navigationParams.fromScreen);
        } else {
          navigation.navigateDeprecated('MovieDetailsScreen');
        }
      }
    }
  };

  const actionClicked = async (item, action) => {
    setMoreOptionsVisible(false);
    if (action.actionName == 'Delete') {
      if (selectedRow.type == 'COM') {
        setMsgDelete(StringConstants.WANT_TO_DELETE_COMMENT);
      } else {
        setMsgDelete(StringConstants.WANT_TO_DELETE_REVIEW);
      }
      setConfirmModalVisible(true);
    } else if (action.actionName == 'Flag') {
      let contentId = {};
      contentId.PK = item.pk;
      contentId.SK = item.sk;
      //TODO: userID = userid or userID?
      try {
        let res = await userProfileAPI.insertReportedEvent(
          userID,
          JSON.stringify(contentId),
          item.type
        );
        if (res.status == 200) {
          Toast.show({
            type: 'beeToast',
            text1:
              StringConstants.THANKS_FOR_REPORTING_WE_WILL_REVIEW,
            visibilityTime: 2000,
            position: 'bottom',
            autoHide: true,
          });
        }
      } catch (error) {
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.code == 'dup'
        ) {
          Toast.show({
            type: 'infoToast',
            text1: StringConstants.UNDER_REVIEW,
            visibilityTime: 2000,
            position: 'bottom',
            autoHide: true,
          });
        } else {
          extendedLog.error(
            'Error executing  userProfileAPI.insertReportedEvent with message:',
            error
          );
        }
      }
    } else if (action.actionName == 'Edit') {
      if (item.type == 'COM') {
        //TODO: verify if it's useful or can remove
        // let index = reviewObj[0].commentArr.findIndex(
        //   (element) => element.sk === item.sk
        // );
        // reviewObj[0].commentArr[index].isEdit = true;
        setSelectedEditItem(item.sk)
         
      } 
      else if (item.posttype == 'POST') {
        //TODO
        navigation.navigateDeprecated('CreatePost', {
          fromScreen: 'ReviewComment',
          userName: item.username,
          userID: item.userid,
          item: item,
          communityName: headerTitle,
          postObj: reviewObj,
        });
      } else {
        //TODO
        let navToScreen = navigationParams && navigationParams?.fromScreen;
        if (navToScreen == 'ReviewMain') {
          navToScreen = 'ReviewMain';
        } else {
          navToScreen = 'ReviewComment';
        }
        navigation.navigateDeprecated('PostReview', {
          fromScreen: navToScreen,
          movieID: movieID,
          userName: item.username,
          movieName: item.moviename,
          userID: item.userid,
          item: item,
          reviewObj: reviewObj,
        });
      }
    }
  };


  const updateReplyComment = async (pk, sk, updatedComment) => {
    let updObj = {};
    updObj.pk = pk;
    updObj.sk = sk;
    updObj.content = updatedComment;
    let updRes = await recommendationsAPI.updateComment(updObj);
    if (updRes.status == 200) {
      //TODO:
      let editedData = editedItems.slice();
      if(editedData?.length == 0){
        editedData[0] = {sk: sk, isEdit: true}
        
      }
      else if(editedData?.length > 0){
        let isItemPresent = editedData.some(item => item?.sk === sk);
        if(!isItemPresent){
          editedData.push({sk: sk, isEdit: true})
        }
      }
      setEditedItems(editedData.slice())
      setSelectedEditItem(null)

    }
  };


  const renderCard = (item, onSuggestionPress) => {
    return (
      <View style={{ backgroundColor: "#121212" }}>
        <AutoCompSearchCard key={item.id} item={item} onMovieClick={() => onSuggestionPress(item)} onUserClick={() => onSuggestionPress(item)} />
      </View>
    );
  }

  const searchEntered = useCallback(
    debounce((textParam) => {
      fetchData(textParam);
    }, 500),
    []
  );


  const renderSuggestions = ({ keyword, onSuggestionPress }) => {
    if (keyword == null || keyword == undefined) {
      isSuggestionsListVisible(false)
      setKeyboardTyped('')
      return null;
    }
    isSuggestionsListVisible(true)

    if(keyword != keywordTyped && keyword?.length > 1){
      searchEntered(keyword);
    }
    setKeyboardTyped(keyword)
    return (
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        nestedScrollEnabled={true}
        style={CommonStyles.suggestionsContainer}
      >
        {friendsArr
          .filter(
            (item) =>
              item?.name
                ?.toLocaleLowerCase()
                .includes(keyword.toLocaleLowerCase()) ||
              item?.fname
                ?.toLocaleLowerCase()
                .includes(keyword.toLocaleLowerCase())
          )
          .map((item) =>
            renderCard(item, onSuggestionPress)
          )}
      </ScrollView>
    );
  };

  const openKeyboard = () => {
    setTimeout(() => {
      mentionInputRef?.current?.focus();
    }, 100);
  }

  const getComments = async () => {
    let getCommentResponse = await recommendationsAPI.getCommentsForPost(
      postID
    );
    setChildCommentEditedOrDeleted(false)
    let modifiedResponse = getCommentResponse?.data?.items;
    if (modifiedResponse && reviewObj[0]) {
      reviewObj[0].commentArr = modifiedResponse;
      let userArray = [];
      userArray.push(reviewObj[0].userid);
      modifiedResponse.map((item) => {
        if (!userArray.includes(item.userid)) userArray.push(item.userid);
      });
      setComUserArr(userArray);
      if (modifiedResponse.length > 2) {
        reviewObj[0].slicedCommentArr = modifiedResponse.slice(
          modifiedResponse.length - 2,
          modifiedResponse.length
        );
      }
      reviewObj[0].comments = reviewObj[0].commentArr.length;
      //setKey(reviewObj[0].commentArr.length);
      setPassedItem(reviewObj[0])
      if (reviewObj[0]?.slicedCommentArr && !loadAll) {
        newCommentsArr = reviewObj[0]?.slicedCommentArr;
      } else {
        newCommentsArr = reviewObj[0]?.commentArr;
      }
    }

  };

  const loadMorePressed = (sk) => {
    if(parentSK != sk){
      if(childCommentEditedOrDeleted){
        getComments();
      }
      setRepliesData([])
    }
    setParentSK(sk)
    getCommentReplies(sk)
  }

  const onReplyPress = (name, id, parentSKId, firstReply) => {
   
    if(!isKeyboardVisible){
      openKeyboard()
    }
    setFirstReply(firstReply)
    if(!firstReply){
      let taggedUser = `@[${name}](U${id}) `
      //sample format for tags is "@[Testimony](M140920) "
      setComment(taggedUser)
    }
    setReplyingTo(firstReply ? '' : name)
    if(parentSKId != parentSK){
      if(childCommentEditedOrDeleted){
        getComments();
      }
      setRepliesData([])

    }
    setParentSK(parentSKId)
    if(!replyOnChild)
    setReplyOnChild(true)
  }
  

  const replyLoadMoreFooter = (sk) => 
  {
    return (
      <TouchableOpacity style={styles.loadMoreReplies} onPress={() => loadMorePressed(sk)}>
        {moreRepliesLoading && sk == parentSK ? 
        <View style={{flexDirection: 'row'}}>
          <Text style={[
            styles.txtBody,
            {
              opacity: 0.6,
              marginRight: 8
            },
          ]}>{StringConstants.LOADING_MORE_REPLIES} </Text>
          <ActivityIndicator style={{opacity: 0.6,}} color={AppColors.GREY_VARIANT10} size={25} />
        </View>
        :
          <Text style={[
            styles.txtBody,
            {
              opacity: 0.6,
            },
          ]}>{StringConstants.LOAD_MORE_REPLIES}</Text>
        }
      </TouchableOpacity>
    );
    
  }

  // empty view when no comments are available
  const NoCommentsAvailable = () => (
    (
     <View style={[CommonStyles.flexOneCenter, {height: SCREEN_HEIGHT * 0.36}]}>
         <Text style={styles.noComments}>{StringConstants.NO_COMMENTS_YET}</Text>
         <Text style={styles.startConversation}>{StringConstants.START_THE_CONVERSATION}</Text>
     </View>
   )
 );

 // navigate to movie details
 const movieClicked = () => {
  let items = [];
  items.push(watchingNowDetails);
  navigation.navigateDeprecated("MovieDetailsScreen", {
    items: items,
    item: watchingNowDetails
  });
};

  //on click read more
  const readMoreClicked = () => {
    setReviewImpressionApi(item?.pk, item?.sk, extendedLog);
    setReadMore(false)
  }

  //circular progress view
  const animatedCircle = (value: any, label: string) => {
    return (
      <AnimatedProgressCircle
          showCountOnly={true}
          viewOnly={true}
          filledRingColor={AppColors.GREY_VARIANT4}
          ringColor={AppColors.GREY_VARIANT6}
          percent={calculatePercentage(
            value
          )}
          innerText={value}
          label={label}
          horizontalGap={20}
          padding={2}
          outerWidth={3.2}
          size={SCREEN_WIDTH * 0.15}
      />
    )
  }

    //render text for link or normal review
    const renderText = (paragraph) => {
      if(passedItem?.userrole == 'celebrity'){
          const parts = paragraph.split(httpRegex);
      
          return parts.map((part, index) => 
          httpRegex.test(part) ? (
              <Text 
                key={`link-${index}`} 
                style={[styles.txtBody, { fontSize: fontSize || 14, color: AppColors.LIGHT_YELLOW }]}
                onPress={() => Linking.openURL(part)}>
                {part}
              </Text>
            ) : (
              processComment(part) // Return plain string instead of <Text>
            )
          );
        }
        else {
          return processComment(paragraph);
        }
    };

  const ratingView = () => {
    return (
      <View style={[CommonStyles.rowAlignCenter]}>
          <Text
            style={styles.ratingValue}
          >
            {passedItem.reviewrating}
          </Text>
          <StarRating height={16} width={16} />
        </View>
    )
  }

  //go to comment details
  const goToCommentDetails = () => {
    if(showTop3)
      onCommentClick(passedItem.postid)
  }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <>
          <ScrollView
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            {isCommentModal != true &&
            <>
            <View style={{ flexDirection: "row", paddingBottom: 4 }}>
              <View style={{ paddingRight: 12 }}>
                <TouchableOpacity onPress={() => onUserClick(passedItem.userid)}>
                  {passedItem.userimage ? (
                    <Image
                      source={{ uri: passedItem.userimage }}
                      style={[showTop3 ? styles.smallUserPic : styles.thumbnail]}
                    />
                  ) : (
                    <DefaultUser height={showTop3 ? 24 : 36} width={showTop3 ? 24 : 36} />
                  )}
                  {passedItem.ispremium && commonAppState.isPremiumFlowEnabled && 
                    <View style={styles.premiumBadge}>
                      <PremiumBadge height={showTop3 ? 10 : 13} width={showTop3 ? 10 : 13} />
                    </View>
                  }
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => onUserClick(passedItem.userid)}
                      style={[styles.userName,{paddingTop: showTop3 ? 0 : 2,}]}
                    >
                      <Text
                        numberOfLines={1}    
                        ellipsizeMode="tail"
                        style={[
                          styles.commentHeader,
                          { color: appConsumer.theme.colors.text },
                          {fontSize: showTop3 ? 13 : 16}
                        ]}
                      >
                        {passedItem.username}
                      </Text>
                      {(checkBadge(passedItem.userrole)) && (
                        <View style={[!showTop3 ? styles.badgeStyle : {padding: 3}]}>
                          {getUserBadgeIcon(passedItem.userrole, showTop3 ? 14 : 16)}
                        </View>
                      )}
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.txtBody,
                        {
                          color: appConsumer.theme.colors.text,
                          fontSize: 10,
                          opacity: 0.6,
                          paddingTop: showTop3 ? 4 : 8,
                          paddingLeft: 8,
                          flex: 1,
                        },
                      ]}
                    >
                      {diffString}
                    </Text>
                      {!showComments && isCommentModal != true ? (
                      <TouchableOpacity
                        style={styles.moreButton}
                        onPress={() => onMoreClick(passedItem)}
                      >
                        <MoreVertical height={20} width={20} />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    {passedItem.familyfriendly == "true" && (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Green />
                        <Text
                          style={[
                            {
                              fontFamily: "DMSans-Regular",
                              color: "#388E3C",
                              paddingLeft: 4,
                              fontSize: 10,
                              marginRight: 8,
                            },
                          ]}
                        >
                          FAMILY FRIENDLY
                        </Text>
                      </View>
                    )}
                    {passedItem.hasspoilers == "true" && (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Red />
                        <Text
                          style={[
                            {
                              fontFamily: "DMSans-Regular",
                              color: "#E53935",
                              paddingLeft: 4,
                              fontSize: 10,
                            },
                          ]}
                        >
                          HAS SPOILERS
                        </Text>
                      </View>
                    )}
                  </View>
                  {item?.subtype == 'WATCHING' && 
                    <View>
                      <Text style={CommonStyles.status}>{StringConstants.NOW_WATCHING}</Text>
                    </View>
                  }
                </View>
                {showComments &&
                  passedItem.reviewrating &&
                  passedItem.reviewrating != "0" ? (
                  <View
                    style={{
                      alignItems: "flex-start",
                      paddingTop: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <Rating
                      ratingCount={5}
                      imageSize={15}
                      fractions={1}
                      startingValue={parseFloat(passedItem.reviewrating)}
                      jumpValue={0.5}
                      ratingColor="#e9c46a"
                      tintColor={appConsumer.theme.colors.primary}
                      readonly={true}
                    />
                  </View>
                ) : null}
                {showComments ? (
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 13,
                      right: 10,
                      width: 20,
                      height: 20,
                    }}
                    onPress={() => onMoreClick(passedItem)}
                  >
                    <MoreVertical height={15} width={15} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            
            {showRatingDetails && hasDiversifiedRating && <View style={{
              flexDirection: 'row', marginBottom: 8, marginTop: 8, flex: 1, justifyContent: 'space-between',
              width: Dimensions.get("window").width - 48
            }}>
              {passedItem.ratingstory && passedItem.ratingstory != "0" && passedItem.ratingstory != "NaN" &&
                animatedCircle(passedItem.ratingstory, 'Story')
              }
              {passedItem.ratingstory && passedItem.ratingdirection != "0" && passedItem.ratingdirection != "NaN" &&
                animatedCircle(passedItem.ratingdirection, 'Direction')
              }
              {passedItem.ratingstory && passedItem.ratingacting != "0" && passedItem.ratingacting != "NaN" &&
                animatedCircle(passedItem.ratingacting, 'Acting')
              }
              {passedItem.ratingstory && passedItem.ratingvisuals != "0" && passedItem.ratingvisuals != "NaN" &&
                animatedCircle(passedItem.ratingvisuals, 'Visuals')
              }
              {passedItem.ratingstory && passedItem.ratingmusic != "0" && passedItem.ratingmusic != "NaN" &&
                animatedCircle(passedItem.ratingmusic, 'Music')
              }
            </View>}
            {/* Only render comment container if there's actual content to display */}
            {(item?.subtype == 'WATCHING' || 
              (passedItem.reviewtitle && passedItem.reviewtitle != "" && item?.subtype != 'WATCHING') ||
              (reviewText && reviewText.trim() != "") ||
              passedItem.translatedcontent ||
              passedItem.image ||
              (!showComments && passedItem.reviewrating && passedItem.reviewrating != "0" && item?.subtype != 'WATCHING')) && (
              <View style={[styles.commentContainer, { marginTop: 2, paddingLeft: showTop3 ? 0 : 8 }]}>
                {item?.subtype == 'WATCHING' && (
                      <Text style={[styles.txtHeader]}>
                        {passedItem.username}{StringConstants.IS_WATCHING}
                        <Text style={[styles.txtHeader, {color: AppColors.LIGHT_YELLOW}]} onPress={() => movieClicked()}>
                          {watchingNowDetails?.title}
                        </Text>
                      </Text>
                  )}
                  {item?.subtype == 'WATCHING' && 
                    <TouchableOpacity onPress={() => movieClicked()}>
                      {!imageLoadError || apiPosterImage(item) != null ? (
                      <FastImage
                        style={styles.movieLogo}
                        source={{ uri: !imageLoadError ? getMoviePoster(item?.id || item?.movieid || item?.movieId) : apiPosterImage(item) }}
                        resizeMode={FastImage.resizeMode.cover}
                        onError={() => setImageLoadError(true)}
                        defaultSource={require('assets/defaultMovie.png')}
                      />
                    ) : (
                      <View
                          style={[
                            styles.movieNameContainer
                          ]}
                        >
                          <Text style={CommonStyles.txtImage}>{watchingNowDetails?.title}</Text>
                        </View>
                    )}
                    </TouchableOpacity>
                  }
                  {passedItem.reviewtitle && passedItem.reviewtitle != "" && item?.subtype != 'WATCHING' && (
                    <Text onPress={() => goToCommentDetails()} style={[styles.txtHeader, { marginBottom: 8 }]}>
                      {passedItem.reviewtitle}
                    </Text>
                  )}
                  {!showComments && passedItem.reviewrating && passedItem.reviewrating != "0" && item?.subtype != 'WATCHING' && (
                    <View style={{ alignItems: 'flex-start' }}>
                      <Rating
                        ratingCount={5}
                        imageSize={20}
                        fractions={1}
                        startingValue={parseFloat(passedItem.reviewrating)}
                        jumpValue={0.5}
                        ratingColor={AppColors.LIGHT_YELLOW_VARIANT10}
                        tintColor={AppColors.GREY_VARIANT2}
                        readonly={true}
                      />
                    </View>
                  )}
                  {readMore ? (
                      <View>
                        <Text style={[styles.txtBody, { fontSize: fontSize || 14 }]}>
                          {renderText(getSafeSubstring(reviewText, windowWidth * 0.3733))}
                          {'... '}
                          {!showTop3 && <Text
                            onPress={() => readMoreClicked()}
                            style={{
                              color: AppColors.GREY_VARIANT9,
                            }}
                          >
                            {StringConstants.READ_MORE}
                          </Text>}
                        </Text>
                      </View>
                  ) : (
                    reviewText && reviewText.trim() != "" && (
                      <View style={{ marginBottom: 12 }}>
                        <View style={[CommonStyles.flexRowWrap]}>
                          {renderText(reviewText)}
                          {reviewText.length > windowWidth * 0.3733 && (
                            <TouchableOpacity
                              onPress={() => setReadMore(true)}
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
                                 {StringConstants.READ_LESS}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    )
                  )}
                  {passedItem.translatedcontent && passedItem.translatedcontent != "" && (
                    <TouchableOpacity
                      style={{paddingBottom: 16, paddingTop: 8 }}
                      onPress={() => {
                        setShowTranslatedContent(!showTranslatedContent);
                        if(showTranslatedContent){
                          setReviewText(passedItem.reviewcomment);
                        }else{
                          setReviewText(passedItem.translatedcontent);
                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.txtBody,
                          {
                            fontSize: 12,
                            marginLeft: -4,
                            color: appConsumer.theme.colors.clientPrimary
                          },
                        ]}
                      >
                        {" "}
                        {showTranslatedContent ? "See Original" : "See Translation"}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {passedItem.image && (
                        <FastImage source={{ uri: passedItem.image }}  style={[
                          {
                            width: Dimensions.get('window').width - 36,
                            height: Dimensions.get('window').width * 0.4667,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            marginBottom: 12
                          }
                        ]}
                        resizeMode={FastImage.resizeMode.cover} />
                      )}
              </View>
            )}
            {!showTop3 && <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 8,
                paddingBottom: 8,
                borderBottomWidth: 1,
                borderBottomColor: appConsumer.theme.colors.homeCard,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-end",
                  padding: 5,
                  paddingBottom: 0,
                }}
                onPress={() => {
                  if(showGuestFlow){
                    onLikeClick(passedItem, false);
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
                      isLiked == "null" || isLiked == "false" ? "true" : "null"
                    );
                    onLikeClick(passedItem, true);
                  }
                }}
              >
                {isLiked == "true" ? <LikeFilled height={20} width={20} /> : <Like height={20} width={20} />}
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
              </TouchableOpacity>
              {/*Dislike Functionality Removed for now*/}
              {/* <TouchableOpacity
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "flex-end",
                  padding: 5,
                  paddingBottom: 0,
                }}
                onPress={() => {
                  if(showGuestFlow){
                    onLikeClick(passedItem, false);
                  }
                  else {
                    setLikes(
                      isLiked == "true" ? parseInt(likes) - 1 : parseInt(likes)
                    );
                    setDislikes(
                      isLiked == "null" || isLiked == "true"
                        ? parseInt(dislikes) + 1
                        : parseInt(dislikes) - 1
                    );
                    setIsLiked(
                      isLiked == "null" || isLiked == "true" ? "false" : "null"
                    );
                    onLikeClick(passedItem, false);
                  }
                }}
              >
                {isLiked == "null" || !isLiked ? (
                  <Dislike height={20} width={20} />
                ) : isLiked == "true" ? (
                  <Dislike height={20} width={20} />
                ) : (
                  <DislikeFill height={20} width={20} />
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
              </TouchableOpacity> */}
              {passedItem.type == "COM" ? null : (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "flex-end",
                    padding: 5,
                    paddingBottom: 0,
                  }}
                  onPress={() => {
                    setComment("")
                    openKeyboard();
                    setReplyOnChild(false)
                    onCommentClick(passedItem.postid)
                  }}
                >
                  <Comment height={20} width={20} />
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
                </TouchableOpacity>
              )}

            </View>
            }
            </>
            }
            {showComments && passedItem.commentArr && passedItem.commentArr.length > 2 ? (
              <View
                style={{
                  marginBottom: 16,
                  marginLeft: windowWidth * 0.133,
                  marginTop: 16,
                }}
              >
                <TouchableOpacity onPress={() => loadMoreClicked(loadAll)}>
                  <Text style={[styles.txtBody, { fontFamily: "DMSans-Bold" }]}>
                    {loadText}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {!showTop3 && showComments && newCommentsArr && newCommentsArr.length > 0 ? (
              <View style={[isCommentModal == true ? {backgroundColor: AppColors.BLACK_VARIANT } : null, { marginLeft: 32}]}>
                <FlatList
                  key={listKey}
                  data={newCommentsArr}
                  extraData={newCommentsArr}
                  keyboardShouldPersistTaps="always"
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    let parentItem = item;
                    let showLoadMore = true;
                    let repliesDataValue = []
                    if(item?.reply?.length > 0){
                      if(item?.sk == parentSK){
                        repliesDataValue = repliesData?.length > 0 ? repliesData : [item.reply[indexOfLatestDateTime(item.reply)]];
                        showLoadMore = (moreRepliesLoading || repliesLastEvaluatedKey != null) || (repliesData.length == 0 && item?.reply?.length > 1)  ? true : false;
                      }
                      else {

                        showLoadMore = item?.reply?.length > 1 ? true : false;
                        repliesDataValue = [item.reply[indexOfLatestDateTime(item.reply)]];
                      }
                      // remove comments which are deleted
                      if(repliesDataValue?.length > 0 && deletedItems?.length > 0){
                        let repliesCopy = repliesDataValue.slice()
                        deletedItems.map((obj) => {
                          const indexOfObject = repliesCopy.findIndex(obj2 => obj2.sk == obj.sk);
                          if(indexOfObject > -1)
                            repliesCopy.splice(indexOfObject, 1);
                        })
                        
                        repliesDataValue = repliesCopy.slice();
                      }
                      // set edited review comments & open input box for edit if any comment is selected to edit
                      if(editedItems?.length == 0 && selectedEditItem != null){
                        let repliesCopy = [...repliesDataValue]
                        repliesCopy = repliesCopy.map((obj1) => {
                          return {
                            ...obj1,
                            isEdit: selectedEditItem == obj1?.sk ? true : false
                          }
                        });
                        
                        repliesDataValue = repliesCopy.slice();
                      }
                      if(editedItems?.length > 0 && repliesDataValue?.length > 0){
                        let repliesCopy = [...repliesDataValue]
                        repliesCopy = repliesCopy.map((obj1) => {
                          const foundObject = editedItems.find(obj2 => obj2?.sk == obj1.sk);
                          return {
                            ...obj1,
                            reviewcomment : foundObject?.reviewcomment ?? obj1.reviewcomment,
                            isEdit: selectedEditItem == obj1?.sk ? true : false
                            
                          }
                        });
                        
                        repliesDataValue = repliesCopy.slice();
                      }
                    }
                    return (
                      <View>
                        <CommentCard
                          item={item}
                          showGuestFlow={showGuestFlow}
                          userID={userID}
                          onUserClick={onUserClick}
                          isCommentModal={isCommentModal}
                          onMoreClick={onMoreClick}
                          onLikeClick={onLikeClick}
                          onReplyPress={()=> onReplyPress(item?.username, item.userid, item?.sk, true)}
                          onUpdateComment={onUpdateComment}
                        />
                        <View style={{marginLeft: 20, marginTop: 15}}>
                        {showComments && repliesDataValue?.length > 0 ? (
                          <View style={{ marginLeft: 32 }}>
                            <FlatList
                              key={listKey}
                              data={repliesDataValue}
                              ListFooterComponent={repliesDataValue?.length > 0 && showLoadMore ? replyLoadMoreFooter(item.sk) : null}
                              keyboardShouldPersistTaps="always"
                              keyExtractor={(item, index) => item?.sk?.toString()}
                              renderItem={({ item }) => {


                                return (
                                  <CommentCard
                                    item={item}
                                    onReplyPress={()=> onReplyPress(item?.username, item.userid, parentItem?.sk, false)}
                                    userID={userID}
                                    isChildComment={true}
                                    onUserClick={onUserClick}
                                    isCommentModal={isCommentModal}
                                    onMoreClick={(item) => moreClicked(item, parentItem?.sk)}
                                    onLikeClick={onLikeClick}
                                    onUpdateComment={updateReplyComment}
                                  />
                                );
                              }}
                            />
                          </View>
                          ) : null}
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            ) : 
              initialLoading == false && isCommentModal == true && <NoCommentsAvailable />
            }
          </ScrollView>
          {showComments ? (
            <View style={{}}>
              {isKeyboardVisible && replyingTo != '' && <View style={{height: scaledHeight(30), width: SCREEN_WIDTH * 0.75, paddingHorizontal: scaledWidth(5), justifyContent: 'center',}}>
              <Text style={[
                styles.txtBody,
                {
                  opacity: 0.6,
                  marginRight: 8
                },
              ]}> {StringConstants.REPLYING_TO} {replyingTo}</Text>
                </View>}
              <View
                style={[ isCommentModal == true ? styles.modalInputContainerStyle : (styles.reviewInputContainerStyle), isCommentModal != true ? {alignItems: 'flex-end'} : {}]}
              >
                <MentionInput
                  style={[
                    styles.inputStyle,
                    isCommentModal == true ? styles.commentsModalInput : styles.reviewInputStyle,
                    {
                      color: appConsumer.theme.colors.text,
                      paddingTop: 10,
                      paddingBottom: 10,

                      backgroundColor: isCommentModal == true ? AppColors.GREY_VARIANT2 : appConsumer.theme.colors.grey9alt
                    },
                    suggestionsListVisible ? {maxHeight: 80,} : {}
                  ]}
                  inputRef={mentionInputRef}
                  value={comment}
                  onChange={(text) => {
                    setComment(text);
                    setDisableSend(text.trim().length == 0);
                  }}
                  partTypes={[
                    {
                      trigger: "@", // Should be a single character like '@' or '#'
                      renderSuggestions,
                      isInsertSpaceAfterMention: true,
                      isBottomMentionSuggestionsRender: false,
                      textStyle: {
                        fontFamily: "DMSans-Bold",
                        fontSize: 12,
                        color: appConsumer.theme.colors.link,
                      }, // The mention style in the input
                    },
                  ]}
                  multiline={true}
                  autoCapitalize="none"
                  keyboardAppearance="dark"
                  maxLength={500}
                  placeholder={replyOnChild ? StringConstants.WRITE_A_REPLY : StringConstants.WRITE_A_COMMENT}
                  underlineColorAndroid="transparent"
                  placeholderTextColor={isCommentModal == true ? AppColors.GREY : appConsumer.theme.colors.placeholder}
                />
                <TouchableOpacity
                  disabled={disableSend}
                  onPress={() => {
                    let taggedIDs = comment
                      .split(`@[`)
                      .map(
                        (el) =>
                          el &&
                          el.substr(
                            el.indexOf(`(`) + 1,
                            el.indexOf(`)`) - el.indexOf(`(`) - 1
                          )
                      )
                      .filter((el) => el);
                    if(replyOnChild && !isFirstReply){
                      postReplyComment(taggedIDs)
                    }
                    else {
                      postComment(replyOnChild, parentSK, comment, taggedIDs);
                    }
                    setComment("")
                    setDisableSend(true);
                  }}
                  activeOpacity={1}
                  style={[
                    isCommentModal == true ? styles.borderStyles : {borderRadius: 8},
                    styles.sendBtnContainer,
                    isCommentModal == true ? 
                    {
                    height: 47.5,
                    opacity: disableSend && isCommentModal != true ? 0.5 : 1,
                    backgroundColor: isCommentModal == true ? AppColors.GREY_VARIANT2 : appConsumer.theme.colors.grey9alt,
                    
                  }
                : 
                {
                  
                  opacity: disableSend ? 0.5 : 1,
                  backgroundColor: appConsumer.theme.colors.grey9alt,
                }
                ]}
                >
                  <Send width={24} height={24} />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {moreOptionsVisible ? (
            <MoreOptionsModal
              toggleModal={moreOptionsVisible}
              cancelClick={() => setMoreOptionsVisible(false)}
              actions={actionArr}
              item={selectedRow}
              onClick={actionClicked}
            />
          ) : null}
          {confirmModalVisible ? (
            <ConfirmModal
              toggleModal={confirmModalVisible}
              message={msgDelete}
              cancelText='Cancel'
              doneText='Delete'
              cancelClicked={() => setConfirmModalVisible(false)}
              doneClicked={() => doneClicked()}
            />
          ) : null}
        </>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  userName: { 
     flexDirection: "row", 
     maxWidth: SCREEN_WIDTH * 0.8 
    },
  commentHeader: {
    maxWidth: SCREEN_WIDTH * 0.58,
    fontSize: 16,
    fontFamily: "DMSans-Bold",
  },
  commentContainer: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  borderStyles: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  sendBtnContainer: {
    height: 48,
    width: 46,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 0,
  },
  thumbnail: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  smallUserPic: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  txtBody: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    opacity: 0.8,
    color: "#E0E0E0",
  },
  premiumBadge: {
    position: 'absolute',
    bottom: 1,
    right: -2.9
  },
  commentsModalInput: {
    width: SCREEN_WIDTH * 0.81, 
    borderTopLeftRadius: 8, 
    borderBottomLeftRadius: 8,
  },
  reviewInputContainerStyle: {
    flexDirection: "row", 
    marginTop: 8, 
    marginLeft: 8 
  },
  reviewInputStyle: {
    borderRadius: 8,
    marginRight: 7, 
    width: SCREEN_WIDTH * 0.75
  },
  itemContainer: {
    padding: 8,
    flexDirection: "row",
    paddingLeft: 16,
    alignItems: "center",
    height: 42,
    borderRadius: 8,
    width: Dimensions.get("window").width * 0.644,
    //marginBottom: 1,
    marginTop: 1,
  },
  startConversation: {
    fontSize: 14, 
    marginTop: 15, 
    color: AppColors.GREY_VARIANT4, 
    fontFamily: FontFamily.DMSansRegular
  },
  modalInputContainerStyle: {
    flexDirection: "row", 
    borderRadius: 8, 
    marginTop: 8, 
    minHeight: 40, 
    backgroundColor: AppColors.GREY_VARIANT2,
    marginHorizontal: 16, 
    alignItems: 'center'
  },
  noComments: {
    fontSize: 20, 
    color: AppColors.WHITE, 
    fontFamily: FontFamily.DMSansBold
  },
  inputStyle: {
    minHeight: 46,
    //marginRight: 7,
    marginLeft: 0,
    paddingLeft: 18,
    fontFamily: "DMSans-Regular",
    fontSize: 14,
  },
  loadMoreReplies: { paddingVertical: 15},
  movieLogo: {
    height: SCREEN_WIDTH * 0.45,
    width: '100%',
    borderRadius: 8,
    marginTop: 16
  },
  txtHeader: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    opacity: 0.8,
    color: AppColors.WHITE_VARIANT2
  },
  movieNameContainer: {
    backgroundColor: AppColors.BLACK,
    height: SCREEN_WIDTH * 0.45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 8,
    marginTop: 16
  },
  ratingValue: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.GREY_VARIANT4,
    marginRight: 2
  },
  badgeStyle: { 
    padding: 2, 
    paddingTop: 4
  },
  moreButton: {
    paddingTop: 6
  }
});
