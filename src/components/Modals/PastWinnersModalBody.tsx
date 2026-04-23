import React, {  } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { AppConsumer } from "context";
import AppColors from "utils/Colors";
import FontFamily from "utils/FontFamily";
import CommonStyles from "../../../Styles";
import DefaultUser from "svg/user";

export const PastWinnersModalBody: React.FC = ({rewardsData, userClicked, userId, selectedTimePeriod}) => {

    return (
        <AppConsumer>
        {(appConsumer) => (
            <View style={styles.topContainer}>
              
              {rewardsData?.map((value)=>{
                return (
                <View>
                    <View style={CommonStyles.rowSpaceBetween}>
                      <Text style={styles.rewardsType}>
                        {value?.rewardsType}
                      </Text>
                      <Text style={styles.durationType}>
                        {value?.durationValue}
                      </Text>
                   </View>
                   <View style={[CommonStyles.flexRowAlignCenter, styles.usersRow]}>
                    {value.rewardsData?.map((leader, index) => (
                      <TouchableOpacity
                        onPress={() => { userClicked(leader.id) }} key={leader.id} style={styles.leaderCard}>
                        <View
                          style={
                            {
                                ...CommonStyles.circularImageContainer,
                                ...CommonStyles.mediumCircularImageContainer,
                                borderWidth: 1
                              }
                              
                          }
                        >
                          {
                            leader?.image != "" && leader?.image && leader?.image != null ? 
                            <Image
                              source={{ uri: leader.image }}
                              style={
                                { ...CommonStyles.circularImage, ...CommonStyles.mediumCircularImage }
                              }
                            />
                            : 
                            <View style={
                              { ...CommonStyles.circularImage, ...CommonStyles.mediumCircularImage }
                            }>
                              <DefaultUser width={60} height={60} />
                            </View>
                        }
                        </View>
                        <View
                          style={styles.userInfo}
                        >
                          <Text
                            style={CommonStyles.leaderName}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {leader.name}
                          </Text>
                          <Text
                            style={CommonStyles.leaderTag}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            @{leader.usertag}
                          </Text>
                        </View>
                        {selectedTimePeriod == "M" ? (
                          <Text style={CommonStyles.rankPillTop}>
                            {leader?.rank ? `#${leader?.rank}` : ""}
                          </Text>
                        ) : (
                          <Text style={CommonStyles.rankPillTop}>
                            {leader?.yearRank ? `#${leader?.yearRank}` : ""}
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))}
                </View>
                </View>
                )
            })}
          </View>
        )}
      </AppConsumer>
    );
  }



const styles = StyleSheet.create({
  leaderCard: {
    flex: 1,
    alignItems: "center",
    height: 152,
  },
  usersRow: {
    backgroundColor: AppColors.THEME_BG_COLOR,
    marginBottom: 16,
    marginTop: 3
  },
  topContainer: {
    paddingHorizontal: 16,
    marginTop: 13
  },
  rewardsType: {
    color: AppColors.GREY_VARIANT14, 
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 14,
  },
  durationType: {
    color: AppColors.LIGHT_YELLOW, 
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 12,
  },
  userInfo: {
    alignItems: "center",
    padding: 16,
    minHeight: 110,
  }
  
});
