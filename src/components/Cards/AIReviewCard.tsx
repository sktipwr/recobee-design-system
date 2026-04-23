import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";

import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CommonStyles from "../../../Styles";
import MovieRoll from 'svg/negatives_roll.svg'
import FontFamily from "utils/FontFamily";
import Arrow from "svg/right_arrow_yellow";
import SurveyDoc from "svg/survey_doc";
import StringConstants from "utils/StringConstants";
import Tick from "../../icons/Tick";
import { TriviaStatus } from "utils/HelperFunctions";
import StarFilled from "svg/star-main.svg";
import ArrowDown from "svg/down_arrow_grey";
import Sparkle from "../../../assets/images/icon/sparkle";
import recommendationsAPI from '../../../api/recommendationsAPI';
import AudienceSentimentCard from "./AudienceSentimentCard";
import { AnimatedProgressCircle } from "components/AnimatedProgressCircle";
export type AIReviewProps = {
    summary: string,
    movieId: string,
    reviewData?: any
  };

  export const AIReviewCard: FC<AIReviewProps> = ({
    summary,
    movieId,
    reviewData
  }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [reviewGraphData, setReviewGraphData] = useState(null);

  const calculatePercentage = (value) => {
    if (value) {
      return (value / 5) * 100;
    } else {
      return 0;
    }
  };

  const animatedCircle = (value: any, label: string) => {
    return (
      <AnimatedProgressCircle
        showCountOnly={true}
        viewOnly={true}
        filledRingColor={AppColors.GREY_VARIANT4}
        ringColor={AppColors.GREY_VARIANT6}
        percent={calculatePercentage(value)}
        innerText={value}
        label={label}
        horizontalGap={20}
        padding={2}
        outerWidth={3.2}
        size={SCREEN_WIDTH * 0.12}
      />
    )
  };

  useEffect(() => {
    const fetchReviewGraph = async () => {
      try {
        const response = await recommendationsAPI.getMovieReviewGraph(movieId);
        if (response?.status === 200 && response?.data?.result) {
          setReviewGraphData(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching movie review graph:', error);
      }
    };

    if (movieId) {
      fetchReviewGraph();
    }
  }, [movieId]);
  
    if (!summary && !reviewGraphData) {
    return null;
  }

  return (
    <View style={styles.container}>
    {summary && <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {StringConstants.RECOBEE_AI_REVIEW}
            </Text>
            <Sparkle />
          </View>
          <View style={[CommonStyles.rowAlignCenter]}>
            {/* TODO: not using numeric value for now, add {width: 43} on above view's style when enabling this in future */}
            {/* <StarFilled /> */}
            <View style={styles.width6} />
            <View style={styles.icon}>
              {isExpanded ? (
                <View style={styles.arrowExpanded}>
                  <ArrowDown height={24} width={24} />
                </View>
              ) : (
                <ArrowDown height={24} width={24} />
              )}
            </View>
          </View>
        </View>
        <View
          style={[
            CommonStyles.rowSpaceBetween,
            CommonStyles.alignCenter,
            { height: 24 },
          ]}
        >
          <Text style={styles.subTitle}>
            {StringConstants.SUMMARY_OF_REVIEWS}
          </Text>
          {/* TODO: not using numeric value for now */}
          {/* <Text style={[styles.subTitle, styles.review]}>{'4.0'}</Text> */}
        </View>
      </TouchableOpacity>}
      {!isExpanded ? (
        <>
          <Text style={styles.description}>{summary}</Text>
        </>
      ) : null}
      {reviewData?.items && reviewData.items.length > 0 && (() => {
        const firstReview = reviewData.items[0];
        return (
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              flex: 1,
              justifyContent: "space-around",
              width: SCREEN_WIDTH - 64,
            }}
          >
            {firstReview?.avgratingstory &&
              firstReview.avgratingstory != "0" &&
              firstReview.avgratingstory != "NaN" && (
                animatedCircle(firstReview.avgratingstory, 'Story')
              )}
            {firstReview?.avgratingdirection &&
              firstReview.avgratingdirection != "0" &&
              firstReview.avgratingdirection != "NaN" && (
                animatedCircle(firstReview.avgratingdirection, 'Direction')
              )}
            {firstReview?.avgratingacting &&
              firstReview.avgratingacting != "0" &&
              firstReview.avgratingacting != "NaN" && (
                animatedCircle(firstReview.avgratingacting, 'Acting')
              )}
            {firstReview?.avgratingvisuals &&
              firstReview.avgratingvisuals != "0" &&
              firstReview.avgratingvisuals != "NaN" && (
                animatedCircle(firstReview.avgratingvisuals, 'Visuals')
              )}
            {firstReview?.avgratingmusic &&
              firstReview.avgratingmusic != "0" &&
              firstReview.avgratingmusic != "NaN" && (
                animatedCircle(firstReview.avgratingmusic, 'Music')
              )}
          </View>
        );
      })()}
      <AudienceSentimentCard
            positive={ reviewGraphData?.PositiveReviews || 0}
            neutral={ reviewGraphData?.NeutralReviews || 0}
            negative={ reviewGraphData?.NegativeReviews || 0}
            fromMovieDetails={true}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 10 
  },
  container: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    padding: 16,
    borderColor: AppColors.WHITE,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    color: AppColors.WHITE,
    fontFamily: FontFamily.DMSansBold
  },
    arrowExpanded : {
        transform: [{ rotate: '270deg'}]
    },
    width6: {
        width: 3
    },
    icon: {
        padding: 1
    },
    subTitle: {
        fontSize: 12,
        color: AppColors.GREY_VARIANT4,
        fontFamily: FontFamily.DMSansRegular
    },
    review: {
        color: AppColors.WHITE,
        width: 43,
    },
    description: {
        fontSize: 13,
        color: AppColors.GREY_VARIANT4,
        fontFamily: FontFamily.DMSansRegular,
        marginTop: 12,
    }
    
});
