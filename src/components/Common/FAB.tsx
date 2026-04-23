import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Chat from 'data/lotties/chat';
import Add from 'svg/add-black';
import Stats from 'svg/stats';
import WriteReview from 'icons/Review';
import AddGroup from 'svg/create-group';
import Create from 'svg/create-pen';

const FAB = ({ iconName, toggle, btnText, expanded }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'create':
        return <Create height={21} width={21} />;
      case 'add':
        return <Add height={14} width={14} />;
      case 'stats':
        return <Stats height={14} width={14} />;
      case 'review':
        return <WriteReview height={25} width={25} strokeWidth="1.8"  />;
      case 'group':
        return <AddGroup height={24} width={24} />;
      case 'chat':
        return <LottieView autoPlay style={{ height: 40 }} source={Chat} />;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {expanded ? (
        <View
          style={[
            styles.composeBtnContainer,
            {borderRadius: 16 },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.newGrpContainer,
              {
                padding: 16,
                paddingRight: 20,
                borderRadius: 16,
                justifyContent: 'center',
                alignContent: 'center',
              },
            ]}
            activeOpacity={0.5}
            onPress={toggle}
          >
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {getIcon(iconName)}
              <Text
                style={{
                  fontFamily: 'DMSans-Regular',
                  fontSize: 14,
                  marginLeft: 12,
                  color: "#121212"
                }}
              >
                {btnText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={toggle}>
          {getIcon(iconName)}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  newGrpContainer: {
    borderWidth: 0,
    backgroundColor: '#E9C638',
    alignItems: 'center',
    justifyContent: 'center',
  },
  composeBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E9C638',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FAB;
