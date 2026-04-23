import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CommonStyles from '../../../Styles';
import { AppConsumer } from 'context';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import List from 'svg/list';
import Leaderboard from 'svg/leaderboard';
import Edit from '../../icons/Pencil';
import Arrow from 'svg/right_arrow_yellow';
import { scaledHeight } from 'utils/Dimensions';
import StringConstants from 'utils/StringConstants';
import Pencil from "icons/Review";
import Eyes from "icons/Eyes";

const AnalyticsTopSection = ({ navigation, totalReviews, movieAnalyticsData}) => {

  // navigate to specific analytics
  const navigateAction = (type: string) => {
    if(type == StringConstants.REVIEWS_WROTE){
      navigation.navigateDeprecated('MyReviewsAnalytics')
    }
    else if(type == StringConstants.AVG_FILMS_PER_WEEK){
      navigation.navigateDeprecated('MyMovieTime')
    }
  }

  //get icon
  const ActivityDetail = ({ data, title, icon, navigateTo }) => {
    let IconComponent;

    switch (icon) {
      case 'Review':
        IconComponent = Pencil;
        break;
      case 'Edit':
        IconComponent = Edit;
      case 'List':
        IconComponent = List;
        break;
      case 'Leaderboard':
        IconComponent = Leaderboard;
        break;
      case 'Eyes':
        IconComponent = Eyes;
        break;
      default:
        IconComponent = null;
    }

    return (
      <TouchableOpacity
        style={CommonStyles.alignCenter}
        onPress={() => navigateAction(title)}
      >
        <Text style={styles.activityDetailData}>{data}</Text>
        <View style={[CommonStyles.rowAlignCenter, {marginVertical: 4}]}>
          {IconComponent && <IconComponent width={16} height={16} color={AppColors.WHITE_VARIANT3} strokeWidth={1.3} />}
          <Text style={styles.activityDetailTitle}>{title}</Text>
        </View>
        <View style={[CommonStyles.rowAlignCenter]}>
          <Text style={styles.knowMoreText}>{StringConstants.KNOW_MORE}</Text>
          <Arrow height={16} width={16} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
          <View>
            <ImageBackground style={styles.moviesBanner} source={require('../../../assets/list_static_cover.png')}>
              <Text style={styles.topSectionText}>{StringConstants.MY_ACTIVITY}</Text>
                <View style={[CommonStyles.paddingHorizontal16]}>
                  <View style={[CommonStyles.rowSpaceBetween,]}>
                    <View style={[CommonStyles.alignCentre]}>
                      <ActivityDetail
                        data={totalReviews}
                        title={StringConstants.REVIEWS_WROTE}
                        icon={'Review'}
                        navigateTo={''}
                      />
                      {/* TODO: in future will use this */}
                      {/* <View style={styles.statsGap} />
                      <ActivityDetail
                        data={'3'}
                        title={StringConstants.LISTS_ADDED}
                        icon={'List'}
                        navigateTo={''}
                      /> */}
                    </View>
                    <View>
                      <ActivityDetail
                        data={movieAnalyticsData?.avgFilmsPerWeek ?? '0'}
                        title={StringConstants.AVG_FILMS_PER_WEEK}
                        icon={'Eyes'}
                        navigateTo={''}
                      />
                      {/* TODO: in future will use this */}
                      {/* <View style={styles.statsGap} />
                      <ActivityDetail
                        data={'#9k'}
                        title={StringConstants.LEADERBOARD}
                        icon={'Leaderboard'}
                        navigateTo={''}
                      /> */}
                    </View>
                  </View>
                  <View style={[CommonStyles.rowSpaceBetween, {marginTop: 24}]}>
                    
                  </View>
                </View>
            </ImageBackground>
            
          </View>        
      )}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  moviesBanner: {
    width: '100%',
    height: scaledHeight(215),
    resizeMode: 'contain',
  },
  topSection: {
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topSectionText: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 20,
    color: AppColors.WHITE_VARIANT3,
    marginBottom: scaledHeight(28),
    marginTop: scaledHeight(82),
    textAlign: 'center'
  },
  activityDetailData: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 20,
    color: AppColors.GREY_VARIANT10
  },
  knowMoreText: {
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.LIGHT_YELLOW,
    fontSize: 12,
  },
  activityDetailTitle: {
    color: AppColors.GREY_VARIANT4,
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    marginLeft: 4,
  },
  statsGap: {height: 24}
});
export default AnalyticsTopSection;
