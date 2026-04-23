import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import StringConstants from 'utils/StringConstants';
import Thinking from "assets/images/beemoji/BnWface/thinking";
import { SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';
import { BottomPositionedBtn } from './Common/BottomPositionedBtn';
import CommonStyles from '../../Styles';


export const NoAnalyticsDataInfoModalBody = ({exploreClicked}: {exploreClicked: Function}) => 
    {
    return (
      <>
        <View style={styles.container}>
            <Thinking width={scaledWidth(82)} height={scaledWidth(82)} />
            <Text style={styles.insufficientData}>{StringConstants.INSUFFICIENT_DATA}</Text>
            <Text style={styles.desc}>{StringConstants.ANALYTICS_DATA_WILL_BE_AVAILABLE_SOON}</Text>
        </View>
        <View style={[CommonStyles.alignCenter]}>
          <BottomPositionedBtn
            isAbsolute={true}
            horizontalGap={12}
            innerWidth={'100%'}
            btnWidth={SCREEN_WIDTH - 32}
            bottomEmptySpace={0}
            showArrow={false}
            isDisabled={false} 
            title={StringConstants.EXPLORE} 
            bgColor={AppColors.BLACK_VARIANT} 
            textColor={AppColors.GREY_VARIANT2} 
            buttonBgColor={AppColors.LIGHT_YELLOW_VARIANT} 
            showArrow={false} 
            onPress={()=>{exploreClicked()}} 
          />
          </View>
      </>
    );
};

const styles = StyleSheet.create({
  insufficientData: {
    fontSize: 16,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center'
  },
  container: {
    alignItems: 'center', 
    marginTop: 4,
    paddingHorizontal: 30,
  },
  desc: {
    fontSize: 12,
    fontFamily: FontFamily.DMSansRegular,
    color: AppColors.GREY_VARIANT4,
    marginBottom: 20,
    textAlign: 'center'
  }
});
