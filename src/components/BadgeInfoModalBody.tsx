import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AppConsumer } from 'context';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { getUserBadgeIcon } from 'utils/HelperFunctions';
import StringConstants from 'utils/StringConstants';

interface BadgeInfoModalBodyParams {
  userRole: string;
  learnMoreClicked: () => any;
  badgeInfo: any;
}

export const BadgeInfoModalBody: React.FC<BadgeInfoModalBodyParams> = ({
  userRole,
  learnMoreClicked,
  badgeInfo,
}) => {
  let typeToCheck = userRole;
  if (userRole == 'critic' || userRole == 'admin') {
    typeToCheck = 'admin';
  }

  let info = badgeInfo?.data?.find((item) => item?.type == typeToCheck);

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View style={styles.container}>
          {getUserBadgeIcon(userRole, 48)}
          <Text style={styles.infoText}>{info?.info ?? ''}</Text>
          <TouchableOpacity
            style={styles.learnMoreContainer}
            onPress={() => learnMoreClicked()}
          >
            <Text style={styles.learnMore}>{StringConstants.LEARN_MORE}</Text>
          </TouchableOpacity>
        </View>
      )}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  infoText: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.WHITE,
    marginTop: 16,
    textAlign: 'center',
  },
  learnMoreContainer: {
    padding: 4,
  },
  container: {
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 30,
  },
  learnMore: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.LIGHT_YELLOW,
    marginTop: 4,
  },
});
