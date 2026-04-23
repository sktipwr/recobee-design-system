import CommonStyles from "../../../Styles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StringConstants from "utils/StringConstants";
import { SCREEN_WIDTH } from "utils/Dimensions";
import AppColors from "utils/Colors";

export const AddFriendButton: React.FC = ({friend, addFriend, userId}) => {
    return (
        <>
        {friend ? (
            <View
              style={[
                styles.followBtn,
                CommonStyles.alignCentre,
                styles.width3,
                CommonStyles.grey9BG,
              ]}
            >
              <View>
                <Text style={CommonStyles.txtHeaderMedium}>
                  {StringConstants.REQUEST_SENT}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.followBtn,
                CommonStyles.alignCentre,
                styles.width2,
              ]}
            >
              <TouchableOpacity onPress={() => addFriend(userId)}>
                <Text style={CommonStyles.txtHeaderMediumLink}>
                  {StringConstants.ADD_FRIEND}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          </>
    )
  };

const styles = StyleSheet.create({
    followBtn: {
        height: 28,
        backgroundColor: AppColors.GREY_VARIANT6,
        borderRadius: 60,
        display: "flex",
    },
    width2: { width: SCREEN_WIDTH / 6 },
    width3: { width: SCREEN_WIDTH / 4 },
})
