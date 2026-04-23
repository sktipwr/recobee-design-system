import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { AppConsumer } from 'context';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  scaledHeight,
  scaledWidth,
} from 'utils/Dimensions';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import FontFamily from 'utils/FontFamily';
import Close from "icons/Cross";

export const GenericModal: React.FC = ({
  isModalVisible,
  cancelModal,
  modalHeight,
  hideTopSection = false,
  modalTitle,
  modalBody,
  titleFontSize=20,
  topMargin=scaledHeight(12),
  isPastWinnersModal = false,
  showCross = false,
  borderRadius = scaledWidth(18),
  alignCenter = false,
  horizontalGap = 0,
  bgColor = AppColors.BLACK_VARIANT,
  isCenter = false
}) => {
  const [isModalContentVisible, setIsModalContentVisible] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      setIsModalContentVisible(true);
    } else {
      setTimeout(() => setIsModalContentVisible(false), 300);
    }
  }, [isModalVisible]);

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View>
        <Modal
          isVisible={isModalVisible}
          propagateSwipe={true}
          animationIn='slideInUp'
          animationOut='slideOutDown'
          statusBarTranslucent={true}
          animationInTiming={200}
          animationOutTiming={200}
          avoidKeyboard={true}
          keyboardAvoidingViewEnabled={true}
          keyboardShouldPersistTaps='handled'
          onBackButtonPress={cancelModal}
          onBackdropPress={cancelModal}
          onSwipeComplete={cancelModal}
          swipeDirection='down'
          style={[
            styles.modalView,
            {alignItems: alignCenter ? 'center' : 'flex-end'},  
            alignCenter && {justifyContent: 'center'}          
          ]}
        >
          {isModalContentVisible && (
            <View
              style={[
                !isCenter && { height: modalHeight ?? SCREEN_HEIGHT * 0.8 },
                styles.content,
                {
                  borderTopLeftRadius: borderRadius,
                  borderTopRightRadius: borderRadius,
                },
                alignCenter && {
                  borderBottomLeftRadius: borderRadius,
                  borderBottomRightRadius: borderRadius,
                },
                isPastWinnersModal && CommonStyles.modalTopRadius,
                {width: SCREEN_WIDTH - horizontalGap},
                {backgroundColor: bgColor}
              ]}
            >
            {!hideTopSection && <View style={[CommonStyles.modalHoldBar, {marginBottom: topMargin}]} />}
            {modalTitle != '' && !hideTopSection && !showCross && <Text style={[CommonStyles.modalTitle, {color: AppColors.WHITE_VARIANT, textAlign: 'center', fontSize: titleFontSize, marginBottom: topMargin}]}>
                {modalTitle}
            </Text>
            }
            {hideTopSection && showCross && <View style={[CommonStyles.rowSpaceBetween,{marginBottom: scaledHeight(12), marginRight: 16}]}>
              <View style={{width: 40}} />
              <Text style={[CommonStyles.modalTitle, {color: AppColors.WHITE_VARIANT, textAlign: 'center', marginBottom: topMargin}]}>{modalTitle}
              </Text>
              <TouchableOpacity style={{padding: 4,marginTop:4}} onPress={() => cancelModal()}>
                  <Close
                      color={AppColors.WHITE}
                      width={28}
                      height={28}
                    />
                    </TouchableOpacity>
              </View>}
            
           {modalBody}
            </View>
          )}
        </Modal>
        </View>
      )}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    margin: 0,
    borderRadius: 5,
    padding: 0,
    justifyContent: 'flex-end',
        shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
     elevation: 5,
  },

  innerContainer: { height: '100%', width: '100%', alignItems: 'center' },
  title: {
    fontSize: 14,
    fontFamily: FontFamily.DMSansBold,
    color: AppColors.WHITE,
  },
  content: {
    backgroundColor: AppColors.BLACK_VARIANT,
  },
  
});
