import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { AppConsumer } from 'context';
import Close from '../../icons/Cross';
import CoachMarkCarousel from 'components/Carousels/CoachMarkCarousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/Dimensions';

export default function CoachMarkModal({
  navigation,
  modalVisible,
  cancelClicked,
}) {
  const insets = useSafeAreaInsets();
  const [isModalContentVisible, setIsModalContentVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      setIsModalContentVisible(true);
    } else {
      setTimeout(() => setIsModalContentVisible(false), 300);
    }
  }, [modalVisible]);

  const data = [
    {
      title: 'Introducing Communities ',
      subTitle:
        'Communities allows you to join people of your interests and share your thoughts with them  ',
      imgName: 'coachFeatureFirst.gif',
    },
    {
      title: 'New Global Search ',
      subTitle:
        'Use new empowered Search feature which allows you to find users, movies, lists at the same time  ',
      imgName: 'coachFeatureSecond.gif',
    },
    {
      title: 'Social Posting',
      subTitle:
        'Post your thoughts about movies, series and share them with your friends.  ',
      imgName: 'coachFeatureThird.gif',
    },
  ];

  const renderCloseBtn = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          cancelClicked();
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Close width={24} height={24} />
      </TouchableOpacity>
    );
  };

  return (
    <AppConsumer>
      {(appConsumer) => (
        <View>
        <Modal
          isVisible={modalVisible}
          propagateSwipe={false}
          statusBarTranslucent={true}
          animationInTiming={200}
          animationOutTiming={200}
          avoidKeyboard={true}
          style={[styles.modalView, { padding: 0 }]}
          deviceHeight={Dimensions.get('screen').height}
          deviceWidth={Dimensions.get('screen').width}
        >
          {isModalContentVisible && (
          <View>
            <View style={[styles.modalTitle, { paddingTop: Math.max(insets.top, 20) }]}>
              <Text style={styles.txtHeader}>What's New on RecoBee</Text>
              {renderCloseBtn()}
            </View>
            <View>
              <View style={[styles.modalContent, { paddingBottom: Math.max(insets.bottom, 20) }]}>
                <CoachMarkCarousel data={data}></CoachMarkCarousel>
              </View>
            </View>
          </View>
          )}
        </Modal>
        </View>
      )}
    </AppConsumer>
  );
}
const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    margin: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 18, 0.82)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#272727',
    borderRadius: 9,
    borderWidth: 0.5,
    borderColor: '#757575',
    borderTopWidth: 0,
    width: Math.min(SCREEN_WIDTH - 32, 400),
    maxHeight: SCREEN_HEIGHT* 0.8,
    minHeight: 300,
  },
  modalTitle: {
    flexDirection: 'row',
    paddingBottom: 16,
    justifyContent: 'center',
    paddingHorizontal: 14,
    alignItems: 'center',
    minHeight: 60,
  },
  txtHeader: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'DMSans-Bold',
  },
  button: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});
