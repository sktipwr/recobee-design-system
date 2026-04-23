import Config from "react-native-config";
import { BannerAd } from 'react-native-google-mobile-ads';
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledHeight } from "utils/Dimensions";
import mixpanel from 'mixpanel';
import { Platform, View, Text, StyleSheet } from "react-native";
import { AdPosition, BOTTOM_TAB_HEIGHT } from "utils/HelperFunctions";
import { useContext } from "react";
import { CommonAppContext } from "../../stores/common/commonAppContext";
import ActionTypes from "../../stores/actionTypes";
import CommonStyles from "../../../Styles";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import StringConstants from "utils/StringConstants";
import { LOG } from 'config';

var extendedLog = LOG.extend('TopRecoScreen');

export const AdmobBannerSize : React.FC<{adPosition: any, screenName: string, adWidth: number, adHeight: number, closeAds: Function, isGuestFlow:any}> = ({adPosition, screenName, adHeight, adWidth, closeAds , isGuestFlow = false }) => {
  const { commonAppState, commonDispatch } = useContext(CommonAppContext);

  let position = adPosition == AdPosition.HOME_BOTTOM ? 'home bottom' : adPosition == AdPosition.HOME_TOP ? 'below dailypicks' : 'movie details'
  if(adPosition == AdPosition.SHORTS){
    adHeight = commonAppState?.isPremiumFlowEnabled ? (adHeight - 17) : adHeight
  }

  const onAdLoadOrError = (showAd) => {
    if(adPosition == AdPosition.HOME_BOTTOM){
      commonDispatch({ type: ActionTypes.SET_HOME_BOTTOM_AD_VISIBILITY, payload: showAd });
    }
    else if(adPosition == AdPosition.HOME_TOP){
      commonDispatch({ type: ActionTypes.SET_HOME_TOP_AD_VISIBILITY, payload: showAd });
    }
    else if(adPosition == AdPosition.MOVIE_DETAILS){
      commonDispatch({ type: ActionTypes.SET_MOVIE_DETAILS_AD_VISIBILITY, payload: showAd });
    }
    else if(adPosition == AdPosition.SHORTS){
      commonDispatch({ type: ActionTypes.SET_SHORTS_AD_VISIBILITY, payload: showAd });
    }
    else if(adPosition == AdPosition.RECENT_RELEASES){
      commonDispatch({ type: ActionTypes.SET_RECENT_RELEASE_AD_VISIBILITY, payload: showAd });
    }
    else if(adPosition == AdPosition.SOCIAL_FEED_BOTTOM){
      commonDispatch({ type: ActionTypes.SET_SOCIAL_FEED_BOTTOM_AD_VISIBILITY, payload: showAd });
    }
    else if(adPosition == AdPosition.TRIVIA_CAROUSEL){
      commonDispatch({ type: ActionTypes.SET_TRIVIA_CAROUSEL_AD_VISIBILITY, payload: showAd });
    }
  }

  return (
    <View >
      {(commonAppState?.isPremiumFlowEnabled || isGuestFlow) && 
        <View style={[CommonStyles.rowSpaceBetween, styles.bottomGap, {width: adWidth}]}>
          <Text style={styles.ad}>{StringConstants.AD}</Text>
          <Text onPress={() => closeAds()} style={[styles.ad,{textDecorationLine: 'underline' }]}>{StringConstants.CLOSE_ALL_ADS}</Text>
        </View>
      }
      <BannerAd
          size={`${adWidth}x${adHeight}`}
          unitId={Platform.OS == 'ios' ? Config.ADMOB_BANNER_AD_UNIT_ID_IOS : Config.ADMOB_BANNER_AD_UNIT_ID_ANDROID}
          requestOptions={{
            keywords: ['music', 'movies', 'tv shows']
          }}
          onAdLoaded={() => onAdLoadOrError(true)}
          onAdOpened={() => {
            mixpanel.track("BannerAdClicked", {
              screen: screenName,
              source: position
            });

          }}
          onAdFailedToLoad={(error) => {
            extendedLog.error(
              "Error in displaying Ad with message: ",
              error
            );
            mixpanel.track("adFailedToLoad", {
              screen: screenName,
              source: position,
              error: error?.toString()
            });
            onAdLoadOrError(false)
          }}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  ad: {
    color: AppColors.WHITE, 
    fontFamily: FontFamily.DMSansBold, 
    fontSize: 11,
  },
  bottomGap: {
    marginBottom: 10
  }
})
