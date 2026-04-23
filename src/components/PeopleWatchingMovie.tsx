import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { groupedName } from 'utils/HelperFunctions';
import StringConstants from 'utils/StringConstants';

import CommonStyles from '../../Styles';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import GroupImage from './List/GroupImage';

  interface PeopleWatchingMovieParams {
    peopleWatchingClicked: any,
    peopleWatchingMovie: any,
    item: any,
    isWatching: any
  }

  export const PeopleWatchingMovie: React.FC<PeopleWatchingMovieParams> = ({
    peopleWatchingClicked,
    peopleWatchingMovie,
    isWatching,
    item
  }) => 
    {
    

    return (
      <>
        <Text style={styles.watchingNowTitle}>
          {StringConstants.CURRENTLY_WATCHING}
        </Text>
        {peopleWatchingMovie?.length > 0 && (
          <TouchableOpacity
            style={[CommonStyles.rowAlignCenter, styles.watchingRow, (item?.is_watching != false && isWatching != false) ? {marginBottom: 16} : {marginBottom: 4}]}
            onPress={() => peopleWatchingClicked()}
          >
            <GroupImage
              item={peopleWatchingMovie}
              height={24}
              width={24}
              fontSize={12}
            />
            <View
              style={styles.watchingContainer}
            >
              <Text style={styles.wrap}>
                <Text style={[styles.peopleWatching]}>
                  {groupedName(
                    peopleWatchingMovie?.map((obj) => obj?.fname ?? obj?.name ?? ''),
                    true
                  )}
                </Text>
                <Text style={styles.areWatching}>
                  {peopleWatchingMovie?.length == 1
                    ? StringConstants.IS_CURRENTLY_WATCHING
                    : StringConstants.ARE_CURRENTLY_WATCHING}
                </Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
};

const styles = StyleSheet.create({
  peopleWatching: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.LIGHT_YELLOW,
    marginLeft: 4,
  },
  areWatching: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
  },
  watchingRow: { 
    marginLeft: 4
  },
  watchingNowTitle: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginBottom: 16,
    paddingLeft: 4,
  },
  watchingContainer: {
    flex: 1,
    marginLeft: 5,
  },
  wrap: { flexWrap: 'wrap' },

});
