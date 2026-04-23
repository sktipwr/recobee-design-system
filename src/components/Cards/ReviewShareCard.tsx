import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppConsumer } from "context";
import { SCREEN_WIDTH, scaledHeight, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";
import DefaultUser from 'svg/user';
import Critic from 'svg/critic';
import Logo from 'svg/logoWithNoBg';
import StringConstants from "utils/StringConstants";
import FontFamily from "utils/FontFamily";
import { Rating } from "react-native-ratings";
import OttBox from "./OttBox";
import { OTTIcon } from "../Atoms/OTTIcon";
import CircularProgress from "components/Common/ProgressCircle";
import { POSTER_IMAGE_BASEURL, calculatePercentage, checkBadge, getUserBadgeIcon } from "utils/HelperFunctions";
import EncryptedStorage from "react-native-encrypted-storage";
import PremiumBadge from 'svg/premium_badge_icon';
import { AnimatedProgressCircle } from "../AnimatedProgressCircle";
import { CommonAppContext } from "../../stores/common/commonAppContext";

export const ReviewShareCard: React.FC = ({item, movieDetails, isSelfReview = false, isPremiumUser = false, isPremiumFlowEnabled = false, showGuestFlow = false}) => {
   
    let hasDiversifiedRating = item?.ratingstory && item?.ratingdirection && item?.ratingacting && item?.ratingvisuals && item?.ratingmusic &&
    item?.ratingstory != "0" && item?.ratingdirection != "0" && item?.ratingacting != "0" && item?.ratingvisuals != "0" && item?.ratingmusic != "0" ? true : false;
    let image = (movieDetails?.posterimageurl && movieDetails?.posterimageurl != '') 
      ? 
        movieDetails?.posterimageurl 
      : 
        (movieDetails?.posterimage && movieDetails?.posterimage != '')
      ?
        (POSTER_IMAGE_BASEURL + movieDetails?.posterimage) 
      :
        (movieDetails?.movieimage && movieDetails?.movieimage != '') 
      ?
        (movieDetails?.movieimage)
      : 
      null
  
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

    return (
        <AppConsumer>
        {(appConsumer) => (
        <View style={styles.outerContainer}>
          <Logo height={scaledHeight(26)} width={scaledWidth(62)} />
          <View style={[styles.container, {paddingBottom: showGuestFlow ? scaledHeight(32) : scaledHeight(64)}]}>
            <View style={CommonStyles.flexDirRow}>
                <Image source={image != null ? {uri : image} : require('../../../assets/defaultMovie.png')} style={styles.movieImage} />
                <View style={styles.movieInfoContainer}>
                    <Text style={styles.details}>
                        {movieDetails?.title}
                    </Text>
                    <View style={styles.metaInfoContainer}>
                        <Text style={[styles.metaData]}>
                        {movieDetails?.genre ? (Array.isArray(movieDetails.genre) ? movieDetails.genre.join(', ') : movieDetails.genre) : ''}
                        {movieDetails?.runningtime != null && movieDetails?.runningtime != "" && item?.runningtime ? ' | ' + `${movieDetails.runningtime}` : ''}
                        {movieDetails?.releasedate != null && movieDetails?.releasedate != "" && item?.releasedate ? ' | ' + movieDetails.releasedate : ''}
                        {movieDetails?.isseries != null && movieDetails?.isseries != "" && movieDetails?.isseries != undefined ? (movieDetails?.isseries == true ? ' | Series' : ' | Movie') : ''}
                        {movieDetails?.language != null && movieDetails?.language != "" && movieDetails?.language ? ' | ' + movieDetails.language : ''}
                        </Text>
                    </View>
                    {
                        item?.reviewrating &&
                        item?.reviewrating != "0" ? (
                        <View
                        style={styles.ratingContainer}
                        >
                        <Rating
                            ratingCount={5}
                            imageSize={18}
                            fractions={1}
                            startingValue={parseFloat(item.reviewrating)}
                            jumpValue={0.5}
                            ratingColor="#e9c46a"
                            tintColor={appConsumer.theme.colors.primary}
                            readonly={true}
                        />
                        <Text style={[styles.metaData, styles.ratingText]}>{`(${item.reviewrating}/5)`}</Text>
                        </View>
                        ) : null
                    }
                </View>
            </View>
            {hasDiversifiedRating && <View style={styles.diverseRating}>
              {item.ratingstory && item?.ratingstory != "0" && item?.ratingstory != "NaN" &&
                animatedCircle(item?.ratingstory, 'Story')
              }
              {item?.ratingstory && item?.ratingdirection != "0" && item?.ratingdirection != "NaN" &&
                animatedCircle(item?.ratingdirection, 'Direction')
              }
              {item?.ratingstory && item?.ratingacting != "0" && item?.ratingacting != "NaN" &&
                animatedCircle(item?.ratingacting, 'Acting')
              }
              {item?.ratingstory && item?.ratingvisuals != "0" && item?.ratingvisuals != "NaN" &&
                animatedCircle(item?.ratingvisuals, 'Visuals')
              }
              {item?.ratingstory && item?.ratingmusic != "0" && item?.ratingmusic != "NaN" &&
                animatedCircle(item?.ratingmusic, 'Music')
              }
            </View>}
            {item?.reviewtitle != null && item?.reviewtitle?.length > 0 ? <Text
                  style={[
                    styles.reviewTitle,
                    {
                    color: appConsumer.theme.colors.link,
                    }]}
                  >
                    {item?.reviewtitle}
                  </Text>
                :
                  <View style={styles.gap} />
              }
              <Text numberOfLines={6} style={[styles.desc]}>
                {item?.reviewcomment}
              </Text>

            </View>
            {
              showGuestFlow ?
              <>
                <Text
                  style={[
                  styles.metaData,
                  styles.logo,
                  ]}
                >
                    {StringConstants.VIEW_MORE_DETAILS_AT}
                </Text>
                <Logo height={scaledHeight(44)} width={scaledWidth(106)} />
              </>
              :
                <View style={styles.profileCardContainer}>
                    <ProfileCard name={item?.username} isSelfReview={isSelfReview} userRoleBadge={item?.userrole} userTag={item?.usertag} userDP={item?.userimage} isPremiumFlowEnabled={isPremiumFlowEnabled} isPremiumUser={isSelfReview ? isPremiumUser : item?.ispremium} />
                </View>
            }
        </View>
        )}
      </AppConsumer>
    );
  }

  const ProfileCard = ({name, userRoleBadge, userTag, userDP, isSelfReview, isPremiumUser, isPremiumFlowEnabled}) => {
    const [userPic, setUserPic] = useState(userDP);
    const { commonAppState } = useContext(CommonAppContext);
    const [userName, setUserName] = useState(name);
    const [userTagValue, setUserTag] = useState(userTag);
    const [userThumbnail, setUserThumbnail] = useState(userDP);
    const userRole = isSelfReview
    ? commonAppState.userRole
    : userRoleBadge;

    useEffect(()=>{
      if(isSelfReview){
        getUserData()
      }
    },[])
    const getUserData = () => {
      try {
        EncryptedStorage.getItem('user_dp').then((val) => {
          if(val != null && val != undefined){
            setUserPic(val)
          }
        });
        EncryptedStorage.getItem('user_thumbnail').then((val) => {
          if(val != null && val != undefined){
            setUserThumbnail(val)
          }
        });
        EncryptedStorage.getItem('user_unq_id').then((storedUserTag) => {
          setUserTag(storedUserTag);
        });
        EncryptedStorage.getItem('user_fname').then((val) => {
          setUserName(val);
        });
      }
      catch(e){
        console.log({e})
      }
    }
   
    return (
      <TouchableOpacity style={styles.profileCard}>
        <View>
          {((userPic != null && userPic != '') || (userThumbnail != '' && userThumbnail != null)) ? 
            <Image
            source={{ uri: userPic ?? userThumbnail }}
            style={[
              styles.image,
              { marginVertical: scaledHeight(7), marginRight: scaledWidth(8) },
            ]}
          />
          :
            <View style={styles.defaultUserStyle}>
              <DefaultUser height={scaledHeight(44)} width={scaledHeight(44)} />
            </View>
          }
          {isPremiumUser && isPremiumFlowEnabled && 
              <View style={styles.premiumBadge}>
                <PremiumBadge height={15} width={15} />
              </View>
            }
        </View>
        <View style={[styles.userInfo, isPremiumFlowEnabled && isPremiumUser && {marginLeft: scaledWidth(9)}]}>
          <View style={styles.userInfoInnerContainer}>
            <Text
              numberOfLines={1}
              style={[
                styles.drawerText,
                styles.userName,
              ]}
            >
              {`${userName ?? ''}`}
            </Text>
            {(checkBadge(userRole)) && (
              <View style={{ padding: 1, paddingLeft: scaledWidth(6) }}>
              {getUserBadgeIcon(userRole)}
                </View>
              )}
          </View>
          <Text
            style={[
              styles.drawerText,
              styles.tagText
            ]}
          >
            @{userTagValue}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


const styles = StyleSheet.create({
    details: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE,
      },
      userName: { fontSize: 14, maxWidth: scaledWidth(120) },
      userInfo: { justifyContent: 'center', marginLeft: scaledWidth(6) },
      userInfoInnerContainer: { flexDirection: 'row', marginRight: scaledWidth(12) },
      reviewTitle: {
        fontFamily: FontFamily.DMSansBold,
        fontSize: 14,
        marginTop: scaledHeight(18),
        marginBottom: scaledHeight(7)
      },
      premiumBadge: {
        position: 'absolute',
        bottom: scaledHeight(2),
        right: -2
      },
      tagText: {
        fontSize: 10,
        color: AppColors.GREY_VARIANT9,
        marginTop: 1,
        width: scaledWidth(128),
      },
      outerContainer: {marginTop: scaledHeight(10), alignItems: 'center'},
      metaInfoContainer: {flexDirection: 'row', marginTop: 2},
      moreAndLessText: {
        opacity: 0.8,
        top: 4,
        position: 'relative',
      },
      diverseRating: {
        flexDirection: 'row', marginTop: scaledHeight(16), justifyContent: 'space-between',
        width: SCREEN_WIDTH - 60
      },
      metaData: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT4,
        //marginTop: 25
      },
      defaultUserStyle: {
        alignContent: 'center',
        height: scaledHeight(50),
      },
      profileCardContainer: {
        backgroundColor: AppColors.THEME_BG_COLOR,
        borderRadius: 6,
        paddingVertical: scaledHeight(4),
        width: SCREEN_WIDTH * 0.65,
        borderWidth: 1,
        borderColor: AppColors.GREY_VARIANT6,
        marginTop: -scaledHeight(38),
      },
      ratingText: {marginLeft: 9, fontSize: 14},
      ratingContainer: {
        alignItems: "center",
        paddingTop: 14,
        paddingBottom: 27, 
        flexDirection: 'row',
      },
      desc: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT10,
      },
      movieImage: {
        height: scaledWidth(140),
        width: scaledWidth(105),
        borderRadius: scaledWidth(5),
        //marginRight: 16
      },
      container: {
        backgroundColor: AppColors.GREY_VARIANT2, 
        borderRadius: scaledWidth(11), 
        //alignItems: 'center', 
        width: SCREEN_WIDTH * 0.93, 
        paddingBottom: scaledHeight(64),
        marginTop: 11,
        paddingTop: 19,
        paddingHorizontal: 19

    },
    movieInfoContainer: {paddingHorizontal: scaledWidth(16), width: SCREEN_WIDTH * 0.54},
    drawerText: {
        fontFamily: 'DMSans-Regular',
        fontSize: 14,
        color: '#FFFFFF',
        //width: 128
      },
      image: {
        height: scaledHeight(44),
        width: scaledHeight(44),
        borderRadius: scaledHeight(25),
      },
      profileCard: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      gap: {height: 13},
      logo: { 
        marginTop: scaledHeight(12)
      }
});
