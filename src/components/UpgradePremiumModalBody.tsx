import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import StringConstants from 'utils/StringConstants';
import GradientBtn from './Common/GradientBtn';
import CommonStyles from '../../Styles';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import EncryptedStorage from 'react-native-encrypted-storage';

export const UpgradePremiumModalBody: React.FC = ({planInfo, description, goToPremiumScreen}) => 
    {
    const [showUSD, setShowUSD] = useState(false)

    const checkCountry = () => {
      try {
        EncryptedStorage.getItem("user_country").then((value) => {
          if(value != null && value != undefined && value != 'India'){
            setShowUSD(true)
          }
          });
      }
      catch(e){
          console.log({e})
      }
    }

    useEffect(() => {
      checkCountry()
    },[])

    return (
        <View style={[CommonStyles.paddingHorizontal16, styles.container]}>
            <Text style={[CommonStyles.buySubscription]}>
                    {description}
            </Text>
            <View style={[CommonStyles.rowAlignCenter, styles.spacing]}>
              <Text style={[CommonStyles.planDescription]}>
                      {StringConstants.STARTING_FROM + StringConstants.LESS_THAN}
              </Text>
              <Text style={[styles.rupee]}>
                {showUSD ? StringConstants.DOLLAR_SYMBOL : StringConstants.RUPEE_SYMBOL}
              </Text>
              <Text style={[CommonStyles.planDescription]}>
                  {showUSD ? StringConstants.MONTH_PRICE_DOLLARS  : planInfo}
              </Text>
            </View>
            <GradientBtn onPress={() => goToPremiumScreen()} height={48} width={156} radius={192} text={StringConstants.UPGRADE_NOW} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    width: '100%', 
    marginTop: 18
  },
  spacing: {
    marginTop: 10, 
    marginBottom: 25
  },
  rupee: {
    marginTop: 1.6,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
    color: AppColors.LIGHT_YELLOW
  }
  
});
