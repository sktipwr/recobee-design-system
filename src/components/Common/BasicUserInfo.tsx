import CommonStyles from '../../../Styles';
import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet, View, Pressable} from 'react-native';
import StringConstants from 'utils/StringConstants';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import { checkBadge, getUserBadgeIcon } from 'utils/HelperFunctions';
import DefaultUser from "svg/user";
import PremiumBadge from 'svg/premium_badge_icon';

export const BasicUserInfo: React.FC = ({details, onUserClick, isAdmin, borderColor, isPremiumFlowEnabled}) => {
  return (
    <View style={[styles.container, {borderColor: borderColor ?? 'transparent'}]}>
        <TouchableOpacity
            style={[CommonStyles.flexRow]}
            onPress={() => onUserClick(details.id)}
          >
            <View style={{ marginRight: 12 }}>
              {details?.image != null && details?.image != "" ? (
                <Image source={{ uri: details.image }} style={CommonStyles.dp} />
              ) : 
              details?.thumbnail != null && details?.thumbnail != "" ? (
                <Image source={{ uri: details.thumbnail }} style={CommonStyles.dp} />
              ) :
              (
                <DefaultUser height={33} width={36} />
              )}
              {details?.ispremium && isPremiumFlowEnabled &&
                <View style={[styles.premium]}>
                  <PremiumBadge height={13} width={13} />
              </View>
              }
            </View>
            <View>
              <View style={CommonStyles.flexDirRow}>
                <Text style={CommonStyles.txtHeaderLarge}>{details?.name}</Text>
                {
                  (checkBadge(details?.userrole)) && (
                    <View style={CommonStyles.userBadge}>
                      {getUserBadgeIcon(details?.userrole)}
                    </View>
                    )
                }
              </View>
              <Text
                style={[styles.txtBody]}
              >
                {details?.usertag}
              </Text>
            </View>
          </TouchableOpacity>
          {isAdmin && 
          <Text
            style={[styles.txtBody, {color: AppColors.GREY_VARIANT9}]}
            >
            {StringConstants.ADMIN}
            </Text>
          }
        </View>
  );
};

const styles = StyleSheet.create({
    txtBody: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT1
    },
    premium: {
      position: 'absolute',
      bottom: 3,
      right: -3.6
    },
    container: {
        flexDirection: "row",
        height: SCREEN_WIDTH / 6,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        marginTop: 4,
        borderWidth: 0.5,
        borderRadius: 4
      },
})
