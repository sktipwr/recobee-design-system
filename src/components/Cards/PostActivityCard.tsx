import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { POSTER_IMAGE_BASEURL, TMDB_BASEURL, processComment } from 'utils/HelperFunctions';
import CommonStyles from '../../../Styles';
import { SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';
import FastImage from 'react-native-fast-image';
import recommendationsAPI from 'api/recommendationsAPI';
import { ActivityMovieMetaInfo } from '../Common/ActivityMovieMetaInfo';
import { ActivityTypeAndTime } from '../Common/ActivityTypeAndTime';
import StringConstants from 'utils/StringConstants';

  interface PostActivityCardParams {
    data: any,
    activityType: string,
    onMovieClick: Function,
    onTagClicked: Function,
    onListClick: Function,
    onReviewClick: Function,
    onPostClick: Function
  }

  export const PostAcivityCard: React.FC<PostActivityCardParams> = ({
    data,
    activityType,
    onMovieClick,
    onTagClicked,
    onListClick,
    onReviewClick,
    onPostClick
  }) => 
    {
    
    const [landscapeImage, setLandscapeImage] = useState(null);
    const [movieImage, setMovieImage] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);
    
    useEffect(() => {

      if(activityType == 'post'){
       getPostImage()
      }
      if(activityType == 'review'){
        getReviewPoster()
        getReviewLandscapeImage()
      }
      if (activityType == 'post' && data?.value?.indexOf(`@[`) != -1) {
        filterMovieData()
      }
    }, [data]);

    // get poster image
    const getPostImage = () => {
      let uri = null;
      if (data?.data?.posterimageurl && data?.data?.posterimageurl != null) {
        uri = data?.data?.posterimageurl;
      } else if (data?.data?.posterimage == null || data?.data?.posterimage == "") {
        uri = data?.data?.movieimage;
      } else {
        uri = TMDB_BASEURL + data?.data?.posterimage;
      }
      setMovieImage(uri);
    }

    // get poster for review
    const getReviewPoster = () => {
      let uri = null;
      if (
        data?.data?.movieimage &&
        data?.data?.movieimage != null
      )
        uri = data?.data?.movieimage;
      else if (
        (data?.data?.posterimage != null &&
          data?.data?.posterimage != '')){
        let finalBaseUrl = POSTER_IMAGE_BASEURL.slice(0, -1) + '';
        uri = finalBaseUrl + data?.data?.posterimage;
      }
      else if(data?.data?.posterimageurl && data?.data?.posterimageurl != '') {
        uri = data?.data?.posterimageurl;
      }
      if (uri && uri != null && uri.indexOf("http://") > -1) {
        uri = uri.replace("http://", "https://");
      }
      setLandscapeImage(uri)
    }

    // landscape image for review
    const getReviewLandscapeImage = () => {
      let uri = null;
      if((data?.data?.backdropimage &&
        data?.data?.backdropimage != '')){
          let finalBaseUrl = TMDB_BASEURL.slice(0, -1) + '';
          uri =
          finalBaseUrl +
            (data?.data?.backdropimage);
        }
      else if (
        data?.data?.backdropimageurl &&
        data?.data?.backdropimageurl != null
      ){
        uri = data?.data?.backdropimageurl;
      }

      if (uri && uri != null && uri.indexOf("http://") > -1) {
        uri = uri.replace("http://", "https://");
      }
      setMovieImage(uri)
    }

    // format tag comment
    const filterMovieData = () => {
      const formatComment = data?.value?.split(`@[`)
        .some((el) => {
          let match = el.substring(0, el.indexOf(')'));
          let id = match.substring(match.indexOf('(') + 1);

          if(id.indexOf('M') > -1){
            const movieId = id.replace('M', '');
            getMovieDetails(movieId)
            return true;
          }
        
    })
  }

  // get movie details by calling api for subtype WATCHING
  const getMovieDetails = (movieId: string) => {
    try {
      recommendationsAPI
        .getMovieDetails(movieId).then((response) => {
          if(response.data) {
            let responseData = response.data;
            setMovieDetails(responseData)
            let uri = null;
            if (responseData?.backdropimage != null && responseData?.backdropimage != '' && responseData?.backdropimage) {
              uri = POSTER_IMAGE_BASEURL + responseData.backdropimage;
            } else if(responseData?.movieimage != null && responseData?.movieimage != '' && responseData?.movieimage) {
              uri = responseData.movieimage;
            }
            setMovieImage(uri)
          }
        }
        );
      }
      catch(e){
        console.log({e})
      }
  }

  // on activity card press
  const onCardPress = () => {
    if(activityType == 'add_list') {
      onListClick(null, data?.data?.listID)
    }
    else if(activityType == 'review'){
      onReviewClick(data?.data?.id || data?.data?.movieid, data?.postid, null)
    } 
    else if(activityType == 'post') { 
      onPostClick(data?.postid, data?.communityid)
    }
  }
  
  const description = activityType == 'post' ? data?.value : data?.reviewtitle;

  return (
    <View style={styles.container}>
        <ActivityTypeAndTime type={activityType} datetime={data?.activity_date ?? ''} />
        {
          movieDetails && activityType == 'post' &&
            <ActivityMovieMetaInfo title={movieDetails?.title} releaseDate={movieDetails?.releasedate} movieImage={movieImage} onMovieClick={() => onMovieClick(movieDetails?.id || movieDetails?.movieid, movieDetails)} />
        }
        {activityType == 'review' && 
            <ActivityMovieMetaInfo title={data?.data?.title} releaseDate={data?.data?.releasedate} movieImage={movieImage} onMovieClick={() => onMovieClick(data?.data?.id, data?.data)} />
        }
        <View style={CommonStyles.rowAlignCenter}>
        <Pressable
            onPress={() => onCardPress()}
            style={[styles.movieMeta, CommonStyles.rowAlignCenter]}
        >
            {data?.value?.image && data?.value?.image != '' && activityType == 'post' ? (
              <FastImage
                  style={styles.movieLogo}
                  source={{ uri: data?.value?.image }}
                  resizeMode={FastImage.resizeMode.cover}
              />
              )
              :
              landscapeImage &&
              <FastImage
                  style={styles.movieLogo}
                  source={{ uri: landscapeImage }}
                  resizeMode={FastImage.resizeMode.cover}
              />
            }
              <View style={{width: data?.value?.image || (activityType == 'add_list' || activityType == 'remove_list') ? SCREEN_WIDTH * 0.64 : '100%'}}>
                {activityType != 'add_list' && activityType != 'remove_list' && <Text style={styles.postedInfo}>
                  {activityType == 'post' ? StringConstants.YOU_ADDED_A_POST : StringConstants.YOU_ADDED_A_REVIEW}
                  {description && description != '' && <Text style={[styles.postedInfo, {fontFamily: FontFamily.DMSansBold}]}>
                    "{description?.length > 60 ? processComment(description?.substring(0, 57), onTagClicked) : processComment(description, onTagClicked)}"
                    </Text>
                  }
                </Text>
                }
                {(activityType == 'add_list' || activityType == 'remove_list') && 
                  <Text style={[styles.postedInfo, {marginLeft: 6}]}>
                    {activityType == 'add_list' ? StringConstants.YOU_HAVE_ADDED_NEW_LIST : StringConstants.YOU_HAVE_DELETED_LIST}
                    <Text style={[styles.postedInfo, {fontFamily: FontFamily.DMSansBold}]}>"{data?.data?.listName ?? ''}"</Text>
                  </Text>
                }
              </View>
        </Pressable>
      </View>
     
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 8,
    padding: 12,
    width: SCREEN_WIDTH * 0.87,
    marginLeft: -7,
    marginBottom: 12
  },
  movieMeta: {
    marginVertical: 8,
  },
  movieLogo: {
    height: scaledWidth(32),
    width: scaledWidth(51),
    borderRadius: 3,
    marginRight: 8
  },
  postedInfo: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
  },
  

});
