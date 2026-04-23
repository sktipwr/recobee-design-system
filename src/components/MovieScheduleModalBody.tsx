import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AppConsumer } from 'context';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import { RoundedBtn } from './Common/RoundedBtn';
import { SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';
import CalendarIcon from 'svg/calendar_bold.svg'
import CommonStyles from '../../Styles';
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Colon from 'svg/colon'
import Edit from "../icons/Pencil";
import { CalendarView } from './Common/CalendarView';
import { convertTimestampTo24HourFormat, yyyyMMDD } from 'utils/DatetimeHelperFunctions';

interface MovieScheduleModalBodyParams {
    scheduleMovie: (startDate: any, time: string) => any,
    focusedDateString: any,
    focusedTimeString: any,
    calendarPress: any
}

export const MovieScheduleModalBody: React.FC<MovieScheduleModalBodyParams> = ({
        scheduleMovie,
        focusedDateString,
        focusedTimeString,
        calendarPress
    }) => 
    {
    //TODO: verify below in android and remove this comment if works fine
    // const [date, setDate] = useState(new Date(1598051730000));
    const [date, setDate] = useState(new Date());
    const [focusedDate, setFocusedDate] = useState(focusedDateString)
    const [hrs, setHrs] = useState('')
    const [mins, setMins] = useState('')
    const [seconds, setSeconds] = useState('')

    const onChange = (event: any, selectedDate: any) => {
        setDate(selectedDate)
        currentTime(selectedDate)
    };

    useEffect(() => {
        // Combine date and time strings into a single datetime string
        const dateTimeString = `${focusedDateString}T${focusedTimeString}`; // Adding ":00" for seconds

        // Create a Date object from the combined datetime string
        const dateTime = new Date(dateTimeString);

        currentTime(dateTime)
        setFocusedDate(yyyyMMDD(dateTime))
    },[])

    
    // setting hrs and mins from a datetime
    const currentTime = (date: any) => {
        // Get the current date and time
      
        // Extract the hours and minutes
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const secs = date.getSeconds();
      
        // Format hours and minutes to two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = secs.toString().padStart(2, '0');

        setHrs(formattedHours)
        setMins(formattedMinutes)
        setSeconds(formattedSeconds)
    }

    //time selection modal
    const showTimePicker = () => {
        let currentMode = 'time';
        if(Platform.OS == 'android'){
            DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
            });
        }
      };
    
    // showing digits for time
    const timeDigit = (value: string) => {
        return (
            <View style={styles.timeDigitContainer}>
                <Text style={styles.timeDigit}>{value}</Text>
            </View>
        )
    }

    // setting focused date
    const onDayPress = (value: any) => {
        setFocusedDate(value)
    }

    // data preparation for start and end date for scheduing event
    const schedule = () => {
        let startDateTime = new Date(focusedDate);
        startDateTime.setHours(parseInt(hrs, 10) || 0);
        startDateTime.setMinutes(parseInt(mins, 10) || 0);
        scheduleMovie(startDateTime, `${hrs}:${mins}:${seconds}`)
    }

    // get data for changed month
    const onMonthChange = (dateString: string) => {}
      
    return (
        <AppConsumer>
        {(appConsumer) => (
            <View style={styles.container}>
                <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter, {marginBottom: 24}]}>
                    <View style={[CommonStyles.flexDirRow, CommonStyles.alignCenter]}>
                        <CalendarIcon />
                        <Text style={styles.subHeader}>{StringConstants.WHEN_TO_WATCH}</Text>
                    </View>
                    <Text style={styles.calendar} onPress={() => calendarPress()}>{StringConstants.CALENDAR}</Text>
                </View>
                <Text style={styles.select}>{StringConstants.SELECT_DATE}</Text>
                <CalendarView disablePastDate={true} currentDate={focusedDate} focusedDate={focusedDate} onDayPress={onDayPress} onMonthChange={onMonthChange} />
                <Text style={[styles.select, {marginTop: 16}]}>{StringConstants.SELECT_TIME}</Text>
                <View style={[CommonStyles.rowAlignCenter, {marginTop: 4}]}>
                    {timeDigit(hrs?.length == 2 ? hrs[0] : '')}
                    {timeDigit(hrs?.length == 2 ? hrs[1] : '')}
                    <View style={styles.colon}>
                        <Colon />
                    </View>
                    {timeDigit(mins?.length == 2 ? mins[0] : '')}
                    {timeDigit(mins?.length == 2 ? mins[1] : '')}
                    <TouchableOpacity style={styles.editIcon} onPress={() => showTimePicker()}>
                        {Platform.OS == 'ios' ?
                        <>
                            <View style={styles.editTime}>
                                <Edit height={12} width={12} />
                            </View>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={'time'}
                                themeVariant="light"
                                textColor='transparent'
                                style={styles.timePicker}
                                accentColor='transparent'
                                display="default"
                                onChange={onChange}
                            />
                        </>
                        :
                            <Edit height={12} width={12} strokeWidth="1.6" />
                        }
                    </TouchableOpacity>
                </View>
               
                <View style={{height: 24}} />
                <RoundedBtn
                    text={StringConstants.SCHEDULE} 
                    textColor={AppColors.BLACK}
                    onClick={() => schedule()} 
                    borderRadius={8} 
                    borderColor={AppColors.LIGHT_YELLOW}
                    width={SCREEN_WIDTH - 32}
                    bgColor={AppColors.LIGHT_YELLOW}
                />
            </View>
        )}
        </AppConsumer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 16,
    },
    subHeader: {
        fontSize: 16,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE,
        marginLeft: 8
    },
    calendar: {
        fontSize: 12,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.LIGHT_YELLOW,
    },
    select: {
        fontSize: 14,
        fontFamily: FontFamily.DMSansBold,
        color: AppColors.WHITE,
    },
    timeDigitContainer: {
        backgroundColor: AppColors.BLACK, 
        height: 36, 
        width: 26, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginRight: 4
    },
    timeDigit: {
        fontSize: 14, 
        fontFamily: FontFamily.DMSansBold, 
        color: AppColors.WHITE
    },
    colon: {
        marginRight: 8,
        marginLeft: 4
    },
    editIcon: {
        backgroundColor: AppColors.GREY_VARIANT6,
        justifyContent: 'center',
        alignItems: 'center',
        height: scaledWidth(28),
        width: scaledWidth(28),
        borderRadius: scaledWidth(28),
        marginLeft: 12
    },
    editTime: {
        position: 'absolute', 
        borderRadius: scaledWidth(28),
        height: scaledWidth(28), 
        justifyContent: 'center', 
        alignItems: 'center',
        width: scaledWidth(28),
    },
    timePicker: {
        height: scaledWidth(28), 
        width: scaledWidth(28),
        backgroundColor: 'transparent', 
        borderRadius: scaledWidth(30),
        opacity: 0.02
    }
    
});
