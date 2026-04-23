//Returns a flat list of Clickable items passed in an array

import React, {useState} from 'react';
import {AppConsumer} from 'context';

import {
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import userProfileAPI from 'api/userProfileAPI';
import DefaultUser from 'svg/user';
import UserLoveHeart from '../../icons/user-love-heart';
//import * as SecureStore from "expo-secure-store";
import EncryptedStorage from 'react-native-encrypted-storage';
import CommonStyles from 'styles';
import StringConstants from '../../utils/StringConstants';

export default function UserRow({item, onUserClick , closeFriend ,closeFriendToggle}) {
  const [following, setFollowing] = useState(item.following);

  let myUserName = '';
  EncryptedStorage.getItem('user_fname').then(val => {
    myUserName = val;
  });

  const followClicked = (userID, isRemove) => {
    userProfileAPI
      .followUser(userID, isRemove, myUserName)
      .then(response => {
        if (response && response.status == 200) {
          setFollowing(!isRemove);
        }
      })
      .catch(error => {
        //extendedLog.error('Error in retreiving follow user API with message: ', error);
      });
  };

  return (
    <AppConsumer>
      {appConsumer => (
        <View style={styles.container}>
          <TouchableOpacity
            style={[CommonStyles.flexRow]}
            onPress={() => onUserClick(item.id)}>
            <View style={{marginRight: 12}}>
              {item.thumbnail != null && item.thumbnail != '' ? (
                <Image source={{uri: item.thumbnail}} style={styles.dp} />
              ) : (
                <DefaultUser height={28} width={28} />
              )}
            </View>
            <Text style={CommonStyles.txtBodyMedium}>{item.fname}</Text>
          </TouchableOpacity>
          {closeFriend ?(
             <View
             style={[
               styles.followBtn,
               CommonStyles.alignCentre,
               {backgroundColor: appConsumer.theme.colors.grey9},
             ]}>
             <TouchableOpacity
               onPress={() => closeFriendToggle(item.id)} style={CommonStyles.flexRow}>
              <UserLoveHeart height={24} width={24} />
               <Text style={CommonStyles.txtBodyMedium}>{StringConstants.REMOVED}</Text>
             </TouchableOpacity>
           </View>
          ):
          (following != undefined && (
            <>
              {following ? (
                <View
                  style={[
                    styles.followBtn,
                    CommonStyles.alignCentre,
                    {backgroundColor: appConsumer.theme.colors.grey9},
                  ]}>
                  <TouchableOpacity
                    onPress={() => followClicked(item.id, true)}>
                    <Text style={CommonStyles.txtBodyMedium}>Following</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.followBtn, CommonStyles.alignCentre]}>
                  <TouchableOpacity
                    onPress={() => followClicked(item.id, false)}>
                    <Text
                      style={[
                        CommonStyles.txtBodyMedium,
                        {color: appConsumer.theme.colors.grey10},
                      ]}>
                      + Follow
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ))}
        </View>
      )}
    </AppConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Dimensions.get('window').width * 0.122,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingLeft: 24,
    marginTop: 2,
    paddingRight: 12,
    backgroundColor: '#272727',
  },
  dp: {
    width: 28,
    height: 28,
    borderRadius: 30,
  },
  followBtn: {
    width: Dimensions.get('window').width / 4,
    height: 24,
    backgroundColor: '#E9C638',
    borderRadius: 7,
    display: 'flex',
  },
});
