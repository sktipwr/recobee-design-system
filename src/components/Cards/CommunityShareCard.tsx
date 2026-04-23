import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { AppConsumer } from "context";
import { SCREEN_WIDTH, scaledHeight, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import Logo from 'svg/logoWithNoBg';
import StringConstants from "utils/StringConstants";
import FontFamily from "utils/FontFamily";
import { CommunityBriefInfo } from "../Common/CommunityBriefInfo";
import CommonStyles from "../../../Styles";

export const CommunityShareCard: React.FC = ({details}) => {

    let coverPicture = details?.image ?? details?.backdropImage;

    return (
        <AppConsumer>
        {(appConsumer) => (
          <View>
            <View style={styles.outerContainer}>
              <View style={styles.container}>
                <Image source={{uri : coverPicture }} style={[styles.movieImage, {marginBottom: 23}]} />
                <CommunityBriefInfo membersClickable={true} details={details} membersClicked={()=>{}} />
                <Text numberOfLines={5} style={[styles.description,]}>
                  {details?.description ?? ''}
                </Text>
                </View>
            </View>
            <View style={[CommonStyles.alignCenter, {marginBottom: 25}]}>
              <Text
                style={[
                  styles.metaData,
                  styles.joinCommunityGap
                ]}
              >
                  {StringConstants.JOIN_THE_COMMUNITY_ON}
              </Text>
              <Logo height={scaledHeight(44)} width={scaledWidth(106)} />
            </View>
        </View>
        )}
      </AppConsumer>
    );
  }


const styles = StyleSheet.create({
    details: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE,
        marginTop: 25
      },
      outerContainer: {
        alignItems: 'center', 
        marginTop: scaledHeight(10), 
        backgroundColor: AppColors.GREY_VARIANT2,
        borderBottomLeftRadius: scaledWidth(13),
        borderBottomRightRadius: scaledWidth(13)
      },
      joinCommunityGap: {
        marginTop: scaledHeight(18), 
        marginBottom: scaledHeight(5)
      },
      metaData: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT4,
      },
      description: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.WHITE_VARIANT3,
        paddingHorizontal: 16,
        marginVertical: 18
      },
      movieImage: {
        height: scaledHeight(152),
        width: '100%',
        borderTopLeftRadius: scaledWidth(13),
        borderTopRightRadius: scaledWidth(13),
      },
      container: {
        backgroundColor: AppColors.GREY_VARIANT2, 
        borderRadius: scaledWidth(11), 
        alignItems: 'center', 
        width: SCREEN_WIDTH * 0.93, 
    },
   
});
