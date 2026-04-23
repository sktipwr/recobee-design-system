import { SCREEN_WIDTH, scaledWidth } from "utils/Dimensions";
import AppColors from "utils/Colors";
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CommonStyles from "../../../Styles";
import MovieRoll from 'svg/negatives_roll.svg'
import FontFamily from "utils/FontFamily";
import Arrow from "svg/right_arrow_yellow";
import SurveyDoc from "svg/survey_doc";
import StringConstants from "utils/StringConstants";
import Tick from "../../icons/Tick";
import { TriviaStatus } from "utils/HelperFunctions";
import CommonRewardCard from './CommonRewardCard';

export type TriviaCardProps = {
    item?: any;
    onCardPress: Function;
    triviaStatus: any,
    triviaCardRef: any,
    movieTimeFlow: any,
    cardHeight: any,
    paddingVertical: any,
    bgColor: any,
    borderWidth: any,
    borderColor: any,
    borderRadius: any,
    marginTop: any
  };

  export const TriviaCard: FC<TriviaCardProps> = ({
    item,
    triviaStatus,
    onCardPress,
    triviaCardRef,
    movieTimeFlow = false,
    cardHeight = scaledWidth(128),
    paddingVertical = 12,
    bgColor = AppColors.THEME_BG_COLOR,
    borderWidth = 0,
    borderColor = AppColors.LIGHT_YELLOW,
    borderRadius = 7,
    marginTop = 0
  }) => {

    const getDescription = () => {
        let description = '';
        if(triviaStatus == TriviaStatus.TRIVIA_LOST_WITH_TIMEOUT) { 
          description = StringConstants.TRIVIA_LOST_TIMEOUT_DESCRIPTION 
        }
        else if(triviaStatus == TriviaStatus.TRIVIA_LOST){
          description = StringConstants.TRIVIA_LOST_DESCRIPTION
        }
        else {
          description = StringConstants.TRIVIA_DONE_FOR_TODAY;
        }
        return description;
      }

    const containerStyle = [
      CommonStyles.streakCardContainer,
      {
        padding: 12,
        paddingVertical: paddingVertical,
        paddingBottom: 12,
        height: cardHeight,
        backgroundColor: bgColor,
        borderRadius: borderRadius,
        borderWidth: borderWidth,
        borderColor: borderColor,
        marginTop: marginTop,
        marginHorizontal: 0
      }
    ];

    const titleStyle = triviaStatus != TriviaStatus.TRIVIA_NOT_ATTEMPTED && item.type == 'trivia' ? styles.titleCompleted : null;
    const tickStyle = ((triviaStatus == TriviaStatus.TRIVIA_LOST_WITH_TIMEOUT) || (triviaStatus == TriviaStatus.TRIVIA_LOST)) ? styles.tickGrey : styles.tick;

  return (
    <CommonRewardCard
      cardRef={triviaCardRef}
      onPress={() => onCardPress(item.screen)}
      title={item?.title}
      subtitle={triviaStatus != TriviaStatus.TRIVIA_NOT_ATTEMPTED && item.type == 'trivia' ? getDescription() : item.activeDescription}
      rightIcon={
        triviaStatus != TriviaStatus.TRIVIA_NOT_ATTEMPTED && item.type == 'trivia'  
          ? 
            <View style={tickStyle}>
              <Tick height={17} width={17} color={AppColors.THEME_BG_COLOR} strokeWidth="2" />
            </View>
          :
            <Arrow height={20} width={20} />
      }
      backgroundDecoration={
        item.type == 'trivia' || item.type == 'movieTime'
          ? 
            <View style={styles.negatives}>
              <MovieRoll height={scaledWidth(148)} width={SCREEN_WIDTH + scaledWidth(20)} />
            </View>
          :
            <View style={styles.surveyDoc}>
              <SurveyDoc />
            </View>
      }
      bottomContent={
        !movieTimeFlow && 
          <View style={[CommonStyles.rowAlignCenter, styles.bottomContentContainer]}>
            <Text style={styles.points}>
              {triviaStatus != TriviaStatus.TRIVIA_WON ? (triviaStatus == TriviaStatus.TRIVIA_NOT_ATTEMPTED ? '50 ' : '0 '): '50 '}{'pts '}
            </Text>
            <Text style={styles.info}>
              {triviaStatus == TriviaStatus.TRIVIA_NOT_ATTEMPTED ? StringConstants.REWARD : StringConstants.REWARDED}
            </Text>
          </View>
      }
      containerStyle={containerStyle}
      titleStyle={titleStyle}
      subtitleStyle={styles.info}
    />
  );
}

const styles = StyleSheet.create({
    negatives: {
        position: 'absolute',
        right: 0,
        opacity: 0.3,
        borderRadius: 7
    },
    surveyDoc: {
        position: 'absolute',
        top: 0,
        right: 5
    },
    info: {
        fontSize: 12,
        color: AppColors.GREY_VARIANT4,
        fontFamily: FontFamily.DMSansRegular,
        
    },
    points: {
        fontSize: 14,
        color: AppColors.WHITE_VARIANT3,
        fontFamily: FontFamily.DMSansBold
    },
    tick: {
        height: 24,
        width: 24,
        borderRadius: 24,
        backgroundColor: AppColors.GREEN,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tickGrey: {
        height: 24,
        width: 24,
        borderRadius: 24,
        backgroundColor: AppColors.GREY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleCompleted: {
        color: AppColors.GREY_VARIANT4
    },
    bottomContentContainer: {
        marginTop: -4,
    }
});