//Returns a flat list of Clickable items passed in an array

import React from 'react';
import { AppConsumer } from 'context';
import CommonStyles from '../../../Styles';
import { Text, View, Platform, StyleSheet, Dimensions } from 'react-native';

export default function Badge({ item, txtColor }) {
  if (item.count.toString().length == 1) {
    item.count = '0' + item.count.toString();
  }
  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={[styles.container]}>
          <View>
            <Text
              style={[
                CommonStyles.txtBodyXXL,
                { color: txtColor ? txtColor : "#FFFFFF" },
              ]}
            >
              {item.count}
            </Text>
          </View>
          <View>
            <Text
              style={[
                CommonStyles.txtBodyXXL,
                CommonStyles.txtCentre,
                styles.body,
                { color: txtColor ? txtColor : "#FFFFFF" },
              ]}
            >
              {item.name}
            </Text>
          </View>
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginRight: 12,
    width: Dimensions.get('window').width * 0.267,
  },
  body: {
    fontSize: 12,
    width: 72,
  },
});
