import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AppConsumer } from "context";
import { SCREEN_WIDTH, scaledHeight, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";
import DefaultUser from 'svg/user';
import Critic from 'svg/critic';
import Logo from 'svg/logoWithNoBg';
import FontFamily from "utils/FontFamily";
import FastImage from "react-native-fast-image";
import { getUserBadgeIcon } from "utils/HelperFunctions";
import PremiumBadge from 'svg/premium_badge_icon';
import StringConstants from "utils/StringConstants";
import { FastImageComponent } from "./FastImageComponent";

export const ListShareCard: React.FC = ({userName, userTag, userRole = '', userDP, listItems, isPremiumUser, isPremiumFlowEnabled}) => {
    let numColumns = 3;

    if (listItems?.length > 12) {
        numColumns = 5;
    } else if (listItems?.length >= 7 && listItems?.length <= 12) {
        numColumns = 4;
    } else if (listItems?.length >= 4 && listItems?.length <= 7) {
        numColumns = 3;
    }

    const getWidth = () => {
        let width = (SCREEN_WIDTH / numColumns + 1.2)
        if(numColumns == 4){
          width = (SCREEN_WIDTH / (numColumns + 1.1))
        }
        else if(numColumns == 5){
            width = (SCREEN_WIDTH / (numColumns + 1.38))
        }
        else {
          width = (SCREEN_WIDTH / (numColumns + 0.75))
        }
        return width;
    }


    const renderGridItem = ({ item, index }) => {
        let uri = require('assets/defaultMovie.png');

        if (item?.posterimageurl && item?.posterimageurl != null) {
            uri = item.posterimageurl;
        } else if (item?.posterimage == null || item?.posterimage == '') {
            uri = item.movieimage;
        } else {
            uri = 'https://image.tmdb.org/t/p/w780/' + item.posterimage;
        }

        return (
          <View style={{ padding: 3 }}>
            <FastImageComponent item={item} imgStyle={[{borderRadius: 4, height: SCREEN_WIDTH / getWidth() + scaledHeight(74) , width: getWidth() }]} movieId={item?.movieid || item?.movieId || item?.id} />
          </View>
        );
      };


    return (
        <AppConsumer>
        {(appConsumer) => (
            <View style={{}}>
                <Text style={[styles.title, {textAlign: 'center'}]}>
                    {listItems[0]?.pref || listItems[0]?.name}
                </Text>
                <Text style={[styles.description, styles.movieList]}>
                    {`Movie List (${listItems?.length > 0 ? listItems?.length : 0})`}
                </Text>
                <View style={styles.container}>
                    <FlatList
                        key={2}
                        data={listItems}
                        contentContainerStyle={{ paddingBottom: listItems?.length > 20 ? 26 : 0 }}
                        numColumns={numColumns}
                        keyExtractor={(item) => item.movieid}
                        renderItem={renderGridItem}
                    />
                    {listItems?.length > 20  && 
                        <Text style={[styles.description, styles.moreMoviesText]}>
                          {
                            `${(listItems?.length - 20)} + More Movies`  
                          }
                        </Text>
                    }
                </View>
                <View style={[CommonStyles.rowSpaceBetween, {marginTop: scaledHeight(24)}]}>
                    <Text style={[styles.description, {marginLeft: scaledHeight(10)}]}>
                        {StringConstants.CREATED_BY}
                    </Text>
                    {/* <Text style={[styles.description]}>
                        {`View Full List`}
                    </Text> */}
                </View>
                <View style={[CommonStyles.rowSpaceBetween, styles.horizontalGap]}>
                    <ProfileCard userRole={userRole} name={userName} userDP={userDP} userTag={userTag} isPremiumUser={isPremiumUser} isPremiumFlowEnabled={isPremiumFlowEnabled} />
                    <Logo height={scaledHeight(29)} width={scaledWidth(67)} />

                </View>
            </View>
        )}
      </AppConsumer>
    );
  }

  const ProfileCard = ({name, userRole, userTag, userDP, isPremiumUser, isPremiumFlowEnabled}) => {
      return (
      <TouchableOpacity style={styles.profileCard}>
        <View>
          {userDP == null || userDP == '' ? (
            <View style={[styles.defaultUserStyle, isPremiumFlowEnabled && isPremiumUser && {marginRight: 4}]}>
              <DefaultUser height={scaledHeight(44)} width={scaledHeight(44)} />
            </View>
          ) : (
            <Image
              source={{ uri: userDP }}
              style={[
                styles.image,
                styles.userDP,
              ]}
            />
          )}
          { isPremiumFlowEnabled && isPremiumUser && 
            <View style={styles.premiumBadge}>
              <PremiumBadge height={15} width={15} />
            </View>
          }
        </View>
        <View style={styles.userInfo}>
          <View style={[styles.userInfoInnerContainer, {alignItems: 'center'}]}>
            <Text
              numberOfLines={1}
              style={[
                styles.drawerText,
                styles.userName,
                userRole != '' && getUserBadgeIcon(userRole, 12) != null && {marginRight: 2}
              ]}
            >
              {/* {userName} */}
              {`${name ?? ''}`}
            </Text>
            {userRole != '' && getUserBadgeIcon(userRole, 12)}
          </View>
          <Text
            style={[
              styles.drawerText,
              styles.tagText
            ]}
          >
            @{userTag}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };


const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE,
        marginTop: scaledHeight(15)
    },
    premiumBadge: {
      position: 'absolute', 
      bottom: scaledHeight(9), 
      left: scaledHeight(32)
    },
    userDP: { 
      marginVertical: scaledHeight(7), 
      marginRight: scaledWidth(8) 
    },
    defaultUserStyle: {
        alignContent: 'center',
        height: scaledHeight(44),
        marginVertical: scaledHeight(7),
    },
    criticLogo: { 
      padding: 1, 
      paddingLeft: scaledWidth(6) 
    },
    movieList: {
      textAlign: 'center', 
      marginBottom: 20
    },
    moreMoviesText: {
      textAlign: 'center', 
      marginTop: scaledHeight(8)
    },
    description: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT4,
      },
      
      container: {
        backgroundColor: AppColors.GREY_VARIANT2, 
        borderRadius: scaledWidth(11), 
        alignItems: 'center', 
        width: SCREEN_WIDTH * 0.93, 
        paddingVertical: scaledHeight(15),
        paddingHorizontal: scaledHeight(11)
    },
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
        //width: '100%',
        marginTop: 6,
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center',
      },
      userName: { fontSize: 14, maxWidth: scaledWidth(120) },
      userInfo: { justifyContent: 'center', marginLeft: scaledWidth(6) },
      userInfoInnerContainer: { flexDirection: 'row', marginRight: scaledWidth(12) },
     
      tagText: {
        fontSize: 10,
        color: AppColors.GREY_VARIANT9,
        marginTop: 1,
        width: scaledWidth(128),
      },
      horizontalGap: {alignItems: 'center', paddingHorizontal: scaledHeight(10)}
});
