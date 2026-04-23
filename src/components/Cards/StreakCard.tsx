

import AppColors from "utils/Colors";

import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CommonStyles from "../../../Styles";
import FontFamily from "utils/FontFamily";
import Arrow from "svg/right_arrow_yellow";
import StringConstants from "utils/StringConstants";
import Tick from "../../icons/Tick";
import CalendarFire from "../../icons/CalendarFire";
import CalendarFireSmall from 'svg/calendar_fire_small.svg'
import Trophy from 'svg/gradient_trophy.svg'

export type StreakCardProps = {
    item?: any;
    onCardPress: Function;
    userStreak: any
  };

  export const StreakCard: FC<StreakCardProps> = ({
    item,
    onCardPress,
    userStreak
  }) => {

  const [streakValues, setStreakValues] = useState([])
  let isActive = false;

  useEffect(() => {
    let streakLength = userStreak?.streak?.length ?? 0;
    if(streakLength == 0){
      let streak = []
      for (let i = 0; i < 7; i++) {
        streak.push({completed: false})
      }
      setStreakValues(streak?.slice())
    }
    else if(((streakLength) % 7) == 0){
      let streak = []
      for (let i = 0; i < 7; i++) {
        streak.push({completed: true})
      }
      setStreakValues(streak?.slice())
    }
    else if(streakLength > 0){
      let additionalDays = streakLength % 7;
      let streak = []
      for (let i = 0; i < 7; i++) {
        streak.push({completed: (i + 1) <= additionalDays ? true : false})
      }
      setStreakValues(streak?.slice())
    }
  },[userStreak])

  // points for next award
  const nextReward = () => {
    let points = 200;
    let streakLength = userStreak?.streak?.length;
    if(streakLength < 7){
      points = 200;
    }
    if(streakLength >= 7 && streakLength < 14){
      points = 500;
    }
    if(streakLength >= 14 && streakLength < 21){
      points = 1000;
    }
    if(streakLength >= 21 && streakLength < 28){
      points = 2000;
    }
    return points;
  }
  
  return (
    <TouchableOpacity style={[CommonStyles.streakCardContainer, {padding: 12}]} onPress={() => onCardPress(item.screen)}>
        <View style={styles.calendarBg}>
            <CalendarFire />
        </View>
        <View style={styles.spaceBtw}>
            <View style={[CommonStyles.rowSpaceBetween]}>
                <Text style={[styles.title, !isActive && item.type == 'trivia' && {color: AppColors.GREY_VARIANT4}]}>
                    {item?.title}
                </Text>
                <Arrow height={20} width={20} />
            </View>
            <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]}>
              <View style={[CommonStyles.rowAlignCenter]}>
                  <CalendarFireSmall  />
                  <Text style={[styles.points, {fontSize: 28}]}>
                      {` ${userStreak?.streakCount ?? 0}`}
                  </Text>
                  <Text style={[styles.info, {marginTop: 9}]}>
                    {'/28 days'}
                  </Text>
              </View>
              <View style={styles.flexEnd}>
                  <Text style={styles.points}>
                      {`${nextReward()} pts`}
                  </Text>
                  <Text style={styles.info}>
                      {StringConstants.NEXT_REWARD}
                  </Text>
              </View>
            </View>
            <View style={[CommonStyles.rowSpaceBetween]}>
              {streakValues.map((value, index) => {
                return (
                  <>
                    {index == 6
                      ? 
                        <Trophy height={26} width={26} />
                      :
                        <View style={[styles.tick, value.completed ? {backgroundColor: AppColors.GREY_VARIANT4} : {backgroundColor: AppColors.TRANSPARENT, borderColor: AppColors.GREY_VARIANT11, borderWidth: 1, borderRadius: 24}]}>
                            <Tick height={18} width={18} color={value.completed ? AppColors.THEME_BG_COLOR : AppColors.GREY_VARIANT4} />
                        </View>
                    }
                  </>
                )
              })}
            </View>
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    calendarBg: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    title: {
        fontSize: 16,
        color: AppColors.WHITE_VARIANT3,
        fontFamily: FontFamily.DMSansBold
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
    spaceBtw: {
        justifyContent: 'space-between',
        flex: 1
    },
    flexEnd: {alignItems: 'flex-end'},
    tick: {
      height: 24,
      width: 24,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center'
    }
});
