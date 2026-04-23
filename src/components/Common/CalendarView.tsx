

import React, { useEffect, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import {Calendar} from 'react-native-calendars';
import { yyyyMMDD } from 'utils/DatetimeHelperFunctions';

export const CalendarView: React.FC = ({currentDate = yyyyMMDD(new Date()), onDayPress, focusedDate, onMonthChange, eventDates, isEventScreen = false, disablePastDate = false }) => {
    const eventStyle = {
            container: styles.markedContainer,
            text: styles.markedDay
    }
    const todayStyle = {
        container: styles.todayContainer,
        text: styles.todayText
    }

    const focusedStyle = {
        container: [styles.markedContainer, {backgroundColor: AppColors.LIGHT_YELLOW}],
        text: [styles.markedDay, {color: AppColors.GREY_VARIANT2}]
    }

  const [markedDates, setMarkedDates] = useState({
    [yyyyMMDD(new Date())] : {
        isToday: true,
        customStyles: todayStyle
    },
    })

  useEffect(() => {
    //TODO: format for dates to show marker for events
    if(eventDates?.length > 0){
        let markedDatesCopy = Object.assign({}, markedDates);
        eventDates.map((value) => {
                markedDatesCopy = {
                    ...markedDatesCopy,
                    [value]: {
                        customStyles: eventStyle, 
                        isEvent: true
                    }
                }
        })
       
        setMarkedDates(Object.assign({}, markedDatesCopy));
    }
    
  },[eventDates])

  useEffect(() => {
    if(eventDates?.length > 0){
        let markedDatesCopy = Object.assign({}, markedDates);
      
        for (let key in markedDatesCopy) {
            if (markedDatesCopy[key]?.isFocused && !(markedDatesCopy[key]?.isToday) && !(markedDatesCopy[key]?.isEvent)) {
                delete markedDatesCopy[key];
                break; // Assuming you only want to remove the first matching entry
            }
            else {
                markedDatesCopy[key].customStyles = markedDatesCopy[key]?.isToday ? todayStyle : markedDatesCopy[key]?.isEvent ? eventStyle : focusedStyle;
                markedDatesCopy[key].isFocused = false;
            }
        }
     
        markedDatesCopy = {
            ...markedDatesCopy,
            [yyyyMMDD(new Date(focusedDate))]: {
                isFocused: true,
                isEvent: eventDates.includes(yyyyMMDD(new Date(focusedDate))) ? true : false,
                isToday: yyyyMMDD(new Date(focusedDate)) == yyyyMMDD(new Date()) ? true : false,
                customStyles: focusedStyle},
        }
        setMarkedDates(Object.assign({}, markedDatesCopy));
    }
},[focusedDate])

  return (
    <View>
        <Calendar
            // Customize the appearance of the calendar
            style={styles.calendar}
            theme={{
                arrowColor: AppColors.LIGHT_YELLOW,
                backgroundColor: AppColors.BLACK,
                calendarBackground: AppColors.BLACK,
                textSectionTitleColor: AppColors.WHITE,
                selectedDayBackgroundColor: AppColors.LIGHT_YELLOW,
                textDayFontFamily: FontFamily.DMSansBold,
                textMonthFontFamily: FontFamily.DMSansBold,
                textDayHeaderFontFamily: FontFamily.DMSansBold,
                monthTextColor: AppColors.WHITE_VARIANT3,
                textDayFontSize: 12,
                textDayHeaderFontSize: 12,
                textMonthFontSize: 14,
                selectedDayTextColor: AppColors.GREY_VARIANT2,
                todayTextColor: AppColors.GREY_VARIANT4,
                dayTextColor: AppColors.GREY_VARIANT4,
                textDisabledColor: AppColors.GREY_VARIANT9
            }}
            // Specify the current date
            current={currentDate}
            minDate={disablePastDate ? yyyyMMDD(new Date()) : '1900-01-01'}
            // Callback that gets called when the user selects a day
            onDayPress={day => {
                onDayPress(day?.dateString)
            }}
            onMonthChange={day => {
                onMonthChange(day?.dateString)
            }}
            markingType={'custom'}
            // Mark specific dates as marked
            markedDates={
                isEventScreen ? 
                markedDates : 
                {
                    [focusedDate]: {
                        customStyles: focusedStyle
                    }
                }
            }
          
        />
    </View>
  );
};

const styles = StyleSheet.create({
    todayContainer: {
        backgroundColor: AppColors.TRANSPARENT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: AppColors.GREY_VARIANT9,
        borderWidth: 1,
        marginTop: -4
    },
    todayText: {
        color: AppColors.GREY_VARIANT4,
        fontWeight: 'bold'
    },
    markedContainer: {
        backgroundColor: AppColors.TRANSPARENT_YELLOW,
        justifyContent: 'center',
        borderColor: AppColors.LIGHT_YELLOW3,
        borderWidth: 1,
        alignItems: 'center',
        marginTop: -4,
        borderRadius: 25
    },
    markedDay: {
        color: AppColors.GREY_VARIANT4,
        fontWeight: 'bold'
    },
    calendar: {
        borderWidth: 0,
        borderColor: AppColors.BLACK,
        height: 280,
        borderRadius: 12,
        marginTop: 5
    },
})

