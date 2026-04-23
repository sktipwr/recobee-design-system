import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import Watching from 'icons/Watching';

import CommonStyles from '../../Styles';
import { SCREEN_WIDTH } from 'utils/Dimensions';

  interface WatchingNowParams {
    isWatching: any,
    markSeen: any,
    watchingNowClicked: (value: any) => any,
    peopleCount: number
  }

  export const WatchingNow: React.FC<WatchingNowParams> = ({
    isWatching,
    markSeen,
    watchingNowClicked,
    peopleCount
  }) => 
    {
    

    return (
      <View style={[styles.isWatchingContainer, CommonStyles.rowSpaceBetween, CommonStyles.alignCenter, peopleCount == 0 && {marginTop: 4}]}>
        {
          isWatching 
            ? 
            <View>
              <Text style={[styles.markIsWatching, {width: SCREEN_WIDTH * 0.5}]}>
                {StringConstants.COMPLETED_WATCHING}
                <Text style={[styles.watchingNow, {color: AppColors.LIGHT_YELLOW}]} onPress={() => markSeen()}>
                  {' '}{StringConstants.MARK_AS_SEEN}
                </Text>
              </Text>
              <Text style={[styles.markIsWatching, styles.changedMind]}>
                {StringConstants.CHANGED_MIND}
                <Text style={[styles.watchingNow, {color: AppColors.LIGHT_YELLOW}]} onPress={() => watchingNowClicked(null)}>
                  {' '}{StringConstants.DID_NOT_WATCH}
                </Text>
              </Text>
            </View>
            :
            isWatching == null &&
            <Text style={[styles.markIsWatching, {width: SCREEN_WIDTH * 0.48}]}>
              <Text style={styles.watchingNow}>
                {StringConstants.WATCHING_IT_NOW}
              </Text>
              {' '}{StringConstants.CLICK_HERE_TO_LET_EVERYONE_KNOW}
            </Text>
        }
        <TouchableOpacity style={[styles.watchingNowButton, CommonStyles.rowAlignCenter, {backgroundColor: isWatching ? AppColors.TRANSPARENT_YELLOW : AppColors.GREY_VARIANT6}]}
          onPress={() => watchingNowClicked(true)}
        >
          <Watching />
          <Text style={[styles.markIsWatching, {marginLeft: 4}]}>{isWatching ? StringConstants.WATCHING : StringConstants.IS_WATCHING_NOW}</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({

  isWatchingContainer: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingBottom: 4
  },
  markIsWatching: {
    fontSize: 12,
    color: AppColors.WHITE_VARIANT3,
    fontFamily: FontFamily.DMSansRegular
  },
  watchingNowButton: {
    borderRadius: 4,
    padding: 8
  },
  watchingNow: {
    fontSize: 12,
    color: AppColors.WHITE_VARIANT3,
    fontFamily: FontFamily.DMSansBold
  },
  changedMind: {
    width: SCREEN_WIDTH * 0.5, 
    marginTop: 4
  },

});
