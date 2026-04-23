import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';
import EncryptedStorage from "react-native-encrypted-storage";
import StarFilled from 'icons/StarFilled';
import CommonStyles from '../../Styles';
import Watchlist from 'svg/watchlist.svg'
import Review from "icons/Review";

const REWARD_INFO = [
  {icon: <Review height={14} width={14} color={AppColors.GREY_VARIANT4} strokeWidth="1.8" />, title: 'Import Reviews'},
  {icon: <StarFilled color={AppColors.GREY_VARIANT4} />, title: 'Import Ratings'},
  {icon: <Watchlist color={AppColors.GREY_VARIANT4} />, title: 'Import Watchlists'}
]

interface CriticRecoModalBodyParams {
  dismissClicked: Function,
}

export const CriticRecoModalBody: React.FC<CriticRecoModalBodyParams> = ({
  dismissClicked
    }) => 
    {

    const [name, setName] = useState('')

      useEffect(() => {
        getName()
    },[])

    // get user full name
    const getName = async () => {
        try {
            EncryptedStorage.getItem("user_fname").then((userFName) => {
                setName(userFName);
            });
        }
        catch(e){
            console.log({e})
        }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.userName}>{StringConstants.HEY} {name}!</Text>
        <Text style={[styles.importInfo, {marginBottom: 20}]}>{StringConstants.CAN_IMPORT_DATA_FROM_OTHER_PLATFORMS}</Text>
        {REWARD_INFO?.map((value) => {
          return (
            <View style={[CommonStyles.rowAlignCenter, styles.listContainer]}>
              <View style={styles.iconContainer}>
                {value.icon}
              </View>
              <Text style={[styles.info, {marginLeft: 8}]}>{value.title}</Text>
            </View>
          )
        })}
        <Text style={[styles.dismiss, {marginTop: 0}]}>{StringConstants.AND_MUCH_MORE}</Text>
        <Text style={styles.availableOn}>{StringConstants.AVAILABLE_ON_WEB_APP_ONLY}</Text>
        <Text onPress={() => dismissClicked()} style={styles.dismiss}>{StringConstants.DISMISS}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  importInfo: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE_VARIANT3,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  container: {
    marginHorizontal: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: AppColors.BLACK_VARIANT4,
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.47,
    borderRadius: 20,
    borderColor: AppColors.GREY_VARIANT6,
    borderWidth: 1
  },
  dismiss: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT1,
    marginTop: 12
  },
  userName: {
    fontSize: 20,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE_VARIANT3,
    marginBottom: 14
  },
  availableOn: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE_VARIANT3,
    marginTop: 12
  },
  info: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE_VARIANT3,
  },
  listContainer: {
    marginBottom: 16,
    width: SCREEN_WIDTH * 0.4,
  },
  iconContainer: {
    height: scaledWidth(30),
    width: scaledWidth(30),
    borderRadius: scaledWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.GREY_VARIANT6
  }
});
