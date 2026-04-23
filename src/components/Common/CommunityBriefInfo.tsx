import CommonStyles from '../../../Styles';
import React from 'react';
import {Image, Text, StyleSheet, View, Pressable} from 'react-native';
import StringConstants from 'utils/StringConstants';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import { SCREEN_WIDTH } from 'utils/Dimensions';

export const CommunityBriefInfo: React.FC = ({details, membersClicked, membersClickable = false}) => {
  return (
    <View style={[CommonStyles.rowAlignCenter]}>
        {details?.image != null && details?.image != ''
            ? 
                <Image source={{uri: details?.image}} style={styles.image} />
            :
            <View style={[styles.image, styles.center]}>
            <Image
                source={require('assets/BlackBee.png')}
                fadeDuration={0}
                style={styles.beeImage}
                
                />
            </View>
            }
            <View style={styles.marginLeft7}>
                <Text style={[styles.name]}>
                    {details.name}
                </Text>
                <Pressable style={CommonStyles.flexDirRow} onPress={() => {if(membersClickable)membersClicked()}}>
                    {details?.status &&
                    <Text style={[styles.communityType]}>
                        {details?.status == '2' ? StringConstants.PUBLIC : StringConstants.PRIVATE} {' '}
                    </Text>
                    }
                    <Text style={[styles.members, !membersClickable && {color: AppColors.WHITE}]}>
                        {details?.memberCount + ' ' + StringConstants.MEMBERS}
                    </Text>
                </Pressable>
                
            </View>
            </View>
  );
};

const styles = StyleSheet.create({
    communityType: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.GREY_VARIANT4,
      },
    beeImage: {
        height: 40, 
        width: 40,
        borderRadius: 40, 
        resizeMode: 'contain' 
    },
    center: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    image: {
        height: 48, 
        width: 48, 
        borderRadius: 48
    },
    members: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansRegular,
        color: AppColors.LIGHT_YELLOW,
    },
    name: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE_VARIANT3,
    },
    marginLeft7: {
        marginLeft: 7
    },
})
