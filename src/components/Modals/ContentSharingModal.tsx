import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
  Image,
  Platform,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import Modal from 'react-native-modal';
import ViewShot from 'react-native-view-shot';
import ImgToBase64 from 'react-native-image-base64';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import { AppConsumer } from 'context';
import Config from 'react-native-config';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  scaledHeight,
  scaledWidth,
} from 'utils/Dimensions';
import Close from '../../icons/Cross';
import AppColors from 'utils/Colors';
import CommonStyles from '../../../Styles';
import FontFamily from 'utils/FontFamily';
import { SocialShareModalBody } from '../SocialShareModalBody';
import mixpanel from 'mixpanel';

export const ContentSharingModal: React.FC = ({
  isModalVisible,
  cancelModal,
  modalHeight,
  isShortsShare,
  headerTitle,
  modalBody,
  isSocialShareModal,
  userTag,
  userID,
  source,
  id,
  isMoreClicked,
  isCopyLinkClicked,
  shareMsg,
  shareToInstaChatsClicked,
  shareToWhatsappClicked
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  const [isModalContentVisible, setIsModalContentVisible] = useState(false);

  useEffect(() => {
    if (isModalVisible) {
      setIsModalContentVisible(true);
    } else {
      setTimeout(() => setIsModalContentVisible(false), 300);
    }
  }, [isModalVisible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: Platform.select({
        default: () => true,
        android: (e: GestureResponderEvent, state: PanResponderGestureState) =>
          Math.abs(state.dx) > 10 || Math.abs(state.dy) > 10
      }),
      onPanResponderGrant: () => {
        translateY.setOffset(translateY._value);
        translateY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        const newTranslateY = translateY._value + gestureState.dy;

        if (gestureState.dy > 0) {
          // Constrain the translateY value between 0 and 100
          translateY.setValue(Math.min(Math.max(newTranslateY, 0), 100));
        }
      },
      onPanResponderRelease: () => {
        translateY.setOffset(0);
        translateY.setValue(0);
      },
    })
  ).current;

  const toastConfig = {
    beeToast: ({ text1, props }) => (
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          width: '90%',
          borderRadius: 6,
          backgroundColor: '#212121',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}
      >
        <View
          style={{
            paddingHorizontal: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../../../assets/success.png')}
            style={{ height: 16, width: 16 }}
            resizeMode='contain'
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View>
            {text1 !== undefined && (
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 3,
                    fontFamily: 'DMSans-Bold',
                    color: '#FFFFFF',
                  }}
                  numberOfLines={2}
                >
                  {text1}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    ),
  };

  useEffect(() => {
    if (isModalVisible && isModalContentVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [isModalVisible, isModalContentVisible]);

  const onIconPress = (type: string) => {
    //detect platform and apply sharing logic
    if (type == 'insta_story') {
      shareToInstaStory();
      mixpanel.track('ShareClicked', {
        screen: 'ShortsHome',
        id: id,
        source: source,
        platform: type
      });
    } else if (type == 'insta') {
      mixpanel.track('ShareClicked', {
        screen: 'ShortsHome',
        id: id,
        source: source,
        platform: 'insta_feed'
      });
      shareToInstaChatsClicked();
    } else if (type == 'facebook_story') {
      mixpanel.track('ShareClicked', {
        screen: 'ShortsHome',
        id: id,
        source: source,
        platform: 'facebook_story'
      });
      shareToFacebookStory();
    
      } else if (type == 'whatsapp') {
        shareToWhatsappClicked();
    } else if (type == 'copy_link') {
      mixpanel.track('ShareClicked', {
        screen: 'ShortsHome',
        id: id,
        source: source,
        platform: type
      });
      isCopyLinkClicked();
    } else if (type == 'more' && isShortsShare) {
      mixpanel.track('ShareClicked', {
        screen: 'ShortsHome',
        id: id,
        source: source,
        platform: 'more'
      });
      isMoreShortsShareClicked();
    } else if (type == 'more' && !isShortsShare) {
      isMoreClicked();
    }
  };

  const shareToInstaStory = async () => {
    try{
    const uri = await ref.current.capture();
    const base64Image = await ImgToBase64.getBase64String(uri);
    await Share.shareSingle({
      appId: Config.FACEBOOK_APP_ID,
       stickerImage:
        Platform.OS === 'android'
          ? uri // use file uri for Android
          : `data:image/png;base64,${base64Image}`, // use base64 string for iOS
      social: Share.Social.INSTAGRAM_STORIES,
      backgroundBottomColor: '#1D1D1D', // You can use any hexcode here and below
      backgroundTopColor: '#1D1D1D',
      type: 'image/*',
    });}catch(err){
      console.log("Error while sharing to insta story", err);
    }
  };

  const shareToFacebookStory = async () => {
    const uri = await ref.current.capture();
    const base64Image = await ImgToBase64.getBase64String(uri);
    const shareOptions = {
      stickerImage: `data:image/png;base64,${base64Image}`,
      backgroundBottomColor: '#fefefe',
      backgroundTopColor: '#906df4',
      appId: Config.FACEBOOK_APP_ID,
      social: Share.Social.FACEBOOK_STORIES,
    };

    Share.shareSingle(shareOptions);
  };

  const isMoreShortsShareClicked = async () => {
    const uri = await ref.current.capture();
    Share.open({
      url: uri,
    });
  };

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
          onBackButtonPress={cancelModal}
          onBackdropPress={cancelModal}
          onSwipeComplete={cancelModal}
          swipeDirection='down'
          style={[
            styles.modalView,
            { padding: 0 },
            isSocialShareModal == true ? null : null,
          ]}
        >
          {isModalContentVisible && (
          <>
            <View
              style={[
                { height: modalHeight ?? SCREEN_HEIGHT * 0.8 },
                styles.content,
              ]}
            >
              <View
                style={[
                  styles.content,
                  {
                    backgroundColor: appConsumer.theme.colors.searchBackground,
                    padding: scaledWidth(3),
                  },
                ]}
              >
                {isSocialShareModal == true ? null : (
                  <TouchableOpacity
                    style={styles.modalHeader}
                    onPress={() => cancelModal()}
                  >
                    <Close
                      width={28}
                      height={28}
                      color={AppColors.WHITE}
                    />
                    <Text style={styles.title}>{headerTitle}</Text>
                    <View style={{ width: scaledHeight(32) }} />
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={[
                  styles.innerContainer,
                  {
                    backgroundColor:
                      isSocialShareModal == true
                        ? AppColors.BLACK_VARIANT
                        : AppColors.BLACK,
                  },
                ]}
              >
                <ViewShot
                  ref={ref}
                  options={{
                    format: 'jpg',
                    quality: 0.9,
                    fileName: 'RecoBee-Share-Card',
                  }}
                  style={{ backgroundColor: AppColors.BLACK }}
                >
                  {modalBody}
                </ViewShot>
              </View>
            </View>
            <Toast config={toastConfig} />
            <Animated.View
              {...panResponder.panHandlers}
              style={{
                backgroundColor: AppColors.BLACK_VARIANT,
                height: isShortsShare ? scaledHeight(140) : scaledHeight(178),
                alignItems: 'center',
                width: '100%',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                transform: [{ translateY }],
                position: 'absolute',
                bottom: 0,
                //transform: [{ translateY }],
              }}
            >
              <SocialShareModalBody
                isShortsShare={isShortsShare}
                onIconPress={onIconPress}
              />
            </Animated.View>
          </>
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
    //paddingTop: 10,
    padding: 10,
    flexDirection: 'row',
    //justifyContent: "flex-end",
    alignItems: 'flex-end',
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
    width: SCREEN_WIDTH,
    borderTopLeftRadius: scaledWidth(13),
    borderTopRightRadius: scaledWidth(13)
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    marginLeft: 8
  },
});
