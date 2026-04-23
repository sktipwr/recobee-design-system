import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { AppConsumer } from "context";
import { SCREEN_WIDTH, scaledHeight, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";
import DefaultUser from 'svg/user';
import Critic from 'svg/critic';
import Logo from 'svg/logoWithNoBg';
import StringConstants from "utils/StringConstants";
import { checkBadge, getUserBadgeIcon } from "utils/HelperFunctions";
import PremiumBadge from 'svg/premium_badge_icon';

export const ProfileShareCard: React.FC = ({userName, userTag, userDP, userRole, followersCount, followingCount, userBio, badges, isPremiumUser, isPremiumFlowEnabled}) => {
    const MovieInfo = (badge, title) => (
        <View style={{alignItems: 'center'}}>
              <Text
                  style={[
                    styles.txtHeader,
                    { color: AppColors.GREY_VARIANT10, fontSize: 20 },
                  ]}
                >
                  {badge?.count ?? 0}
                </Text>
                <Text
                  style={[
                    styles.txtBody,
                    { color: AppColors.GREY_VARIANT10, fontSize: 8 },
                  ]}
                >
                  {title}
                </Text>
              </View>
    )
 
    return (
        <AppConsumer>
        {(appConsumer) => (
          <View style={styles.container}>
          <View
              style={styles.userPic}
            >
              {userDP == null || userDP == '' ? (
                <DefaultUser
                  height={SCREEN_WIDTH * 0.232}
                  width={SCREEN_WIDTH * 0.232}
                />
              ) : (
                <Image
                  source={{ uri: userDP }}
                  style={CommonStyles.profileDP}
                />
              )}
              {isPremiumUser && isPremiumFlowEnabled && 
                <View style={styles.premiumBadge}>
                  <PremiumBadge />
                </View>
              }
            </View>
            <View style={styles.userInfo}>
                <Text
                style={[
                    styles.txtHeader,
                    { color: appConsumer.theme.colors.text },
                ]}
                >
                {userName}
                </Text>
                {checkBadge(userRole) && (
                <View style={CommonStyles.userBadge}>
                    {getUserBadgeIcon(userRole)}
                </View>
                )}
            </View>
            <View style={styles.bottomPadding}>
                <Text
                style={[
                    styles.txtBody,
                    styles.userTag,
                ]}
                >
                @{userTag}
                </Text>
            </View>
            {userBio && userBio != '' && userBio != 'null' && (
            <Text
                style={[
                    styles.txtBody,
                    { color: appConsumer.theme.colors.text, 
                    },
                    styles.descText
                ]}
                >
               {userBio}
                </Text>)}
                <View style={styles.followContainer}>
                    <View
                        style={[styles.followInfo,{paddingRight: 24,}]}
                    >
                        <Text
                        style={[
                            styles.txtHeader,
                            { color: appConsumer.theme.colors.text, marginRight: 7 },
                        ]}
                        >
                        {followersCount}
                        </Text>
                        <Text
                        style={[
                            styles.txtBody,
                            { color: appConsumer.theme.colors.text },
                        ]}
                        >
                            {StringConstants.FOLLOWERS}
                        </Text>
                </View>
                <View
                    style={[styles.followInfo]}
                >
                    <Text
                    style={[
                        styles.txtHeader,
                        { color: appConsumer.theme.colors.text, marginRight: 7 },
                    ]}
                    >
                    {followingCount}
                    </Text>
                    <Text
                    style={[
                        styles.txtBody,
                        { color: appConsumer.theme.colors.text },
                    ]}
                    >
                    {StringConstants.FOLLOWING}
                    </Text>
              </View>
            </View>
            <View style={styles.movieInfo}>
                {MovieInfo(badges?.find((value) => value?.name == 'Seen Movies'), StringConstants.MOVIES_WATCHED)}
                {MovieInfo(badges?.find((value) => value?.name == 'Lists'), StringConstants.LIST_CREATED)}
                {MovieInfo(badges?.find((value) => value?.name == 'Reviews'), StringConstants.REVIEWS_WRITTEN)}
            </View>
            <Text
                style={[
                styles.txtBody,
                { color: appConsumer.theme.colors.text, marginBottom: scaledHeight(14) },
                ]}
            >
                {StringConstants.AVAILABLE_ON}
            </Text>
            <Logo height={scaledHeight(44)} width={scaledWidth(106)} />
  
          </View>
        )}
      </AppConsumer>
    );
  }


const styles = StyleSheet.create({
      txtBody: {
        fontSize: 14,
        fontFamily: 'DMSans-Regular',
        color: '#FFF',
      },
      premiumBadge: {
        position: 'absolute',
        bottom: scaledWidth(5.1),
        right: 0
      },
      userTag: { 
        color: AppColors.GREY_VARIANT4, 
        fontSize: 10 
      },
      txtHeader: {
        fontSize: 16,
        fontFamily: 'DMSans-Bold',
      },
      followContainer: { flexDirection: 'row', marginBottom: scaledHeight(35) },
      followInfo: {
        flexDirection: 'row',
        
        justifyContent: 'center',
        alignItems: 'center',
        },
      container: {
        backgroundColor: AppColors.GREY_VARIANT2, 
        borderRadius: scaledWidth(11), 
        alignItems: 'center', 
        width: SCREEN_WIDTH * 0.93, 
        paddingBottom: scaledHeight(49),
        marginTop: scaledHeight(80)
    },
    bottomPadding: { paddingBottom: scaledHeight(14) },
    userInfo: { 
      flexDirection: 'row', 
      paddingTop: 8,
      justifyContent: 'center',
    },
    userPic: {
        flexDirection: 'row',
        marginTop: -scaledHeight(40),
        width: SCREEN_WIDTH * 0.232,
        justifyContent:'center',
      },
    movieInfo: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-around', 
      width: SCREEN_WIDTH * 0.8, 
      marginBottom: scaledHeight(37)
    },
    descText: {
      fontSize: 10,
      width: SCREEN_WIDTH * 0.7,
      textAlign: 'center', 
      marginBottom: scaledHeight(14)
    }
});
