import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { AppConsumer } from "context";
import { Rating } from "react-native-ratings";
import ArrowDown from "svg/arrow-down";
import Back from "svg/back";

export default class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalContentVisible: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalVisible !== prevProps.modalVisible) {
      if (this.props.modalVisible) {
        this.setState({ isModalContentVisible: true });
      } else {
        setTimeout(() => this.setState({ isModalContentVisible: false }), 300);
      }
    }
  }

  componentDidMount() {
    if (this.props.modalVisible) {
      this.setState({ isModalContentVisible: true });
    }
  }

  render() {
    return (
      <AppConsumer>
        {(appConsumer) => (
          <View>
          <Modal
            isVisible={this.props.modalVisible}
            propagateSwipe={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={200}
            animationOutTiming={200}
            avoidKeyboard={true}
            onBackButtonPress={this.props.cancelClick}
            onBackdropPress={this.props.cancelClick}
            onSwipeComplete={this.props.cancelClick}
            swipeDirection="down"
            style={[styles.modalView]}
          >
            {this.state.isModalContentVisible && (
            <View
              style={[
                styles.content,
                {
                  backgroundColor: appConsumer.theme.colors.bottomsheet,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.closeModal}
                onPress={this.props.cancelClick}
              >
                <ArrowDown height={25} width={25} />
              </TouchableOpacity>
              {!this.props.askReco && (
                <View style={{ marginBottom: 15 }}>
                  <TouchableOpacity
                    style={[
                      styles.newGrpContainer,
                      { backgroundColor: appConsumer.theme.colors.grey9alt },
                    ]}
                    onPress={() => this.props.backBtnClicked()}
                  >
                    <Back width={24} height={24} />
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.recoContainer}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                  }}
                >
                  {this.props.askReco ? (
                    <View style={{ marginBottom: 12 }}>
                      <TouchableOpacity onPress={this.props.onRecoMovieClick}>
                        <Text
                          style={{
                            color: appConsumer.theme.colors.link,
                            fontFamily: "DMSans-Bold",
                            fontSize: 20,
                          }}
                        >
                          {this.props.askRecoMovieName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text
                      style={{
                        color: appConsumer.theme.colors.text,
                        fontFamily: "DMSans-Bold",
                        marginBottom: 14,
                        fontSize: 20,
                      }}
                    >
                      Write your review
                    </Text>
                  )}
                  <Rating
                    ratingCount={5}
                    imageSize={22}
                    startingValue={0}
                    jumpValue={0.5}
                    fractions={1}
                    showRating={false}
                    ratingColor="#e9c46a"
                    tintColor={appConsumer.theme.colors.searchBackground}
                    onFinishRating={(rating) =>
                      this.props.ratingCompleted(rating)
                    }
                  />
                </View>
              </View>
              <View style={{ paddingRight: 16, flex: 1 }}>
                <TextInput
                  style={[
                    styles.inputCommentStyle,
                    { color: appConsumer.theme.colors.text },
                    {
                      borderColor: appConsumer.theme.colors.text,
                      backgroundColor: appConsumer.theme.colors.grey9alt,
                    },
                  ]}
                  value={this.props.comment}
                  textAlignVertical="top"
                  maxLength={500}
                  multiline={true}
                  keyboardAppearance="dark"
                  onChangeText={(text) => this.props.setComment(text.trim())}
                  autoCapitalize="none"
                  placeholder="Write your review here..."
                  underlineColorAndroid="transparent"
                  placeholderTextColor={appConsumer.theme.colors.placeholder}
                />
              </View>
              <View
                style={[
                  { paddingRight: 16, paddingBottom: 16, paddingTop: 16 },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.actionButtonStyle,
                    {
                      borderColor: appConsumer.theme.colors.primary,
                      backgroundColor: appConsumer.theme.colors.clientPrimary,
                      padding: 10,
                    },
                  ]}
                  onPress={this.props.nextClicked}
                >
                  <Text
                    style={[
                      styles.txtHeader,
                      { color: appConsumer.theme.colors.grey10 },
                    ]}
                  >
                    Send Reco
                  </Text>
                </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputCommentStyle: {
    fontFamily: "DMSans-Regular",
    height: Dimensions.get("window").width * 0.367,
    width: Dimensions.get("window").width - 32,
    paddingLeft: 16,
    paddingTop: 16,
    borderRadius: 8,
  },
  recoContainer: {
    flexDirection: "row",
    marginBottom: 26,
  },
  content: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width + 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingLeft: 16,
  },
  newGrpContainer: {
    borderWidth: 0,
    borderRadius: 4,
    width: 32,
    height: 32,
    padding: 10,
    backgroundColor: "#F6CE3D",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonStyle: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    flexDirection: "row",
  },
  txtHeader: {
    fontFamily: "DMSans-Bold",
    fontSize: 13,
  },
  closeModal: {
    alignItems: "center",
    paddingBottom: 5,
  },
});
