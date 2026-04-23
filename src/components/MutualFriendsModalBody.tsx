import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { AppConsumer } from 'context';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import GradientBtn from './Common/GradientBtn';
import CommonStyles from '../../Styles';
import DefaultUser from 'svg/user';
import { SCREEN_HEIGHT, SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';
import PremiumBadge from 'svg/premium_badge_icon';
import UserRow from './Cards/UserContactRow';

interface MutualFriendsModalBodyParams {
    userClicked: (id: any) => any,
    mutualFriends: any[]
}

export const MutualFriendsModalBody: React.FC<MutualFriendsModalBodyParams> = ({
    mutualFriends,
    userClicked
    }) => 
    {

   

    const renderItem = ({ item, i }) => {
        return <UserRow item={item} onUserClick={userClicked} />;
    };
    
    return (
        <AppConsumer>
        {(appConsumer) => (

            <View style={[styles.container]}>
              <FlatList
                  showsVerticalScrollIndicator={true}
                  data={mutualFriends}
                  contentContainerStyle={{width: SCREEN_WIDTH, }}
                  ListFooterComponent={() => <View style={styles.bottomGap} />}
                  keyExtractor={(item) => item?.id}
                  scrollIndicatorInsets={{ right: 10 }}
                  renderItem={({ item }) => {
                    return (
                        <TouchableOpacity activeOpacity={1}>
                            <UserRow
                                item={item}
                                borderRadius={10}
                                rowSpacing={16}
                                mutualFriend={true}
                                bgColor={AppColors.GREY_VARIANT2}
                                onUserClick={userClicked}
                            />
                      </TouchableOpacity>
                    );
                  }}
                />
            </View>
        )}
        </AppConsumer>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    width: SCREEN_WIDTH,
    flex: 1,
    marginTop: 10
  },
  bottomGap: {height: 20},
  userInfo: {
    fontFamily: FontFamily.DMSansBold,
    fontSize: 14,
    color: AppColors.WHITE_VARIANT2
  },
  
});
