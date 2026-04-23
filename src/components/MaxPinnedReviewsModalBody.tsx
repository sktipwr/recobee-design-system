import React, {  } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import StringConstants from 'utils/StringConstants';
import CommonStyles from '../../Styles';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';

export const MaxPinnedReviewsModalBody: React.FC = ({}) => 
    {
    return (
        <View style={[CommonStyles.paddingHorizontal16, styles.container]}>
            <Text style={[styles.title]}>
                {StringConstants.CAN_ONLY_PIN_3_REVIEWS}
            </Text>
            <Text style={styles.description}>
              {StringConstants.CAN_ONLY_PIN_3_REVIEWS_INFO}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    width: '100%', 
    marginTop: 18,
  },
  title: {
    marginTop: 1.6,
    fontFamily: FontFamily.DMSansBold,
    fontSize: 16,
    color: AppColors.WHITE
  },
  description: {
    fontFamily: FontFamily.DMSansRegular,
    fontSize: 14,
    color: AppColors.GREY_VARIANT4,
    marginTop: 24
  }
  
});
