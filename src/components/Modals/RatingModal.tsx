import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  PixelRatio ,
} from "react-native";
import Modal from "react-native-modal";
import { AppConsumer } from "context";
import { Rating } from "react-native-ratings";
import Close from "../../icons/Cross";
import CommonStyles from "../../../Styles";

const starSize = PixelRatio.roundToNearestPixel(32);

export default class RatingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalContentVisible: false
    };
  }
  setModalVisible() {
    this.props.changeToggle(!this.props.toggleModal);
  }

  componentDidUpdate(prevProps) {
    if (this.props.toggleModal !== prevProps.toggleModal) {
      if (this.props.toggleModal) {
        this.setState({ isModalContentVisible: true });
      } else {
        setTimeout(() => this.setState({ isModalContentVisible: false }), 300);
      }
    }
  }

  componentDidMount() {
    if (this.props.toggleModal) {
      this.setState({ isModalContentVisible: true });
    }
  }

  render() {
    return (
      <AppConsumer>
        {(appConsumer) => (
          <View>
          <Modal
            isVisible={this.props.toggleModal}
            propagateSwipe={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            statusBarTranslucent={true}
            animationInTiming={200}
            animationOutTiming={200}
            avoidKeyboard={true}
            swipeDirection="right"
            style={[styles.modalView, { padding: 0 }]}
          >
            {this.state.isModalContentVisible && (
            <View style={CommonStyles.modalContainer}>
              <View
                style={[
                  styles.content,
                  {
                    backgroundColor: appConsumer.theme.colors.searchBackground,
                  },
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      padding: 5,
                      paddingTop: 8,
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Text
                      style={[
                        styles.msgContainer,
                        { color: appConsumer.theme.colors.text },
                      ]}
                    >
                      Rate the title
                    </Text>
                    <Text
                      style={[
                        {
                          paddingTop: 5,
                          paddingBottom: 10,
                          color: appConsumer.theme.colors.text,
                          fontSize: 20,
                          fontFamily: "DMSans-Bold",
                        },
                      ]}
                    >
                      {this.props.title}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => {
                      this.props.setRating(
                        this.props.initialRating ? this.props.initialRating : 0
                      );
                      this.props.cancelClicked();
                    }}
                  >
                    <Close
                      height={24}
                      width={24}
                      color={appConsumer.theme.colors.text}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  <Rating
                    ratingCount={5}
                    imageSize={starSize}
                    showRating={false}
                    fractions={1}
                    startingValue={
                      this.props.initialRating ? this.props.initialRating : 0
                    }
                    jumpValue={0.5}
                    ratingColor="#e9c46a"
                    ratingBackgroundColor="#C4C4C4"
                    tintColor={appConsumer.theme.colors.searchBackground}
                    onFinishRating={(rating) => this.props.setRating(rating)}
                  />
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 30,
                    left: -90,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.doneBtn}
                    onPress={() => this.props.doneClicked()}
                  >
                    <Text style={styles.txtBody}>Submit</Text>
                  </TouchableOpacity>
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
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    margin: 0,
    borderRadius: 5,
    paddingTop: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    width: 302,
    height: Dimensions.get("window").width / 2,
    borderRadius: 8,
    //overflow: 'hidden',
  },
  msgContainer: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    lineHeight: 20,
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 8,
    width: 30,
    height: 30,
  },
  doneBtn: {
    position: "absolute",
    width: 98,
    height: 36,
    left: 188,
    top: 105,
    backgroundColor: "#E9C638",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: {
    position: "absolute",
    width: 98,
    height: 44,
    left: 82,
    top: 105,
    backgroundColor: "#424242",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBody: {
    fontFamily: "DMSans-Regular",
    fontSize: 14,
    color: "#121212",
  },
});
