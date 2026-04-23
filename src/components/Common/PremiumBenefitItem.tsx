import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontFamily from 'utils/FontFamily';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import StringConstants from 'utils/StringConstants';
import DoneView from "components/Common/DoneView";
import { SCREEN_WIDTH, scaledWidth } from 'utils/Dimensions';
import { RoundedBtn } from './RoundedBtn';
import { CLOUD_BASEURL } from 'utils/HelperFunctions';
import Arrow from "icons/Arrow";

export const PremiumBenefitItem: React.FC = ({item, index, benefits, isActiveSubscription, onBenefitsPressed = () => {}}) => {

  return (
    <TouchableOpacity activeOpacity={1} style={[CommonStyles.rowSpaceBetween, styles.benefitsRow, {marginBottom: (index + 1) == benefits?.length ? 0 : 16}]}
          onPress={() => {if(isActiveSubscription && item?.showArrow)onBenefitsPressed(item?.routeName)}}
        >
          <View style={[CommonStyles.rowAlignCenter, {}]}>
              <View style={styles.benefitsIconContainer}>
                <Image style={styles.benefitIcon} source={{uri: CLOUD_BASEURL + item?.icon}} />
              </View>
              <Text style={styles.descriptionText}>
                  {item?.description}
              </Text>
          </View>
          {isActiveSubscription && item?.showArrow && 
            <View style={styles.rightArrowStyle}>
              <Arrow color={AppColors.GREY_VARIANT1} height={20} width={20} />
            </View>
          }
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    benefitsIconContainer: {
        height: 32,
        width: 32,
        borderRadius: 32,
        backgroundColor: AppColors.GREY_VARIANT6,
        justifyContent: 'center',
        alignItems: 'center'
      },
      descriptionText: {
        color: AppColors.GREY_VARIANT4,
        fontFamily: FontFamily.DMSansRegular,
        fontSize: 14,
        marginLeft: 16,
        width: SCREEN_WIDTH * 0.64
      },
      rightArrowStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 20,
        transform: [{ rotate: '270deg' }]
      },
      benefitIcon: {
        height: 18,
        width: 18,
        resizeMode: 'contain'
      },
      benefitsRow: {
        alignItems: 'center', 
        marginBottom: 16
      }
})
