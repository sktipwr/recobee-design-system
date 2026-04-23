import React, { useState, useEffect, useContext } from 'react';
import { AppConsumer } from 'context';
import UserLoveHeart from '../../icons/user-love-heart'
import recommendationsAPI from 'api/recommendationsAPI';
import watchlistAPI from 'api/watchlistAPI';
import userProfileAPI from 'api/userProfileAPI';
import { LOG } from 'config';
import DefaultUser from 'svg/user';
import Toast from 'react-native-toast-message';
import Like from 'icons/Like';
import LikeFilled from 'icons/LikeFilled'
import Dislike from "icons/Dislike";
import Comment from 'svg/comment';
import Group from 'svg/group';
import Globe from 'svg/globe';
import More from 'icons/MoreVertical';
import DislikeFill from "icons/DislikeFilled";
import Trailer from '../../icons/Trailer';
//import * as SecureStore from "expo-secure-store";
import EncryptedStorage from 'react-native-encrypted-storage';
import communityAPI from 'api/communityAPI';
import MoreOptionsModal from 'components/Modals/MoreOptionsModal';
import Critic from 'svg/critic';
import mixpanel from 'mixpanel';
import PremiumBadge from 'svg/premium_badge_icon';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image as RNImage,
  Alert,
} from 'react-native';
import { Pressable } from 'react-native';
import CommonStyles from 'styles';
import StringConstants from 'utils/StringConstants';
import { POSTER_IMAGE_BASEURL, checkBadge, getUserBadgeIcon } from 'utils/HelperFunctions';
import { CommonAppContext } from '../../stores/common/commonAppContext';
import ListCard from 'components/Cards/ListCard';
import MovieSearchCard from './MovieSearchCard';
import FastImage from 'react-native-fast-image';
import AppColors from 'utils/Colors';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import ConfirmModal from '../Modals/ConfirmModal';
import { apiBackdropImage, getMovieBackdropImage, getMoviePoster } from 'utils/utilFunctions';

const RECOMMENDATION = 'recommendation';
const WATCHLIST = 'watchlist';
const REVIEW = 'review';
const POST = 'POST';

var extendedLog = LOG.extend('SocialFeedBaseCard');

const SocialFeedBaseCard = ({ item, navigation, children, home, fromCommunity, onMovieClick, onAddToMyProfileClick = () => {}, deletePost, isGuestFlow = false, showLoginModalCb, closeFriends }) => {
  const [isLiked, setIsLiked] = useState(item.islike || 'null');
  const [likes, setLikes] = useState(parseInt(item.likes));
  const [dislikes, setDislikes] = useState(parseInt(item.dislikes));
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState();
  const [moreOptionsVisible, setMoreOptionsVisible] = useState(false);
  const [watchingNowDetails, setWatchingNowDetails] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null);
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const [moreOptions, setMoreOptions] = useState([{ actionName: 'Flag Post', actionIcon: 'flag' }])
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  let createdDate = new Date(item?.datetime);
  let today = new Date();
  var diffString = '';
  var diffFound = false;
  var diffInSeconds = (today.getTime() - createdDate.getTime()) / 1000;
  var timeDifference = Math.abs(Math.round(diffInSeconds / 60));
  const { commonAppState, commonDispatch } = useContext(CommonAppContext);
  
  useEffect(() => {
    let uri = require("assets/defaultMovie.png");

    if(watchingNowDetails != null){
      if (watchingNowDetails?.backdropimage == null || watchingNowDetails?.backdropimage == '') {
        uri = watchingNowDetails.movieimage;
      } else {
        uri = POSTER_IMAGE_BASEURL + watchingNowDetails.backdropimage;
      }
      setImage(uri)
    }
  },[watchingNowDetails])

  if (timeDifference > 60) {
    timeDifference = Math.abs(Math.round(timeDifference / 60));
  } else {
    diffFound = true;
    diffString = timeDifference + 'm';
  }

  if (!diffFound) {
    if (timeDifference > 24) {
      timeDifference = Math.abs(Math.round(timeDifference / 24));
    } else {
      diffFound = true;
      diffString = timeDifference + 'h';
    }
  }

  if (!diffFound) {
    if (timeDifference > 7) {
      timeDifference = Math.abs(Math.round(timeDifference / 7));
    } else {
      diffFound = true;
      diffString = timeDifference + 'd';
    }
  }

  if (!diffFound) {
    if (timeDifference > 4) {
      timeDifference = Math.abs(Math.round(timeDifference / 4));
    } else {
      diffFound = true;
      diffString = timeDifference + 'w';
    }
  }

  if (!diffFound) {
    if (timeDifference > 12) {
      timeDifference = Math.abs(Math.round(timeDifference / 12));
      diffFound = true;
      diffString = timeDifference + 'y';
    } else {
      diffFound = true;
      diffString = timeDifference + 'mo';
    }
  }

  let fromScreen = 'SocialTab';
  if (fromCommunity) {
    fromScreen = 'DetailsScreen';
  }else if(home){
    fromScreen = 'HomeTab';
  }

  useEffect(() => {
    try {
      EncryptedStorage.getItem('user_fname').then((userFName) => {
        setUserName(userFName);
      });
      EncryptedStorage.getItem('user_id').then((storedUserID) => {
        setUserID(storedUserID);
        if((`${storedUserID}` == `${item?.user?.id}`) || (`${storedUserID}` == `${item?.user?.userid}`) || (`${storedUserID}` == `${item?.userid}`)){
          let options = moreOptions?.slice()
          let deleteExists = moreOptions?.some(value => value.actionIcon == 'delete');
          if(deleteExists != true){
            options.unshift({ actionName: 'Delete', actionIcon: 'delete' })
          }
          setMoreOptions(options?.slice())
        }
      });
    }
    catch (error){
      console.error('Error:', error?.message)
    }
  }, []);

  //get movie meta
  const getMovieInfo = async () => {
    try {
      let response = await recommendationsAPI.getMovieStateForUser(item?.movieid);
      if (response && response.data) {
        setIsWatchlisted(response.data.is_in_watchlist);
      }
    }
    catch(error){
      console.error('Error:', error?.message)
    }
  };

  useEffect(() => {
    if(item?.subtype == "WATCHING"){
      getMovieInfo()
      getMovieDetails()
    }
  },[item])

  const getMovieDetails = () => {
    try {
      recommendationsAPI
        .getMovieDetails(item?.movieid).then((response) => {
          if(response.data) {
            setWatchingNowDetails(response?.data)
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

  useEffect(() => {
    let titleValue = '';
    if (watchingNowDetails?.title && watchingNowDetails?.title != "" && watchingNowDetails?.title?.length > 22) {
      titleValue = watchingNowDetails?.title?.substring(0, 20) + "..";
    }
    else {
      titleValue = watchingNowDetails?.title ?? '';
    }
    setTitle(titleValue)
  }, [watchingNowDetails])

  const getText = (feedItem) => {
    let str = ' ';
    if (feedItem.type === RECOMMENDATION) {
      str += 'Recommended you';
    } else if (feedItem.type === WATCHLIST) {
      if (feedItem.action == 'created') str += 'Created a new list';
      else if (feedItem.action == 'shared') str += 'Shared a list';
    } else if (feedItem.type === POST) {
      if(item?.subtype == 'WATCHING'){
        str += StringConstants.NOW_WATCHING
      }
      else {
        str += `Posted`;
      }
    } else if (feedItem.type === REVIEW) {
      if (feedItem.action === 'posted') {
        str += 'Posted a review';
      } else if (feedItem.action === 'commented') {
        str += 'Commented on review';
       
      }
    }
    if(str == ' ' && isGuestFlow){
      str = 'Posted a review'
    }
    
    str += ' ';
    return str;
  };

  const getPrivacyIcon = (feedItem) => {
    if (feedItem.type === RECOMMENDATION) {
      return <Group width={10} height={10} />;
    } else if (feedItem?.type === WATCHLIST) {
      if (
        feedItem?.action == 'created' &&
        (!feedItem?.access || feedItem?.access == 'G')
      )
        return <Globe width={11} height={11} />;
      else if (
        feedItem?.action == 'shared' ||
        (feedItem?.action == 'created' && feedItem?.access == 'F')
      )
        return <Group width={10} height={10} />;
    } else if (feedItem.type === REVIEW || feedItem.type === POST) {
      return <Globe width={11} height={11} />;
    }
  };

  const onLikeClick = async (item, value) => {
    mixpanel.track('Like_Feed', {
      screen: 'SocialBaseCard',
      source: 'feedCard',
      type: item?.type,
      feedID: item?.movieid || item?.listid,
    });
    if(isGuestFlow){
      showLoginModalCb()
    }
    else {
      let likeStatus = 'null';
      if (value) {
        if (isLiked == 'null' || isLiked == 'false') likeStatus = value;
      } else {
        if (isLiked == 'null' || isLiked == 'true') likeStatus = value;
      }
      let likeObj = {};
      likeObj.username = userName;
      if (item.type == 'watchlist') {
        likeObj.listname = item.store.name;
        likeObj.listid = item.listid;
      } else {
        likeObj.moviename = item.store.name;
        likeObj.movieid = item.movieid;
      }
      likeObj.postid = item.id;
      likeObj.islike = likeStatus.toString();
      likeObj.previousvalue = isLiked;
      likeObj.postuserid = item?.user?.id ?? item?.userid;
      likeObj.pk = item.pk;
      likeObj.sk = item.sk;
      if (value) {
        setLikes(
          isLiked == 'null' || isLiked == 'false'
            ? parseInt(likes) + 1
            : parseInt(likes) - 1
        );
        setDislikes(
          isLiked == 'false' ? parseInt(dislikes) - 1 : parseInt(dislikes)
        );
        setIsLiked(isLiked == 'null' || isLiked == 'false' ? 'true' : 'null');
      } else {
        setLikes(isLiked == 'true' ? parseInt(likes) - 1 : parseInt(likes));
        setDislikes(
          isLiked == 'null' || isLiked == 'true'
            ? parseInt(dislikes) + 1
            : parseInt(dislikes) - 1
        );
        setIsLiked(isLiked == 'null' || isLiked == 'true' ? 'false' : 'null');
      }
      let response = await recommendationsAPI.updateLikeForReview(likeObj);
      if (response.status == 200) {
      }
    }
  };

  const onShareClick = () => { };
  const onReplyClick = async () => {
    mixpanel.track('Comment_Feed', {
      screen: 'SocialBaseCard',
      source: 'feedCard',
      movieID: item.movieid,
    });
    if(isGuestFlow){
      showLoginModalCb()
    }
    else {
      if (item.type == POST) {
        let [postResponse, communityDetails] = await Promise.all([
          recommendationsAPI.getPostDetails(item.id, item.sk),
          communityAPI.getCommunityDetails(item.communityid),
        ]);
        if (postResponse.data && postResponse.data.length > 0) {
          navigation.navigateDeprecated('ReviewComment', {
            fromScreen: fromScreen,
            reviewObj: postResponse.data,
            communityDetails: communityDetails?.data,
            postid: item.id,
            collapsed: false,
          });
        }
      } else {
        let response = await recommendationsAPI.getPostDetails(item.id, item.sk);
        if (response.data && response.data.length > 0) {
          navigation.navigateDeprecated('ReviewComment', {
            fromScreen: fromScreen,
            reviewObj: response.data,
            movieID: item.movieid,
            postid: item.id,
          });
        }
      }
    }
  };
  const onUserClick = (user) => {
    mixpanel.track('Nav_UserProfile', {
      screen: 'SocialBaseCard',
      uid: user?.id ?? item?.userid,
      source: 'userDP',
    });
    if(isGuestFlow){
      showLoginModalCb()
    }
    else {
      if ((user?.id == userID) || (item?.userid == userID)) {
        navigation.navigateDeprecated('Profile');
      } else {
        navigation.navigateDeprecated('RBUserProfileScreen', {
          userid: user?.id ?? item?.userid,
          fromScreen: 'SocialTab',
        });
      }
    }
  };

  const onMainItemClick = (type, storeItem) => {
    mixpanel.track('Main_Feed', {
      screen: 'SocialBaseCard',
      type: type,
      source: 'feedCard',
    });
    let Screen;
    let params = { item: storeItem, fromScreen: 'SocialTab' };
    if (type === RECOMMENDATION) {
      Screen = 'MovieDetailsScreen';
      params.item = storeItem.movie;
      params.items = [storeItem.movie];
      navigation.navigateDeprecated(Screen, params);
    } else if (type === POST) {
      //TODO: need to decide what to show

    } else if (type === WATCHLIST) {
      Screen = 'ListItemDetails';
      let isMine = item?.userid == userID;
      params.listID = storeItem.listid;
      if(isMine){
        params.myList = isMine;
      }
      navigation.navigateDeprecated(Screen, params);
    }
  };

  const moreOptionsClicked = (item) => {
    setSelectedRow(item);
    setMoreOptionsVisible(true);
  };

  const onCommunityClick = (item) => {
    navigation.navigateDeprecated("DetailsScreen",{fromScreen:"SocialTab", id: item.communityid});
  };

  const actionClicked = async(item, action) => {
    setMoreOptionsVisible(false);
    let contentId = {};
    contentId.PK = item.pk;
    contentId.SK = item.sk;
    switch (action.actionIcon) {
      case 'flag':
        //call API to flag post
        userProfileAPI
          .insertReportedEvent(userID, JSON.stringify(contentId), 'POST')
          .then((res) => {
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
          })
          .catch((error) => {
            if (
              error &&
              error.response &&
              error.response.data &&
              error.response.data.code == 'dup'
            ) {
              Toast.show({
                type: 'infoToast',
                text1: 'This post is already under review!',
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
          });
        break;
      case 'delete':
        setSelectedRow(item)
        setConfirmModalVisible(true)
        break;
    }
  };

  const doneClicked = async() => {
    setConfirmModalVisible(false)
    try {
      let reviewObject = {};
      reviewObject.pk = selectedRow.pk;
      reviewObject.sk = selectedRow.sk;
      reviewObject.postid = selectedRow.postid;
      let delReviewResponse = await recommendationsAPI.deleteReview(
        reviewObject
      );
      if (delReviewResponse.status == 200) {
        deletePost(item)
      }
    }
    catch(error){
      extendedLog.error(
        'Error executing  recommendationsAPI.deleteReview with message:',
        error?.toString()
      );
    }
  }

  function processComment(item) {
    let processedComment = [];
    const name = item?.user?.name ?? item?.username ?? 'User'
    processedComment.push(
      <Text
        onPress={() => onUserClick(item?.user)}
        style={[styles.boldText, { position: 'relative', top: 3 }]}
      >
        {name}
      </Text>
    );
    //processedComment.push(<Text>{getText(item)}</Text>);
    //processedComment.push(<Text onPress={() => onStoreItemClick(item.type, item.store)} style={[styles.boldText, { position: 'relative', top: 3 }]}>{item.store.name}</Text>);
    return processedComment;
  }

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View
          style={[
            {
              paddingLeft: home ? 12 : 16,
              padding: home ? 12 : 0,
              paddingRight: home ? 24 : 16,
              backgroundColor: home ? '#212121' : '#121212',
            },
          ]}
        >
          {item.type === POST && !fromCommunity && item.communityname !== 'Social' && <Pressable
            style={{ marginRight: 12, flexDirection: 'row', marginBottom: 3 }}
            onPress={() => onCommunityClick(item)}
          >
            <View style={{width: 16, height: 16, borderRadius: 16, backgroundColor: '#616161', justifyContent: 'center',
          alignItems: 'center', marginRight: 4}}>
              <Group width={10} height={10} />
              </View>
            <Text style={[styles.text, { fontSize: 12, color: "#E9C638" }]}>{item.communityname}</Text>
          </Pressable>}
          <View style={[styles.userImageContainer, { flexDirection: 'row' }]}>
            <Pressable
              style={{ marginRight: 12 }}
              onPress={() => onUserClick(item?.user)}
            >
              {(item?.user && item?.user?.thumbnail) ? (
                <RNImage
                  source={{ uri: item.user.thumbnail }}
                  style={CommonStyles.dp}
                />
              ) : (
                <DefaultUser height={40} width={40} />
              )}
              {(item?.user?.ispremium || item?.ispremium) && commonAppState.isPremiumFlowEnabled && 
                <View style={styles.premium}>
                  <PremiumBadge height={13} width={13} />
                </View>
              }
            </Pressable>
            <View>
              <View style={[styles.description, { position: 'relative' }]}>
                <Text style={[styles.text]}>{processComment(item)}</Text>
                {(item?.user || item?.userrole) &&
                (checkBadge(item?.user?.userrole ?? item?.userrole)) && (
                  <View style={styles.badges}>
                    {getUserBadgeIcon(item?.user?.userrole ?? item?.userrole)}
                  </View>
                  )}
                  {closeFriends?.includes(item?.user?.id ?? item?.userid) && (
                    <View style={styles.badges}>
                      <UserLoveHeart color={AppColors.LIGHT_YELLOW} height={20} width={18}/>
                    </View>
                  )}
              </View>
              <View
                style={{
                  marginBottom: 12,
                  marginLeft: -2,
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={CommonStyles.status}
                >
                  {getText(item)}
                </Text>
                <View
                  style={{
                    height: 3,
                    width: 3,
                    borderRadius: 5,
                    backgroundColor: '#D9D9D9',
                    marginTop: 5,
                    marginRight: 3,
                  }}
                ></View>
                <Text
                  style={{
                    color: '#D9D9D9',
                    fontSize: 10,
                    marginRight: 3,
                    fontFamily: 'DMSans-Regular',
                  }}
                >
                  {diffString}
                </Text>
                <View
                  style={{
                    height: 3,
                    width: 3,
                    borderRadius: 5,
                    backgroundColor: '#D9D9D9',
                    marginTop: 5,
                    marginRight: 3,
                  }}
                ></View>
                <View style={{ marginTop: 1 }}>{getPrivacyIcon(item)}</View>
              </View>
            </View>
            <View
              style={[
                styles.userImageContainer,
                { flex: 1, marginRight: 0, alignItems: 'flex-end' },
              ]}
            >
              {!home && (
                <Pressable onPress={() => moreOptionsClicked(item)}>
                  <More height={20} width={20} />
                </Pressable>
              )}
            </View>
          </View>
          {item?.subtype == 'WATCHING' && watchingNowDetails != null && 
             <View>
              <View style={styles.poster}>
                  {!imageLoadError || apiBackdropImage(watchingNowDetails) != null ? (
                    <FastImage
                      style={[
                        styles.movieImg
                      ]}
                      source={{ uri: !imageLoadError ? getMovieBackdropImage(watchingNowDetails?.id || watchingNowDetails?.movieid || watchingNowDetails?.movieId) : apiBackdropImage(watchingNowDetails) }}
                      resizeMode={FastImage.resizeMode.cover}
                      defaultSource={require('assets/defaultMovie.png')}
                      onError={() => setImageLoadError(true)}

                    />
                  ) : (
                    <View
                      style={[
                        styles.movieNameContainer
                      ]}
                    >
                      <Text style={CommonStyles.txtImage}>{title}</Text>
                    </View>
                  )}
                </View>
                <MovieSearchCard
                  item={watchingNowDetails}
                  onMovieClick={onMovieClick}
                  isGuestFlow={isGuestFlow}
                  isWatchlisted={isWatchlisted}
                  isSocial={true}
                  isWatching={true}
                  padding={8}
                  backgroundColor={home ? AppColors.BLACK_VARIANT3 : AppColors.GREY_VARIANT2}
                  hasPrimaryAction={true}
                  onPrimaryClick={() => {
                    if(isGuestFlow){
                      showLoginModalCb()
                    }
                    else 
                      onAddToMyProfileClick(
                        watchingNowDetails?.title,
                        watchingNowDetails?.movieid || watchingNowDetails?.movieId || watchingNowDetails?.id,
                        item.type,
                        'WATCHING'
                    )
                    }
                  }
                  primaryBtnName='+ Watchlist'
                  height={52}
                />
                </View>
          }
          <View style={{ flex: 1, paddingLeft: home ? 0 : 0, paddingRight: 0 }}>
            <View>
              <View style={[styles.feedItemContent, { marginBottom: 12 }]}>
                <Pressable
                  onPress={() => onMainItemClick(item.type, item.store)}
                >
                  {children}
                </Pressable>
              </View>
              <View style={[styles.feedItemControls]}></View>
            </View>
            <View style={[styles.feedCommonControls]}>
              <TouchableOpacity
                onPress={() => onLikeClick(item, true)}
                style={[styles.commonButtonStyle, { flex: 1 }]}
              >
                {isLiked == 'true' ? (
                  <LikeFilled width={23} height={21} />
                ) : (
                  <Like width={23} height={21} />
                )}
                <Text
                  style={[
                    styles.text,
                    { fontSize: 10, opacity: 0.6, marginLeft: 6 },
                  ]}
                >
                  {likes || 0}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onLikeClick(item, false)}
                style={[styles.commonButtonStyle, { flex: 1 }]}
              >
                {isLiked == 'null' ? (
                  <Dislike width={23} height={21} />
                ) : isLiked == 'true' ? (
                  <Dislike width={23} height={21} />
                ) : (
                  <DislikeFill width={23} height={21} />
                )}
                <Text
                  style={[
                    styles.text,
                    { fontSize: 10, opacity: 0.6, marginLeft: 6 },
                  ]}
                >
                  {dislikes || 0}
                </Text>
              </TouchableOpacity>
              {(item.type === RECOMMENDATION || item.type === REVIEW || item.type === POST
                || item.type === WATCHLIST) && (
                  <TouchableOpacity
                    onPress={() => onReplyClick()}
                    style={[styles.commonButtonStyle, { flex: 1 }]}
                  >
                    <Comment width={20} height={20} />
                    <Text
                      style={[
                        styles.text,
                        { fontSize: 10, opacity: 0.6, marginLeft: 6 },
                      ]}
                    >
                      {item.comments || 0}
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>
          {confirmModalVisible ? (
            <ConfirmModal
              toggleModal={confirmModalVisible}
              message={StringConstants.SURE_YOU_WANT_TO_DELETE}
              cancelText={StringConstants.CANCEL}
              doneText={StringConstants.DELETE}
              cancelClicked={() => setConfirmModalVisible(false)}
              doneClicked={() => doneClicked()}
            />
          ) : null}
          {moreOptionsVisible ? (
            <MoreOptionsModal
              toggleModal={moreOptionsVisible}
              cancelClick={() => setMoreOptionsVisible(false)}
              actions={moreOptions}
              item={selectedRow}
              onClick={actionClicked}
            />
          ) : null}
        </View>
      )}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  
  text: { color: '#FFF', fontFamily: 'DMSans-Regular', fontSize: 15 },
  boldText: { fontFamily: 'DMSans-Bold', fontSize: 15, color: '#FFF' },
  description: {
    flexDirection: 'row',
    marginBottom: 1,
    flexWrap: 'wrap',
  },
  poster: { flexDirection: 'row', marginTop: 20 },
  movieNameContainer: {
    backgroundColor: AppColors.BLACK,
    width: SCREEN_WIDTH - 32,
    height: SCREEN_WIDTH * 0.4667,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  movieImg: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_WIDTH * 0.4667,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  userImageContainer: {
    height: 36,
    marginRight: 0,
  },
  feedItemContent: {
    borderRadius: 5,
  },
  premium: {
    position: 'absolute',
    bottom: 2.5,
    right: -3.5
  },
  feedItemControls: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    left: 12,
    paddingRight: 16,
  },
  feedItemControlText: {
    fontSize: 12,
  },
  feedCommonControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  commonButtonStyle: {
    marginRight: 16,
    height: 32,
    width: Dimensions.get('window').width * 0.2722,
    backgroundColor: '#424242',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionButtonInlineStyle: {
    flexDirection: 'row',
  },
  replyBtnStyle: {
    backgroundColor: '#424242',
    height: 28,
    padding: 6,
    paddingRight: 16,
    paddingLeft: 16,
    borderRadius: 8,
  },
  replyBtnText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'DMSans-Bold',
  },
  badges:{ padding: 1, paddingLeft: 6 },
});

export default SocialFeedBaseCard;
