import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import SendIcon from 'svg/textrecomm'; 
import AttachmentIcon from 'svg/send_curved'; 
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import FontFamily from 'utils/FontFamily';
import CurvePointer from 'icons/CurvePointer';
import MovieDiary from 'icons/MovieDiary';
const MessageInput = ({ move, onSend, placeholder = 'Type your message...' }) => {
  const [message, setMessage] = useState('');
// This Function is used to initiate the onSend function passed as the prop and set the field empty 
  const handlePressSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={[CommonStyles.flexDirRow, styles.container]}>
      <View style={[CommonStyles.flexDirRow, styles.inputContainer]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          value={message}
          onChangeText={setMessage}
          keyboardAppearance="dark"
          placeholderTextColor={AppColors.GREY_VARIANT1}
          multiline={true}
        />
        {!message.trim() && (
          <TouchableOpacity onPress={move} style={[styles.recommendButton,]}>
            {/* <Text style={styles.recommendButtonText}>Recommend</Text> */}
            <MovieDiary color={AppColors.LIGHT_YELLOW}/>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.outsideIcon} onPress={handlePressSend}>
        <AttachmentIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  recommendButton:{
    width:80,
    height:22,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  },
   recommendButtonText:{
      fontSize: 10,
    color:AppColors.LIGHT_YELLOW,
    fontFamily: FontFamily.DMSansRegular,
    },

  container: {
    alignItems: 'center',
    padding: 8,
    justifyContent: 'space-between',
  },
  inputContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor:AppColors.GREY_VARIANT6,
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: 12,
    minHeight: 48,
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    color: AppColors.WHITE,
    marginRight: 4
  },
  outsideIcon: {
    width : 40 ,
    height : 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: AppColors.LIGHT_YELLOW
  },
  sendIcon: {
    marginLeft: 8,
  },
});

export default MessageInput;
