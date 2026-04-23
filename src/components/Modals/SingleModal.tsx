import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import { AppConsumer } from "context";
import CommonStyles from "../../../Styles";

export default class SingleModal extends Component {
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
                    height: this.props.height || 165,
                  },
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      styles.titleContainer,
                      { color: appConsumer.theme.colors.text },
                    ]}
                  >
                    {this.props.title}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <Text
                    style={[
                      styles.msgContainer,
                      {
                        top: this.props.title ? 56 : 24,
                        color: appConsumer.theme.colors.text,
                      },
                    ]}
                  >
                    {this.props.message}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 16,
                  }}
                >
                  <TouchableOpacity
                    style={styles.doneBtn}
                    onPress={() => this.props.doneClicked(this.props.item)}
                  >
                    <Text style={styles.txtBody}>{this.props.doneText}</Text>
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
    width: Dimensions.get("window").width - 32,
    height: Dimensions.get("window").width / 2,
    borderRadius: 8,
  },
  msgContainer: {
    position: "absolute",
    left: 24,
    right: 16,
    top: 56,
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    lineHeight: 20,
  },
  titleContainer: {
    position: "absolute",
    left: 24,
    right: 51,
    top: 24,
    fontSize: 20,
    fontFamily: "DMSans-Bold",
    lineHeight: 20,
  },
  closeBtn: {
    position: "absolute",
    right: 4,
    height: 40,
    width: 40,
    alignItems: "center",
    top: 4,
  },
  doneBtn: {
    width: Dimensions.get("window").width / 2,
    height: 44,
    backgroundColor: "#E9C638",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBody: {
    fontFamily: "DMSans-Bold",
    fontSize: 14,
    color: "#121212",
  },
});
