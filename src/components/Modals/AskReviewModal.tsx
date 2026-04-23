import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { AppConsumer } from "context";
import ArrowDown from "svg/arrow-down";
import ArrayList from "../List/ArrayList";
import AppColors from "../../utils/Colors";

export default class AskReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableBtn: false,
      isModalContentVisible: false,
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
    const rowPressed = () => {
      if (this.props.selectedItems.length > 0) {
        this.setState({ enableBtn: true });
      } else {
        this.setState({ enableBtn: false });
      }
    };

    return (
      <AppConsumer>
        {(appConsumer) => (
          <View>
          <Modal
            isVisible={this.props.modalVisible}
            propagateSwipe={true}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            statusBarTranslucent={true}
            animationInTiming={200}
            animationOutTiming={200}
            avoidKeyboard={false}
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
                    backgroundColor: AppColors.GREY_VARIANT8,
                  },
                ]}
              >
              <TouchableOpacity
                style={styles.closeModal}
                onPress={this.props.cancelClick}
              >
                <ArrowDown height={25} width={25} />
              </TouchableOpacity>
              <View
                style={{ paddingLeft: 16, paddingTop: 10, paddingBottom: 16 }}
              >
                <Text style={[styles.txtTitle, { color: "#FFFFFF" }]}>
                  Your contacts on RecoBee
                </Text>
              </View>
              <ArrayList
                listData={this.props.sendToList}
                showSearch={true}
                askReco={true}
                topListData={this.props.topListData}
                numColumns={1}
                selectedItems={this.props.selectedItems}
                onPressCallback={rowPressed}
                onCancelClick={this.props.cancelClick}
              />
              <View style={[{ padding: 16, flexDirection: "row" }]}>
                <TouchableOpacity
                  style={[
                    styles.actionButtonStyle,
                    {
                      backgroundColor: this.state.enableBtn
                        ? appConsumer.theme.colors.clientPrimary
                        : appConsumer.theme.colors.grey9,
                      flex: 1,
                      padding: 10,
                    },
                  ]}
                  disabled={!this.state.enableBtn}
                  onPress={this.props.nextClicked}
                >
                  <Text
                    style={[
                      styles.txtHeader,
                      {
                        color: this.state.enableBtn
                          ? appConsumer.theme.colors.grey10
                          : appConsumer.theme.colors.grey5,
                      },
                    ]}
                  >
                    Ask Review
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
    borderRadius: 5,
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
  content: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 1.59,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    //overflow: 'hidden',
  },
  actionButtonStyle: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    flexDirection: "row",
  },
  bottomBtnStyle: {
    height: Dimensions.get("window").width * 0.122,
    alignItems: "center",
    justifyContent: "center",
  },
  txtHeader: {
    fontFamily: "DMSans-Bold",
    fontSize: 13,
  },
  txtTitle: {
    fontFamily: "DMSans-Bold",
    fontSize: 16,
  },
  closeModal: {
    alignItems: "center",
    paddingBottom: 5,
  },
});
