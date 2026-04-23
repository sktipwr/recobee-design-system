import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { isEmailValid } from 'utils/HelperFunctions';
import StringConstants from 'utils/StringConstants';
import { RoundedBtn } from './Common/RoundedBtn';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonStyles from '../../Styles';

  interface RedeemOfferModalBodyParams {
    redeemOffer: (email: string) => any,
  }

  export const RedeemOfferModalBody: React.FC<RedeemOfferModalBodyParams> = ({
    redeemOffer
  }) => 
    {
    
    const [emailValue, setEmailValue] = useState('')
    const [checkValidation, setCheckValidation] = useState(false)
    
    // handle input 
    const onChangeText = (value: string) => {
        setEmailValue(value);
        if(checkValidation){
            setCheckValidation(false)
        }
    }

    // on redeem button press
    const buttonPress = () => {
        if(isEmailValid(emailValue)){
            redeemOffer(emailValue)
        }
        else {
            setCheckValidation(true)
        }
    }

    

    return (
        <KeyboardAwareScrollView
            style={[
                styles.container,
            ]}
            keyboardShouldPersistTaps={'handled'}
            enableOnAndroid={true}
            contentContainerStyle={CommonStyles.alignCenter}
            enableAutomaticScroll={true}
            scrollEnabled={true}
            extraScrollHeight={Platform.OS === 'ios' ? 30 : 40}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.enterEmail]}>
                {StringConstants.ENTER_EMAIL_TO_AVAIL_OFFER}
            </Text>
            <View style={[styles.inputContainer, {marginBottom: checkValidation ? 6 : 24}]}>
                <TextInput
                    style={[styles.inputStyle, styles.enterEmail]}
                    onChangeText={(text) => onChangeText(text)}
                    value={emailValue}
                    placeholder={StringConstants.ENTER_EMAIL_HERE}
                    keyboardType='default'
                    keyboardAppearance='dark'
                    placeholderTextColor={AppColors.GREY_VARIANT4}
                />
                
            </View>
            {checkValidation && 
                <Text style={styles.error}>{StringConstants.ENTER_VALID_EMAIL}</Text>
            }
            <RoundedBtn
                text={StringConstants.SUBMIT} 
                textColor={AppColors.GREY_VARIANT2}
                height={44}
                fontSize={14}
                fontFamily={FontFamily.DMSansBold}
                onClick={() => buttonPress()}
                marginRight={0}
                borderRadius={6} 
                width={'100%'}
                borderColor={AppColors.LIGHT_YELLOW}
                bgColor={AppColors.LIGHT_YELLOW}
            />
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginTop: 6,
    flex: 1
  },
  inputContainer: {
    backgroundColor: AppColors.BLACK_VARIANT4, 
    borderRadius: 8, 
    justifyContent: 'center', 
    paddingHorizontal: 18,
    marginTop: 16,
    marginBottom: 24,
    width: '100%'
  },
  inputStyle: {
    height: 40,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  enterEmail: {
    color: AppColors.GREY_VARIANT4, 
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 14,
  },
  error : {
    color: AppColors.ERROR_RED, 
    fontFamily: FontFamily.DMSansRegular, 
    fontSize: 14,
    width: '100%',
    marginBottom: 20
  }
});
