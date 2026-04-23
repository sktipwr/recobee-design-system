import React, { useEffect, useState } from 'react';

import { AppConsumer } from 'context';
//import * as SecureStore from "expo-secure-store";
import EncryptedStorage from 'react-native-encrypted-storage';
import SocialFeedBaseCard from './SocialFeedBaseCard';
import watchlistAPI from 'api/watchlistAPI';
import recommendationsAPI from 'api/recommendationsAPI';
import { Rating } from 'react-native-ratings';
import Toast from 'react-native-toast-message';
import SocialFeedCarousel from 'components/Carousels/SocialFeedCarousel';
import mixpanel from 'mixpanel';
import FastImage from 'react-native-fast-image';
import MovieSearchCard from './MovieSearchCard';
import communityAPI from 'api/communityAPI';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Linking,
} from 'react-native';
import CommonStyles from '../../../Styles';
import StringConstants from 'utils/StringConstants';
import { httpRegex } from 'utils/DataConstants';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { apiBackdropImage, getMovieBackdropImage, getSafeSubstring } from 'utils/utilFunctions';
import { SCREEN_WIDTH } from 'utils/Dimensions';

const RECOMMENDATION = 'recommendation';
const WATCHLIST = 'watchlist';
const REVIEW = 'review';
const POST = 'POST';
let uri = require('assets/defaultMovie.png');
const windowWidth = Dimensions.get('window').width;
const maxTxtLength = windowWidth * 0.3733;

const SocialFeedCard = ({ item, navigation, home, fromCommunity, deletePost, isGuestFlow = false, showLoginModalCb  , closeFriends}) => {
  if (isGuestFlow) {
    item.type = REVIEW
  }
  const movieObj = item?.store?.movie ? item.store.movie : item;

  const reviewComment = item?.store?.text ?? item?.reviewcomment ?? '';
  const reviewMovieId = item.store?.movie?.id ?? item?.movieid;
  const [readMore, setReadMore] = useState(
    reviewComment && reviewComment?.length > maxTxtLength
  );
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [userID, setUserID] = useState();
  const [imageLoadError, setImageLoadError] = useState(false);
  const [reviewImageLoadError, setReviewImageLoadError] = useState(false);
  const [postImageLoadError, setPostImageLoadError] = useState(false);
  const [reviewText, setReviewText] = useState(reviewComment);
  const [showTranslatedContent, setShowTranslatedContent] = useState(false);

  let Headers = {};

  let fromScreen = 'SocialTab';
  if (fromCommunity) {
    fromScreen = 'DetailsScreen';
  } else if (home) {
    fromScreen = 'HomeTab';
  }

  const onMovieClick = (movieID, movie) => {
    mixpanel.track('Nav_MovieDetails', {
      screen: 'SocialFeedCard',
      movieID: movieID,
      source: 'listCard',
      isHome: home
    });
    let items = [];
    items.push(movie);
    navigation.navigateDeprecated('MovieDetailsScreen', { items: items, item: movie });
  };

  const onViewWatchlistClick = (storeItem, user) => {
    mixpanel.track('Nav_ListDetails', {
      screen: 'SocialFeedCard',
      listID: storeItem?.listid ?? item?.listid,
      source: 'feedCard',
      isHome: home
    });
    let isMine = item?.userid == userID;
    navigation.navigateDeprecated('ListItemDetails', {
      listID: storeItem?.listid ?? item?.listid,
      fromScreen: 'SocialTab',
      myList: isMine,
    });
  };

  const onViewTrailerClick = (movieItem) => {
    mixpanel.track('Nav_MovieDetails', {
      screen: 'SocialFeedCard',
      movieID: movieItem.movie.movieid || movieItem.movie.id,
      source: 'trailerButton',
    });
    let items = [];
    items.push(movieItem.movie);
    navigation.navigateDeprecated('MovieDetailsScreen', {
      items: items,
      item: movieItem.movie,
    });
  };

  const onAddToMyProfileClick = async (listName, store, type, subType) => {
    mixpanel.track('Add_To_Profile', {
      screen: 'SocialFeedCard',
      source: 'feedCard',
      type: type,
      isHome: home
    });
    let listMovies = [];
    setIsWatchlisted(true)
    if (type === WATCHLIST) listMovies = store.movies;
    else if (type === RECOMMENDATION || type === REVIEW) listMovies.push(store.movie);
    let movieIDs = [];
    if (subType == 'WATCHING') {
      movieIDs[0] = store;
    }
    else {
      listMovies.forEach((element) => {
        movieIDs.push(element.id);
      });
    }
    if (type === WATCHLIST) {
      let addProfileRes = await watchlistAPI.createShareList(
        listName,
        movieIDs,
        'P'
      );
      if (addProfileRes.status == 200) {
        Toast.show({
          type: 'beeToast',
          text1: 'Added the list to your Profile',
          visibilityTime: 2000,
          position: 'bottom',
          autoHide: true,
        });
      }
    } else {
      await watchlistAPI.addMoviestoWatchlist(movieIDs);
      Toast.show({
        type: 'beeToast',
        text1: 'Added the item to your Watchlist',
        visibilityTime: 2000,
        position: 'bottom',
        autoHide: true,
      });
    }
  };

  const onUserClick = (id) => {
    mixpanel.track('Nav_UserProfile', {
      screen: 'SocialFeedCard',
      uid: id,
      source: 'userDP',
      isHome: home
    });
    if (id == userID) {
      navigation.navigateDeprecated('Profile');
    } else {
      navigation.navigateDeprecated('RBUserProfileScreen', {
        userid: id,
        fromScreen: 'SocialTab',
      });
    }
  };

  const onPostReplyClick = async () => {
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
  };

  const onReplyClick = async () => {
    mixpanel.track('Comment_Feed', {
      screen: 'SocialFeedCard',
      source: 'feedCard',
      movieID: item.movieid,
    });
    if (isGuestFlow) {
      showLoginModalCb()
    }
    else {
      let response = await recommendationsAPI.getPostDetails(item.id, item.sk);
      if (response.data && response.data.length > 0) {
        navigation.navigateDeprecated('ReviewComment', {
          fromScreen: fromScreen,
          reviewObj: response.data,
          movieID: item.movieid,
          postid: item.id,
          collapsed: false,
        });
      }
    }
  };

  useEffect(() => {
    try {
      EncryptedStorage.getItem('user_id').then((storedUserID) => {
        setUserID(storedUserID);
      });
    }
    catch (error) {
      console.error('Error:', error?.message)
    }

  }, []);

  function processComment(comment) {
    if (comment.indexOf(`@[`) === -1) {
      return <Text style={[styles.link, { color: AppColors.WHITE }]}>{comment}</Text>
    }
    let users = comment
      .split(`@[`)
      .map((el) => {
        let match = el.substring(0, el.indexOf(')'));
        return match
          ? {
            name: match.substring(0, match.indexOf(']')),
            id: match.substring(match.indexOf('(') + 1),
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
          style={{ fontFamily: 'DMSans-Bold', fontSize: 14, color: AppColors.LIGHT_YELLOW }}
          onPress={() => onTagClick(el.id)}
        >
          {el.name}
        </Text>
      );
      comment = cArr.join(el.match);
    });
    processedComment.push(<Text>{comment}</Text>);
    return processedComment;
  }

  const onTagClick = async (id) => {
    if (item.type === POST) {
      if (id.indexOf('U') > -1) {
        id = id.replace('U', '');
        onUserClick(id);
      } else if (id.indexOf('M') > -1) {
        id = id.replace('M', '');
        //navigate to movie details
        recommendationsAPI
          .getMovieDetails(id).then((response) => {
            if (response.data) {
              let items = [];
              items.push(response.data);
              navigation.navigateDeprecated('MovieDetailsScreen', {
                items: items,
                item: response.data[0],
              });
            }
          }
          );
      } else {
        //navigate to movie details
        recommendationsAPI
          .getMovieDetails(id).then((response) => {
            if (response.data) {
              let items = [];
              items.push(response.data);
              navigation.navigateDeprecated('MovieDetailsScreen', {
                items: items,
                item: response.data[0],
              });
            }
          }
          );
      }
    } else {
      //navigate to user profile
      onUserClick(id);
    }
  }

  //get movie meta
  const getMovieInfo = async (movieId: any) => {
    try {
      let response = await recommendationsAPI.getMovieStateForUser(movieId);
      if (response && response.data) {
        setIsWatchlisted(response.data.is_in_watchlist);
      }
    }
    catch (error) {
      console.error('Error:', error?.message)
    }
  };

  useEffect(() => {
    if (item?.type == REVIEW || item?.type == RECOMMENDATION) {
      if (reviewMovieId) {
        getMovieInfo(reviewMovieId)
      }
    }
  }, [item])

  // Regex to detect links

  //render text for link or normal review
  const renderText = (paragraph) => {
    if (item?.userrole == 'celebrity' || item?.store?.userrole == 'celebrity') {
      const parts = paragraph.split(httpRegex);

      return parts.map((part, index) =>
        httpRegex.test(part) ? (
          <Text
            key={`link-${index}`}
            style={styles.link}
            onPress={() => Linking.openURL(part)}>
            {part}
          </Text>
        ) : (
          processComment(part) // Return plain string instead of <Text>
        )
      );
    }
    else {
      return processComment(paragraph)
    }
  };

  return (
    <AppConsumer>
      {(appConsumer) => {
        let uri;
        if (item.type !== WATCHLIST) {
          const backdropimageurl = item.store?.movie?.backdropimageurl ?? item?.backdropimageurl;
          const backdropimage = item?.store?.movie?.backdropimage ?? item?.backdropimage;
          const movieimage = item?.store?.movie?.movieimage ?? item?.movieimage;
          if (
            backdropimageurl &&
            backdropimageurl != null
          )
            uri = backdropimageurl;
          else if (
            (backdropimage == null ||
              backdropimage == '') &&
            movieimage
          )
            uri = movieimage;
          else
            uri =
              'https://image.tmdb.org/t/p/w780' +
              (backdropimage || 'TODO');
          if (uri && uri != null && uri.indexOf("http://") > -1) {
            uri = uri.replace("http://", "https://");
          }

        }
        return (
          <SocialFeedBaseCard isGuestFlow={isGuestFlow} showLoginModalCb={showLoginModalCb} navigation={navigation} item={item} home={home} fromCommunity={fromCommunity} onMovieClick={onMovieClick} onAddToMyProfileClick={onAddToMyProfileClick} deletePost={deletePost} closeFriends={closeFriends}>
            {item?.subtype != "WATCHING" && <View>
              {item.type === RECOMMENDATION && (
                <View style={{ marginTop: 16 }}>
                  {item.reviewtitle && item.reviewtitle != '' && (
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'DMSans-Bold',
                        fontSize: 16,
                        lineHeight: 24,
                      }}
                    >
                      {item.reviewtitle}
                    </Text>
                  )}
                  <View style={{ flexDirection: 'row' }}>
                    {!imageLoadError || apiBackdropImage(movieObj) != null ? (
                      <FastImage
                        style={[
                          {
                            width: Dimensions.get('window').width - 32,
                            height: Dimensions.get('window').width * 0.4667,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                          },
                        ]}
                        source={{ uri: !imageLoadError ? getMovieBackdropImage(item?.store?.movie?.id || item?.store?.movie?.movieid || item?.store?.movie?.movieId) : apiBackdropImage(movieObj) }}
                        resizeMode={FastImage.resizeMode.cover}
                        defaultSource={require('assets/defaultMovie.png')}
                        onError={() => setImageLoadError(true)}
                      />
                    ) : (
                      <View
                        style={[
                          {
                            backgroundColor: AppColors.BLACK,
                            width: Dimensions.get('window').width - 32,
                            height: Dimensions.get('window').width * 0.4667,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: 5,
                            paddingRight: 5,
                          },
                        ]}
                      >
                        <Text style={styles.txtImage}>{item?.store?.name ?? item?.moviename}</Text>
                      </View>
                    )}
                  </View>
                  <MovieSearchCard
                    item={item?.store?.movie ?? item}
                    onMovieClick={onMovieClick}
                    isSocial={true}
                    isWatchlisted={isWatchlisted}
                    hasPrimaryAction={true}
                    onPrimaryClick={() => {
                      console.log()
                      if (isGuestFlow) {
                        showLoginModalCb()
                      }
                      else
                        onAddToMyProfileClick(
                          item?.store?.name ?? item?.moviename,
                          item?.store ?? item,
                          item?.type
                        )
                    }
                    }
                    primaryBtnName={StringConstants.WATCHLIST}
                    padding={8}
                    backgroundColor={home ? AppColors.BLACK_VARIANT3 : AppColors.GREY_VARIANT2}
                    height={52}
                  />
                </View>
              )}
              {item.type === WATCHLIST && (
                <SocialFeedCarousel
                  item={item}
                  onMovieClick={onMovieClick}
                  onAddToMyProfileClick={onAddToMyProfileClick}
                  onViewWatchlistClick={onViewWatchlistClick}
                />
              )}
              {item.type === REVIEW && (
                <Pressable
                  onPress={() => onReplyClick()}
                  style={[styles.reviewTextContainer]}
                >
                  {item?.reviewtitle && item?.reviewtitle != '' && (
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'DMSans-Bold',
                        fontSize: 16,
                        lineHeight: 24,
                      }}
                    >
                      {item?.reviewtitle}
                    </Text>
                  )}
                  {item?.reviewrating && item?.reviewrating != '0' ? (
                    <View
                      style={{
                        alignItems: 'flex-start',
                      }}
                    >
                      <Rating
                        ratingCount={5}
                        imageSize={18}
                        fractions={1}
                        startingValue={parseFloat(item?.reviewrating)}
                        jumpValue={0.5}
                        ratingColor={AppColors.LIGHT_YELLOW_VARIANT10}
                        tintColor={home ? AppColors.BLACK_VARIANT3 : AppColors.GREY_VARIANT2}
                        readonly={true}
                      />
                    </View>
                  ) : null}
                  {reviewText && reviewText.trim() ?(
                    <View style={[CommonStyles.flexRowWrap, { marginVertical: 8 }]}>
                      {/* {item.store.text} */}
                      {readMore
                        ? <>
                          {renderText(getSafeSubstring(reviewText, maxTxtLength))}
                          <Text style={[styles.reviewText, { marginTop: 4 }]}>{'...'}</Text>
                        </>
                        : renderText(reviewText)}
                      {reviewText?.length > maxTxtLength && (
                        <Pressable
                          style={{ position: 'relative' }}
                          onPress={() => onReplyClick()}
                        >
                          <Text
                            style={[
                              styles.txtBody,
                              {
                                top: 4,
                                position: 'relative',
                                color: appConsumer.theme.colors.grey6,
                              },
                            ]}
                          >
                            {' '}
                            Read {readMore ? 'more' : 'less'}
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  ):(<View style={[CommonStyles.flexRowWrap, { marginVertical: 4 }]}>
                  </View>
                 )}
                  {item.translatedcontent && item.translatedcontent != "" && (
                    <TouchableOpacity
                      style={{ paddingBottom: 16, paddingTop: 8 }}
                      onPress={() => {
                        setShowTranslatedContent(!showTranslatedContent);
                        if (showTranslatedContent) {
                          setReviewText(reviewComment);
                        } else {
                          setReviewText(item.translatedcontent);
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
                  <View style={{ flexDirection: 'row' }}>
                    {!reviewImageLoadError || apiBackdropImage(movieObj) != null ? (
                      <FastImage
                        style={[
                          {
                            width: Dimensions.get('window').width - 36,
                            height: Dimensions.get('window').width * 0.4667,
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                          },
                        ]}
                        source={{ uri: !reviewImageLoadError ? getMovieBackdropImage(item?.store?.movie?.id || item?.store?.movie?.movieid || item?.store?.movie?.movieId) : apiBackdropImage(movieObj) }}
                        resizeMode={FastImage.resizeMode.cover}
                        defaultSource={require('assets/defaultMovie.png')}
                        onError={() => setReviewImageLoadError(true)}
                      />
                    ) : (
                      <View
                        style={[
                          {
                            backgroundColor: AppColors.BLACK,
                            width: Dimensions.get('window').width - 36,
                            height: Dimensions.get('window').width * 0.4667,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingLeft: 5,
                            paddingRight: 5,
                          },
                        ]}
                      >
                        <Text style={CommonStyles.txtImage}>{item?.store?.name ?? item?.moviename}</Text>
                      </View>
                    )}
                  </View>
                  <MovieSearchCard
                    item={item?.store?.movie ?? item}
                    onMovieClick={onMovieClick}
                    isWatchlisted={isWatchlisted}
                    isSocial={true}
                    padding={8}
                    backgroundColor={home ? AppColors.BLACK_VARIANT3 : AppColors.GREY_VARIANT2}
                    hasPrimaryAction={true}
                    onPrimaryClick={() => {
                      if (isGuestFlow) {
                        showLoginModalCb()
                      }
                      else
                        onAddToMyProfileClick(
                          item?.store?.name ?? item?.moviename,
                          item?.store ?? item,
                          item.type
                        )
                    }
                    }
                    primaryBtnName={StringConstants.WATCHLIST}
                    height={52}
                  />
                </Pressable>
              )}
              {item.type === POST && (
                <Pressable
                  onPress={() => onPostReplyClick()}
                  style={[styles.reviewTextContainer]}
                >
                  <View style={{ 
                    paddingTop: reviewText && reviewText.trim() ? 16 : 0, 
                  }}>
                    {reviewText && reviewText.trim() && (
                      <Text style={{ color: '#fff' }}>{processComment(reviewText)}</Text>
                    )}
                    {item?.store?.image && (
                      <FastImage source={{ uri: item.store.image }} style={[
                        styles.feedImage
                        ]}
                        resizeMode={FastImage.resizeMode.cover} />
                    )}
                  </View>
                </Pressable>
              )}
            </View>}
          </SocialFeedBaseCard>
        );
      }}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  reviewTextContainer: {
    padding: 4,
    paddingRight: 0,
  },
  feedImage: {
    width: SCREEN_WIDTH - 36,
    height: SCREEN_WIDTH * 0.4667,
    borderRadius: 8,
    // marginTop: 12
  },
  txtBody: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    opacity: 0.8,
    color: AppColors.LIGHT_YELLOW_VARIANT4,
  },
  actionButtonStyle: {
    width: Dimensions.get('window').width * 0.444,
    height: 32,
    backgroundColor: AppColors.GREY_VARIANT6,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  actionAltButtonStyle: {
    width: Dimensions.get('window').width * 0.444,
    height: 32,
    backgroundColor: AppColors.GREY_VARIANT2,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.GREY_VARIANT6,
    borderRadius: 16,
  },
  reviewText: {
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 14
  },
  link: {
    color: AppColors.LIGHT_YELLOW,
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 14
  }
});

export default  React.memo(SocialFeedCard);
