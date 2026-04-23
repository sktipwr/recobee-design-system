import React, {  } from "react";

import {
  View,
  Text,
} from "react-native";
import AppColors from "utils/Colors";
import CommonStyles from "../../../Styles";
import { Circle } from "../Common/Circle";
import { TimelineMovieCard } from "../Cards/TimelineMovieCard";
import { ActivityMovieCard } from "../Cards/ActivityMovieCard";
import { PostAcivityCard } from "../Cards/PostActivityCard";

export const TimelineViewWrapper: React.FC = ({
  isVisibleMoreOptions,
  item,
  isReview = false,
  onMovieClick = (f) => f,
  onCommentClick = (f) => f, 
  onSeenClick,
  onShareClick,
  onRateItClick,
  onReviewClick,
  moreOptionsClicked,
  isUpcoming,
  isMySeen,
  isActivityCard = false,
  onTagClicked,
  onListClick,
  onPostClick,
  isWatchlist = false
}) => {

  let dateString = ''
  let items = []
  for (let key in item) {
    dateString = key;
    // Check if the value associated with the current key is an array
    if (Array.isArray(item[key])) {
      // Found the dynamic key containing a list
      items = item[key];
    }
  }

    // conditionally render ui card for activity types
    const renderActivityCard = (data: any) => {
      const activityType = data?.activity_type;
      switch (activityType) {
        case 'like':
          return <ActivityMovieCard data={data} activityType={activityType} onMovieClick={onMovieClick} />;
        case 'rate':
          return <ActivityMovieCard data={data} activityType={activityType} onMovieClick={onMovieClick} />;
        case 'add_watchlist':
          return <ActivityMovieCard data={data} activityType={activityType} onMovieClick={onMovieClick} />;
        case 'remove_watchlist':
          return <ActivityMovieCard data={data} activityType={activityType} onMovieClick={onMovieClick} />;
        case 'seen_add':
          return <ActivityMovieCard data={data} activityType={activityType} onMovieClick={onMovieClick} />;
        case 'seen_remove':
          return <ActivityMovieCard data={data} activityType={activityType} onMovieClick={onMovieClick} />;
        case 'watching':
          return <ActivityMovieCard data={data} activityType={activityType} onMovieClick={onMovieClick} />;
        case 'post':
          return <PostAcivityCard data={data} activityType={activityType} onMovieClick={onMovieClick} onTagClicked={onTagClicked} onPostClick={onPostClick} onMovieClick={onMovieClick} />;
        case 'review':
          return <PostAcivityCard data={data} activityType={activityType} onMovieClick={onMovieClick} onTagClicked={onTagClicked} onReviewClick={onReviewClick} onMovieClick={onMovieClick} />;
        case 'add_list':
          return <PostAcivityCard data={data} activityType={activityType} onMovieClick={onMovieClick} onTagClicked={onTagClicked} onListClick={onListClick} />;
        case 'remove_list':
          return <PostAcivityCard data={data} activityType={activityType} onMovieClick={onMovieClick} onTagClicked={onTagClicked} onListClick={onListClick} />;
        case 'recommend':
          return <PostAcivityCard data={data} activityType={activityType} onMovieClick={onMovieClick} onTagClicked={onTagClicked} onListClick={onListClick} />;
        default:
          return null;
      }
    }


  return (
    <View style={CommonStyles.flexDirRow}>
      <View style={[CommonStyles.timelineMovieContainer, ]}>
        <View style={[CommonStyles.rowAlignCenter, {marginBottom: 8}]}>
          <Circle size={7} color={AppColors.LIGHT_YELLOW} />
          <View style={{width: 8}} />
          <Text style={[CommonStyles.timelineDate]}>
                {isActivityCard ? item?.date :dateString}
          </Text>
        </View>
        <View style={CommonStyles.rowAlignCenter}>
          <View style={[CommonStyles.timelineBar, {marginRight: 19, marginLeft: 4}]}></View>
            <View>
            {
              isActivityCard ?
                item?.activities?.map((value) => {
                  return renderActivityCard(value);
                })
              :
              items?.map((value) => {
                  return (
                    <TimelineMovieCard isWatchlist={isWatchlist} isMySeen={isMySeen} isUpcoming={isUpcoming} moreOptionsClicked={moreOptionsClicked} onReviewClick={onReviewClick} onRateItClick={onRateItClick} onShareClick={onShareClick} onSeenClick={onSeenClick} isReview={isReview} item={value} onMovieClick={onMovieClick} onCommentClick={onCommentClick} isVisibleMoreOptions={isVisibleMoreOptions} />

                )})}
            </View>
        </View>
      </View>
    </View>
  );
}
