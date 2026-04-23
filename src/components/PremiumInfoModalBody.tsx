import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { AppConsumer } from 'context';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import GradientBtn from './Common/GradientBtn';
import CommonStyles from '../../Styles';
import DefaultUser from 'svg/user';
import { scaledWidth } from 'utils/Dimensions';
import PremiumBadge from 'svg/premium_badge_icon';

interface PremiumInfoModalBodyParams {
    userDP: any,
    upgradeNowClicked: () => any,
    userName: any
}

export const PremiumInfoModalBody: React.FC<PremiumInfoModalBodyParams> = ({
    userDP,
    upgradeNowClicked,
    userName
    }) => 
    {
    
    return (
        <AppConsumer>
        {(appConsumer) => (
            <View style={[CommonStyles.paddingHorizontal16, styles.container]}>
              <View style={{ flexDirection: 'row' }}>
                {userDP == '' || userDP == null ? (
                  <DefaultUser
                    height={scaledWidth(58)}
                    width={scaledWidth(58)}
                  />
                ) : (
                  <Image
                    source={{ uri: userDP }}
                    style={styles.profileDP}
                  />
                )}
                <View style={styles.premiumBadge}>
                  <PremiumBadge height={17} width={17} />
                </View>
              </View>
              <View style={[CommonStyles.rowAlignCenter, styles.spacing]}>
                <Text style={[styles.userInfo]}>
                        {userName}
                </Text>
                <Text style={[styles.info]}>
                        {StringConstants.IS_A_PREMIUM_USER}
                </Text>
            </View>
            <Text style={[styles.info, {color: AppColors.WHITE}]}>
              {StringConstants.YOU_CAN_ENJOY_PREMIUM_BENEFITS_NOW}
            </Text>
            
            <View style={[CommonStyles.rowAlignCenter, {marginBottom: 24}]}>
              <Text style={[CommonStyles.planDescription]}>
               {StringConstants.STARTING_FROM + StringConstants.LESS_THAN}
              </Text>
              <Text style={[styles.rupee]}>
                {StringConstants.RUPEE_SYMBOL}
              </Text>
              <Text style={[CommonStyles.planDescription]}>
                  {StringConstants.THREE_MONTHS_PLAN}
              </Text>
            </View>
            <GradientBtn onPress={() => upgradeNowClicked()} height={48} width={156} radius={192} text={StringConstants.UPGRADE_NOW} />
        </View>
        )}
        </AppConsumer>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    width: '100%', 
    marginTop: 10
  },
  userInfo: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
    color: AppColors.WHITE_VARIANT2
  },
  spacing: {
    marginTop: 8, 
    marginBottom: 24
  },
  info: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 14,
    color: AppColors.WHITE_VARIANT2
  },
  profileDP: {
    height: scaledWidth(58),
    width: scaledWidth(58),
    borderRadius: scaledWidth(29)
  },
  premiumBadge: {
    position: 'absolute', 
    right: -3, 
    bottom: 3
  },
  rupee: {
    marginTop: 1.6,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
    color: AppColors.LIGHT_YELLOW
  }
});
