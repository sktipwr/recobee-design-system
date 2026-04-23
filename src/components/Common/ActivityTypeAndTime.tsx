import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontFamily from 'utils/FontFamily';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';

export type ActivityTypeAndTimeParams = {
    type: string,
    datetime: string
  };
  
export const ActivityTypeAndTime: React.FC<ActivityTypeAndTimeParams> = ({ 
  type,
  datetime
}) => {

  const [formattedTime, setFormattedTime] = useState('')

  // format time in am/pm
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    
    // Get hours & mins in local time
    let hours = date.getHours(); 
    const minutes = date.getMinutes();
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0, make it 12
  
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${formattedMinutes} ${ampm}`;
  }

  useEffect(() => {
    const time = formatTime(datetime)
    setFormattedTime(time);
  },[datetime])

  // get formatted type
  const getType = () => {
    switch (type) {
      case 'seen_remove':
        return 'SEEN MOVIES';
      case 'seen_add':
        return 'SEEN MOVIES';
      case 'watching':
        return 'WATCHING CURRENTLY';
      case 'add_watchlist':
        return 'WATCHLIST';
      case 'remove_watchlist':
        return 'WATCHLIST';
      case 'add_list':
        return 'LIST';
      case 'remove_list':
        return 'LIST';
      default:
        return type?.toLocaleUpperCase();
    }
  }
  
  return (
    <View style={[CommonStyles.rowSpaceBetween, CommonStyles.alignCenter]}>
          <View style={styles.typeContainer}>
            <Text style={styles.type}>{getType()}</Text>
          </View>
          <Text style={[styles.type, {color: AppColors.GREY_VARIANT3}]}>{formattedTime}</Text>
        </View>
  );
};

const styles = StyleSheet.create({
  type: {
    fontSize: 10,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE_VARIANT3,
  },
  typeContainer: {
    backgroundColor: AppColors.GREY_VARIANT6,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    height: 20
  }
})
