import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import StringConstants from 'utils/StringConstants';
import DoneView from "components/Common/DoneView";

export const PaymentSuccessModalBody: React.FC = ({bgColor, tickColor}) => {

  return (
    <View style={CommonStyles.paymentModalContainer}>
        <Text style={[CommonStyles.paymentStatus, {color: AppColors.GREEN}]}>
            {
                StringConstants.PAYMENT_SUCCESS
            }
        </Text>
        <Text style={[styles.enjoyBenefits, {marginBottom: 24}]}>
            {
                StringConstants.ENJOY_PREMIUM_BENEFITS_NOW
            }
        </Text>
        <DoneView bgColor={bgColor} tickColor={tickColor} />
        <Text style={[styles.confirmationSentOnMail, {marginTop: 24}]}>
            {
                StringConstants.PAYMENT_CONFIRMATION_SENT_ON_EMAIL
            }
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    confirmationSentOnMail: {
        color: AppColors.WHITE, 
        fontFamily: FontFamily.DMSansRegular, 
        fontSize: 14,
    },
    enjoyBenefits: {
        color: AppColors.LIGHT_YELLOW, 
        fontFamily: FontFamily.DMSansRegular, 
        fontSize: 14,
    },
})
