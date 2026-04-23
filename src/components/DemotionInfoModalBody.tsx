import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { SCREEN_WIDTH } from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import CommonStyles from '../../Styles';
import StringConstants from 'utils/StringConstants';

const DEMOTION_CRITERIA_LIST = [
    {
        "item": "Inconsistency in posting or posting low-quality or Spam content.",
    },
    {
        "item": "Receiving a high number of negative reviews or flags from other users.",
    }
]

export const DemotionInfoModalBody: React.FC = ({}) => 
    {
    return (
        <View style={styles.container}>
                {DEMOTION_CRITERIA_LIST?.map((value) => {
                return (
                    <View style={CommonStyles.flexDirRow}>
                        <View style={styles.dot} />
                        <Text style={[CommonStyles.pointersText, styles.item]}>
                        {value?.item}
                        </Text>
                    </View>
                    )
                })
            }
            <Text style={[styles.demotionReason]}>
                {StringConstants.DEMOTION_REASON}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    paddingHorizontal: 30
  },
  demotionReason: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT9,
    marginTop: 21
  },
  dot: {
    backgroundColor: AppColors.GREY_VARIANT4, 
    height: 3, 
    width: 3, 
    borderRadius: 3, 
    marginRight: 10, 
    marginTop: 8
  },
  item: {
    width: SCREEN_WIDTH * 0.82, 
    marginBottom: 8
  }
  
});
