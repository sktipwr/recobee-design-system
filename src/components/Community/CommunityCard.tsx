import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import AppColors from '../../utils/Colors';
import User from 'svg/user';
import GreyTick from 'svg/grey_tick.svg';
import AddIcon from 'svg/yellow_add_icon.svg';
import CommonStyles from '../../../Styles';
import MoreVertical from 'icons/MoreVertical';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import FontFamily from 'utils/FontFamily';

const CommunityCard = ({
  id,
  backdropImage,
  name,
  memberCount,
  isJoinType = false,
  onJoinClick = () => { },
  onClick = () => { },
  onMoreClicked = () => {},
  isJoined = false,
  isRecentlyJoined = false,
  index = 0,
}) => {
  
  const image = useMemo(() => {
    return { uri: backdropImage };
  }, [backdropImage]);
  return (
    <TouchableOpacity
      disabled={!onClick}
      style={styles.communityCard}
      onPress={() => {
        onClick && onClick(id);
      }}
    >
      {image?.uri != null && image?.uri != '' ? 
      <FastImage
        source={image}
        style={[
          styles.card,
          {
            width: 80, // Adjust width to fit three cards in a row
            height: 80
          },
        ]}
        resizeMode='cover'
        />
        :
        <Image
            source={require('assets/BlackBee.png')}
            fadeDuration={0}
            style={[
              styles.card,
              styles.beeImage
            ]}
            
            />
      }
      <View style={styles.topSection}>
        <View style={styles.bottomSection}>
          <View style={[CommonStyles.rowSpaceBetween,]}>
            <Text style={[styles.communityName]}>{name}</Text>
            {isJoinType &&
            <Pressable onPress={() => onMoreClicked()}>
              <MoreVertical
                width={20}
                height={20}
                color={AppColors.WHITE}
              />
            </Pressable>
            }
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <User height={14} width={14}/>
            <View style={{ justifyContent: 'center', alignContent: 'center', marginLeft: 5 }}>
              <Text style={{ color: '#F5F5F5', fontFamily: 'DMSans-Regular', fontSize: 12}}>
                {memberCount || 0} Members
              </Text>
            </View>
          </View>
          {!isJoined && (
            <TouchableOpacity
              style={[styles.joinButton, {flexDirection: 'row'}]}
              onPress={() => {
                onJoinClick(id);
              }}
            >
              <AddIcon height={20} width={20} />
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          )}
          {isRecentlyJoined && (
            <View
              style={[styles.joinButton, styles.joinedButtonStyle]}
            >
              <GreyTick height={20} width={20} />
              <Text style={[styles.joinButtonText, {color: AppColors.GREY}]}>Joined</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 2,
    overflow: 'hidden',
    elevation: 5,
    //margin: 8,
  },
  backgroundImage: {
    flex: 1,
  },
  beeImage: {
    width: 80, // Adjust width to fit three cards in a row
    height: 80,
    resizeMode: 'contain'
  },
  topSection: {
    marginLeft: 12,
    flex: 1,
  },
  joinedButtonStyle: {
    borderColor: AppColors.GREY, 
    flexDirection: 'row'
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(234,198,56, .2)',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  bottomSection: {
    flex: 1,
  },
  communityName: {
    color: AppColors.WHITE_VARIANT3,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamily.DMSansBold,
    width: SCREEN_WIDTH * 0.56
  },
  joinButton: {
    borderColor: '#E9C638',
    borderRadius: 25,
    borderWidth: 1,
    width: 80,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 12,
    lineHeight: 16,
    marginLeft: 2,
    fontFamily: 'DMSans-Regular',
    color: '#E9C638',
  },
  communityCard: {
    backgroundColor: AppColors.THEME_BG_COLOR, 
    padding: 10, 
    margin: 16, 
    marginTop: 0,
    flexDirection: 'row'
  }
});

export default CommunityCard;
