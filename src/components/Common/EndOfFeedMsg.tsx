import React from "react";
import {
  View,
  Text,
} from "react-native";
import CommonStyles from "styles";


export const EndOfFeedMsg = ({msg} : {msg: string}) => {
  return (
    <View style={[CommonStyles.footerContainer, {marginBottom: 15}]}>
      <Text style={[CommonStyles.footerFeedOverMsgTxt]}>
        {msg}
      </Text>
    </View>
  );
};
