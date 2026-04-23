import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { TMDB_BASEURL, groupedName } from 'utils/HelperFunctions';
import StringConstants from 'utils/StringConstants';

import CommonStyles from '../../../Styles';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import FastImage from 'react-native-fast-image';
import StarFilled from 'icons/StarFilled';
import { ActivityMovieMetaInfo } from '../Common/ActivityMovieMetaInfo';
import { ActivityTypeAndTime } from '../Common/ActivityTypeAndTime';

  interface ActivityMovieCardParams {
    data: any,
    activityType: string,
    onMovieClick: Function
  }

  export const ActivityMovieCard: React.FC<ActivityMovieCardParams> = ({
    data,
    activityType,
    onMovieClick
  }) => 
    {
    
    const [movieImage, setMovieImage] = useState(null);
    
    useEffect(() => {
      let uri = null;

      if (data?.data?.posterimageurl && data?.data?.posterimageurl != null) {
        uri = data?.data?.posterimageurl;
      } else if (data?.data?.posterimage == null || data?.data?.posterimage == "") {
        uri = data?.data?.movieimage;
      } else {
        uri = TMDB_BASEURL + data?.data?.posterimage;
      }
      setMovieImage(uri);
    }, [data])

    
    return (
      <Pressable style={styles.container} onPress={() => onMovieClick(data?.data?.movieid || data?.data?.id , data?.data, activityType)}>
        <ActivityTypeAndTime type={activityType} datetime={data?.activity_date} />
        <ActivityMovieMetaInfo title={data?.data?.title} releaseDate={data?.releasedate} movieImage={movieImage} onMovieClick={() => onMovieClick(data?.data?.id || data?.data?.movieid, data?.data)} />
        {activityType == 'watching' && <Text style={styles.typeInfo}>{StringConstants.ADDED_TO_WATCHING}</Text>}
        {activityType == 'like' && <Text style={styles.typeInfo}>{StringConstants.LIKED_THE_MOVIE}</Text>}
        {activityType == 'add_watchlist' && <Text style={styles.typeInfo}>{StringConstants.YOU_ADDED_MOVIE_TO_WATCHLIST}</Text>}
        {activityType == 'remove_watchlist' && <Text style={styles.typeInfo}>{StringConstants.YOU_REMOVED_MOVIE_FROM_WATCHLIST}</Text>}
        {activityType == 'seen_add' && <Text style={styles.typeInfo}>{StringConstants.ADDED_TO_SEEN}</Text>}
        {activityType == 'seen_remove' && <Text style={styles.typeInfo}>{StringConstants.REMOVED_FROM_SEEN}</Text>}
        {activityType == 'rate' && data?.value &&
        <View style={[CommonStyles.rowAlignCenter]}>
          <Text style={styles.typeInfo}>{StringConstants.YOU_RATED_THIS_MOVIE + data?.value + ' '}</Text>
          <StarFilled color={AppColors.GREY_VARIANT4} />
        </View>
      }
      </Pressable>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 8,
    padding: 12,
    width: SCREEN_WIDTH * 0.87,
    marginLeft: -7,
    marginBottom: 12
  },
  typeInfo: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
  }

});
