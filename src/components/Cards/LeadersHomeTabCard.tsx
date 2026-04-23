

import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { AppConsumer } from "context";
import { SCREEN_WIDTH, scaledWidth, scaledHeight } from "utils/Dimensions";
import AppColors from "utils/Colors";
import FastImage from "react-native-fast-image";
import CommonStyles from "../../../Styles";
import RankOne from 'svg/rank1.svg'
import RankTwo from 'svg/rank2.svg'
import RankThree from 'svg/rank3.svg'
import DefaultUser from "svg/user";
import Arrow from "svg/right_arrow_yellow";
import FontFamily from "utils/FontFamily";
import { getUserBadgeIcon } from "utils/HelperFunctions";
import { CommonAppContext } from "../../stores/common/commonAppContext";
import PremiumBadge from 'svg/premium_badge_icon';
import EncryptedStorage from 'react-native-encrypted-storage';
import StringConstants from "../../utils/StringConstants";

interface LeadersHomeTabcardProps {
  data: any[];
  navigation: any;
  onUserClick: (user: any, sectionType: string) => void;
  url?: string;
  sectionType: string;
  userRankDetails?: any;
  onRightClick?: (data: any) => void;
  rightLinkData?: any;
  title?: string;
  subheading?: string;
  showTagline?: boolean;
}

export const LeadersHomeTabcard: React.FC<LeadersHomeTabcardProps> = ({ data, navigation, onUserClick, url, sectionType, userRankDetails, onRightClick, rightLinkData, title, subheading, showTagline = true }) => {
  const { commonAppState, commonDispatch } = useContext(CommonAppContext);
  const [currentUserRank, setCurrentUserRank] = useState<any>(null);

  const top3Users = data?.length > 3 ? data.slice(0, 3) : data;

  // Load user rank details internally
  useEffect(() => {
    const loadUserRank = async () => {
      try {
        const [id, usertag, name, image, rank] = await Promise.all([
          EncryptedStorage.getItem("user_id"),
          EncryptedStorage.getItem("user_unq_id"),
          EncryptedStorage.getItem("user_fname"),
          EncryptedStorage.getItem("user_dp"),
          EncryptedStorage.getItem("user_rank"),
        ]);
        if (rank) {
          const prank = JSON.parse(rank);
          setCurrentUserRank({
            id,
            usertag,
            name,
            image,
            points: prank?.points,
            yearPoints: prank?.yearPoints,
            allTimeRank: prank?.allTimeRank,
            allTimePoints: prank?.allTimePoints,
            rank: prank?.rank,
            yearRank: prank?.yearRank,
          });
        }
      } catch (e) {
        // Handle error silently
      }
    };
    loadUserRank();
  }, []);

  // Use passed prop first, then fallback to internal user rank
  const userRank = userRankDetails || currentUserRank;
  
  // Extract first name from full name
  const getFirstName = (name: string) => {
    if (!name) return '';
    return name.split(' ')[0];
  };

  // New UI - Horizontal layout with user rank
  const renderNewUI = () => {
    // Keep original order: 1st, 2nd, 3rd
    const orderedLeaders = top3Users;
    
    return (
      <TouchableOpacity 
        style={styles.newContainer}
        onPress={() => onRightClick?.(rightLinkData)}
        activeOpacity={0.8}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>{title || StringConstants.RECOBEE_LEADERBOARD}</Text>
            {subheading && <Text style={styles.subheading}>{subheading}</Text>}
          </View>
          <Arrow height={20} width={20} />
        </View>
        <View style={styles.horizontalLeadersContainer}>
          {/* Top 3 Leaders */}
          {orderedLeaders.map((leader, index) => {
            // Rank is index + 1 (1, 2, 3)
            const actualRank = index + 1;
            const borderStyle = actualRank === 1 ? styles.rank1Border : actualRank === 2 ? styles.rank2Border : styles.rank3Border;
            
            return (
              <TouchableOpacity 
                key={leader.id || index} 
                style={styles.leaderItem}
                onPress={() => onUserClick(leader, sectionType)}
              >
                <View style={[styles.profileImageContainer, borderStyle]}>
                  {leader?.image ? (
                    <FastImage source={{ uri: leader.image }} style={styles.newProfileImage} />
                  ) : (
                    <View style={styles.defaultUserContainer}>
                      <DefaultUser width={scaledWidth(56)} height={scaledHeight(56)} />
                    </View>
                  )}
                </View>
                <View style={styles.rankBadgeContainerBelow}>
                  {actualRank === 1 ? (
                    <View style={styles.rankBadge1}>
                      <Text style={styles.rankBadgeText}>{StringConstants.RANK_1}</Text>
                    </View>
                  ) : actualRank === 2 ? (
                    <View style={styles.rankBadge2}>
                      <Text style={styles.rankBadgeText}>{StringConstants.RANK_2}</Text>
                    </View>
                  ) : (
                    <View style={styles.rankBadge3}>
                      <Text style={styles.rankBadgeText}>{StringConstants.RANK_3}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.leaderName} numberOfLines={1}>
                  {getFirstName(leader.name || leader.fname)}
                </Text>
              </TouchableOpacity>
            );
          })}
          
          {/* Dotted separator */}
          {userRank && (
            <View style={styles.dottedSeparator}>
              <View style={styles.dashedLine} />
            </View>
          )}
          
          {/* Current User */}
          {userRank && (
            <TouchableOpacity 
              style={styles.leaderItem}
              onPress={() => onUserClick(userRank, sectionType)}
            >
              <View style={[styles.profileImageContainer, styles.userBorder]}>
                {userRank?.image ? (
                  <FastImage source={{ uri: userRank.image }} style={styles.newProfileImage} />
                ) : (
                  <View style={styles.defaultUserContainer}>
                    <DefaultUser width={scaledWidth(56)} height={scaledHeight(56)} />
                  </View>
                )}
              </View>
              <View style={styles.rankBadgeContainerBelow}>
                <View style={styles.rankBadgeUser}>
                  <Text style={styles.rankBadgeText}>#{userRank.rank || StringConstants.ZERO}</Text>
                </View>
              </View>
              <Text style={styles.leaderName} numberOfLines={1}>
                {StringConstants.YOU}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        {showTagline && (
          <View style={styles.taglineContainer}>
            <RankOne width={20} height={20} />
            <Text style={styles.taglineText}>{StringConstants.WIN_EXCITING_BADGES_EVERY_MONTH}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  // Old UI - Vertical list (commented out)
  const renderOldUI = () => {
    const renderItem = ({item, index}: {item: any, index: number}) => {
      return (
        <TouchableOpacity style={[styles.card, CommonStyles.rowSpaceBetween, CommonStyles.alignCenter, (index != top3Users.length - 1) && {marginBottom: 15} ]} onPress={()=> {onUserClick(item, sectionType)}}>
          <View style={CommonStyles.rowAlignCenter}>
            {index == 0 ? <RankOne /> : (index == 1 ? <RankTwo /> : <RankThree />)}
            <View style={styles.leftSpace} />
            <View>
            {item.image ? (
            <FastImage source={{ uri: item.image }} style={styles.profileImage} />
          ) : (
            <DefaultUser width={36} height={36} />
            )}
            {item?.ispremium && commonAppState.isPremiumFlowEnabled &&
              (
                <View style={[styles.homePremium]}>
                  <PremiumBadge height={13} width={13} />
                </View>
              )
            }
            </View>
            <View style={styles.nameContainer}>
              <View style={[CommonStyles.rowAlignCenter]}>
                  <Text
                    style={[ CommonStyles.leaderName, styles.name]}
                    numberOfLines={1}
                  >
                    {item.name || item.fname}
                  </Text>
                  {getUserBadgeIcon(item?.userrole, 13)}
              </View>
              <Text numberOfLines={1} style={CommonStyles.leaderTag}>@{item.usertag}</Text>
            </View>
          </View>
          <Text style={styles.points}>{item.points} {StringConstants.PTS}</Text>
        </TouchableOpacity>
      )
    }
    
    return (
      <AppConsumer>
        {(appConsumer) => (
          <View style={styles.container}>
            <FlatList
              data={top3Users}
              keyExtractor={(item, index) => StringConstants.KEY_PREFIX + index}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
          />
        </View>
        )}
      </AppConsumer>
    );
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <>
          {renderNewUI()}
          {/* {renderOldUI()} */}
        </>
      )}
    </AppConsumer>
  );
}

// Common reusable styles
const commonStyles = {
  centered: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  border2px: {
    borderWidth: 2,
  },
  border1px: {
    borderWidth: 1,
  },
  roundedBadge: {
    borderRadius: scaledWidth(10),
    paddingHorizontal: scaledWidth(6),
    paddingVertical: scaledHeight(2),
    minWidth: scaledWidth(28),
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  circularImage: {
    width: scaledWidth(52),
    height: scaledWidth(52),
    borderRadius: scaledWidth(26),
  },
  whiteText: {
    color: AppColors.WHITE,
  },
  dmSansRegular: {
    fontFamily: FontFamily.DMSansRegular,
  },
  dmSansBold: {
    fontFamily: FontFamily.DMSansBold,
  },
};

const styles = StyleSheet.create({
  // New UI styles - Responsive based on Figma specs
  newContainer: {
    width: scaledWidth(332),
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical:12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerTitle: {
    color: AppColors.WHITE_VARIANT3,
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
  },
  subheading: {
    color: AppColors.GREY_VARIANT4,
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    marginTop: 2,
  },
  horizontalLeadersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  leaderItem: {
    ...commonStyles.centered,
    flex: 1,
  },
  profileImageContainer: {
    width: scaledWidth(56),
    height: scaledWidth(56),
    borderRadius: scaledWidth(28),
    ...commonStyles.centered,
    backgroundColor: AppColors.THEME_BG_COLOR,
  },
  newProfileImage: {
    ...commonStyles.circularImage,
  },
  defaultUserContainer: {
    ...commonStyles.circularImage,
    overflow: 'hidden',
    ...commonStyles.centered,
  },
  tagline: {
    color: AppColors.GREY_VARIANT1,
    fontSize: scaledWidth(12),
    ...commonStyles.dmSansRegular,
    marginBottom: scaledHeight(8),
  },
  // Border styles for different ranks with correct colors
  rank1Border: {
    borderColor: AppColors.GOLD_VARIANT,
    ...commonStyles.border2px,
  },
  rank2Border: {
    borderColor: AppColors.SILVER_VARIANT,
    ...commonStyles.border2px,
  },
  rank3Border: {
    borderColor: AppColors.BRONZE_VARIANT,
    ...commonStyles.border2px,
  },
  userBorder: {
    borderColor: AppColors.BLUE_VARIANT,
    ...commonStyles.border2px,
  },
  
  // Rank badge container styles
  rankBadgeContainer: {
    position: 'absolute',
    bottom: -2,
    left: '50%',
    transform: [{ translateX: -14 }],
  },
  rankBadgeContainerBelow: {
    ...commonStyles.centered,
    marginTop: scaledHeight(-6),
  },
  
  // Rank badge styles
  rankBadge1: {
    backgroundColor: AppColors.GOLD_VARIANT,
    borderColor: AppColors.GOLD_VARIANT2,
    ...commonStyles.roundedBadge,
    ...commonStyles.border1px,
  },
  rankBadge2: {
    backgroundColor: AppColors.SILVER_VARIANT,
    borderColor: AppColors.BRONZE_VARIANT2,
    ...commonStyles.roundedBadge,
    ...commonStyles.border1px,
  },
  rankBadge3: {
    backgroundColor: AppColors.BRONZE_VARIANT,
    borderColor: AppColors.BRONZE_VARIANT2,
    ...commonStyles.roundedBadge,
    ...commonStyles.border1px,
  },
  rankBadgeUser: {
    backgroundColor: AppColors.BLUE_VARIANT,
    borderColor: AppColors.BLUE_VARIANT2,
    ...commonStyles.roundedBadge,
    ...commonStyles.border1px,
  },
  rankBadgeText: {
    ...commonStyles.whiteText,
    fontSize: scaledWidth(10),
    ...commonStyles.dmSansBold,
  },
  leaderName: {
    ...commonStyles.whiteText,
    fontSize: scaledWidth(12),
    ...commonStyles.dmSansRegular,
    marginTop: scaledHeight(4),
    maxWidth: scaledWidth(70),
    textAlign: 'center',
  },
  dottedSeparator: {
    ...commonStyles.centered,
    marginHorizontal: scaledWidth(8),
  },
  dashedLine: {
    width: scaledWidth(21),
    height: 0,
    borderWidth: 1,
    borderColor: AppColors.GREY_VARIANT1,
    borderStyle: 'dashed',
    marginLeft: scaledWidth(-5),
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    backgroundColor: AppColors.BLACK,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  taglineText: {
    paddingVertical: 6,
    paddingRight: 16,
    color: AppColors.GREY_VARIANT4,
    fontSize: 12,
    ...commonStyles.dmSansRegular,
    marginLeft: scaledWidth(6),
  },
  
  // Old UI styles (kept for reference)
  card: {
    width: '100%',
  },
  name: {
    marginRight: 5,
    maxWidth: SCREEN_WIDTH * 0.38,
  },
  nameContainer: { 
    marginLeft: 8, 
    maxWidth: SCREEN_WIDTH * 0.45,
  },
  leftSpace: {
    marginLeft: 21,
  },
  points: {
    fontSize: 12,
    ...commonStyles.dmSansRegular,
    color: AppColors.WHITE_VARIANT2,
  },
  profileImage: {
    height: 36,
    width: 36,
    borderRadius: 36, 
  },
  container: {
    width: SCREEN_WIDTH - 32,
    backgroundColor: AppColors.THEME_BG_COLOR,
    borderRadius: 4,
    padding: 16,
  },
  homePremium: {
    position: 'absolute',
    bottom: 3,
    right: -4,
  },
});
