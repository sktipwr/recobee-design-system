

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ErrorIcon from 'svg/error_icon';
import CommonStyles from '../../../Styles';

interface ErrorTextParams {
  msg: string
}

export const ErrorText: React.FC<ErrorTextParams> = ({msg}) => {
  return (
    <View style={[CommonStyles.rowAlignCenter, {marginTop: 4}]}>
              <ErrorIcon height={12} width={12} />
              <Text
                style={[
                  CommonStyles.errorText,
                  {marginLeft: 7}
                ]}
              >
                {msg}
              </Text>
            </View>
  );
};


