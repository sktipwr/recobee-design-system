import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import StringConstants from 'utils/StringConstants';
import DoneView from "components/Common/DoneView";
import { scaledWidth } from 'utils/Dimensions';
import { RoundedBtn } from './RoundedBtn';

export const PaymentFailureModalBody: React.FC = ({retryPayment}) => {

  return (
    <View style={[CommonStyles.paymentModalContainer, {paddingHorizontal: 48}]}>
        <Text style={[CommonStyles.paymentStatus]}>
            {
                StringConstants.PAYMENT_FAILURE
            }
        </Text>
        
        <Text style={[styles.failureDesc, ]}>
            {
                StringConstants.PAYMENT_FAILURE_DESC
            }
        </Text>
        <RoundedBtn
            text={StringConstants.RETRY_PAYMENT} 
            textColor={AppColors.GREY_VARIANT2}
            onClick={() => retryPayment()} 
            borderRadius={192} 
            width={scaledWidth(147)}
            borderColor={AppColors.LIGHT_YELLOW}
            bgColor={AppColors.LIGHT_YELLOW}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    failureDesc: {
        color: AppColors.WHITE_VARIANT2, 
        fontFamily: FontFamily.DMSansRegular, 
        fontSize: 14,
        textAlign: 'center', 
        marginBottom: 24
      },
})
