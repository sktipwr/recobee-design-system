import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  InteractionManager,
} from 'react-native';
import Modal from 'react-native-modal';
import { AppConsumer } from 'context';

import Delete from 'svg/delete';
import Camera from 'svg/camera';
import Gallery from 'svg/gallery';
import DefaultUser from 'svg/user';
import AppColors from 'utils/Colors';
import FontFamily from 'utils/FontFamily';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from 'utils/Dimensions';

interface ImageActionModalProps {
  isVisible: boolean;
  imageUri: string | null;
  onClose: () => void;
  onRemovePhoto: () => void;
  onAddFromGallery: () => void;
  onCamera: () => void;
  showRemoveOption?: boolean;
}

const ImageActionModal: React.FC<ImageActionModalProps> = ({
  isVisible,
  imageUri,
  onClose,
  onRemovePhoto,
  onAddFromGallery,
  onCamera,
  showRemoveOption = true,
}) => {
  const [isModalContentVisible, setIsModalContentVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsModalContentVisible(true);
    } else {
      const timer = setTimeout(() => setIsModalContentVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const actions = useMemo(
    () =>
      showRemoveOption
        ? [
            { actionName: 'Remove Photo', actionIcon: 'delete', onPress: onRemovePhoto },
            { actionName: 'Add from Gallery', actionIcon: 'gallery', onPress: onAddFromGallery },
            { actionName: 'Camera', actionIcon: 'camera', onPress: onCamera },
          ]
        : [
            { actionName: 'Add from Gallery', actionIcon: 'gallery', onPress: onAddFromGallery },
            { actionName: 'Camera', actionIcon: 'camera', onPress: onCamera },
          ],
    [showRemoveOption, onRemovePhoto, onAddFromGallery, onCamera]
  );

  const iconSource = (iconName: string) => {
    switch (iconName) {
      case 'delete':
        return <Delete height={20} width={20} />;
      case 'gallery':
        return <Gallery height={20} width={20} />;
      case 'camera':
        return <Camera height={20} width={20} />;
      default:
        return null;
    }
  };

  const handleAction = useCallback(
    (action: () => void) => {
      onClose();
      const task = InteractionManager.runAfterInteractions(() => {
        action();
      });
      return () => task.cancel();
    },
    [onClose]
  );

  return (
    <AppConsumer>
      {(appConsumer) => (
        <Modal
          isVisible={isVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          statusBarTranslucent
          animationInTiming={200}
          animationOutTiming={200}
          onBackButtonPress={onClose}
          onBackdropPress={onClose}
          onSwipeComplete={onClose}
          swipeDirection="down"
          style={styles.modal}
          propagateSwipe
          backdropColor={AppColors.TRANSPARENT}
          avoidKeyboard={true}
          keyboardAvoidingViewEnabled={true}
          keyboardShouldPersistTaps='handled'
        >
          {isModalContentVisible && (
          <>
            <TouchableOpacity 
              style={styles.backdrop}
              activeOpacity={1}
              onPress={onClose}
            >
              <View style={styles.imageContainer} pointerEvents="none">
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={styles.enlargedImage}
                  resizeMode="cover"
                />
              ) : (
                <DefaultUser
                  height={SCREEN_WIDTH * 0.6}
                  width={SCREEN_WIDTH * 0.6}
                />
              )}
              </View>
            </TouchableOpacity>

            <View style={styles.modalContainer} pointerEvents="box-none">
              <View
                style={[
                  styles.modalContent,
                  { backgroundColor: appConsumer.theme.colors.searchBackground },
                ]}
              >
                <View style={styles.indicator} />
                
                {actions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.actionItem}
                    onPress={() => handleAction(item.onPress)}
                    activeOpacity={0.7}
                  >
                    {iconSource(item.actionIcon)}
                    <Text
                      style={[
                        styles.actionText,
                        { color: appConsumer.theme.colors.text },
                      ]}
                    >
                      {item.actionName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
          )}
        </Modal>
      )}
    </AppConsumer>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.BLACK_OPACITY_80,
  },
  imageContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.3,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  enlargedImage: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
    borderRadius: (SCREEN_WIDTH * 0.6) / 2,
    borderWidth: 3,
    borderColor: AppColors.WHITE,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  indicator: {
    width: 48,
    height: 4,
    borderRadius: 8,
    backgroundColor: AppColors.GREY_VARIANT4,
    alignSelf: 'center',
    marginBottom: 32,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  actionText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamily.DMSansBold,
    marginLeft: 10,
  },
});

export default ImageActionModal;
